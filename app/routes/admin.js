module.exports = function(app){
    app.get('/add_venda',function(req, res){
        app.app.controllers.admin.form_add_venda(app,req,res);
    });
    app.post('/venda/salvar',function(req,res){
        app.app.controllers.admin.venda_salvar(app,req,res);
    });
    app.get('/add_despesa',function(req, res){
        app.app.controllers.admin.form_add_despesa(app,req,res);
    });
    app.post('/despesa/salvar',function(req,res){
        app.app.controllers.admin.despesa_salvar(app,req,res);
    });
    app.get('/add_safra',function(req, res){
        app.app.controllers.admin.form_add_safra(app,req,res);
    });
    app.post('/safra/salvar',function(req,res){
        app.app.controllers.admin.safra_salvar(app,req,res);
    });
    app.post('/autenticar',function(req, res){
        app.app.controllers.admin.login_autenticar(app,req,res);
    });
    app.get('/login',function(req,res){
        app.app.controllers.admin.form_login(app,req,res);
    });
    app.get('/sair',function(req,res){
        app.app.controllers.admin.sair(app,req,res);
    });
    app.get('/venda/excluir/:id', function (req, res) {
        app.app.controllers.admin.venda_excluir(app, req, res);
    });
    app.get('/despesa/excluir/:id', function (req, res) {
        app.app.controllers.admin.despesa_excluir(app, req, res);
    });
    app.get('/editar_venda/:id', function (req, res) {
        app.app.controllers.admin.form_edit_venda(app, req, res);
    });
    app.post('/venda/update/:id', function (req, res) {
        app.app.controllers.admin.venda_update(app, req, res);
    });
    app.get('/editar_despesa/:id', function (req, res) {
        app.app.controllers.admin.form_edit_despesa(app, req, res);
    });
    app.post('/despesa/update/:id', function (req, res) {
        app.app.controllers.admin.despesa_update(app, req, res);
    });

}
