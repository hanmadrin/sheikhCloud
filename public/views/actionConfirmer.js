import style from "../styles/style.js";
const actionConfirmer = ({action, message,nodes }) => {
    const tr = nodes.tr;
    const neoActionConfirmer = document.createElement('div');
    neoActionConfirmer.className = style.neoActionConfirmer.main.join(' ');
    const contentHolder = document.createElement('div');
    contentHolder.className = style.neoActionConfirmer.contentHolder.join(' ');
    const title = document.createElement('h3');
    title.className = style.neoActionConfirmer.title.join(' ');
    title.innerText = 'Confirm Action';
    const messageHolder = document.createElement('h4');
    messageHolder.innerText = message;
    messageHolder.className = style.neoActionConfirmer.messageHolder.join(' ');
    const actionHolder = document.createElement('div');
    actionHolder.className = style.neoActionConfirmer.actionHolder.join(' ');
    const cancel = document.createElement('button');
    cancel.innerText = 'Cancel';
    cancel.className = style.neoActionConfirmer.cancel.join(' ');

    const confirm = document.createElement('button');
    confirm.innerText = 'Confirm';
    confirm.className = style.neoActionConfirmer.confirm.join(' ');
    confirm.onclick = async () => {
        await action.action(tr);
        tr.removeAttribute('style');
        document.body.classList.remove('overflow-hidden');
        neoActionConfirmer.remove();
    }
    actionHolder.appendChild(cancel);
    actionHolder.appendChild(confirm);
    contentHolder.appendChild(title);
    contentHolder.appendChild(messageHolder);
    contentHolder.appendChild(actionHolder);
    neoActionConfirmer.appendChild(contentHolder);


    const actionCancel = function(cancel){
        if(cancel.target===this){
            tr.removeAttribute('style');
            document.body.classList.remove('overflow-hidden');
            neoActionConfirmer.remove();
        }
    }
    cancel.onclick = actionCancel;
    neoActionConfirmer.onclick = actionCancel;
    document.body.appendChild(neoActionConfirmer);
}
export default actionConfirmer;