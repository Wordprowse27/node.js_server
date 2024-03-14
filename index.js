import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';



const app = express();
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// // Middleware function to check authentication
// const authenticateUser = (req, res, next) => {
//     // Check if the user is authenticated
//     if (req.session.isAuthenticated) {
//         // If authenticated, proceed to the next middleware/route handler
//         next();
//     } else {
//         // If not authenticated, redirect to the login page
//         res.redirect('/login');
//     }
// };
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'));
app.use(express.static('frontend'))
TODO: "Work on the posts"
app.post("/api/courses",(req, res)=>{
    // add data to be added to the database.
})

app.get('/login',(req, res)=>{
    res.sendFile(path.join(__dirname, 'frontend','login.html'))
})
TODO: "CONNECT TO DATABASE"

app.get('/api/courses', (req, res)=>{
    // using asynchronous readfile
    fs.readFile( './modules/database.json', "utf-8", (error, datastring)=>{
        if (error){
            console.error('Error reading file:', error);
            res.status(500).send('Internal Server Error');
            return;
        } 
        try{
            // convert a sting to a JSON object
            const info = JSON.parse(datastring);
            // Send the JSON data as a response
            res.json(info);
            }
            // If it throws an error console log the error.
            catch (error){
            console.error('Error parsing JSON data:', error);
            res.status(500).send('Internal Server Error');
            }
        })
})
TODO: "get by id"
// app.get("/api/courses/:id",(req, res)=>{

// })

// app.patch("/api/:id",(req, res)=>{

// })

app.post('/login',(req, res)=>{
    const { username, password } = req.body;
    console.log(req.body)
    // console.log(username,password)
  if(password === 'password123' && username === 'admin'){
    req.session.isAuthenticated = true;
    res.redirect('/node-course.html')}
    else{
        res.send('login was incorrecct')
    }
})

app.get('/node-course.html', (req, res)=>{
    res.sendFile(path.join(__dirname, 'nodejs_course.html'))
})

app.listen(4000,()=>{
    console.log("Server is running.")
})

