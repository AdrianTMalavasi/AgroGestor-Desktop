module.exports.index = function (app, req, res) {
        if (req.session.autorizado) {
            const connection = app.config.db_connection();
            const safrasModel = new app.app.models.safrasDAO(connection);
            
            safrasModel.getSafra(function (error, result) {
                if (error) {
                    console.log(error);
                    res.render('home/index', { safras: [], flagAdmin: req.session.autorizado });
                } else {
                    res.render('home/index', { safras: result, flagAdmin: req.session.autorizado });
                }
            });
        } else {
            const erro = [];
            erro.push({ msg: 'Usuário precisa fazer login!' });
            res.render("admin/form_login", { validacao: erro, flagAdmin: req.session.autorizado });
        }
    };
    