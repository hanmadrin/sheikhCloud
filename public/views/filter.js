import notify from "../functions/notify.js";
import style from "../styles/style.js";
import view from "./view.js";
const filter = ({title,options,value,paramName,allowNull,paramGenerator})=>{
    // console.log({title,options,value,paramName});
    const neoFilter = document.createElement('div');
    neoFilter.className = style.neoFilter.main.join(' ');
    const filterTitle = document.createElement('div');
    filterTitle.className = style.neoFilter.title.join(' ');
    filterTitle.innerText = title;
    const select = document.createElement('select');
    select.className = style.neoFilter.select.join(' ');
    const updateData = async ()=>{
        const searchParams = paramGenerator();
        searchParams.set(paramName,select.value);
        window.history.pushState({},null,`${window.location.pathname}?${searchParams.toString()}`);
        await view();
    };
    if(allowNull){
        const option = document.createElement('option');
        option.value = '';
        option.innerText = 'all';
        select.appendChild(option);
        const cross = document.createElement('button');
        cross.className = style.neoFilter.cross.join(' ');
        cross.innerText = 'X';
        cross.addEventListener('click',async ()=>{
            // if(select.value===''){
            //     notify({data:'You already removed this filter',type:'warning'});
            // }else{
                select.value = '';
                await updateData();
            // }
        });
        if(value!==''){
            neoFilter.appendChild(cross);
        }
    }
    options.forEach(option=>{
        const optionElement = document.createElement('option');
        optionElement.value = option;
        optionElement.innerText = option;
        if(option===value){
            optionElement.selected = true;
        }
        select.appendChild(optionElement);
    });
    if(!options.includes(value)){
        const option = document.createElement('option');
        option.value = value;
        option.selected = true;
        option.innerText = value;
        if(!allowNull){
            select.appendChild(option);
        }
    }
    select.onchange = async ()=>{
        await  updateData();
    };
    neoFilter.append(filterTitle,select);
    // console.log(neoFilter);
    return neoFilter;
};
export default filter;