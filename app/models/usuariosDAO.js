function usuariosDAO(connection) {
    this._connection = connection;
}

usuariosDAO.prototype.getUsuarios = function(callback){
    this._connection.query('SELECT * FROM usuarios',callback);
}
usuariosDAO.prototype.getIdAutenticar = function(camposDeUsuario, callback){
    this._connection.query('SELECT idUsua FROM usuarios WHERE login = "'+ camposDeUsuario.login + '" AND senha = '+ camposDeUsuario.senha , callback);
}
usuariosDAO.prototype.salvarUsuario = function(usuario,callback){
    this._connection.query('INSERT INTO usuarios SET ?', usuario, callback);
}
module.exports = function() {
    return usuariosDAO;
}