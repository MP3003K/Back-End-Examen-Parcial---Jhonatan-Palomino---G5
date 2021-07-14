import { Router } from 'express'

const router = Router();

import * as userExamen from '../controllers/examen.controller'
const { checkToken } = require('../auth/token_validation');


router.get('/list_usu' , userExamen.listarusuario);
export default router;

