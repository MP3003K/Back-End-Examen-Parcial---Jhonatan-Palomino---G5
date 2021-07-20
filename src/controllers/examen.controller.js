
import { pool } from '../database'
const helpers = require('../libs/helpers');

export const listarArchivos = async(req, res)=>{
    try {
        const response = await pool.query('select * from fc_m_listar_archivos(2)');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

