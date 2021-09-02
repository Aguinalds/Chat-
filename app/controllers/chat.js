module.exports.iniciaChat = function (application, req, res) {

    var dadosForm = req.body;

    req.assert('apelido','Nome ou apelido é necessário' ).notEmpty();   
    req.assert('apelido','Nome ou apelido deve conter entre 3 á 15' ).len(3, 15);

    var erros = req.validationErrors();

    if(erros){
        res.render("index", {validacao : erros})
        return;
    }
    res.render('chat');
}