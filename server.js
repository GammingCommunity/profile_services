require('dotenv').config();
const express= require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
var fs = require('fs');
var app=  express();
const uploads= require('./upload');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

/*app.use(fileUpload({

    createParentPath: true
}));*/

//add other middleware
app.use(cors());

// post image
app.post('/upload-avatar', upload.single('profile_image'),async (req,res,next)=>{
    try {
        
        var result= await uploads(req.file.path,req.body.profile_id);
        //console.log(result);
        
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
