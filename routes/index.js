const express = require('express');
const router = express.Router();



// In-memory storage for posts and events
const posts = [];
const events = [];
// In-memory storage for polls and votes
let polls = [];

// Home page route
router.get('/', (req, res) => {
    res.render('home', { posts: posts });
});

// Group page route
router.get('/group', (req, res) => {
  res.render('group', { polls });
});


// Handle post creation
router.post('/create-post', (req, res) => {
    const { title, content } = req.body;
    const newPost = { title, content, comments: [], likes: 0, date: new Date() };
    posts.push(newPost);
    res.redirect('/');
});

// Handle event creation
router.post('/create-event', (req, res) => {
    const { title, description } = req.body;
    const newEvent = { title, description, date: new Date() };
    events.push(newEvent);
    res.redirect('/group');
});

// Serve the comment page
router.get('/post/:postId/comments', (req, res) => {
    const { postId } = req.params;
    const post = posts[postId];
    if (post) {
        res.render('comments', { post: post, postId: postId });
    } else {
        res.status(404).send('Post not found');
    }
});

// Handle comment creation on the separate comment page
router.post('/post/:postId/comment', (req, res) => {
    const { postId } = req.params;
    const { comment } = req.body;
    const post = posts[postId];
    if (post) {
        post.comments.push({ content: comment, date: new Date() });
        res.redirect(`/post/${postId}/comments`);
    } else {
        res.status(404).send('Post not found');
    }
});

// Handle like button click
router.post('/post/:postId/like', (req, res) => {
    const { postId } = req.params;
    const post = posts[postId];
    if (post) {
        post.likes += 1;
        res.redirect(`/post/${postId}/comments`);
    } else {
        res.status(404).send('Post not found');
    }
});

router.post('/submit-poll', (req, res) => {
  const { question } = req.body;
  const newPoll = {
    question,
    votes: { yes: 0, no: 0 },
  };
  polls.push(newPoll);
  res.redirect('/group');
});

router.post('/vote-poll', (req, res) => {
  const { vote, question } = req.body;
  const poll = polls.find(p => p.question === question);

  if (poll) {
    if (vote === 'Yes') {
      poll.votes.yes++;
    } else if (vote === 'No') {
      poll.votes.no++;
    }
  }

  res.redirect('/group');
});



module.exports = router;
