import notify from "../functions/notify.js";
import style from "../styles/style.js";
import dropDown from "./dropDown.js";
import view from "./view.js";
const header = ()=>{
    if(document.getElementById('neoHeader')===null){
        const neoHeader = document.createElement('div');
        neoHeader.id = 'neoHeader';
        neoHeader.className = style.neoHeader.main.join(' ');
        const logo = document.createElement('img');
        logo.className = style.neoHeader.logo.join(' ');
        logo.src = '/public/icons/logo.png';
        logo.onclick = async()=>{
            window.history.pushState({},null,'/');
            await view();
        };


        const navMenu = document.createElement('div');
        navMenu.className = style.neoHeader.navMenu.join(' ');

        const homeButton = document.createElement('button');
        homeButton.innerText = 'Home';
        homeButton.className = style.neoHeader.button.join(' ');
        homeButton.addEventListener('click',async ()=>{
            window.history.pushState({},null,'/');
            await view();
        });

        const overzichtItems = [
            {
                name: 'Credit Invoices',
                onClick: async ()=>{
                    window.history.pushState({},null,'/creditInvoice');
                    await view();
                }
            },
            {
                name: 'Debit Invoices',
                onClick: async ()=>{
                    window.history.pushState({},null,'/debitInvoice');
                    await view();
                }
            },
            {
                name: 'Clients',
                onClick: async ()=>{
                    window.history.pushState({},null,'/client');
                    await view();
                }
            },
        ]
        const overzicht = dropDown({iconClass:'caret',showButtonClass:'showButton',items:overzichtItems,menuName:'Overzicht'});

        const addItems = [
            {
                name: 'Add Credit',
                onClick: async ()=>{
                    window.history.pushState({},null,'/creditInvoice/new');
                    await view();
                }  
            },
            {
                name: 'Add Debit',
                onClick: async ()=>{
                    window.history.pushState({},null,'/debitInvoice/new');
                    await view();
                }
            },
            {
                name: 'Add Client',
                onClick: async ()=>{
                    window.history.pushState({},null,'/client/new');
                    await view();
                }
            },
        ];
        const add = dropDown({iconClass:'',showButtonClass:'showButtonCircle',items:addItems,menuName:'+'});


        const prognoseButton = document.createElement('button');
        prognoseButton.innerText = 'Prognose';
        prognoseButton.className = style.neoHeader.button.join(' ');
        prognoseButton.addEventListener('click',async ()=>{
            window.history.pushState({},null,'/prognose');
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
        navMenu.append(add,homeButton,overzicht,prognoseButton,logOutButton);
        neoHeader.append(logo,navMenu);
        return neoHeader;
    }else{
        return document.getElementById('neoHeader');
    }
};
export default header;