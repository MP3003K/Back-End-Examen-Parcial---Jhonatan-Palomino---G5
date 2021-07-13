
import { pool } from '../database'
const helpers = require('../libs/helpers');

export const crearUsuarioParticipante = async(req, res)=>{
    try {
        const{ nombres,apellidos,dni,celular,telefono_fijo,correo ,cat_actual,cat_deceada,password} = req.body;
        const password_cifrado = await helpers.encryptPassword(password);
        await pool.query('select  fc_m_registrar_docente_participante($1,$2,$3,$4,$5,$6,$7,$8,$9) ', [ nombres,apellidos,dni,celular,telefono_fijo,correo,cat_actual,cat_deceada,password_cifrado]);
        return res.status(200).json(
            `Usuario ${ dni } creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}

export const updateDocenteParticipante = async(req, res)=>{
    try {
        const idusuario = parseInt(req.params.id);
        const{ nombres, apellidos, dni, celular, telefono_fijo, correo, cat_actual, cat_deceada, password} = req.body;
        const password_cifrado = await helpers.encryptPassword(password);
        await pool.query('select fc_m_actualizar_docente_participante ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)', [idusuario, nombres, apellidos, dni, celular, telefono_fijo, correo,cat_actual, cat_deceada, password_cifrado]);
        return res.status(200).json(
            `Docente evaluador participante correctamente...!` //alt 96
        );
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server Error...!');
    }
}
export const listarDocentesParticipantes = async(req, res)=>{
    try {
        const response = await pool.query('select * from fc_m_listar_docentes_participantes()');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}
export const listarDocParticipante = async(req, res)=>{
    try {
        const idusuario = parseInt(req.params.id);
        const response = await pool.query('select * from fc_m_list_doc_part_id($1)', [idusuario]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}


export const eliminar_user_log = async(req, res)=>{
    try {
        const idusuario = parseInt(req.params.id);
        console.log('zz');
  await pool.query('select  fc_m_elim_usu_log($1) ', [idusuario]);
        return res.status(200).json(
            `Usuario eliminado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }

}
