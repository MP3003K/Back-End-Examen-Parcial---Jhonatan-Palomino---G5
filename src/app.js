
import express from 'express'
import morgan from 'morgan'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import cu2 from './routes/cu2.router'
import cu3 from './routes/cu3.router'
import aporteLogro from './routes/aportelogro.routes'
import examen from './routes/examen.routes'
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
app.use('/iteracion1/gest_usu_part', cu2);
app.use('/iteracion1/gest_usu_eval', cu3);
app.use('/api/auth/aportelogro', aporteLogro);
app.use('/examen', examen);
export default app;