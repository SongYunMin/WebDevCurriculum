const express = require('express'),
    path = require('path'),
    app = express();
const fs = require('fs');
const session = require('express-session');

app.use(express.json());
app.use(express.static('client'));      // 정적 파일 제공

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
                name: NAME[ID_INDEX],
                authorized: true
            }
        }
        console.log(req.session.user);
        res.send(req.session.user.name);
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
            res.send("DATA_NOT_FOUND");
            return -1;
        }
    } else {
        console.log("Session Not Found");
        res.send("False");
    }
})

// Save Function
app.post('/save-notepad', (req, res) => {
    if (req.body.notepad.title.indexOf('../') !== -1) {
        res.send("Unable to access.");
        return -1;
    }
    const input = {
        title: req.body.notepad.title,
        memo: req.body.notepad.memo
    }

    req.session.user.mouse = req.body.mouse;
    req.session.user.count = req.body.count;
    req.session.user.activeIndex = req.body.activeIndex;
    req.session.user.notepad = input;           // 마지막 노트패드 값

    try {
        fs.accessSync(`./data/notepad/${req.body.notepad.title}.txt`, fs.constants.F_OK);
    } catch {
        fs.writeFile(`./data/notepad/${req.body.notepad.title}.txt`, '', (err) => {
            if (err) {
                console.log("File creation failed : ", err);
            } else {
                console.log("Make Notepad File");
            }
        });
    }


    try{
        fs.writeFileSync(`./data/notepad/${req.body.notepad.title}.txt`, JSON.stringify(input));
        console.log("File Write successful!");
    }catch{
        console.log("File Write Error!");
    }

    res.redirect("http://localhost:8080/save-user");
})

app.get('/save-user', (req, res) => {
    // Session Check
    if (!req.session.user) {
        console.log("Session Not Found");
        res.send("False");
    }

    const data = {
        id: req.session.user.id,                       // 유저의 이름
        mouse: req.session.user.mouse,                 // 마우스 위치값
        count: req.session.user.count,                 // 탭 생성 갯수
        activeIndex: req.session.user.activeIndex,     // 마지막 수정 Index
        notepad: req.session.user.notepad              // Notepad 내용
    }

    fs.writeFileSync(`./data/user/${req.session.user.id}.txt`, JSON.stringify(data), 'UTF-8');
    console.log("Create User Session Data");
    res.end();
})

// Load Function
app.get('/load', (req, res) => {
    if (req.query.name.indexOf('../') !== -1) {
        console.log("Unable to access.");
        res.send("Unable to access.");
        return -1;
    }
    try {
        fs.accessSync(`./data/${req.query.name}.txt`, fs.constants.F_OK);
    } catch {
        res.send(JSON.stringify("FILE_NOT_FOUND"));
        return -1;
    }

    fs.readFile(`./data/${req.query.name}.txt`, 'UTF-8', function (err, data) {
        const textData = JSON.parse(data);
        res.send(textData);
        return 1;
    });
});

const server = app.listen(8080, () => {
    console.log('Server started!');
});