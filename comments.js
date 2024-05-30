// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Create a list of comments
const comments = [
    {
        id: 1,
        comment: 'Comment 1'
    },
    {
        id: 2,
        comment: 'Comment 2'
    },
    {
        id: 3,
        comment: 'Comment 3'
    },
    {
        id: 4,
        comment: 'Comment 4'
    },
    {
        id: 5,
        comment: 'Comment 5'
    }
];

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
    }
    res.json(comment);
});

// Create a new comment
app.post('/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        comment: req.body.comment
    };
    comments.push(comment);
    res.json(comment);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
    }
    comment.comment = req.body.comment;
    res.json(comment);
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
    const comment = comments.find(c => c.id === parseInt(req.params.id));
    if (!comment) {
        res.status(404).send('The comment with the given ID was not found.');
    }
    const index = comments.indexOf(comment);
    comments.splice(index, 1);
    res.json(comment);
});

// Listen on port 3000
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});