function safrasDAO(connection) {
    this._connection = connection;
}

safrasDAO.prototype.getSafra = function(id_usuario, callback){
    this._connection.query('SELECT * FROM estoques e JOIN safras s ON e.idEsto = s.idEsto WHERE e.idUsua = ' + id_usuario, callback);
}
safrasDAO.prototype.salvarSafra = function(safra,callback){
    this._connection.query('INSERT INTO safras SET ?', safra, callback);
}

module.exports = function() {
    return safrasDAO;
}
