const express = require('express'),
    path = require('path'),
    app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static('client'));

// TODO : 읽는 곳에 문제 있는 듯 함
fs.access('./notepad.txt', fs.constants.F_OK, (err => {
    if (err) {
        fs.writeFile('./notepad.txt', '', (err) => {
            if (err) {
                console.log("File creation failed : ", err);
            } else {
                console.log("Make Notepad File");
            }
        });
    } else {
        console.log("Notepad file already exists.");
    }
}));

// Built -in express
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Save Function
app.post('/save', (req, res) => {
    let obj = {table: []};
    const input = {
        title: req.body.title,
        memo: req.body.memo
    }
    fs.readFile('./notepad.txt', 'UTF-8', function (err, data) {
        if (data !== '') {
            obj = JSON.parse(data);
        }
        obj.table.push(input);
        let json = JSON.stringify(obj);
        fs.writeFile('./notepad.txt', json, function (err) {
            if (err) {
                console.log("File Write Error!");
            } else {
                console.log("File Write successful!");
            }
        });
    });
});

// Load Function
app.get('/load', (req, res) => {
    fs.readFile('./notepad.txt', 'UTF-8', function (err, data) {
        const textData = JSON.parse(data);
        const search = req.query.name;
        for (let i = 0; i < textData.table.length; i++) {
            if(textData.table[i].title === search){
                res.send(textData.table[i]);
                return 1; // [FIX] : return 을 입력하지 않아서 중복 response 됨.
            }
        }
        res.send("False");
    })
});

const server = app.listen(8080, () => {
    console.log('Server started!');
});
