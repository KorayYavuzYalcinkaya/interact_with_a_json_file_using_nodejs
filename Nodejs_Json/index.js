const express = require('express')
const fs = require('fs')
const url = require('url')
const app = express()
const port = 3000
var X

app.get('/', function (req, res) {
    if (req.query.input != undefined) {//Veri vermek

        fs.readFile(__dirname + "/depo.json", 'utf8', (err, veri) => {

            if(veri == ""){
                X = {}
            }else {
                X = JSON.parse(veri)
            }

            X[req.query.key] = req.query.input

            X = JSON.stringify(X)

            fs.writeFile(__dirname + "/depo.json", X, err => {

                console.log("Veri başariyla yazildi")

            });

        });

        res.send("<script>window.location.href = 'http://127.0.0.1:"+port+"/';</script>")

    } else if (req.query.key != undefined) {//Veri almak

        fs.readFile(__dirname + "/depo.json", 'utf8', (err, veri) => {

            if (JSON.parse(veri)[req.query.key] != undefined) {

                res.send("<h1>" + JSON.parse(veri)[req.query.key] + "</h1>");

            } else {

                res.send("<h1>Boyle bir key bulunmamakta</h1>")

            }

        });

    } else {

        res.sendFile(__dirname + "/index.htm")

    }
})

app.get('/:key', function (req, res) {

    res.send("key girdin")

})

app.get('/:input', function (req, res) {

    res.send("input girdin")

})

app.listen(port, () => {

    console.log(`Server running at http://127.0.0.1:${port}/`);

})