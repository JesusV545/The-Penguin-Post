const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const router = require('express').Router();

//need to create a route that gets all the posts
router.get('/', async (req, res) => {
    try {
      const postData = await Post.findAll({
        attributes: [
          'id',
          'title',
          'content',
          'created_at'
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      });
      const posts = postData.map(post => post.get({ plain: true }));
      res.render('homepage', { posts, loggedIn: req.session.loggedIn });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
//need to create a route that reroutes to the login page
router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return; 
    }
    res.render('login');
});

//need to create a route that reroutes to the signup page
router.get('/signup', (req, res) => {
    res.render('signup');
});

//need to create a route that reroutes a single post page
router.get('/post/:id', async (req, res) => {
    try {
      const postData = await Post.findOne({
        where: {
          id: req.params.id
        },
        attributes: [
          'id',
          'content',
          'title',
          'created_at'
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      });
      if (!postData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      const post = postData.get({ plain: true });
      console.log(post);
      res.render('singlepost', { post, loggedIn: req.session.loggedIn});
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
//need to create a route that reroutes user to their posts with comments
router.get('/posts-comments', async (req, res) => {
    try {
      const dbPostData = await Post.findOne({
        where: {
          id: req.params.id
        },
        attributes: [
          'id',
          'content',
          'title',
          'created_at'
        ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          },
          {
            model: User,
            attributes: ['username']
          }
        ]
      });
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      const post = dbPostData.get({ plain: true });
      res.render('comments', { post, loggedIn: req.session.loggedIn});
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  

module.exports = router;