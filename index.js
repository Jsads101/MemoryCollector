const { response } = require('express');
const express = require('express');
const app = express();
app.listen(3000, () => console.log("Listening on port 3000"));
app.use(express.static('public'));
//app.use(express.json());
let bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
const path = require('path')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
const Datastore = require("nedb");
const database = new Datastore({ filename: 'database.db', autoload: true }); //path to local file name

app.get('/', (request, response) => {
    response.render("index")
    });

app.get('/seeLogsTime', (request, response) => {
    let person = {};
    let namesList = [];
    database.find({}, function (err, docs) {
        for(item of docs){
            person = {name: item.personName};
            namesList.push(person)
            console.log(person)
        }
    response.render("memoryLog", {personList : namesList})
    })
});

app.post('/api', (request, response) => {
    const latData = request.body.lat;
    const longData = request.body.long;
    const image = request.body.image;
    const personName = request.body.personname;
    const timeStamp = Date.now();
    const myMemory = {latData, longData, timeStamp, image, personName};
    database.insert(myMemory);
    response.render("success");
});

app.get('/api', (request, response) => {
    database.find({}).sort({ timeStamp: 1 }).exec(function (err, docs) {
        response.json(docs)
      });
    })

// app.get('/getPersonList', (request, response) =>{
//     const namesList = [];

//     database.find({}, function (err, docs) {
//         for(item of docs){
//             namesList.push(item.personName);
//         }
//         console.log("NamesList : " + namesList)
//         response.json(docs)
// })
// })



   

