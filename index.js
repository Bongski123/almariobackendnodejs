const express =require('express');
const cors = require('cors');
const upload =require('express-upload');
const multer = require('multer') //http://expressjs.com/en/resources/middleware/multer.html npm install --save multer
const app = express();

app.use("/assets",express.static("assets"));

app.use(cors());
const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const UsersRoutes = require('./app/routes/user');
const RolesRoutes = require('./app/routes/roleRoutes');
const PublicationRoutes = require('./app/routes/publicationRoutes');
const DocumentRoutes = require('./app/routes/DocumentsRoutes');
const departmentRoutes = require('./app/routes/departmentRountes');

const testAPIRouter = require('./app/routes/testAPI');
const attachementRoutes = require('./app/routes/attachmentsRoutes');
const projectRoutes = require('./app/routes/ProjectRoutes');
const uploadRoutes = require('./app/routes/uploadroutes');

app.use("/assets",express.static("assets"));


app.use(bodyParser.json());
app.use('/api', UsersRoutes);
//role Routes
app.use('/api', RolesRoutes);

//publicationRoutes
app.use('/api', PublicationRoutes);
//docuRoutes
app.use('/api', DocumentRoutes);

app.use('/api', projectRoutes);


app.use("/testAPI",testAPIRouter);
app.use("/api",departmentRoutes);
app.use("/api",attachementRoutes);
app.use("/api",uploadRoutes);


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      return cb(null, "./public/images")
    },
    filename: function (req, file, cb) {
      return cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
   
  const upload = multer({storage})
   
 
 

app.get('/', (req, res) => {

    //res.json({ message: 'Restfull API Backend Using ExpresJS' });
    res.sendFile(__dirname + "/page.html");
    
    });
    

app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
});