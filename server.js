const express = require('express');
const hbs = require('hbs');
var fs = require('fs');

const port = process.env.PORT || 8080;

var app = express();

hbs.registerPartials(__dirname + '/views')

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
})

hbs.registerHelper('message', (text) => {
	return text.toUpperCase();
})

app.use((request, response, next) => {
	var time = new Date().toString();
	var log = '${time}: ${request.method} ${request.url}';
	fs.appendFile('server.log', log + '\n', (error) => {
		if (error) {
			console.log('Unable to log message');
		}
	});
	next();
});

app.use((request, response, next) => {
	response.render('nope.hbs');
});

app.get('/', (request, response) => {
	// response.send('<h1>Hello Express!</h1>');
	response.send({
		name: 'Sam Hadavi',
		school: [
			'British Columbia Institude of Technology',
			'CIT',
			'2B'
				],
		ambitions: 'none'
	})
});

app.get('/main', (request, response) => {
	response.render('main.hbs', {
		title: 'main page',
		year: new Date().getFullYear(),
	});
});

app.get('/about', (request, response) => {
	response.render('about.hbs', {
		title: 'about page',
		year: new Date().getFullYear(),
		picture: 'https://vignette.wikia.nocookie.net/onepiece/images/0/04/Enel_Shocked_Face.png/revision/latest?cb=20131212015841'
	});
});

app.listen(port, () => {
	console.log('Server of port ${port} wants to punch you');
});