const express = require('express')
const cors = require('cors')
const uuid = require('uuid')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mysql = require("mysql")
const upload = require('express-fileupload')
const asyncHandler = require('express-async-handler')
const fs = require('fs');
const fsPromises = require('fs').promises
var json2xls = require('json2xls');
var isJson = require('is-json')

var path = require('path');
require("dotenv").config()
const app = express()



var mysqlConnection = mysql.createConnection({
    host: "localhost",
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    multipleStatements: true
});
mysqlConnection.connect((err) => {
    if (!err) {
        console.log("connected to database");
    }
    else {
        console.log("error while connecting to database")
        console.log(err);
    }
})




app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.set('views', 'views')
app.set("view engine", "ejs")
app.use(express.static('views'));
express.static('/public')
app.use(express.static(__dirname + '/public'));
app.use(upload())

var json = {
    foo: 'bar',
    qux: 'moo',
    poo: 123,
    stux: new Date()
}

// var xls = json2xls(json);

// fs.writeFileSync('data.xlsx', xls, 'binary');

app.post('/api/jsontoexcel/:uniqueid', async (req, res) => {

    console.log(req.body.data)
    var id = JSON.parse(req.params.uniqueid)
    console.log(JSON.parse(req.params.uniqueid))
    var jsondata = JSON.stringify(req.body.data)
    var exceloutput = id + "output.xlsx"

    if (isJson(jsondata)) {
        var xls = await json2xls(JSON.parse(jsondata));

        await fs.writeFileSync(path.join("uploads", path.join(id, exceloutput)), xls, 'binary');
        // res.download(exceloutput)
        res.download(path.join("uploads", path.join(id, exceloutput)), (err) => {
            if (err) {
                fs.unlinkSync(path.join("uploads", path.join(id, exceloutput)))
                res.send("Unable to download the excel file")
            }
            // fs.unlinkSync(exceloutput)
            console.log("xl sheet downloaded")
        })
    }
    else {
        res.send("JSON Data is not valid")
    }

})

app.get('/api/download/:uniqueid/:filename', (req, res) => {
    console.log(req.params.filename)
    filename = JSON.parse(req.params.filename)
    let file = path.join(path.dirname("uploads/upload"), req.params.uniqueid)
    console.log(file)
    filepath = path.join(__dirname, path.join(file, filename))
    console.log(filepath)
    fs.access(filepath, fs.constants.F_OK, err => {
        //check that we can access  the file
        console.log(`${filename} ${err ? "does not exist" : "exists"}`);
    });
    res.download(filepath)


    // fs.readFile(filepath, function (err, content) {
    //     if (err) {
    //         res.writeHead(404, { "Content-type": "text/html" });
    //         res.end("<h1>No such image</h1>");
    //     } else {
    //         //specify the content type in the response will be an image
    //         res.writeHead(200, { "Content-type": "image/jpg" });
    //         res.end(content);
    //     }
    // });

})

app.post('/api/login', (req, res) => {

    console.log(req.body)
    username = req.body.username
    password = req.body.password
    let sql = "SELECT * FROM users WHERE username='" + username + "' AND password='" + password + "'";
    console.log(sql)
    mysqlConnection.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            res.send({ "message": err })
        }
        else {
            console.log(result)
            if (result != "") {

                res.send({ "message": "login successfull", })
                // res.render('Home')
            }
            else {
                console.log("Incorrect credentials\n---------------------------------------------------------------")
                res.send({ "message": "Incorrect credentials" })
            }
        }

    })

})



app.get("/login", (req, res) => {
    res.render('login', { "username": req.params.username })
})
app.get("/Dashboard/:username", (req, res) => {

    res.render('Dashboard', { "username": req.params.username })
})
app.get("/formbuilder/:username/:uniqueid", (req, res) => {
    console.log(req.params)
    if (req.params.uniqueid == "newform") {
        console.log(req.params.username)
        console.log("newform")
        var newuniqueid = uuid.v4();
        res.render('formbuilder', { uniqueid: newuniqueid, username: req.params.username })
    }
    else {
        res.render('formbuilder', { uniqueid: req.params.uniqueid, username: req.params.username })
    }
})
app.get("/form/:id", (req, res) => {
    console.log(req.params.id)
    res.render("form", { uniqueid: req.params.id })
})

app.post("/api/getallforms", (req, res) => {
    console.log(req.body.name)
    // res.render('form')
    // username = JSON.stringify(req.body.name)
    username = req.body.name
    sql = "select * from form where username=" + username + ";"
    console.log(sql)
    mysqlConnection.query(sql, (err, result) => {
        if (err) {
            console.log("got an error :" + err)
            res.send({ "message": err })
        }

        else {
            console.log(result)
            // console.log(result[0].formelements)

            if (result.length == 0) {
                res.send({ "forms": "" })
            }
            else {
                res.send({ "forms": result })
            }
        }
    })

})


