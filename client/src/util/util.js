export const currentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
}

export const changeTheme = () => {
  let currentTheme = localStorage.getItem("theme");
  var link = document.createElement("link");
  link.href = currentTheme === "dark" ? "style/components/light_theme.css" : "style/components/dark_theme.css";
  link.rel = "stylesheet";
  link.type = "text/css";
  document.body.appendChild(link);
}

export const initializeTheme = () => {
  let isThemeExist = localStorage.getItem("theme");
  if (isThemeExist) {
    changeTheme();
  } else {
    localStorage.setItem("theme", "dark");
  }
}