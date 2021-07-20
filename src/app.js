
import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'

import examen from './routes/examen.routes'
import images from './routes/drive-archivos.routes'
import email from './routes/email.routes'

const app = express();
var cors = require('cors');

app.use(express.json());
app.use(cors());

app.use(morgan('dev'));

app.get('/',function(req, res, next){
    res.send('Bienvenido a Node JS...!');
});
app.use('/api/auth', authRoutes);
app.use('/api/auth/users', userRoutes);
app.use('/email', email);
app.use('/examen', examen);
app.use('/images', images);
export default app;