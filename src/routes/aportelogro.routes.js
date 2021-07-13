import { Router } from 'express'

const router = Router();

import * as aporteCtr from '../controllers/aportelogro.controller'
const { checkToken } = require('../auth/token_validation');

router.get('/' ,  aporteCtr.readAllaporteLogro);
router.get('/:id' , aporteCtr.readaporteLogro);
router.delete('/delete/:id' , aporteCtr.delaporteLogro);
router.post('/add',aporteCtr.createaporte);



export default router;