function vendasDAO(connection) {
    this._connection = connection;
}

vendasDAO.prototype.getVenda = function(id,callback){
    this._connection.query('SELECT * FROM vendas WHERE idVend = '+ [id], callback);
}
vendasDAO.prototype.getVendasSafra = function(id_safra, callback){
    this._connection.query('SELECT * FROM vendas WHERE idSafr = ' + id_safra + ' ORDER BY dataVenda DESC', callback);
}
vendasDAO.prototype.getTodasVendas = function(id_usuario, callback){
    this._connection.query('SELECT * FROM estoques e JOIN safras s ON e.idEsto = s.idEsto JOIN vendas v ON s.idSafr = v.idSafr WHERE e.idUsua = ' + id_usuario, callback);
}
vendasDAO.prototype.salvarVenda = function(venda,callback){
    this._connection.query('INSERT INTO vendas SET ?', venda, callback);
}
vendasDAO.prototype.editarVenda = function(id, venda, callback) {
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
vendasDAO.prototype.excluirVenda = function(id, callback){
    this._connection.query('DELETE FROM vendas WHERE idVend = '+ [id], callback);
}

module.exports = function() {
    return vendasDAO;
}