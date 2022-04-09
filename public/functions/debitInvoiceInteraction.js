import view from "../views/view.js";
import notify from "./notify.js";
const debitInvoiceInteraction = {
    defaultActions:{
        view:{
            title: 'View Invoice Details',
            iconUrl: 'viewIcon.png',
            confirmationRequired: false,
            action: async (tr)=>{
                window.history.pushState({}, '', `/debitInvoice/view/${tr.getAttribute('data-serial')}`);
                await view();
            }
        },
        edit:{
            title: 'Edit this Invoice',
            iconUrl: 'editIcon.png',
            confirmationRequired: true,
            confirmationMessage: 'Are you sure you want to edit this invoice?',
            action: async (tr)=>{
                window.history.pushState({}, '', `/debitInvoice/edit/${tr.getAttribute('data-serial')}`);
                await view();
            }
        },
        delete:{
            title: 'Delete this Invoice',
            iconUrl: 'deleteIcon.png',
            confirmationRequired: true,
            confirmationMessage: 'Are you sure you want to delete this invoice?',
            action: async (tr)=>{
                const response = await fetch(`/api/debitInvoice/delete/${tr.getAttribute('data-serial')}`,{method:'POST'});
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
        sendEmail:{
            title: 'Send Debitor an Email',
            confirmationRequired: true,
            confirmationMessage: 'Are you sure you want to send email to Debitor?',
            action: async (tr)=>{
                const response = await fetch(`/api/debitInvoice/sendEmail/${tr.getAttribute('data-serial')}`,{method:'POST'});
                if(response.status!==200){
                    notify({data:'Error sending email',type:'danger'});
                }else{
                    notify({data:'Email sent',type:'success'});
                    await view();
                }
            }
        },
        reCreatePDF:{
            title: 'Re-Create PDF',
            confirmationRequired: true,
            confirmationMessage: 'Are you sure you want to re-create PDF?',
            action: async (tr)=>{
                const response = await fetch(`/api/debitInvoice/reCreatePDF/${tr.getAttribute('data-serial')}`,{method:'POST'});
                if(response.status!==200){
                    notify({data:'Error re-creating PDF',type:'danger'});
                }else{
                    notify({data:'PDF re-created',type:'success'});
                    await view();
                }
            }
        },
        markAsSturen:{
            title: 'Mark as Sturen',
            confirmationRequired: true,
            confirmationMessage: 'Are you sure you want to mark this invoice as Sturen?',
            action: async (tr)=>{
                const response = await fetch(`/api/debitInvoice/markAsSturen/${tr.getAttribute('data-serial')}`,{method:'POST'});
                if(response.status!==200){
                    notify({data:'Error marking invoice as Sturen',type:'danger'});
                }else{
                    notify({data:'Invoice marked as Sturen',type:'success'});
                    await view();
                }
            }
        },
        markAsBetaald:{
            title: 'Mark as Betaald',
            confirmationRequired: true,
            confirmationMessage: 'Are you sure you want to mark this invoice as Betaald?',
            action: async (tr)=>{
                const response = await fetch(`/api/debitInvoice/markAsBetaald/${tr.getAttribute('data-serial')}`,{method:'POST'});
                if(response.status!==200){
                    notify({data:'Error marking invoice as Betaald',type:'danger'});
                }else{
                    notify({data:'Invoice marked as Betaald',type:'success'});
                    await view();
                }
            }
        },
        cloneInvoice:{
            title: 'Clone this Invoice & Edit',
            confirmationRequired: true,
            confirmationMessage: 'Are you sure you want to clone this invoice?',
            action: async (tr)=>{
                window.history.pushState({}, '', `/debitInvoice/clone/${tr.getAttribute('data-serial')}`);
                await view();
            }
        },
        viewPDF:{
            title: 'View PDF',
            confirmationRequired: false,
            action: async (tr)=>{  
                window.open(`/debitInvoice/viewPDF/${tr.getAttribute('data-serial')}`);
            }  
        },

    }
};
export default debitInvoiceInteraction;