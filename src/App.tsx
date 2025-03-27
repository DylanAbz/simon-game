import './App.css'
import SimonDisc from "./component/SimonDisc.tsx";
import {useCallback, useEffect, useState} from "react";
import {BeforeInstallPromptEvent} from "./types";

function App() {
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

    function randomNotification() {
        const notifTitle = "Random notif";
        const notifBody = `Created by moi.`;
        const options = {
            body: notifBody,
        };
        new Notification(notifTitle, options);
        setTimeout(randomNotification, 30000);
    }


    useEffect(() => {
        Notification.requestPermission().then((result) => {
            if (result === "granted") {
                randomNotification();
            }
        });
    }, []);

    window.addEventListener('beforeinstallprompt', (e : BeforeInstallPromptEvent) => {
        setDeferredPrompt(e);
    });

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
