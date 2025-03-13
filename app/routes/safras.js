module.exports = function(app) {
    app.get('/add_safra',function(req, res){
        app.app.controllers.safras.form_add_safra(app,req,res);
    });
    
    app.post('/safra/salvar',function(req,res){
        app.app.controllers.safras.safra_salvar(app,req,res);
    });
}