const express = require('express');
const app = express();
const morgan = require('morgan');


const routerUser = require('./routes/userRoute');
const routeUsuarioSDB = require('./routes/usuarioSDB');
const routeRotaSDB = require('./routes/rotaSDBRoute')

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, X-Requested-Whith, Content-Type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, PUT, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
})

app.use('/user', routerUser);
app.use('/usuario', routeUsuarioSDB);
app.use('/rota', routeRotaSDB);

app.use((req, res, next) => {
    const erro = new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app; 