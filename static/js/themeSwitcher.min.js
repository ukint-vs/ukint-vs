// Get the theme switcher button element.
const themeSwitcher = document.querySelector(".theme-switcher");

// Retrieve theme from localStorage.
let currentTheme = localStorage.getItem("theme");

// ---------------- Switch Theme -------------------------
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (currentTheme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.getElementById("syntax_highlight").href = "/syntax-dark.css";
} else {
    document.getElementById("syntax_highlight").href = "/syntax-light.css";
}

// Function to set theme
function setTheme(theme, saveToLocalStorage = false) {

    if (theme === 'light') {
        document.getElementById("syntax_highlight").href = "/syntax-light.css";
    } else {
        document.getElementById("syntax_highlight").href = "/syntax-dark.css";
    }
    document.documentElement.setAttribute("data-theme", theme);
    currentTheme = theme;

    if (saveToLocalStorage) {
        localStorage.setItem("theme", theme);
    }

    // Dispatch a custom event for utterances and giscus.
    const event = new CustomEvent("themeChanged", {
        detail: { theme: theme }
    });
    window.dispatchEvent(event);
}

// Function to switch between dark and light themes.
function switchTheme() {
    // Set the new theme based on the current theme.
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme, true); // Save the theme to localStorage when the user changes it.
}

// Initialize the theme switcher button.
themeSwitcher.addEventListener("click", switchTheme, false);

// Update the theme based on system preference if the user hasn't manually changed the theme.
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
    const newTheme = e.matches ? "dark" : "light";
    setTheme(newTheme);
});
