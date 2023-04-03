const router = require('express').Router();
const { Post, User, Comment} = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

//get all posts
router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({
      // Query configuration
      attributes: ['id', 'title', 'content', 'created_at'],
      order: [['created_at', 'DESC']],
      include: [
        {
          model: User,
          attributes: ['username'],
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username'],
          },
        },
      ],
    });
    res.json(postData.reverse());
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get a single post
router.get('/:id', async (req, res) => {
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
            model: User,
            attributes: ['username']
          },
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
            include: {
              model: User,
              attributes: ['username']
            }
          }
        ]
      });
  
      if (!postData) {
        res.status(404).json({ message: 'No post found with this ID!' });
        return;
      }
  
      res.json(postData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
//create a post
router.post('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
        });
        res.json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//update a post
router.put('/:id', withAuth, async (req, res) => {
    try {
      const [rowsAffected] = await Post.update(
        {
          title: req.body.title,
          content: req.body.content
        },
        {
          where: {
            id: req.params.id
          }
        }
      );
  
      if (!rowsAffected) {
        res.status(404).json({ message: 'No post found with this ID!' });
        return;
      }
  
      res.json(rowsAffected);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//delete a post
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id 
            }
        });
        if (!postData) {
            res.status(404).json({ message: 'No post found with this ID!' });
            return;
        }
        res.json(postData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

module.exports = router;

  

