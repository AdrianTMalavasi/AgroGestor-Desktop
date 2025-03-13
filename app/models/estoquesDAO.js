function estoquesDAO(connection) {
    this._connection = connection;
}

estoquesDAO.prototype.getEstoques = function(id, callback){
    this._connection.query('SELECT * FROM estoques WHERE idUsua = '+ [id],callback);
}
estoquesDAO.prototype.salvarEstoque = function(estoque, callback){
    this._connection.query('INSERT INTO estoques SET ?', estoque, callback);
}
estoquesDAO.prototype.excluirEstoque = function(id, callback){
    this._connection.query('DELETE FROM estoques WHERE idEsto = '+ [id], callback);
}

module.exports = function() {
    return estoquesDAO;
}