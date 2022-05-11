import view from "./view.js";
import app from "./app.js";
import { changeTitle } from "../functions/shortHands.js";
import style from "../styles/style.js";
import header from "./header.js";
import generatePrognoseParams from "../functions/generatePrognoseParams.js";
import filter from "./filter.js";
import notify from "../functions/notify.js";
import { taxCalculationFromInvoice, taxCalculationFromProductList, contentGenerator } from "../functions/taxCalculation.js";

const prognose = async ()=>{
    try{
        const response = await fetch('/api/isLoggedIn', {method: 'GET',});
        if(response.status!==200){
            window.history.pushState({},null,'/login');
            await view();
            return null;
        }
    }catch{};
    changeTitle('Prognose | Sheikhcloud');
    const searchParams = generatePrognoseParams();
    // try{
        const response = await fetch(`/api${window.location.pathname}?${searchParams.toString()}`,{method:'GET'});
        if(response.status!==200){
            notify({data:'Error fetching invoice',type:'danger'});
        }else{
            const data = await response.json();
            const filterValues = {
                year: {values:data.distinctValues.year,allowNull: false},
                quarter: {values: ['1','2','3','4'],allowNull: false},
                company: {values: data.distinctValues.company,allowNull: true},
            };
            const filterHolder = document.createElement("div");
            filterHolder.className = style.neoPrognose.filterHolder.join(' ');
            const filterKeys = Object.keys(filterValues);
            filterKeys.forEach(key=>{
                const filterElement = filter({
                    title: key,
                    options: filterValues[key].values,
                    value: searchParams.get(key),
                    paramName: key,
                    allowNull: filterValues[key].allowNull,
                    paramGenerator: generatePrognoseParams,
                });
                filterHolder.append(filterElement);
            });
            
            
            const neoHeader = header();
            const root = document.getElementById(app.id);
            const neoPrognose = document.createElement("div");
            neoPrognose.className = style.neoPrognose.main.join(" ");
            const contentHeader = document.createElement("h1");
            contentHeader.className = style.neoPrognose.header.join(" ");
            contentHeader.innerText = 'Prognose';
            const creditContent = document.createElement("div");
            const creditHeader = document.createElement("h2");
            creditHeader.className = style.neoPrognose.header.join(" ");
            creditHeader.innerText = 'Credit';

            const uitbetalingenData = taxCalculationFromProductList(data.uitbetalingen);
            const uitbetalingenContent = contentGenerator({data:uitbetalingenData,title:'Uitbetalingen'});
            const rittenUitbesteedData = taxCalculationFromProductList(data.rittenUitbesteed);
            const rittenUitbesteedContent = contentGenerator({data:rittenUitbesteedData,title:'Ritten uitbesteed'});
            
            const uitgavenData = taxCalculationFromInvoice(data.uitgaven);
            const uitgavenContent = contentGenerator({data:uitgavenData,title:'Uitgaven'});


            creditContent.append(creditHeader,uitbetalingenContent,rittenUitbesteedContent,uitgavenContent);




            const debitContent = document.createElement("div");
            const debitHeader = document.createElement("h2");
            debitHeader.className = style.neoPrognose.header.join(" ");
            debitHeader.innerText = 'Debit';
            const debitSubData = taxCalculationFromProductList(data.debit);
            const debitSubContent = contentGenerator({data:debitSubData,title:'Debit'});
            debitContent.append(debitHeader,debitSubContent);

            const prognoseHolder = document.createElement("div");
            prognoseHolder.className = style.neoPrognose.prognoseHolder.join(" ");
            neoPrognose.append(contentHeader,creditContent,debitContent);
            prognoseHolder.append(neoPrognose);
            root.replaceChildren(neoHeader,filterHolder,prognoseHolder);
        }
    // }catch(err){
    //     console.log(err);
    // }
    
};
export default prognose;