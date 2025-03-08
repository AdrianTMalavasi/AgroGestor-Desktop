module.exports = (app) => {
    app.get('/todas_vendas', function(req, res) {
        app.app.controllers.listagens.todas_vendas(app,req,res);
    });
    app.get('/todas_despesas', function(req, res) {
        app.app.controllers.listagens.todas_despesas(app,req,res);
    });
}



