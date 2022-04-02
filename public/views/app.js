const app ={
    id: 'neoApp',
    node: document.createElement('div'),
    setup: ()=>{
        app.node.id = app.id;
        document.body.appendChild(app.node);
    }
};
export default app;