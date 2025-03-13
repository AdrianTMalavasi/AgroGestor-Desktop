module.exports.form_add_producao = function (app, req, res) {
    if (req.session.autorizado) {
        res.render('admin/form_add_producao', { validacao: {}, producao: {}, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
    } else {
        const erro = [];
        erro.push({ msg: 'Usuário precisa fazer login!' });
        res.render("admin/form_login", { validacao: erro, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
    }
}

module.exports.producao_salvar = function (app, req, res) {
    const producao = req.body;
    producao.idSafr = req.session.idSafra;

    req.assert('qtdSacas', 'Quantidade de Sacas e obrigatória').notEmpty();
    req.assert('dataProducao', 'Data da Produção é obrigatória').notEmpty().isDate({ format: 'YYYY-MM-DD' }).withMessage('Formato inválido. Use DD-MM-YYYY');

    const erros = req.validationErrors();

    if (erros) {
        res.render('admin/form_add_producao', { validacao: erros, producao: producao, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
        return;
    }
    const connection = app.config.db_connection();
    const salvarProducaoModel = new app.app.models.producoesDAO(connection);

    salvarProducaoModel.salvarProducao(producao, function (error, result) {
        if (error) {
            res.render('admin/form_add_producao', { validacao: [{ msg: 'Erro ao salvar. Tente novamente!' }], producao: producao, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario ,});
            return;
        }
        res.redirect('/todas_producoes');
    });
}

module.exports.form_edit_producao = function (app, req, res) {
    const idProd = req.params.id;

    const connection = app.config.db_connection();
    const editModel = new app.app.models.producoesDAO(connection);

    editModel.getProducao(idProd, function (error, producao) {
        if (!error && producao && producao.length > 0 && producao[0].dataProducao) {
            try {
                producao[0].dataProducao = new Date(producao[0].dataProducao).toISOString().split('T')[0];
            } catch (e) {
                console.error("Erro ao converter data:", e);
                producao[0].dataProducao = ''; // Deixa em branco caso haja erro
            }
        }
        
        res.render('admin/form_edit_producao', { 
            validacao: {}, 
            producao: producao, 
            flagAdmin: req.session.autorizado, 
            idUsuario: req.session.idUsuario
        });
    });
}

module.exports.producao_update = function (app, req, res) {
    const idProd= req.params.id;  // Obtém o ID da URL
    const producao = req.body;

    req.assert('qtdSacas', 'Quantidade de Sacas e obrigatória').notEmpty();
    req.assert('dataProducao', 'Data da Produção é obrigatória').notEmpty().isDate({ format: 'YYYY-MM-DD' }).withMessage('Formato inválido. Use DD-MM-YYYY');

    const erros = req.validationErrors();

    if (erros) {
        res.render('admin/form_edit_producao', {  validacao: erros, producao: [producao], flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario  });
        return;
    }
    const connection = app.config.db_connection();
    const producaoModel = new app.app.models.producoesDAO(connection);

    producaoModel.editarProducao(idProd, producao, function (error, result) {
        if (error) {
            console.error("Erro ao editar :", error);
            return res.status(500).send("Erro ao editar a produção.");
        }

        res.redirect('/todas_producoes');
    });
};

module.exports.producao_excluir = function (app, req, res) {
    const idProd= req.params.id;  // Obtém o ID da URL

    const connection = app.config.db_connection();
    const producaoModel = new app.app.models.producoesDAO(connection);

    producaoModel.excluirProducao(idProd, function (error, result) {
        if (error) {
            console.error("Erro ao excluir :", error);
            return res.status(500).send("Erro ao excluir a produção.");
        }

        res.redirect('/todas_producoes'); // Redireciona após exclusão
    });
};