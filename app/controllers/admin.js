module.exports.form_add_venda = function (app, req, res) {
    if (req.session.autorizado) {
        res.render('admin/form_add_venda', { validacao: {}, venda: {}, flagAdmin: req.session.autorizado });
    } else {
        const erro = [];
        erro.push({ msg: 'Usuário precisa fazer login!' });
        res.render("admin/form_login", { validacao: erro, flagAdmin: req.session.autorizado });
    }

}
module.exports.form_add_despesa = function (app, req, res) {
    if (req.session.autorizado) {
        res.render('admin/form_add_despesa', { validacao: {}, despesa: {}, flagAdmin: req.session.autorizado });
    } else {
        const erro = [];
        erro.push({ msg: 'Usuário precisa fazer login!' });
        res.render("admin/form_login", { validacao: erro, flagAdmin: req.session.autorizado });
    }

}

module.exports.form_add_safra = function (app, req, res) {
    if (req.session.autorizado) {
            const connection = app.config.db_connection();
            const usuariosModel = new app.app.models.safrasDAO(connection);
            const estoquesModel = new app.app.models.safrasDAO(connection);
    
            // Buscar usuários e estoques antes de renderizar novamente
            usuariosModel.getUsuarios(function (error, usuarios) {
                estoquesModel.getEstoques(function (error, estoques) {

                    res.render('admin/form_add_safra', {
                        validacao: {},
                        safra: {},
                        usuarios: usuarios,
                        estoques: estoques,
                        flagAdmin: req.session.autorizado
                    });
                });
            });

    } else {
        const erro = [];
        erro.push({ msg: 'Usuário precisa fazer login!' });
        res.render("admin/form_login", { validacao: erro, flagAdmin: req.session.autorizado });
    }

}

module.exports.despesa_salvar = function (app, req, res) {
    const despesa = req.body;

    req.assert('nomeEmpresa', 'Nome da Empresa é obrigatório').notEmpty();
    req.assert('descricao', 'Descrição é obrigatória').notEmpty();
    req.assert('diasPagar', 'Tempo para Pagar é obrigatório').notEmpty();
    req.assert('dataCompra', 'Data da Compra é obrigatória').notEmpty().isDate({ format: 'YYYY-MM-DD' }).withMessage('Formato inválido. Use DD-MM-YYYY');
    req.assert('mtdPagamento', 'Método de Pagamento é obrigatório').notEmpty();
    req.assert('valorTotal', 'Valor é obrigatória').notEmpty()

    const erros = req.validationErrors();

    if (erros) {
        res.render('admin/form_add_despesa', { validacao: erros, despesa: despesa, flagAdmin: req.session.autorizado });
        return;
    }
    const connection = app.config.db_connection();
    const salvarDespesaModel = new app.app.models.safrasDAO(connection);

    salvarDespesaModel.salvarDespesa(despesa, function (error, result) {
        if (error) {
            res.render('admin/form_add_despesa', { validacao: [{ msg: 'Erro ao salvar. Tente novamente!' }], despesa: despesa, flagAdmin: req.session.autorizado });
            return;
        }
        res.redirect('/todas_despesas');
    });
}

module.exports.venda_salvar = function (app, req, res) {
    const venda = req.body;

    req.assert('nomeEmpresa', 'O nome da empresa é obrigatório').notEmpty();
    req.assert('qtdSacas', 'A quantidade de sacas é obrigatória').notEmpty();
    req.assert('valorSaca', 'O valor da saca é obrigatório').notEmpty();
    req.assert('dataVenda', 'A data da venda é obrigatória').notEmpty().isDate({ format: 'YYYY-MM-DD' }).withMessage('Formato inválido. Use YYYY-MM-DD');
    req.assert('mtdPagamento', 'O método de pagamento é obrigatório').notEmpty();

    const erros = req.validationErrors();

    if (erros) {
        res.render('admin/form_add_venda', { validacao: erros, venda: venda, flagAdmin: req.session.autorizado });
        return;
    }
    const connection = app.config.db_connection();
    const salvarVendaModel = new app.app.models.safrasDAO(connection);

    salvarVendaModel.salvarVenda(venda, function (error, result) {
        if (error) {
            res.render('admin/form_add_venda', { validacao: [{ msg: 'Erro ao salvar. Tente novamente!' }], venda: venda, flagAdmin: req.session.autorizado });
            return;
        }
        res.redirect('/todas_vendas');
    });
}

module.exports.form_login = function (app, req, res) {
    res.render('admin/form_login', { validacao: {}, flagAdmin: req.session.autorizado });
}

