module.exports.venda = function(app,req,res){
        const connection = app.config.db_connection();
        const vendaModel = new app.app.models.safrasDAO(connection);
        const id_venda = req.query;
        vendaModel.getVenda(id_venda, function(error, result){
            res.render('vendas/venda', {venda: result ,flagAdmin : req.session.autorizado});
        });
}

module.exports.todas_vendas = function(app,req,res){
    const connection = app.config.db_connection();
    const vendasModel = new app.app.models.safrasDAO(connection);
    vendasModel.getTodasVendas(function(error, result){
        res.render('vendas/todas_vendas', {vendas: result, flagAdmin : req.session.autorizado});
    });
}

module.exports.despesa = function(app,req,res){
    const connection = app.config.db_connection();
    const despesaModel = new app.app.models.safrasDAO(connection);
    const id_despesa = req.query;
    despesaModel.getDespesa(id_despesa, function(error, result){
        res.render('despesas/despesa', {despesa: result ,flagAdmin : req.session.autorizado});
    });
}

module.exports.todas_despesas = function(app,req,res){
    const connection = app.config.db_connection();
    const despesaModel = new app.app.models.safrasDAO(connection);
    despesaModel.getTodasDespesas(function(error, result){
        res.render('despesas/todas_despesas', {despesas: result, flagAdmin : req.session.autorizado});
    });
}

