const express= require('express');
const morgan = require('morgan')
const app= express();
const cors = require('cors')


//para que re.body no entregue Undefined como respuesta del post solicitado
app.use(express.json());
app.use(cors());

app.use(morgan('dev'));

//todas las rutas empiezan con auth o photo
app.use('/auth', require('./routes/auth'))
app.use('/photo', require('./routes/photo'))

app.listen(3000);
console.log('Server on port', 3000);

