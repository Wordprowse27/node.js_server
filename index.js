import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';



const app = express();
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'));
app.use(express.static('public'))


app.get('/login',(req, res)=>{
    res.sendFile(path.join(__dirname, 'public','login.html'))
})

app.post('/login',(req, res)=>{
    const { username, password } = req.body;
    console.log(req.body)
    // console.log(username,password)
  if(password === 'password123' && username === 'admin'){
    
    res.redirect('/node-course.html')}
    else{
        res.send('login was incorrecct')
    }
})

// app.get('/node-course.html',(req, res)=>{
//     res.redirect('./login.html')
// })

app.listen(4000,()=>{
    console.log("Server is running.")
})

