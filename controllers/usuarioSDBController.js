
exports.getUsuarioSDB = (req, res, next) => {
    const response = [
        {
            "id": 2,
            "telefone": "9999",
            "email": "seu@email.com.br",
            "endereco": "Avenida 25",
            "cep": "03265-874",
            "bairro": "Sei lá",
            "cidade": "Por Ali",
            "estado": "SP",
            "request": {
                "tipo": "GET",
                "descricao": "Retorna todos os usuários",
                "url": "http://localhost:3000/user/2"
            }
        },
        {
            "id": 3,
            "telefone": "9999",
            "email": "seu@email.com.br",
            "endereco": "Avenida 25",
            "cep": "03265-874",
            "bairro": "Sei lá",
            "cidade": "Por Ali",
            "estado": "SP",
            "request": {
                "tipo": "GET",
                "descricao": "Retorna todos os usuários",
                "url": "http://localhost:3000/user/3"
            }
        }
    ]
    return res.status(200).send(response);
};

exports.postUsuarioSDB = (req, res, next) => {
    return res.status(200).send(req.body)    
}