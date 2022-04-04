const app ={
    id: 'neoApp',
    node: document.createElement('div'),
    url: window.location.host,
    setup: ()=>{
        app.node.id = app.id;
        document.body.appendChild(app.node);
    }
};
export default app;