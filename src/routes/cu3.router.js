import { Router } from 'express'

const router = Router();

import * as userCU3 from '../controllers/cu3.controller'
const { checkToken } = require('../auth/token_validation');

router.post('/add' ,checkToken, userCU3.crearUsuarioEvaluador);
router.get('/list_eva' , userCU3.listarDocentesEvaluadores);
router.put('/upd_doc_eva/:id' , userCU3.updateDocenteEvaluador);
router.put('/elim_user/:id' , userCU3.eliminar_user_log);
export default router;

