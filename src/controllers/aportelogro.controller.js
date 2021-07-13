import { pool } from '../database'
const helpers = require('../libs/helpers');


export const readAllaporteLogro = async(req, res)=>{
    try {
        const response = await pool.query('select *from aportelogro');
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}
export const readaporteLogro = async(req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('select *from aportelogro where idportelogro=$1', [id]);
        return res.status(200).json(response.rows);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}
export const delaporteLogro = async(req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const response = await pool.query('delete from aportelogro where idportelogro=$1', [id]);
        return res.status(200).json(
            `aporte Logro ${ id } eliminado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}
/*export const updateaporteLogro = async(req, res)=>{
    try {
        const id = parseInt(req.params.id);
        const{ username, password} = req.body;
        await pool.query('update aporte_logro set institucion=$1 where idusuario=$3', [username, password, id]);
        return res.status(200).json(
            `Usuario ${ id } modificado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}}*/
export const createaporte = async(req, res)=>{
    try {
        const{ institucion, idpais, fechalogro, detallelogro,archivologro } = req.body;
        await pool.query('insert into aportelogro (institucion,idpais,fechalogro,detallelogro,archivologro,iddocente) values($1,$2,$3,$4,$5,57)', 
        [ institucion, idpais, fechalogro, detallelogro,archivologro]);
        return res.status(200).json(
            `Aporte ${ detallelogro } creado correctamente...!`);
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}