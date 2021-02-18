const express = require('express'),
	path = require('path'),
	app = express();

app.use(express.static('client'));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(8080, () => {
	console.log('Server started!');
});
