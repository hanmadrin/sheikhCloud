import style from "../styles/style.js";
const dropDown = ({iconClass,showButtonClass,items,menuName})=>{
    const neoDropDown = document.createElement('div');
    neoDropDown.className = style.neoDropDown.main.join(' ');
    const showButton = document.createElement('button');
    showButton.className = style.neoDropDown[`${showButtonClass}`].join(' ');
    showButton.innerText = menuName;
    showButton.setAttribute('data-toggle','dropdown');
    showButton.setAttribute('data-mdb-toggle','dropdown');
    showButton.setAttribute('aria-expanded','false');
    showButton.type = 'button';

    const icon = document.createElement('span');
    icon.className = iconClass;
    showButton.append(icon);
    const menuHolder = document.createElement('ul');
    menuHolder.className = style.neoDropDown.menuHolder.join(' ');
    for(let i=0;i<items.length;i++){
        const menutItem = document.createElement('li');
        menutItem.className = style.neoDropDown.menuItem.join(' ');
        const menuItemButton = document.createElement('button');
        menuItemButton.innerText = items[i].name;
        menuItemButton.className = style.neoDropDown.menuItemButton.join(' ');
        menuItemButton.addEventListener('click',items[i].onClick);
        menutItem.append(menuItemButton);
        menuHolder.append(menutItem);
    }
    neoDropDown.append(showButton,menuHolder);
    return neoDropDown;
};
export default dropDown;