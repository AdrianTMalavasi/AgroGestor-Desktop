module.exports = function(app) {
    app.get('/add_despesa',function(req, res){
        app.app.controllers.despesas.form_add_despesa(app,req,res);
    });

    app.post('/despesa/salvar',function(req,res){
        app.app.controllers.despesas.despesa_salvar(app,req,res);
    });

    app.get('/despesa/excluir/:id', function (req, res) {
        app.app.controllers.despesas.despesa_excluir(app, req, res);
    });

    app.get('/editar_despesa/:id', function (req, res) {
        app.app.controllers.despesas.form_edit_despesa(app, req, res);
    });

    app.post('/despesa/update/:id', function (req, res) {
        app.app.controllers.despesas.despesa_update(app, req, res);
    });
}