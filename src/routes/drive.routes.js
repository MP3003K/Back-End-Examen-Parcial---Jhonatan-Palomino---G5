import { Router } from "express";
const router = Router();
const multer = require("multer");
const { google } = require("googleapis");
const helpers = require("./../libs/helpers2");
/*
const OAuth2Data = require('../../credenciales.json');
const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URI = OAuth2Data.web.redirect_uris[0];
*/
const CLIENT_ID =
  "825235519619-omna0ulg590pje66t4u1f2acnaarurka.apps.googleusercontent.com";
const CLIENT_SECRET = "IG8KJ7o_Ev5lTrlyoZne5mBD";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";

const REFRESH_TOKEN = "YOUR REFRESH TOKEN GENERATED FROM oauthplayground";
const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });
const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("imagen"), async (req, res, next) => {
  
  console.log(req.file.originalname);
  
    const file = req.file; 
    console.log(file);
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  const multerText = Buffer.from(file.buffer).toString("utf-8"); // this reads and converts the contents of the text file into string

  const result = {
    fileText: multerText,
  };

  res.send(result);
});
export default router;