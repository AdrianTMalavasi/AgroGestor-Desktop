module.exports.form_add_safra = function (app, req, res) {
    if (req.session.autorizado) {
            const connection = app.config.db_connection();
            const usuariosModel = new app.app.models.usuariosDAO(connection);
            const estoquesModel = new app.app.models.estoquesDAO(connection);
    
            // Buscar usuários e estoques antes de renderizar novamente
            usuariosModel.getUsuarios(function (error, usuarios) {
                estoquesModel.getEstoques(req.session.idUsuario, function (error, estoques) {
                    if (estoques.length > 0) {
                        res.render('admin/form_add_safra', {
                            validacao: {},
                            safra: {},
                            estoques: estoques,
                            flagAdmin: req.session.autorizado, 
                            idUsuario: req.session.idUsuario
                        });
                    } else {
                        res.render('admin/form_add_estoque', { 
                            validacao: [{ msg: 'Erro! Necessário ter um estoque para cadastrar safras.' }], 
                            estoque: {}, 
                            flagAdmin: req.session.autorizado, 
                            idUsuario: req.session.idUsuario 
                        });
                    }
                });
            });

    } else {
        const erro = [];
        erro.push({ msg: 'Usuário precisa fazer login!' });
        res.render("admin/form_login", { validacao: erro, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
    }
}

module.exports.safra_salvar = function (app, req, res) {
    const safra = req.body;

    req.assert('hectares', 'Hectares são obrigatórios').notEmpty();
    req.assert('ano', 'ano é obrigatório').notEmpty();
    req.assert('idEsto', 'Estoque é obrigatório').notEmpty()

    const erros = req.validationErrors();

    if (erros) {
        res.render('admin/form_add_safra', { validacao: erros, estoques: [], safra: {}, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
        return;
    }
    const connection = app.config.db_connection();
    const salvarSafraModel = new app.app.models.safrasDAO(connection);

    salvarSafraModel.salvarSafra(safra, function (error, result) {
        if (error) {
            res.render('admin/form_add_safra', { validacao: [{ msg: 'Erro ao salvar. Tente novamente!' }], safra: safra, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
            return;
        }
        res.redirect('/');
    });
}