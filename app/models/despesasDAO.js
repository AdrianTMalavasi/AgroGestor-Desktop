function despesasDAO(connection) {
    this._connection = connection;
}

despesasDAO.prototype.getDespesa = function(id,callback){
    this._connection.query('SELECT * FROM despesas WHERE idDesp = '+ [id], callback);
}
despesasDAO.prototype.getDespesasSafra = function(id_safra,callback){
    this._connection.query('SELECT * FROM despesas WHERE idSafr = ' + id_safra + ' ORDER BY dataCompra DESC', callback);
}
despesasDAO.prototype.getTodasDespesas = function(id_usuario, callback){
    this._connection.query('SELECT * FROM estoques e JOIN safras s ON e.idEsto = s.idEsto JOIN despesas d ON s.idSafr = d.idSafr WHERE e.idUsua = ' + id_usuario, callback);
}
despesasDAO.prototype.salvarDespesa = function(despesa,callback){
    this._connection.query('INSERT INTO despesas SET ?', despesa, callback);
}
despesasDAO.prototype.editarDespesa = function(id, despesa, callback) {
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
despesasDAO.prototype.excluirDespesa = function(id, callback){
    this._connection.query('DELETE FROM despesas WHERE idDesp = '+ [id], callback);
}

module.exports = function() {
    return despesasDAO;
}