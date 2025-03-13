module.exports = function(app) {
    app.get('/add_venda',function(req, res){
        app.app.controllers.vendas.form_add_venda(app,req,res);
    });

    app.post('/venda/salvar',function(req,res){
        app.app.controllers.vendas.venda_salvar(app,req,res);
    });

    app.get('/venda/excluir/:id', function (req, res) {
        app.app.controllers.vendas.venda_excluir(app, req, res);
    });

    app.get('/editar_venda/:id', function (req, res) {
        app.app.controllers.vendas.form_edit_venda(app, req, res);
    });

    app.post('/venda/update/:id', function (req, res) {
        app.app.controllers.vendas.venda_update(app, req, res);
    });
}