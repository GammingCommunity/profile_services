require('dotenv').config();
const express= require('express');
//const fileUpload = require('express-fileupload');
const cors = require('cors');
var fs = require('fs');
var app=  express();
const uploads= require('./upload');
const {multerUploads,dataUri} = require('./muter');

/*app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true,
    safeFileNames: true
}));*/

//add other middleware
app.use(cors());

// post image
app.post('/upload-avatar',multerUploads,async (req,res,next)=>{
    try {
        const file = dataUri(req).content;
        var result = await uploads(file,req.body.profile_id);
        res.json({ "code": "200", "success": true, message: "Upload success", "image_url": result })
        
    } catch (error) {
        res.status(500).send(error);
    }
    
})
// port
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Listen on port ${PORT}`);
})