app.post("/api/getform", (req, res) => {
    // console.log(req.params.id)
    // res.render('form')
    requniqueid = req.body.uniqueid
    sql = "select * from form where uniqueid='" + requniqueid + "';"
    mysqlConnection.query(sql, (err, result) => {
        if (err) {
            console.log("got an error :" + err)
            res.send({ "message": err })
        }

        else {
            console.log(result)
            // console.log(result[0].formelements)

            if (result.length == 0) {
                res.send({ formelements: "Not valid url" })
            }
            else {
                res.send({ formelements: result[0].formelements, uniqueid: result[0].uniqueid })
            }
        }
    })

})

app.post("/api/fetchresponses", (req, res) => {

    console.log(req.body)
    uniqueid = req.body.uniqueid;
    console.log(uniqueid)
    // sql = "SELECT * FROM responses WHERE uniqueid='" + uniqueid + "'";
    sql = "select * from responses where uniqueid='" + uniqueid + "';"
    console.log(sql)
    mysqlConnection.query(sql, (err, result) => {
        if (err) {
            console.log("got an error :" + err)
            res.send({ "message": err })
        }
        else {

            console.log(result)
            res.send({ "message": result })
        }
    })


})
app.delete("/api/deleteform", (req, res) => {

    console.log(req.body)
    uniqueid = req.body.uniqueid;
    sql = "DELETE FROM form WHERE uniqueid='" + uniqueid + "';DELETE FROM responses WHERE uniqueid='" + uniqueid + "';";
    console.log(sql)
    mysqlConnection.query(sql, async (err, result) => {
        if (err) {
            console.log("got an error :" + err)
            res.send({ "message": err })
        }
        else {
            console.log(path.dirname("/uploads/upload"))
            try {
                await fsPromises.rmdir(path.join(path.dirname("uploads/upload"), uniqueid), {
                    recursive: true
                })
            }
            catch (err) {
                console.log(err)
            }
            // fs.rmdir(path.join(path.dirname("uploads/upload"), uniqueid), function (err) {
            //     if (err) {
            //         throw err
            //     } else {
            //         console.log("Successfully removed the empty directory!")
            //     }
            // })
            console.log(result)
            res.send({ "message": result })
        }
    })


})

app.post("/api/recieve", (req, res) => {

    console.log(req.body)
    username = req.body.username;
    formelements = JSON.stringify(req.body.formelements);
    uniqueid = req.body.uniqueid;
    if (formelements != undefined && username != undefined && formelements != "") {
        // sql = "INSERT INTO form (uniqueid,username, formelements) VALUES ('" + uniqueid + "','" + username + "','" + formelements + "')";
        sql = "DELETE FROM form WHERE uniqueid='" + uniqueid + "';INSERT INTO form (uniqueid,username, formelements) VALUES ('" + uniqueid + "','" + username + "','" + formelements + "')";

        // console.log(sql)
        console.log(uniqueid)
        // console.log(sql)
        // console.log(typeof formelements)


        mysqlConnection.query(sql, (err, result) => {
            if (err) {
                console.log("got an error :" + err)
                res.send({ "message": err })
            }
            else {
                // console.log(result)
                console.log(path.dirname("server/uploads/upload"))
                fs.mkdir(path.join(path.dirname("uploads/upload"), uniqueid),
                    { recursive: true }, (err) => {
                        if (err) {
                            return console.error(err);
                        }
                        console.log('Directory ' + uniqueid + ' created successfully!');
                    });
                res.send({ "message": "success", "uniqueid": uniqueid })
            }
        })
    }
    else {
        res.send({ "message": "something went wrong" })
    }
})

app.post("/api/formresponse/:uniqueid", async (req, res) => {

    console.log(req.body)
    const uniqueid = JSON.parse(req.params.uniqueid);
    const response = req.body;
    const filespresent = req.files

    console.log(response)
    console.log(uniqueid)
    if (filespresent) {
        console.log("files present")
        console.log(req.files)
        var arr = await Object.keys(req.files)
        var j = 0
        console.log(arr)
        for (const i in req.files) {
            var file = await req.files[i]
            // console.log(file)
            var filename = await file.name
            console.log(arr[j] + " " + file.name)
            req.body[arr[j]] = await file.name;
            j = j + 1
            await file.mv('./uploads/' + uniqueid + '/' + filename, function async(err) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("file uploaded")
                    // req.body.push({name:filename})
                    console.log(req.body)
                    // response.push({ "name": "asdfg" })
                }
            })
        }
    }

    // response = JSON.stringify(req.body);

    sql = "INSERT INTO responses (uniqueid,response) VALUES ('" + uniqueid + "','" + JSON.stringify(response) + "')";
    console.log(sql)
    mysqlConnection.query(sql, (err, result) => {
        if (err) {
            console.log("got an error :" + err)
            res.send({ "message": err })
        }
        else {
            // console.log(result)
            res.send({ "message": "success" })
        }
    })


})



app.listen(process.env.port, () => {
    console.log("serve started at port : " + process.env.port)
})