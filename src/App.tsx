import './App.css'
import SimonDisc from "./component/SimonDisc.tsx";
import {useCallback, useEffect, useState} from "react";
import {BeforeInstallPromptEvent} from "./types";

function App() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        Notification.requestPermission();
        const handler = (e: BeforeInstallPromptEvent) => {
            e.preventDefault();
            setDeferredPrompt(e);
        }
        window.addEventListener('beforeinstallprompt', handler);
        return () => {
            window.removeEventListener('beforeinstallprompt', handler);
        }
    }, []);

    const handleClick = useCallback(() => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(({outcome}) => {
                if (outcome === 'accepted') {
                    console.log('User PWA');
                    setDeferredPrompt(null);
                } else {
                    console.log('User NOT PWA');
                }
            });
        }
    }, [deferredPrompt]);


    return (
        <>
            {deferredPrompt && <div className="install-button" onClick={handleClick}>Install</div>}
            <SimonDisc/>
        </>
    )
}

export default App
