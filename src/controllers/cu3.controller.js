

import { pool } from '../database'
const helpers = require('../libs/helpers');

export const crearUsuarioEvaluador = async(req, res)=>{
    try {
        const{ nombres,apellidos,dni,celular,telefono_fijo,correo ,cat_actual,idsede,idfacultad,idcargo,password} = req.body;
        const password_cifrado = await helpers.encryptPassword(password); 
        await pool.query('select  fc_m_registrar_docente_participante($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11) ', [ nombres,apellidos,dni,celular,telefono_fijo,correo ,cat_actual, idsede, idfacultad, idcargo,password_cifrado]);
        return res.status(200).json(
            `Usuario ${ dni } creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

export const updateDocenteEvaluador = async(req, res)=>{
    try {
        const idusuario = parseInt(req.params.id);
        const{ nombres, apellidos, dni, celular, telefono_fijo, correo, cat_actual, idsede, idfacultad, idcargo, password} = req.body;
        const password_cifrado = await helpers.encryptPassword(password);
        console.log(cat_actual);
        await pool.query('select fc_m_actualizar_docente_evaluador ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)', [idusuario, nombres, apellidos, dni, celular, telefono_fijo, correo, cat_actual, idsede, idfacultad, idcargo, password_cifrado]);
        return res.status(200).json(
            `Docente evaluador modificado correctamente...!` //alt 96
        );
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error...!');
    }
}
export const listarDocentesEvaluadores = async(req, res)=>{
    try {
        const response = await pool.query('select * from fc_m_listar_docentes_evaluadores()');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

export const eliminar_user_log = async(req, res)=>{
    try {
        const idusuario = parseInt(req.params.id);
        console.log(idusuario);
        await pool.query('select  fc_m_elim_usu_log($1) ', [idusuario]);
        return res.status(200).json(
            `Usuario eliminado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }

}