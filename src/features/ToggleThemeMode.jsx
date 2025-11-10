export default function ToggleThemeMode() {
  const classList = document.documentElement.classList;
  const isDarkTheme = classList.contains("dark");

  if (isDarkTheme) {
    classList.remove("dark");
  } else {
    classList.add("dark");
  }

  localStorage.theme = isDarkTheme ? "dark" : "light";
}