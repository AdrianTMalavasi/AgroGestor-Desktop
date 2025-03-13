function producoesDAO(connection) {
    this._connection = connection;
}

producoesDAO.prototype.getProducao = function(id, callback){
    this._connection.query('SELECT * FROM producoes WHERE idProd = ' + id, callback);
}
producoesDAO.prototype.getProducoesSafra = function(id_safra, callback){
    this._connection.query('SELECT * FROM producoes WHERE idSafr = ' + id_safra + ' ORDER BY dataProducao DESC', callback);
}
producoesDAO.prototype.getTodasProducoes = function(id_usuario, callback){
    this._connection.query('SELECT * FROM estoques e JOIN safras s ON e.idEsto = s.idEsto JOIN producoes p ON s.idSafr = p.idSafr WHERE e.idUsua = ' + id_usuario, callback);
}
producoesDAO.prototype.salvarProducao = function(producao,callback){
    this._connection.query('INSERT INTO producoes SET ?', producao, callback);
}
producoesDAO.prototype.editarProducao = function(id, producao, callback) {
    const query = 'UPDATE producoes SET qtdSacas = ?, dataProducao = ? WHERE idProd = ?';

    this._connection.query(query, [
        producao.qtdSacas,
        producao.dataProducao,
        id
    ], callback);
}
producoesDAO.prototype.excluirProducao = function(id, callback){
    this._connection.query('DELETE FROM producoes WHERE idProd = '+ [id], callback);
}

module.exports = function() {
    return producoesDAO;
}
