const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const {MongoClient} = require("mongodb");
const url="mongodb://localhost/";
const client=new MongoClient(url);
app.use(express.urlencoded({ extended: true }));
async function connect(){
    try{
        await client.connect();
        console.log('MongoDB Connected');
    }
    catch(err)
    {
        console.log('err occ');
        process.exit(1);
    }
}


const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Define routes for each HTML page
app.get('/', function (request, response) {
    response.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

app.get('/about', function (request, response) {
    response.sendFile(path.join(__dirname, 'public', 'about.html'));
});

app.get('/adminlog', function (request, response) {
    response.sendFile(path.join(__dirname, 'public', 'adminlog.html'));
});

app.get('/admindash', function (request, response) {
    response.sendFile(path.join(__dirname, 'public', 'admindash.html'));
});

app.get('/women', function (request, response) {
    response.sendFile(path.join(__dirname, 'public', 'dress.html'));
});

app.get('/del', function (request, response) {
    response.sendFile(path.join(__dirname, 'public', 'delete.html'));
});

app.get('/registrationindex', function (request, response) {
    response.sendFile(path.join(__dirname, 'public', 'registrationindex.html'));
});

app.get('/login', function (request, response) {
    response.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/view_user', function (request, response) {
    response.sendFile(path.join(__dirname, 'public', 'view_user.html'));
});
app.get('/contact', function (request, response) {
    response.sendFile(path.join(__dirname, 'public', 'contact.html'));
});
app.get('/insert',async function(req,res){
    
    var doc = {
        name: req.query.name,
        username: req.query.uname,
        email: req.query.email,
        phoneNumber: req.query.phone,
        gender: req.query.gender,
        password: req.query.password,
        
    };
    
    const db=client.db("boutique");
    const coll=db.collection("users");
    var result=await coll.insertOne(doc);
    res.redirect( 'homepage.html');


    res.end();
});


app.get('/delete',async function(req,res){
    
    var doc={email:req.query.email};
    const db=client.db("boutique");
    const coll=db.collection("users");
    var result=await coll.deleteOne(doc);
    res.write("<h1>deleted Ok</h1>");
    res.end();
});

app.get('/findall',async function(req,res){
    const db = client.db("boutique");
    const coll = db.collection("users");
    var result = await coll.find({},{_id:0,username:1,email:1,phoneNumber:1,gender:1,password:1}).toArray();
    
    res.write("<h1>Customers:</h1>");
    res.write("<ol>");
    
    for(var i=0;i<result.length;i++)
    {
        res.write("<li>");
        res.write("NAME :"+result[i].username+"<br>"+"EMAIL :"+result[i].email+"<br>"+"MOBILE NO :"+result[i].phoneNumber+"<br>"+"PASSWORD :"+result[i].password+"<br>"+"GENDER :"+result[i].gender+"<br>");
        res.write("</li>");
    }
    res.write("</ol>")
    res.write("||<a href='admindash.html'>Home</a>");
    res.end();
});

app.get('/update',async function(req,res){
    
    var doc=req.query.email;
    var newdoc=req.query.npassword;

    const db=client.db("boutique");
    const coll=db.collection("users");
    var result=await coll.updateOne({email: doc}, {$set:{password:newdoc}});
    res.redirect( 'homepage.html');

    res.end();
});
app.post("/", function (request, response) {
    var num1 = request.body.num1;
    response.write("<h1>POST WORKING</h1>");
    response.end();
});

const PORT = 5000;

app.listen(PORT, function () {
    console.log(`Server is running at http://localhost:${PORT}`);
    connect();
});
