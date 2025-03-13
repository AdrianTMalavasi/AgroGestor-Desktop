module.exports.form_add_venda = function (app, req, res) {
    if (req.session.autorizado) {
        res.render('admin/form_add_venda', { validacao: {}, venda: {}, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
    } else {
        const erro = [];
        erro.push({ msg: 'Usuário precisa fazer login!' });
        res.render("admin/form_login", { validacao: erro, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
    }
}

module.exports.venda_salvar = function (app, req, res) {
    const venda = req.body;
    venda.nomeEmpresa = venda.nomeEmpresa.toUpperCase();
    venda.idSafr = req.session.idSafra;

    req.assert('nomeEmpresa', 'O nome da empresa é obrigatório').notEmpty();
    req.assert('qtdSacas', 'A quantidade de sacas é obrigatória').notEmpty();
    req.assert('valorSaca', 'O valor da saca é obrigatório').notEmpty();
    req.assert('dataVenda', 'A data da venda é obrigatória').notEmpty().isDate({ format: 'YYYY-MM-DD' }).withMessage('Formato inválido. Use YYYY-MM-DD');
    req.assert('mtdPagamento', 'O método de pagamento é obrigatório').notEmpty();

    const erros = req.validationErrors();

    if (erros) {
        res.render('admin/form_add_venda', { validacao: erros, venda: venda, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
        return;
    }
    const connection = app.config.db_connection();
    const salvarVendaModel = new app.app.models.vendasDAO(connection);

    salvarVendaModel.salvarVenda(venda, function (error, result) {
        if (error) {
            res.render('admin/form_add_venda', { validacao: [{ msg: 'Erro ao salvar. Tente novamente!' }], venda: venda, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
            return;
        }
        res.redirect('/todas_vendas');
    });
}

module.exports.form_edit_venda = function (app, req, res) {
    const idVend= req.params.id;

    const connection = app.config.db_connection();
    const editModel = new app.app.models.vendasDAO(connection);

    editModel.getVenda(idVend, function (error, venda) {
        if (!error && venda && venda.length > 0 && venda[0].dataVenda) {
            try {
                venda[0].dataVenda = new Date(venda[0].dataVenda).toISOString().split('T')[0];
            } catch (e) {
                console.error("Erro ao converter data:", e);
                venda[0].dataVenda = ''; // Deixa em branco caso haja erro
            }
        }
        
        res.render('admin/form_edit_venda', { 
            validacao: {}, 
            venda: venda, 
            flagAdmin: req.session.autorizado , 
            idUsuario: req.session.idUsuario
        });
    });
}

module.exports.venda_update = function (app, req, res) {
    const idVend= req.params.id;  // Obtém o ID da URL
    const venda = req.body;
    venda.nomeEmpresa = venda.nomeEmpresa.toUpperCase();
    
    req.assert('nomeEmpresa', 'O nome da empresa é obrigatório').notEmpty();
    req.assert('qtdSacas', 'A quantidade de sacas é obrigatória').notEmpty();
    req.assert('valorSaca', 'O valor da saca é obrigatório').notEmpty();
    req.assert('dataVenda', 'A data da venda é obrigatória').notEmpty().isDate({ format: 'YYYY-MM-DD' }).withMessage('Formato inválido. Use YYYY-MM-DD');
    req.assert('mtdPagamento', 'O método de pagamento é obrigatório').notEmpty();

    const erros = req.validationErrors();

    if (erros) {
        res.render('admin/form_edit_venda', {  validacao: erros, venda: [venda], flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario  });
        return;
    }
    const connection = app.config.db_connection();
    const vendaModel = new app.app.models.vendasDAO(connection);

    vendaModel.editarVenda(idVend,venda, function (error, result) {
        if (error) {
            console.error("Erro ao editar :", error);
            return res.status(500).send("Erro ao editar a venda.");
        }

        res.redirect('/todas_vendas'); // Redireciona após exclusão
    });
};

module.exports.venda_excluir = function (app, req, res) {
    const idVend= req.params.id;  // Obtém o ID da URL

    const connection = app.config.db_connection();
    const vendaModel = new app.app.models.vendasDAO(connection);

    vendaModel.excluirVenda(idVend, function (error, result) {
        if (error) {
            console.error("Erro ao excluir :", error);
            return res.status(500).send("Erro ao excluir a venda.");
        }

        res.redirect('/todas_vendas'); // Redireciona após exclusão
    });
};