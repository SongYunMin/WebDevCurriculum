const express = require('express'),
	path = require('path'),
	app = express();
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(express.static('client'));

fs.access('./notepad.txt', fs.constants.F_OK, (err =>{
	if(err){
		fs.writeFile('./notepad.txt', '', (err)=>{
			if(err){
				console.log("File creation failed : ", err);
			}else{
				console.log("Make Notepad File");
			}
		})
	}else{
		console.log("Notepad file already exists.");
	}
}));

// Built -in express
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

// Save Function
app.post('/save', (req, res) => {
	let obj = {table : []};
	const input = {
		title: req.body.title,
		memo: req.body.memo
	}
	fs.readFile('./notepad.txt', 'UTF-8', function(err, data){
		if(data !== '') {			// 파일이 비지 않았다면
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
app.get('/load',(req, res) =>{
	fs.readFile('./notepad.txt', 'UTF-8',function(err, data){
		console.log(data);
		res.send(data);
	})
});

const server = app.listen(8080, () => {
	console.log('Server started!');
});
