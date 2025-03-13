module.exports.form_login = function (app, req, res) {
    res.render('admin/form_login', { validacao: {}, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
}

module.exports.login_autenticar = function (app, req, res) {
    const camposDeUsuario = req.body;
    req.assert('login', 'Usuário é obrigatório').notEmpty();
    req.assert('senha', 'Senha é obrigatório').notEmpty();
    const erros = req.validationErrors();
    if (erros) {
        res.render('admin/form_login', { validacao: erros, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
        return;
    }
    const connection = app.config.db_connection();
    const usuarioSalvarModel = new app.app.models.usuariosDAO(connection);
    usuarioSalvarModel.getIdAutenticar(camposDeUsuario, function (error, result) {
        if (result.length == 0) {
            let erro = [];
            erro.push({ msg: 'Usuário ou senha incorretos!' });
            res.render('admin/form_login', { validacao: erro, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
            return;
        }
        
        req.session.autorizado = true;
        req.session.idUsuario = result[0].idUsua;
        res.redirect('/');
    });
}

module.exports.sair = function (app, req, res) {
    req.session.destroy(function (error) {
        res.redirect('/');
    });
}
module.exports.form_add_usuario = function (app, req, res) {
        res.render('admin/form_add_usuario', { validacao: {}, usuario: {}, flagAdmin: req.session.autorizado });
}

module.exports.usuario_salvar = function (app, req, res) {
    const camposDeUsuario = req.body;

    req.assert('login', 'Usuário é obrigatório').notEmpty();
    req.assert('senha', 'Senha é obrigatório').notEmpty();

    const erros = req.validationErrors();
    if (erros) {
        res.render('admin/form_login', { validacao: erros, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
        return;
    }
    const connection = app.config.db_connection();
    const salvarUsuarioModel = new app.app.models.usuariosDAO(connection);
    salvarUsuarioModel.salvarUsuario(camposDeUsuario, function (error, result) {
        if (result.length == 0) {
            let erro = [];
            erro.push({ msg: 'Erro ao salvar. Tente novamente!' });
            res.render('admin/form_login', { validacao: erro, flagAdmin: req.session.autorizado, idUsuario: req.session.idUsuario });
            return;
        }
        res.redirect('/');
    });
}