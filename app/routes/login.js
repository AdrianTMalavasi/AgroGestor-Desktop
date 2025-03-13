module.exports = function(app) {
    app.get('/login',function(req,res){
        app.app.controllers.login.form_login(app,req,res);
    });

    app.post('/autenticar',function(req, res){
        app.app.controllers.login.login_autenticar(app,req,res);
    });

    app.get('/sair',function(req,res){
        app.app.controllers.login.sair(app,req,res);
    });
    app.get('/add_usuario',function(req,res){
        app.app.controllers.login.form_add_usuario(app,req,res);
    });
    app.post('/usuario/salvar',function(req, res){
        app.app.controllers.login.usuario_salvar(app,req,res);
    });

}