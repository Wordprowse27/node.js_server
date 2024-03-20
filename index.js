import express from "express";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
// import databse from './Database';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("Public"));
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "Public", "login.html"));
});

app.get("/api/courses", (req, res) => {
  // using asynchronous readfile
  fs.readFile("./modules/database.json", "utf-8", (error, datastring) => {
    if (error) {
      console.error("Error reading file:", error);
      res.status(500).send("Internal Server Error");
      return;
    }
    try {
      // convert a sting to a JSON object
      const info = JSON.parse(datastring);
      // Send the JSON data as a response
      res.json(info);
    } catch (error) {
      // If it throws an error console log the error.
      console.error("Error parsing JSON data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
});
TODO: "get by id";
app.get("/api/courses/:id", (req, res) => {
  const courseId = +req.params.id;
  console.log(courseId);

  fs.readFile("./modules/database.json", "utf-8", (error, datastring) => {
    if (error) {
      console.error("Error reading file:", error);
      return res.status(500).send("Internal Server Error");
    }

    const courseDatabase = JSON.parse(datastring);
    const foundCourse = courseDatabase.find(course => course.id === courseId);
    // console.log(foundCourse)
    if (foundCourse) {
      // If course is found, send it as response
      res.send(foundCourse);
    } else {
      // If course is not found, send appropriate error response
      res.status(404).send("Course not found");
    }
  });
});

// code?????
TODO: "send json data to the database";
app.post("/api/courses", (req, res) => {
  // Read existing JSON data from the file
  const user_data = req.body;
  console.log(user_data);
  fs.readFile("./modules/database.json", "utf-8", (err, string) => {
    if (err) {
      console.error("Error reading file:", err);
      res.status(500).send("Internal Server Error");
    }
    try {
      let database = JSON.parse(string);
      database.push(user_data);
      fs.writeFile(
        "./modules/database.json",
        JSON.stringify(database, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing file:", err);
            res.status(500).send("Internal Server Error");
          }

          // console.log(database)
          res.send("Data appended to file successfully");
        }
      );
    } catch (error) {
      // If it throws an error console log the error.
      console.error("Error parsing JSON data:", error);
      res.status(500).send("Internal Server Error");
    }
  });
});

TODO: "change entries";
app.patch("/api/courses/:id", (req, res) => {
  let courseid = +req.params.id;
  console.log(courseid);
  fs.readFile("./modules/database.json", "utf-8", (error, datastring) => {
    if (error) {
      console.error("Error reading file:", error);
      res.status(500).send("Internal Server Error");
      return;
    }
      const course_database = JSON.parse(datastring);
      // console.log(course_database, courseid)
      // Send the JSON data as a response
      const patchbyid = course_database.find(course => course.id === courseid);

    if (patchbyid) {
      patchbyid.title = req.body.title
      console.log(course_database)
          fs.writeFile(
            "./modules/database.json",
            JSON.stringify(course_database, null, 2),
            (err) => {
              if (err) {
                console.log("Failed to write update the data to the file.");
                return;
              }
              res.send("Upated file successfully");
            }
          );
          }else{
              res.send("AN ERROR OCCURED WHILE CARRYING OUT THE OPERATION.")
          }
      })
    });
  

TODO: "CREATE A DELETE ROUTE";
app.delete("/api/courses/:id", (req, res) => {
  let courseid = +req.params.id;
  fs.readFile("./modules/database.json", "utf-8", (error, datastring) => {
    if (error) {
      console.error("Error reading file:", error);
      res.status(500).send("Internal Server Error");
      return;
    }
      const course_database = JSON.parse(datastring);
      // console.log(course_database, courseid)
      // Send the JSON data as a response
      // const patchbyid = course_database.find(course => course.id === courseid);

    if (1) {
      course_database.splice(courseid-1, 1)
    }
          fs.writeFile(
            "./modules/database.json",
            JSON.stringify(course_database, null, 2),
            (err) => {
              if (err) {
                console.log("Failed to write update the data to the file.");
                return;
              }
              res.send("Upated file successfully");
            }
          );
      })
    });
  
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  // console.log(username,password)
  if (password === "password123" && username === "admin") {
    // req.session.isAuthenticated = true;
    res.redirect("/node-course.html");
  } else {
    res.send("login was incorrecct");
  }
});

app.get("/node-course.html", (req, res) => {
  res.sendFile(path.join(__dirname, "nodejs_course.html"));
});

app.listen(4000, () => {
  console.log("Server is running.");
});
