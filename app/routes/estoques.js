module.exports = function(app) {
    // app.get('/estoque', function (req, res) {
    //     app.app.controllers.estoque.estoque(app, req, res);
    // });

    app.get('/add_estoque',function(req, res){
        app.app.controllers.estoques.form_add_estoque(app,req,res);
    });

    app.post('/estoque/salvar', function (req, res) {
        app.app.controllers.estoques.estoque_salvar(app, req, res);
    });

    app.get('/estoque/excluir/:id',function(req, res){
        app.app.controllers.estoques.estoque_excluir(app,req,res);
    });
}