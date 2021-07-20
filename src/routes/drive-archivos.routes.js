import { Router } from "express";
import { pool } from '../database'

import { file } from "googleapis/build/src/apis/file";
import { crossOriginEmbedderPolicy, crossOriginResourcePolicy } from "helmet";
const router = Router();

const multer = require("multer");
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');
const CLIENT_ID = '22138813073-kni60897ebcf3m2vuvdgccgcnj2s0t4t.apps.googleusercontent.com';
const CLIENT_SECRET = 'q4XesILjDkULGVQeArwIf4bz';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//048M8rKkX4QfdCgYIARAAGAQSNwF-L9IrqXT5nJALTfvoCwHFwgeqP5YKB0oTvFA8cgf2B7Qit5XaNd_1VNJQIhe4QjuISq72AuM';
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
  version: 'v3',
  auth: oauth2Client
});
var filePath;
var archivo;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/archivos/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({ storage: storage });
router.post("/", upload.single("imagen"), async (req, res, next) => {
  filePath = path.join("src/archivos/", req.file.originalname);
  console.log(filePath);
 

  const file = req.file;
  archivo = file.originalname;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  } else {
    uploadFile();
  }
  res.send("Archivo subido correctamente: " + file.originalname);

});

const nombre="";
const tipo="";
const url22="";
const iddrive="iddrive";
const idusuario=0;
var objetofile;
async function uploadFile() {
  try {
    const response = await drive.files.create({
      requestBody: {
        name: archivo,
        mimeType: 'application/pdf'
      },
      media: {
        mimeType: 'application/pdf',
        body: fs.createReadStream(filePath)
      }
    })
    fs.unlinkSync(filePath);
    console.log('-----------Data subido-----------')
console.log(response.data);
let nombre=response.data.name;
let id=response.data.id;
let tipo=response.data.mimeType;
console.log(response.data.name);
console.log(response.data.mimeType);
console.log(response.data.id);
  await pool.query('insert into archivos (nombre,tipo,iddrive) values ($1,$2,$3)', [nombre,tipo,id]);

  } catch (error) {
    console.log(error.message);
  }
}

async function generatePublicUrl() {
  try {
    const fileId = '18nSpQH9uX22K3CsK6lc1L0YenEz78RJ3';
    await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role:'reader',
          type:'anyone',
        },
      });
    const result = await drive.files.get({
      fileId: fileId,
      fields: 'webViewLink,webContentLink',
    });
    console.log('------------Result url---------');
    console.log(result.data);

  } catch (error) {
    console.log(error.message);
  }
}
generatePublicUrl();

async function deleteFile(){
  try{
const response = await drive.files.delete({

  fileId:'1v3gAl5-PsEVuZ0HgwU7KaHFjF6Lur4YU',
});
console.log(response.data,response.status);
  }catch(error){
    console.log(error.message);
  }
}
//deleteFile();
export default router;