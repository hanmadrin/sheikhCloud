import app from "./app.js";
import view from "./view.js";
import header from "./header.js";
import style from "../styles/style.js";
const home = async () => {
    try{
        const response = await fetch('/api/isLoggedIn', {method: 'GET',});
        if(response.status!==200){
            window.history.pushState({},null,'/login');
            await view();
            return null;
        }
    }catch{};
    
    const root = document.getElementById(app.id);
    const neoHeader = header();
    const contentHolder = document.createElement("div");
    contentHolder.className = style.home.main.join(" ");
    const logo = document.createElement('img');
    logo.className = style.home.logo.join(' ');
    logo.src = '/public/icons/logo.png';
    contentHolder.append(logo);
    root.replaceChildren(neoHeader,contentHolder);
}
export default home;