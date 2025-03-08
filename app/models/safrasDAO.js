function safrasDAO(connection){
    this._connection = connection;
}
safrasDAO.prototype.getVenda = function(id,callback){
    this._connection.query('SELECT * FROM vendas WHERE idVend = '+ [id], callback);
}
safrasDAO.prototype.getDespesa = function(id,callback){
    this._connection.query('SELECT * FROM despesas WHERE idDesp = '+ [id], callback);
}
safrasDAO.prototype.getTodasVendas= function(callback){
    this._connection.query('SELECT * FROM vendas ORDER BY dataVenda DESC', callback);
}
safrasDAO.prototype.getTodasDespesas= function(callback){
    this._connection.query('SELECT * FROM despesas ORDER BY dataCompra DESC', callback);
}
safrasDAO.prototype.salvarDespesa = function(despesa,callback){
    this._connection.query('INSERT INTO despesas SET ?', despesa, callback);
}
safrasDAO.prototype.salvarVenda = function(venda,callback){
    this._connection.query('INSERT INTO vendas SET ?', venda, callback);
}
safrasDAO.prototype.getLogin = function(camposDeUsuario, callback){
    this._connection.query('SELECT idUsua FROM usuarios WHERE login = "'+ camposDeUsuario.login + '" AND senha = '+ camposDeUsuario.senha , callback);
}

safrasDAO.prototype.getSafra = function(callback){
    this._connection.query('SELECT * FROM safras', callback);
}
safrasDAO.prototype.salvarSafra = function(safra,callback){
    this._connection.query('INSERT INTO safras SET ?', safra, callback);
}
safrasDAO.prototype.getUsuarios = function(callback){
    this._connection.query('SELECT * FROM usuarios',callback);
}
safrasDAO.prototype.getEstoques = function(callback){
    this._connection.query('SELECT * FROM estoques',callback);
}
safrasDAO.prototype.excluirVenda = function(id, callback){
    this._connection.query('DELETE FROM vendas WHERE idVend = '+ [id], callback);
}
safrasDAO.prototype.excluirDespesa = function(id, callback){
    this._connection.query('DELETE FROM despesas WHERE idDesp = '+ [id], callback);
}

safrasDAO.prototype.editarVenda = function(id, venda, callback) {
    const query = 'UPDATE vendas SET nomeEmpresa = ?, qtdSacas = ?, valorSaca = ?, dataVenda = ?, mtdPagamento = ? WHERE idVend = ?';

    this._connection.query(query, [
        venda.nomeEmpresa,
        venda.qtdSacas,
        venda.valorSaca,
        venda.dataVenda,
        venda.mtdPagamento,
        id 
    ], callback);
}

safrasDAO.prototype.editarDespesa = function(id, despesa, callback) {
    const query = 'UPDATE despesas SET nomeEmpresa = ?, descricao = ?, diasPagar = ?, dataCompra = ?, mtdPagamento = ?, valorTotal = ? WHERE idDesp = ?';

    this._connection.query(query, [
        despesa.nomeEmpresa,
        despesa.descricao,
        despesa.diasPagar,
        despesa.dataCompra,
        despesa.mtdPagamento,
        despesa.valorTotal,
        id
    ], callback);
}

module.exports = function(){
    return safrasDAO;
}
