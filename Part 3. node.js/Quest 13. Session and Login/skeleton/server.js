const express = require('express'),
    path = require('path'),
    app = express();
const fs = require('fs');
const session = require('express-session');

app.use(express.json());
app.use(express.static('client'));

app.use(session({
    key: 'sid',
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 600000}
}));

// Built -in express
app.get('/', (req, res) => {
    console.log(req.session);
    if (req.session.user) {
        console.log("로그인 되어있음");
        res.redirect('/Notepad.html');
    } else {
        console.log("로그인 되어있지 않음");
        res.sendFile(path.join(__dirname, '/client/Login.html'));
    }
});

// Login Function
app.post('/login', (req, res) => {
    const ID = ["1234", "thddbsals", "sms8377"];
    const PW = ["1234", "4321", "8704"];
    const NAME = ["Song", "Yun", "Min"];
    const ID_INDEX = ID.indexOf(req.body.id);
    const PW_INDEX = PW.indexOf(req.body.pw);
    if (ID_INDEX === PW_INDEX && (ID_INDEX + PW_INDEX) > -1) {
        if (!req.session.user) {
            console.log("Session Not Found... Create Session.");
            req.session.user = {
                id: ID[ID_INDEX],
                pw: PW[PW_INDEX],
                nickname: NAME[ID_INDEX],
                authorized: true
            }
        }
        res.send(req.session.user.nickname);
    } else {
        res.send('False');
        return -1;
    }
});

// Logout Function
app.get('/logout', (req, res) => {
    if (req.session.user) {
        console.log("Logout...");
        req.session.destroy(err => {
                if (err) {
                    console.log("Failed to delete session");
                    return -1;
                }
                console.log("Session deletion successful");
                res.send("OK");
                return 1;
            }
        )
    }
});

app.get('/Notepad', (req, res) => {
    if (req.session.user) {
        console.log("Session...OK");
        try {
            const userData = fs.readFileSync(`./data/user/${req.session.user.id}.txt`, "UTF-8");
            res.send(userData);
            return 1;
        } catch {
            res.send({DATA : "DATA_NOT_FOUND"});
            return -1;
        }
    } else {
        console.log("Session Not Found");
        res.send("False");
    }
})

// Save Function
app.post('/save-notepad', (req, res) => {
    if (req.body.name.indexOf('../') !== -1) {
        res.send("Unable to access.");
        return -1;
    }
    // Session Check
    if (!req.session.user) {
        res.send("False");
        return -1;
    }

    const input = {
        name: req.body.name,
        memo: req.body.memo,
        index: req.body.activeIndex
    }

    try {
        fs.accessSync(`./data/notepad/${req.body.name}.txt`, fs.constants.F_OK);
    } catch {
        fs.writeFile(`./data/notepad/${req.body.name}.txt`, '', (err) => {
            if (err) {
                console.log("File creation failed : ", err);
            } else {
                console.log("Make Notepad File");
            }
        });
    }

    try {
        fs.writeFileSync(`./data/notepad/${req.body.name}.txt`, JSON.stringify(input));
        console.log("File Write successful!");
    } catch {
        console.log("File Write Error!");
    }

    const data = {
        count: req.body.count,
        activeIndex: req.body.activeIndex,
        notepad: []
    }

    try {
        const existingData = JSON.parse(fs.readFileSync(`./data/user/${req.session.user.id}.txt`, 'UTF-8'));
        for (let i = 0; i < existingData.notepad.length; i++) {
            if (existingData.notepad[i].index === data.activeIndex) {
                existingData.notepad.splice(i, 1);
            }
        }

        existingData.notepad.push({
            name: req.body.name,
            memo: req.body.memo,
            index: req.body.activeIndex
        });

        data.notepad = existingData.notepad;
        fs.writeFileSync(`./data/user/${req.session.user.id}.txt`, JSON.stringify(data), 'UTF-8');
        res.send(data);
        return 1;
    } catch (err) {
        data.notepad.push(input);
        fs.writeFileSync(`./data/user/${req.session.user.id}.txt`, JSON.stringify(data), 'UTF-8');
        res.send({OK : "OK"});
        return -1;
    }
});

// Load Function
app.get('/load', (req, res) => {
    if (req.query.name.indexOf('../') !== -1) {
        console.log("Unable to access.");
        res.send("Unable to access.");
        return -1;
    }
    try {
        fs.accessSync(`./data/notepad/${req.query.name}.txt`, fs.constants.F_OK);
    } catch {
        res.send(JSON.stringify("FILE_NOT_FOUND"));
        return -1;
    }

    fs.readFile(`./data/notepad/${req.query.name}.txt`, 'UTF-8', function (err, data) {
        const textData = JSON.parse(data);
        res.send(textData);
        return 1;
    });
});

app.get('/delete', (req, res)=>{
    const newData = JSON.parse(req.query.data);
    console.log(newData);
    try{
        const existingData = JSON.parse(fs.readFileSync(`./data/user/${req.session.user.id}.txt`, 'UTF-8'));
        for(let i=0; existingData.notepad.length;i++){
            if(existingData.notepad[i].index === newData.index){
                existingData.notepad.splice(i,1);
                break;
            }
        }
        existingData.activeIndex = 0;
        existingData.count = newData.count;
        fs.writeFileSync(`./data/user/${req.session.user.id}.txt`, JSON.stringify(existingData), 'UTF-8');
        console.log("File modification complete");

        if(existingData.notepad.length === 0){
            fs.unlinkSync(`./data/user/${req.session.user.id}.txt`);
            res.send({OK : "OK"});
            return -1;
        }

        res.send({OK : "OK"});
        return 1;
    }catch (err){
        console.log(err);
        res.send({err : err});
        return -1;
    }

});

const server = app.listen(8080, () => {
    console.log('Server started!');
});