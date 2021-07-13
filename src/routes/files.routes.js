import { Router } from 'express'
const router = Router();
const multer = require('multer');
const path = require('path');
const { checkToken } = require('../auth/token_validation');

var storage = multer.diskStorage ({
    destination: function (req, file, cb) {
      cb (null, 'src/archivos/')
    },
    filename: function (req, file, cb) {cb (null, file.originalname)
    }
  })
  var upload = multer ({storage: storage});
  router.post ('/', upload.single ('imagen'), function (req, res) {
    console.log (req.file.filename);
    res.send("subido correctamente");
  });

export default router;