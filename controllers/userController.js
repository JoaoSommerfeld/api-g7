const mysql = require('../database/mysql').pool;


exports.getUsers = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            "SELECT * FROM users",
            (error, results, fields) => {                
                if(error){return res.status(500).send({ error: error })}
                const response = {
                    quantidade: results.length,
                    users: results.map(item => {
                        return {
                            id: item.id,
                            telefone: item.telefone, 
                            email: item.email, 
                            endereco: item.endereco, 
                            cep: item.cep, 
                            bairro: item.bairro, 
                            cidade: item.cidade, 
                            estado: item.estado,
                            request: {
                                tipo: 'GET',
                                descricao: 'Retorna um usuários',
                                url: process.env.URL_VAR + item.id
                            }
                        }
                    })

                }
                return res.status(200).send(response)
            }
        )
    });
}

exports.postUser = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            "INSERT INTO users (nome, telefone, email, endereco, cep, bairro, cidade, estado) VALUES (?,?,?,?,?,?,?,?)",
            [
                req.body.nome, 
                req.body.telefone,
                req.body.email,
                req.body.endereco,
                req.body.cep,
                req.body.bairro,
                req.body.cidade,
                req.body.estado
            ],
            (error, results, fields) => {
                conn.release();
                if(error){return res.status(500).send({ error: error })}
                const response = {
                    mensagem: 'Produto inserido com sucesso',
                    usuarioCriado: {
                        id_produto: results.insertId,
                        nome: req.body.nome,
                        telefone: req.body.telefone,
                        email: req.body.email,
                        endereco: req.body.endereco,
                        cep: req.body.cep,
                        bairro: req.body.bairro,
                        cidade: req.body.cidade,
                        estado: req.body.estado,
                        request: {
                            tipo: 'POST',
                            descricao: 'Insere um usuário',
                            url: process.env.URL_VAR 
                        }
                    }
                }
                return res.status(201).send(response);
            }
        )
    });
}

exports.getUmUser = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            "SELECT * FROM users WHERE id = ?;",
            [req.params.id_user],
            (error, results, fields) => {                
                if(error){return res.status(500).send({ error: error })}
                if(results.length == 0){
                    return res.status(404).send({ mensagem: 'Não foi econtrado com esse ID.'})
                }
                const response = {
                    usuario: {
                        id_produto: results[0].insertId,
                        nome: results[0].nome,
                        telefone: results[0].telefone,
                        email: results[0].email,
                        endereco: results[0].endereco,
                        cep: results[0].cep,
                        bairro: results[0].bairro,
                        cidade: results[0].cidade,
                        estado: results[0].estado,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna todos os usuários',
                            url: process.env.URL_VAR 
                        }
                    }
                }
                return res.status(200).send(response)
            }
        )
    });    
}

exports.patchUser = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            `UPDATE users
                SET nome = ?,
                    telefone = ?,
                    email = ?,
                    endereco = ?,
                    cep = ?,
                    bairro = ?,
                    cidade = ?,
                    estado = ?
                WHERE id = ?`,
            [
                req.body.nome, 
                req.body.telefone,
                req.body.email,
                req.body.endereco,
                req.body.cep,
                req.body.bairro,
                req.body.cidade,
                req.body.estado,
                req.body.id
            ],
            (error, results, fields) => {
                conn.release();
                if(error){return res.status(500).send({ error: error })}                
                const response = {
                    mensagem: 'Atualizado com sucesso',
                    usuarioCriado: {
                        id_produto: req.body.id,
                        nome: req.body.nome,
                        telefone: req.body.telefone,
                        email: req.body.email,
                        endereco: req.body.endereco,
                        cep: req.body.cep,
                        bairro: req.body.bairro,
                        cidade: req.body.cidade,
                        estado: req.body.estado,
                        request: {
                            tipo: 'GET',
                            descricao: 'Retorna um usuario em específico',
                            url: process.env.URL_VAR +  req.body.id
                        }
                    }
                }
                res.status(202).send(response);
            }
        )
    });
}

exports.deleteUser = (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if(error){return res.status(500).send({ error: error })}
        conn.query(
            `DELETE FROM users WHERE id = ?`,
            [ req.body.id ],
            (error, results, fields) => {
                conn.release();
                if(error){return res.status(500).send({ error: error })}
                const response = {
                    mensagem: 'Produto removido com sucesso',
                    request: {
                        tipo: 'POST',
                        descricao: 'Insere um produto',
                        url: process.env.URL_VAR
                    }
                }
                res.status(202).send(response);
            }
        )
    });
}