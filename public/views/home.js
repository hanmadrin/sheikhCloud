import app from "./app.js";
const home = async () => {
    const root = document.getElementById(app.id);
    const contentHolder = document.createElement("div");
    contentHolder.id = "neoHome";
    contentHolder.classList.add("contentHolder");
    contentHolder.classList.add("text-center");
    const logo = document.createElement("img");
    logo.src = "./public/icons/logo.png";
    contentHolder.append(logo);
    root.replaceChildren(contentHolder);
}
export default home;