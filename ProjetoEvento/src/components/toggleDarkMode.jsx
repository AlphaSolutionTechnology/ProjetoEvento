import { useTheme } from "../styles/ThemeContext";
import {SunIcon, MoonIcon} from '@heroicons/react/24/solid';

const ThemeToggle = () => {
    const { darkMode, setDarkMode } = useTheme();   

    return (
        <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 focus:outline-none"
        >
            {darkMode ? (
                <SunIcon className="w-6 h-6 text-yellow-500" />
            ) : (
                <MoonIcon className="w-6 h-6 text-gray-700" />
            )}
        </button>
    );
};

export default ThemeToggle;