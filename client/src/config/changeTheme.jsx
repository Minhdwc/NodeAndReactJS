import { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon } from '@fortawesome/free-solid-svg-icons';
export function ChangeTheme(prop) {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(prevMode => !prevMode);
    };

    useEffect(() => {
        if (darkMode) {
            document.body.style.backgroundColor = "#000";
            document.body.style.color = "#fff"
            document.querySelectorAll('ul').forEach((ul) => {
                ul.style.backgroundColor = "#222";
                ul.style.color = "#fff";
            });
        } else {
            document.body.style.backgroundColor = "#fff";
            document.body.style.color = "#000"
        }
    }, [darkMode]);

    return (
        <div className={darkMode ? 'dark' : 'light'}>
            <button className="icon-moon" onClick={toggleTheme}><FontAwesomeIcon icon={faMoon} /></button>
        </div>
    );
}
