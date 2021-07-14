
import { pool } from '../database'
const helpers = require('../libs/helpers');

export const listarusuario = async(req, res)=>{
    try {
        const response = await pool.query('select * from fc_m_listar_usuario()');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

