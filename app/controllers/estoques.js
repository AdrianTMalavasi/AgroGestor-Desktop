module.exports.form_add_estoque = function (app, req, res) {
    if (req.session.autorizado) {
        res.render('admin/form_add_estoque', { validacao: {}, estoque: {}, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
    } else {
        const erro = [];
        erro.push({ msg: 'Usuário precisa fazer login!' });
        res.render("admin/form_login", { validacao: erro, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
    }
}

module.exports.estoque_salvar = function (app, req, res) {
    const estoque = req.body;

    req.assert('nomeLugar', 'Nome do Lugar Obrigatorio').notEmpty();
    req.assert('quantidadeMax', 'Quantidade de armazenamento').notEmpty();

    const erros = req.validationErrors();

    if (erros) {
        res.render('admin/form_add_estoque', { validacao: erros, estoque: estoque, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
        return;
    }

    estoque.idUsua = req.session.idUsuario;
    const connection = app.config.db_connection();
    const salvarEstoqueModel = new app.app.models.estoquesDAO(connection);
    salvarEstoqueModel.salvarEstoque(estoque, function (error, result) {
        if (error) {
            res.render('admin/form_add_estoque', { validacao: [{ msg: 'Erro ao salvar. Tente novamente!' }], estoque: estoque, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
            return;
        }
        res.redirect('/');
    });
}

module.exports.estoque_excluir = function (app, req, res) {
    const idEsto = req.params.id;

    const connectionEstoque = app.config.db_connection();
    const estoqueModel = new app.app.models.estoquesDAO(connectionEstoque);

    const connectionSafra = app.config.db_connection();
    const safraModel = new app.app.models.safrasDAO(connectionSafra);

    safraModel.getSafra(req.session.idUsuario, function (error, safras) {
        estoqueModel.getEstoques(req.session.idUsuario, function(error, estoques) {
            if (safras.length > 0) {
                res.render('estoque/todos_estoques', { validacao: [{ msg: 'Erro ao excluir! Há uma ou mais safras cadastradas neste estoque.' }], estoques: estoques, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });

            } else {
                estoqueModel.excluirEstoque(idEsto, function (error, result) {
                    if (error) {
                        console.error("Erro ao excluir :", error);
                        return res.status(500).send("Erro ao excluir o estoque.");
                    }
            
                    res.redirect('/todos_estoques');
                });
            }
        });
    });
};