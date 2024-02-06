const express =require('express');
const cors = require('cors');

const app = express();

app.use("/assets",express.static("assets"));

app.use(cors());

const PORT = process.env.PORT || 3000;


const bodyParser = require('body-parser');
//imports from different files
///const loginRoutes = require('./app/routes/loginRoutes');
//const registerRoutes = require('./app/routes/registerRoutes');
const UsersRoutes = require('./app/routes/user');
const RolesRoutes = require('./app/routes/roleRoutes');
const IndicatorRoutes = require('./app/routes/indicatorRoutes');
const PublicationRoutes = require('./app/routes/publicationRoutes');
const DocumentRoutes = require('./app/routes/DocumentsRoutes');

app.use("/assets",express.static("assets"));





// app.get('/',(req, res) => {

//     res.json({message: 'Restful API BACKEND Using Express'});

// });



app.use(bodyParser.json());
//User routes
//app.use('/api', registerRoutes);
//app.use('/api', loginRoutes);
app.use('/api', UsersRoutes);
//role Routes
app.use('/api', RolesRoutes);
//indicatorRoute
app.use('/api', IndicatorRoutes);
//publicationRoutes
app.use('/api', PublicationRoutes);
//docuRoutes
app.use('/api', DocumentRoutes);
 

app.get('/', (req, res) => {

    //res.json({ message: 'Restfull API Backend Using ExpresJS' });
    res.sendFile(__dirname + "/page.html");
    
    });
    

app.listen(PORT, () => {
    console.log(`Server is Running on http://localhost:${PORT}`);
});