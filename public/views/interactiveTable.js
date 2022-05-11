import actionClickHandler from "../functions/actionClickHandler.js";
import style from "../styles/style.js";
import { taxCalculationFromInvoice } from "../functions/taxCalculation.js";

const interactiveTable = ({data,interaction})=>{
    
    const neoTable = document.createElement('div');
    neoTable.className = style.neoTable.main.join(' ');
    if(data.length===0){
        const noDataHolder = document.createElement('div');
        const noData = document.createElement('h2');
        noData.className = style.neoTable.noData.join(' ');
        noData.innerText = 'No data found for this query';
        neoTable.appendChild(noData);
    }else{   
        const thead = document.createElement('div');
        thead.className = style.neoTable.thead.join(' ');
        const thValues = Object.keys(data[0]);
        thValues.forEach(thValue=>{
            const th = document.createElement('div');
            th.className = style.neoTable.th.join(' ');
            th.innerText = thValue.replace('invoice_',' ');
            thead.appendChild(th);
        });
        neoTable.appendChild(thead);
        data.forEach(row=>{
            const tr = document.createElement('div');
            tr.setAttribute('data-serial',row.serial);
            tr.className = style.neoTable.tr.join(' ');

            tr.oncontextmenu = (context)=>{
                context.preventDefault();
                document.body.classList.add('overflow-hidden');
                tr.style.backgroundColor = '#39c0ed';
                const backDrop = document.createElement('div');
                const contextMenu = document.createElement('div');
                contextMenu.className = style.neoTable.contextMenu.join(' ');
                contextMenu.style.top = `${context.clientY}px`;
                contextMenu.style.left = `${context.clientX}px`;
                const contextMenuItems = Object.keys(interaction.actions);
                const contextMenuDefaultItems = Object.keys(interaction.defaultActions);
                if(contextMenuDefaultItems.length>0){
                    const defaultActions = interaction.defaultActions;
                    const contextMenuDefaultsItemHolder = document.createElement('div');
                    contextMenuDefaultsItemHolder.className = style.neoTable.contextMenuDefaultsItemHolder.join(' ');
                    for(let i=0;i<contextMenuDefaultItems.length;i++){
                        const action = defaultActions[contextMenuDefaultItems[i]];
                        const contextMenuDefaultItem = document.createElement('div');
                        contextMenuDefaultItem.title = defaultActions[contextMenuDefaultItems[i]].title;
                        contextMenuDefaultItem.className = style.neoTable.contextMenuDefaultItem.join(' ');
                        const img = document.createElement('img');
                        img.src = `/public/icons/${defaultActions[contextMenuDefaultItems[i]].iconUrl}`;
                        contextMenuDefaultItem.appendChild(img);
                        contextMenuDefaultItem.onclick = async ()=>{
                            await actionClickHandler({
                                action: action,
                                nodes: {
                                    tr: tr,
                                    contextMenu: contextMenu,
                                    backDrop: backDrop
                                }
                            })
                        }
                        contextMenuDefaultsItemHolder.appendChild(contextMenuDefaultItem);
                    }
                    contextMenu.appendChild(contextMenuDefaultsItemHolder);
                }
                for(let i=0;i<contextMenuItems.length;i++){
                    const action = interaction.actions[contextMenuItems[i]];
                    const contextMenuItem = document.createElement('div');
                    contextMenuItem.className = style.neoTable.contextMenuItem.join(' ');
                    contextMenuItem.innerText = action.title;
                    contextMenuItem.onclick = async()=>{
                        await actionClickHandler({
                            action: action,
                            nodes: {
                                tr: tr,
                                contextMenu: contextMenu,
                                backDrop: backDrop
                            }
                        })
                    };
                    contextMenu.appendChild(contextMenuItem);
                }
                document.body.appendChild(contextMenu)

                backDrop.className = style.neoTable.backDrop.join(' ');
                const contextCancel = (cancel)=>{
                    cancel.preventDefault();
                    document.body.classList.remove('overflow-hidden');
                    tr.removeAttribute('style');
                    backDrop.remove();
                    contextMenu.remove();
                }
                backDrop.onclick =contextCancel;
                backDrop.oncontextmenu =contextCancel;
                   
                document.body.appendChild(backDrop);
                
            };


            const tdValues = Object.values(row);
            tdValues.forEach(tdValue=>{
                const td = document.createElement('div');
                td.className = style.neoTable.td.join(' ');
                td.innerText = tdValue;
                tr.appendChild(td);
            });
            neoTable.appendChild(tr);
        });

    }
    return neoTable;
};
export default interactiveTable;