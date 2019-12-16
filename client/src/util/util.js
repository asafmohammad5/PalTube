export const currentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
}