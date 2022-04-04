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
        main: ['table','table-striped','table-hover','table-info','p-2','table-bordered','table-responsive-sm','table-responsive-md','table-responsive-lg','table-responsive-xl','table-responsive-xxl'],
        noData: ['text-center','p-5'],
        thead: ['sticky-top','shadow'],
        th: ['text-capitalize']
    },
    debitInvoice:{
        filterHolder:['shadow','d-flex','justify-content-evenly','p-2']
    },
    creditInvoice:{
        filterHolder:['shadow','d-flex','justify-content-evenly','p-2']
    },

};
export default style;