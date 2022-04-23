import actionConfirmer from "../views/actionConfirmer.js";

const actionClickHandler = async ({action, nodes}) => {
    const tr = nodes.tr;
    const contextMenu = nodes.contextMenu;
    const backDrop = nodes.backDrop;
    if(action.confirmationRequired){
        backDrop.remove();
        contextMenu.remove();
        actionConfirmer({action,message:action.confirmationMessage,nodes:{tr,contextMenu,backDrop}});
        
    }else{
        await action.action(tr);
        tr.removeAttribute('style');
        backDrop.remove();
        contextMenu.remove();
        document.body.classList.remove('overflow-hidden');
    }
    
    
}
export default actionClickHandler;