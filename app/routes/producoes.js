module.exports = function(app) {
    app.get('/add_producao',function(req, res){
        app.app.controllers.producoes.form_add_producao(app,req,res);
    });

    app.post('/producao/salvar',function(req,res){
        app.app.controllers.producoes.producao_salvar(app,req,res);
    });

    app.get('/producao/excluir/:id', function (req, res) {
        app.app.controllers.producoes.producao_excluir(app, req, res);
    });

    app.get('/editar_producao/:id', function (req, res) {
        app.app.controllers.producoes.form_edit_producao(app, req, res);
    });

    app.post('/producao/update/:id', function (req, res) {
        app.app.controllers.producoes.producao_update(app, req, res);
    });
}