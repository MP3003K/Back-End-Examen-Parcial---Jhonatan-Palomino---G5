import { transporter } from '../libs/helper.email';



const nodemailer = require("nodemailer");

export const email = async(req, res)=>{
    try {
        const{ correo_emisor} = req.body;
        const{ correo_destinatario} = req.body;
        const{ asunto} = req.body;
        const{ mensaje} = req.body;
        await transporter.sendMail({
            from: correo_emisor,
            to: correo_destinatario, 
            subject: asunto,
            text: mensaje, 
       
          });
          return res.status(200).json('correo enviado correctamente...!');
    } catch (e) {
        console.log(e);
        return res.status(500).json('Internal Server error...!');
    }
}