module.exports.login_autenticar = function (app, req, res) {
    const camposDeUsuario = req.body;
    req.assert('login', 'Usuário é obrigatório').notEmpty();
    req.assert('senha', 'Senha é obrigatório').notEmpty();
    const erros = req.validationErrors();
    if (erros) {
        res.render('admin/form_login', { validacao: erros, flagAdmin: req.session.autorizado });
        return;
    }
    const connection = app.config.db_connection();
    const autenticacao = new app.app.models.safrasDAO(connection);
    autenticacao.getLogin(camposDeUsuario, function (error, result) {
        if (result.length == 0) {
            let erro = [];
            erro.push({ msg: 'Usuário ou senha incorretos!' });
            res.render('admin/form_login', { validacao: erro, flagAdmin: req.session.autorizado });
            return;
        }
        req.session.autorizado = true;
        res.redirect('/')
    });
}
module.exports.safra_salvar = function (app, req, res) {
    const safra = req.body;

    req.assert('hectares', 'Hectares são obrigatórios').notEmpty();
    req.assert('ano', 'ano é obrigatório').notEmpty();
    req.assert('idUsua', 'Usuário obrigatório').notEmpty();
    req.assert('idEsto', 'Estoque é obrigatório').notEmpty()

    const erros = req.validationErrors();

    if (erros) {
        res.render('admin/form_add_safra', { validacao: erros, flagAdmin: req.session.autorizado });
        return;
    }
    const connection = app.config.db_connection();
    const salvarSafraModel = new app.app.models.safrasDAO(connection);

    salvarSafraModel.salvarSafra(safra, function (error, result) {
        if (error) {
            res.render('admin/form_add_safra', { validacao: [{ msg: 'Erro ao salvar. Tente novamente!' }], safra: safra, flagAdmin: req.session.autorizado });
            return;
        }
        res.redirect('/');
    });
}
module.exports.sair = function (app, req, res) {
    req.session.destroy(function (error) {
        res.redirect('/');
    });
}
module.exports.venda_excluir = function (app, req, res) {
    const idVend= req.params.id;  // Obtém o ID da URL

    const connection = app.config.db_connection();
    const vendaModel = new app.app.models.safrasDAO(connection);

    vendaModel.excluirVenda(idVend, function (error, result) {
        if (error) {
            console.error("Erro ao excluir :", error);
            return res.status(500).send("Erro ao excluir a venda.");
        }

        res.redirect('/todas_vendas'); // Redireciona após exclusão
    });
};
module.exports.form_edit_venda = function (app, req, res) {
    const idVend= req.params.id;

    const connection = app.config.db_connection();
    const editModel = new app.app.models.safrasDAO(connection);

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
            flagAdmin: req.session.autorizado 
        });
})
}
module.exports.venda_update = function (app, req, res) {
    const idVend= req.params.id;  // Obtém o ID da URL
    const venda = req.body;
    req.assert('nomeEmpresa', 'O nome da empresa é obrigatório').notEmpty();
    req.assert('qtdSacas', 'A quantidade de sacas é obrigatória').notEmpty();
    req.assert('valorSaca', 'O valor da saca é obrigatório').notEmpty();
    req.assert('dataVenda', 'A data da venda é obrigatória').notEmpty().isDate({ format: 'YYYY-MM-DD' }).withMessage('Formato inválido. Use YYYY-MM-DD');
    req.assert('mtdPagamento', 'O método de pagamento é obrigatório').notEmpty();

    const erros = req.validationErrors();

    if (erros) {
        res.render('admin/form_edit_venda', {  validacao: erros, venda: [venda], flagAdmin: req.session.autorizado  });
        return;
    }
    const connection = app.config.db_connection();
    const vendaModel = new app.app.models.safrasDAO(connection);

    vendaModel.editarVenda(idVend,venda, function (error, result) {
        if (error) {
            console.error("Erro ao excluir :", error);
            return res.status(500).send("Erro ao excluir a venda.");
        }

        res.redirect('/todas_vendas'); // Redireciona após exclusão
    });
};
module.exports.form_edit_despesa = function (app, req, res) {
    const idDesp= req.params.id;

    const connection = app.config.db_connection();
    const editModel = new app.app.models.safrasDAO(connection);

    editModel.getDespesa(idDesp, function (error, despesa) {
        if (!error && despesa && despesa.length > 0 && despesa[0].dataCompra) {
            try {
                despesa[0].dataCompra = new Date(despesa[0].dataCompra).toISOString().split('T')[0];
            } catch (e) {
                console.error("Erro ao converter data:", e);
                despesa[0].dataCompra = ''; // Deixa em branco caso haja erro
            }
        }
        
        res.render('admin/form_edit_despesa', { 
            validacao: {}, 
            despesa: despesa, 
            flagAdmin: req.session.autorizado 
        });
})
}
module.exports.despesa_update = function (app, req, res) {
    const idDesp= req.params.id;  // Obtém o ID da URL
    const despesa = req.body;

    req.assert('nomeEmpresa', 'Nome da Empresa é obrigatório').notEmpty();
    req.assert('descricao', 'Descrição é obrigatória').notEmpty();
    req.assert('diasPagar', 'Tempo para Pagar é obrigatório').notEmpty();
    req.assert('dataCompra', 'Data da Compra é obrigatória').notEmpty().isDate({ format: 'YYYY-MM-DD' }).withMessage('Formato inválido. Use DD-MM-YYYY');
    req.assert('mtdPagamento', 'Método de Pagamento é obrigatório').notEmpty();
    req.assert('valorTotal', 'Valor é obrigatória').notEmpty()

    const erros = req.validationErrors();

    if (erros) {
        res.render('admin/form_edit_despesa', {  validacao: erros, despesa: [despesa], flagAdmin: req.session.autorizado  });
        return;
    }
    const connection = app.config.db_connection();
    const despesaModel = new app.app.models.safrasDAO(connection);

    despesaModel.editarDespesa(idDesp,despesa, function (error, result) {
        if (error) {
            console.error("Erro ao excluir :", error);
            return res.status(500).send("Erro ao excluir a despesa.");
        }

        res.redirect('/todas_despesas'); // Redireciona após exclusão
    });
};
module.exports.despesa_excluir = function (app, req, res) {
    const idDesp= req.params.id;  // Obtém o ID da URL

    const connection = app.config.db_connection();
    const despesaModel = new app.app.models.safrasDAO(connection);

    despesaModel.excluirDespesa(idDesp, function (error, result) {
        if (error) {
            console.error("Erro ao excluir :", error);
            return res.status(500).send("Erro ao excluir a Despesa.");
        }

        res.redirect('/todas_despesas'); // Redireciona após exclusão
    });
};