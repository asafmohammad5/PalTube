export const currentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
}

window.addEventListener('DOMContentLoaded', (event) => {
  let currentTheme = localStorage.getItem("theme");
  let src = currentTheme === "dark" ? window.darkTheme : window.lightTheme;
  if (document.getElementById("site-logo")) {
    document.getElementById("site-logo").src = src; 
  }
});

export const changeThemeLogo = () => {
  let currentTheme = localStorage.getItem("theme");
  let src = currentTheme === "dark" ? window.darkTheme : window.lightTheme;
  if (document.getElementById("site-logo")) {
  document.getElementById("site-logo").src = src; 
  }
}

export const changeTheme = () => {
  let currentTheme = localStorage.getItem("theme");
  var link = document.createElement("link");
  link.href = currentTheme !== "dark" ? "../stylesheets/components/light_theme.css" : "../stylesheets/components/dark_theme.css";
  link.rel = "stylesheet";
  link.type = "text/css";
  document.body.appendChild(link);
  changeThemeLogo();
}

export const initializeTheme = () => {
  let isThemeExist = localStorage.getItem("theme");
  if (isThemeExist) {
    changeTheme();
  } else {
    localStorage.setItem("theme", "dark");
    changeTheme();
  }
}

export const getCurrentTheme = () => {
  return localStorage.getItem("theme");
}