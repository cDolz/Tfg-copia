const router = require('express').Router();
const upload = require('../../middleware/uploadFiles');

const Event = require('../../models/event.model');

router.post('/upload', upload.single('file'), async (req, res, next) => {
    console.log('req.file', req.file);
    try{
        await Event.create({image: req.file.path});
        res.json({ success: 'File uploaded!' });

    }catch(error){
        next(error);
    }
    
});

module.exports = router;