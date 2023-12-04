const { useTheme } = require("next-themes");

const useDetectTheme = () => {
    const { theme, systemTheme } = useTheme();
    const dark = theme === 'dark' || (systemTheme === 'dark' && theme === 'system');
    return dark;
};
export default useDetectTheme;