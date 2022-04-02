import app from "./app.js";
import home from "./home.js";
const notFound = ()=>{
    const root = document.getElementById(app.id);
    const contentHolder = document.createElement('div');
    contentHolder.id = 'neoNotFound';
    contentHolder.classList.add('contentHolder');
    const contentHolderTitle = document.createElement('h1');
    contentHolderTitle.innerText = '404 NOT FOUND';
    const logo = document.createElement('img');
    logo.src = './public/icons/logo.png';
    const homeButton = document.createElement('button');
    homeButton.innerText = 'Home';
    homeButton.classList.add('btn');
    homeButton.addEventListener('click',async ()=>{
        window.history.pushState({},null,'/');
        await home();
    });
    contentHolder.append(logo,contentHolderTitle,homeButton);
    root.replaceChildren(contentHolder);
}
export default notFound;