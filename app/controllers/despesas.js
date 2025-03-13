module.exports.form_add_despesa = function (app, req, res) {
    if (req.session.autorizado) {
        res.render('admin/form_add_despesa', { validacao: {}, despesa: {}, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
    } else {
        const erro = [];
        erro.push({ msg: 'Usuário precisa fazer login!' });
        res.render("admin/form_login", { validacao: erro, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
    }
}

module.exports.despesa_salvar = function (app, req, res) {
    const despesa = req.body;
    despesa.nomeEmpresa = despesa.nomeEmpresa.toUpperCase();
    despesa.idSafr = req.session.idSafra;

    req.assert('nomeEmpresa', 'Nome da Empresa é obrigatório').notEmpty();
    req.assert('descricao', 'Descrição é obrigatória').notEmpty();
    req.assert('valorTotal', 'Valor é obrigatória').notEmpty();
    req.assert('diasPagar', 'Tempo para Pagar é obrigatório').notEmpty();
    req.assert('dataCompra', 'Data da Compra é obrigatória').notEmpty().isDate({ format: 'YYYY-MM-DD' }).withMessage('Formato inválido. Use DD-MM-YYYY');
    req.assert('mtdPagamento', 'Método de Pagamento é obrigatório').notEmpty();

    const erros = req.validationErrors();

    if (erros) {
        res.render('admin/form_add_despesa', { validacao: erros, despesa: despesa, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
        return;
    }
    const connection = app.config.db_connection();
    const salvarDespesaModel = new app.app.models.despesasDAO(connection);

    salvarDespesaModel.salvarDespesa(despesa, function (error, result) {
        if (error) {
            res.render('admin/form_add_despesa', { validacao: [{ msg: 'Erro ao salvar. Tente novamente!' }], despesa: despesa, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
            return;
        }
        res.redirect('/todas_despesas');
    });
}

module.exports.form_edit_despesa = function (app, req, res) {
    const idDesp = req.params.id;

    const connection = app.config.db_connection();
    const editModel = new app.app.models.despesasDAO(connection);

    editModel.getDespesa(idDesp, function (error, despesa) {
        if (!error && despesa && despesa.length > 0 && despesa[0].dataCompra) {
            try {
                despesa[0].dataCompra = new Date(despesa[0].dataCompra).toISOString().split('T')[0];
            } catch (e) {
                console.error("Erro ao converter data:", e);
                despesa[0].dataCompra = '';
            }
        }
        
        res.render('admin/form_edit_despesa', { 
            validacao: {}, 
            despesa: despesa, 
            flagAdmin: req.session.autorizado, 
            idUsuario: req.session.idUsuario
        });
    });
}

module.exports.despesa_update = function (app, req, res) {
    const idDesp= req.params.id;
    const despesa = req.body;
    despesa.nomeEmpresa = despesa.nomeEmpresa.toUpperCase();

    req.assert('nomeEmpresa', 'Nome da Empresa é obrigatório').notEmpty();
    req.assert('descricao', 'Descrição é obrigatória').notEmpty();
    req.assert('diasPagar', 'Tempo para Pagar é obrigatório').notEmpty();
    req.assert('dataCompra', 'Data da Compra é obrigatória').notEmpty().isDate({ format: 'YYYY-MM-DD' }).withMessage('Formato inválido. Use DD-MM-YYYY');
    req.assert('mtdPagamento', 'Método de Pagamento é obrigatório').notEmpty();
    req.assert('valorTotal', 'Valor é obrigatória').notEmpty()

    const erros = req.validationErrors();

    if (erros) {
        res.render('admin/form_edit_despesa', {  validacao: erros, despesa: [despesa], flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario  });
        return;
    }
    const connection = app.config.db_connection();
    const despesaModel = new app.app.models.despesasDAO(connection);

    despesaModel.editarDespesa(idDesp,despesa, function (error, result) {
        if (error) {
            console.error("Erro ao editar :", error);
            return res.status(500).send("Erro ao editar a despesa.");
        }

        res.redirect('/todas_despesas');
    });
};

module.exports.despesa_excluir = function (app, req, res) {
    const idDesp= req.params.id;

    const connection = app.config.db_connection();
    const despesaModel = new app.app.models.despesasDAO(connection);

    despesaModel.excluirDespesa(idDesp, function (error, result) {
        if (error) {
            console.error("Erro ao excluir :", error);
            return res.status(500).send("Erro ao excluir a despesa.");
        }

        res.redirect('/todas_despesas');
    });
};