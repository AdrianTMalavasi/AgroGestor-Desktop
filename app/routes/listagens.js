module.exports = function(app) {
    app.get('/todas_vendas', function(req, res) {
        app.app.controllers.listagens.todas_vendas(app,req,res);
    });

    app.get('/todas_despesas', function(req, res) {
        app.app.controllers.listagens.todas_despesas(app,req,res);
    });

    app.get('/todas_producoes', function(req, res) {
        app.app.controllers.listagens.todas_producoes(app,req,res);
    });
    
    app.get('/todos_estoques', function(req, res) {
        app.app.controllers.listagens.todos_estoques(app,req,res);
    });
}