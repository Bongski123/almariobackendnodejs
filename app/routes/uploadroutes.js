const router = express.Router();



router.post('/upload', upload.single('file'), (req, res) => {
    console.log(req.body)
    console.log(req.file)
    return res.json({Status: "Success"});
   })
    
router.post('/create',upload.single('file'), (req, res) => {
       const sql = "INSERT INTO attachments (`file_name`,`image`) VALUES (?)"; 
       const values = [
           req.body.file_name,
           req.file.filename
       ]
       db.query(sql, [values], (err, result) => {
           if(err) return res.json({Error: "Error singup query"});
           return res.json({Status: "Success"});
       })
   })


   module.exports = router;