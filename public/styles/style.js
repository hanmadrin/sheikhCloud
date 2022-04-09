const style = {
    neoLoader:{
        main: ['position-fixed','vw-100','vh-100','top-0','start-0','zindex-fixed','d-none'],
        loaderHolder:['position-absolute','top-50','start-50','translate-middle'],
        loader: ['border-solid','border-15px','border-rounded','border-top-warning','border-end-success','border-bottom-danger','border-start-primary','h-120px','w-120px','animate-spin-linear-infinite-1s']
    },
    neoNotFound:{
        main: ['vh-100','vw-100','d-flex','flex-column','justify-content-center','align-items-center'],
    },
    neoLogIn:{
        main: ['vh-100','vw-100','d-flex','flex-column','justify-content-center','align-items-center','top-0','start-0','position-relative'],
        contents:['position-absolute','bg-dark-0','top-50','start-50','translate-middle','border','p-5','bg-info','rounded','shadow-lg'],
        logo: ['h-100px','d-block'],
        username: ['d-block','border-radius-15px','box-shadow-3d','text-center','w-200px','mt-4','m-auto','box-size-border-box','outline-none','border-0','p-2','pt-3'],
        password: ['d-block','border-radius-15px','box-shadow-3d','text-center','w-200px','mt-4','m-auto','box-size-border-box','outline-none','border-0','p-2','pt-3'],
        button: ['d-block','mt-4','m-auto','btn','box-size-border-box','outline-none','p-2','pt-3','w-200px']
    },
    neoNotify:{
        main: ['position-absolute','end-30px','top-30px','cursor-pointer'],
        notification:['text-white','p-3','border-radius-5px']
    },
    neoHeader:{
        main: ['d-flex','justify-content-between','h-50px','p-2','bg-info'],
        button: ['btn'],
        logo: ['my-n2']
    },
    neoFilter:{
        main: ['p-1','border','border-radius-10px','w-max-content','position-relative'],
        cross: ['position-absolute','border-0','top-0','p-0','end-0','h-25px','w-25px','border-rounded','bg-danger','text-white','cursor-pointer'],
        title: ['pe-5'],
        select: ['form-select'],
    },
    neoTable:{
        main: ['d-table','w-100'],
        noData: ['text-center','p-5','bg-info-2'],
        backDrop: ['position-fixed','top-0','left-0','vw-100','vh-100','zindex-modal-backdrop','bg-transparent'],
        contextMenu:['position-absolute','zindex-offcanvas','bg-white','min-width-200px','border-radius-10px','p-1','border','shadow'],
        contextMenuDefaultsItemHolder:['d-flex'],
        contextMenuItem:['cursor-pointer','bg-hover-dark','p-2','border'],
        contextMenuDefaultItem:['cursor-pointer','bg-hover-dark','p-2','w-100','text-center','border'],
        thead: ['sticky-top','shadow','d-table-row','bg-info-3'],
        th: ['text-capitalize','d-table-cell','p-3','ps-2','border','border-start-0','border-bottom-0','border-info'],
        tr: ['d-table-row','bg-info-2','border','border-top-0','border-info','border-bottom-0','border-end-0','bg-hover-dark','cursor-pointer'],
        td: ['d-table-cell','p-2','pt-3','pb-3','border','border-start-0','border-top-0','border-info','text-truncate','text-nowrap','text-break-all','max-width-150px']
    },
    neoActionConfirmer:{
        main: ['position-fixed','vh-100','vw-100','top-0','left-0','zindex-modal-backdrop'],
        contentHolder: ['position-absolute','zindex-modal','top-50','start-50','translate-middle','border','p-5','border-radius-10px','shadow-lg','bg-white'],
        cancel: ['btn','btn-danger','border-radius-15px'],
        confirm: ['btn','btn-success','border-radius-15px'],
        title: ['text-center','p-2','font-weight-bold'],
        messageHolder: ['text-center','py-5'],
        actionHolder: ['d-flex','justify-content-between','align-items-center']
    },
    debitInvoice:{
        filterHolder:['shadow','d-flex','justify-content-evenly','p-2']
    },
    creditInvoice:{
        filterHolder:['shadow','d-flex','justify-content-evenly','p-2']
    },
    neoDebitInvoiceBuilder:{
        main: ['d-flex','justify-content-center'],
        contentHolder:['h-500px','border','p-2','my-3'],
    }

};
export default style;