import notify from "../functions/notify.js";
import style from "../styles/style.js";
import view from "./view.js";
const header = ()=>{
    if(document.getElementById('neoHeader')===null){
        const neoHeader = document.createElement('div');
        neoHeader.id = 'neoHeader';
        neoHeader.className = style.neoHeader.main.join(' ');
        const logo = document.createElement('img');
        logo.className = style.neoHeader.logo.join(' ');
        logo.src = '/public/icons/logo.png';
        const homeButton = document.createElement('button');
        homeButton.innerText = 'Home';
        homeButton.className = style.neoHeader.button.join(' ');
        homeButton.addEventListener('click',async ()=>{
            window.history.pushState({},null,'/');
            await view();
        });
        const logOutButton = document.createElement('button');
        logOutButton.innerText = 'Log Out';
        logOutButton.className = style.neoHeader.button.join(' ');
        logOutButton.addEventListener('click',async ()=>{
            const response = await fetch('/api/logout',{method:'GET'});
            if(response.status===200){
                window.history.pushState({},null,'/login');
                await view();
            }else{
                notify({data:'Log out failed',type:'danger'});
            }
        });

        neoHeader.append(homeButton,logo,logOutButton);
        return neoHeader;
    }else{
        return document.getElementById('neoHeader');
    }
};
export default header;