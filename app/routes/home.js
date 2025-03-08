module.exports = (app) => {
    app.get('/', function(req, res){
        app.app.controllers.home.index(app,req,res);
    });
}