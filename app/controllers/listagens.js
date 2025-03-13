module.exports.todas_vendas = function(app,req,res){
    if (req.session.autorizado) {
        if (Object.keys(req.query).length == 0 && !req.session.idSafra) {
            const connection = app.config.db_connection();
            const vendasModel = new app.app.models.vendasDAO(connection);
            vendasModel.getTodasVendas(req.session.idUsuario, function(error, result){
                res.render('vendas/todas_vendas', {vendas: result, flagAdmin :req.session.autorizado, idUsuario: req.session.idUsuario, idSafra: false});
            });
        } else {
            const id_safra = req.query;
            if (!req.session.idSafra) {
                req.session.idSafra = id_safra.id_safra;
            }
            const connection = app.config.db_connection();
            const vendasModel = new app.app.models.vendasDAO(connection);
            vendasModel.getVendasSafra(req.session.idSafra, function(error, result){
                res.render('vendas/todas_vendas', {vendas: result, flagAdmin : req.session.autorizado, idUsuario: req.session.idUsuario, idSafra: req.session.idSafra});
            });
        }
    } else {
        const erro = [];
        erro.push({ msg: 'Usuário precisa fazer login!' });
        res.render("admin/form_login", { validacao: erro, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
    }
}

module.exports.todas_despesas = function(app,req,res){
    if (req.session.autorizado) {
        if (Object.keys(req.query).length == 0 && !req.session.idSafra) {
            const connection = app.config.db_connection();
            const despesaModel = new app.app.models.despesasDAO(connection);
            despesaModel.getTodasDespesas(req.session.idUsuario, function(error, result){
                res.render('despesas/todas_despesas', {despesas: result, flagAdmin : req.session.autorizado, idUsuario: req.session.idUsuario, idSafra: false});
            });
        } else {
            const id_safra = req.query;
            if (!req.session.idSafra) {
                req.session.idSafra = id_safra.id_safra;
            }
            const connection = app.config.db_connection();
            const despesaModel = new app.app.models.despesasDAO(connection);
            despesaModel.getDespesasSafra(req.session.idSafra, function(error, result){
                res.render('despesas/todas_despesas', {despesas: result, flagAdmin : req.session.autorizado, idUsuario: req.session.idUsuario, idSafra: req.session.idSafra});
            });
        }
    } else {
        const erro = [];
        erro.push({ msg: 'Usuário precisa fazer login!' });
        res.render("admin/form_login", { validacao: erro, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
    }
}

module.exports.todas_producoes = function(app,req,res){
    if (req.session.autorizado) {
        if (Object.keys(req.query).length == 0 && !req.session.idSafra) {
            const connection = app.config.db_connection();
            const producaoModel = new app.app.models.producoesDAO(connection);
            producaoModel.getTodasProducoes(req.session.idUsuario, function(error, result){
                res.render('producoes/todas_producoes', {producoes: result, flagAdmin : req.session.autorizado, idUsuario: req.session.idUsuario, idSafra: false});
            });
        } else {
            const id_safra = req.query;
            if (!req.session.idSafra) {
                req.session.idSafra = id_safra.id_safra;
            }
            const connection = app.config.db_connection();
            const producaoModel = new app.app.models.producoesDAO(connection);
            producaoModel.getProducoesSafra(req.session.idSafra, function(error, result){
                res.render('producoes/todas_producoes', {producoes: result, flagAdmin : req.session.autorizado, idUsuario: req.session.idUsuario, idSafra: req.session.idSafra});
            });
        }
    } else {
        const erro = [];
        erro.push({ msg: 'Usuário precisa fazer login!' });
        res.render("admin/form_login", { validacao: erro, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
    }
}

module.exports.todos_estoques = function(app,req,res){
    if (req.session.autorizado) {
        const connection = app.config.db_connection();
        const estoquesModel = new app.app.models.estoquesDAO(connection);
        estoquesModel.getEstoques(req.session.idUsuario, function(error, result){
            res.render('estoque/todos_estoques', {validacao: {}, estoques: result, flagAdmin : req.session.autorizado, idUsuario: req.session.idUsuario});
        });
    } else {
        const erro = [];
        erro.push({ msg: 'Usuário precisa fazer login!' });
        res.render("admin/form_login", { validacao: erro, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
    }
}