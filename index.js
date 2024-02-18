const express =require('express');
const cors = require('cors');

const app = express();

app.use("/assets",express.static("assets"));

app.use(cors());
const PORT = process.env.PORT || 9000;
const bodyParser = require('body-parser');
const UsersRoutes = require('./app/routes/user');
const RolesRoutes = require('./app/routes/roleRoutes');
const PublicationRoutes = require('./app/routes/publicationRoutes');
const DocumentRoutes = require('./app/routes/DocumentsRoutes');
const departmentRoutes = require('./app/routes/departmentRountes');

const testAPIRouter = require('./app/routes/testAPI');
const attachementRoutes = require('./app/routes/attachmentsRoutes');
const projectRoutes = require('./app/routes/ProjectRoutes');


app.use("/assets",express.static("assets"));


app.use(bodyParser.json());
app.use('/api', UsersRoutes);
//role Routes
app.use('/api', RolesRoutes);

//publicationRoutes
app.use('/api', PublicationRoutes);
//docuRoutes
app.use('/api', DocumentRoutes);
app.use('/api', DocumentRoutes);
app.use('/api', projectRoutes);



app.use("/testAPI",testAPIRouter);
app.use("/api",departmentRoutes);
app.use("/api",attachementRoutes);

 
 

app.get('/', (req, res) => {

    //res.json({ message: 'Restfull API Backend Using ExpresJS' });
    res.sendFile(__dirname + "/page.html");
    
    });
    

app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
});