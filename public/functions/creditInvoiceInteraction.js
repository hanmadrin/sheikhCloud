import view from "../views/view.js";
import notify from "./notify.js";
const creditInvoiceInteraction = {
    defaultActions:{
        view:{
            title: 'View Invoice Details',
            iconUrl: 'viewIcon.png',
            confirmationRequired: false,
            action: async (tr)=>{
                window.history.pushState({}, '', `/creditInvoice/view/${tr.getAttribute('data-serial')}`);
                await view();
            }
        },
        edit:{
            title: 'Edit this Invoice',
            iconUrl: 'editIcon.png',
            confirmationRequired: true,
            confirmationMessage: 'Are you sure you want to edit this invoice?',
            action: async (tr)=>{
                window.history.pushState({}, '', `/creditInvoice/edit/${tr.getAttribute('data-serial')}`);
                await view();
            }
        },
        delete:{
            title: 'Delete this Invoice',
            iconUrl: 'deleteIcon.png',
            confirmationRequired: true,
            confirmationMessage: 'Are you sure you want to delete this invoice?',
            action: async (tr)=>{
                const response = await fetch(`/api/creditInvoice/delete/${tr.getAttribute('data-serial')}`,{method:'POST'});
                if(response.status!==200){
                    notify({data:'Error deleting invoice',type:'danger'});
                }else{
                    notify({data:'Invoice deleted',type:'success'});
                    tr.remove();
                }
            }
        },
        
    },
    actions:{
        markAsBetaald:{
            title: 'Mark as betaald',
            confirmationRequired: true,
            confirmationMessage: 'Are you sure you want to mark this invoice as betaald?',
            action: async (tr)=>{
                const response = await fetch(`/api/creditInvoice/markAsBetaald/${tr.getAttribute('data-serial')}`,{method:'PUT'});
                if(response.status!==200){
                    notify({data:'Error marking invoice as betaald',type:'danger'});
                }else{
                    notify({data:'Invoice marked as betaald',type:'success'});
                    await view();
                }
            }
        },
        markAsOnBetaald:{
            title: 'Mark as on betaald',
            confirmationRequired: true,
            confirmationMessage: 'Are you sure you want to mark this invoice as on betaald?',
            action: async (tr)=>{
                const response = await fetch(`/api/creditInvoice/markAsOnBetaald/${tr.getAttribute('data-serial')}`,{method:'PUT'});
                if(response.status!==200){
                    notify({data:'Error marking invoice as on betaald',type:'danger'});
                }else{
                    notify({data:'Invoice marked as on betaald',type:'success'});
                    await view();
                }
            }
        },
        cloneInvoice:{
            title: 'Clone this Invoice',
            iconUrl: 'cloneIcon.png',
            confirmationRequired: true,
            confirmationMessage: 'Are you sure you want to clone this invoice?',
            action: async (tr)=>{
                window.history.pushState({}, '', `/creditInvoice/clone/${tr.getAttribute('data-serial')}`);
                await view();
            }
        },
        viewPDF: {
            title: 'View PDF',
            iconUrl: 'viewIcon.png',
            confirmationRequired: false,
            action: async (tr)=>{
                window.open(`/api/viewPDF/credit/${tr.getAttribute('data-serial')}`);
            }
        },      
    }
};
export default creditInvoiceInteraction;