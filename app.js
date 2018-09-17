const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Users


// Posts
// INDEX Post
app.get('/posts', (req, res) => {
	
});

// NEW Post
app.post('/users/:userId/posts', (req, res) => {

});

// SHOW Post
app.get('/users/:userId/posts/:postId', (req, res) => {

});

// UPDATE Post
app.put('/users/:userId/posts/:postId', (req, res) => {

});

// DESTROY Post
app.delete('/users/:userId/posts/:postId', (req, res) => {

});

// Comments


// Messages


app.listen(3000, () => console.log('Started listening on port 3000!'));
