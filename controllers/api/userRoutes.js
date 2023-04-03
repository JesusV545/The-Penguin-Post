const router = require('express').Router();
const { User, Post, Comment } = require('../../models');

//need to get all users
router.get('/', async (req, res) => {
    try {
      const userData = await User.findAll({
        attributes: { exclude: ['[password']}
      });
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
//need to get individual users
router.get('/:id', async (req, res) => {
    try {
        const userData = await User.findOne({
            attributes: { exclude: ['password'] },
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Post,
                    attributes: [
                        'id', 
                        'title', 
                        'content', 
                        'created_at'
                    ]
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'created_at'],
                    include: {
                        model: Post,
                        attributes: ['title']
                    }
                },
                {
                    model: Post,
                    attributes: ['title'],
                }
            ]
        });

        if (!userData) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//need to create new users using post
router.post('/', async (req, res) => {
    try {
      const { username, password } = req.body;
      const userData = await User.create({ username, password });
  
      await new Promise((resolve, reject) => {
        req.session.save(err => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
  
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
  
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//need to identify the users
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({
        where: {
          username: req.body.username,
        },
      });
      if (!userData) {
        res.status(400).json({ message: 'No user with that username!' });
        return;
      }
      const validPassword = userData.checkPassword(req.body.password);
      if (!validPassword) {
        res.status(400).json({ message: 'Incorrect password!' });
        return;
      }
      await new Promise((resolve, reject) => {
        req.session.save((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.loggedIn = true;
      res.json({ user: userData, message: 'You are now logged in!' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });

//logout the user
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

//updates the user
router.put('/:id', async (req, res) => {
    try {
        const [rowsUpdated, [updatedUserData]] = await User.update(req.body, {
            individualHooks: true,
            returning: true,
            where: {
                id: req.params.id
            }
        });

        if (!rowsUpdated) {
            res.status(404).json({ message: 'No user found with this id' });
            return;
        }

        res.json(updatedUserData);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

//deletes a user
router.delete('/:id', async (req, res) => {
    try {
      const userData = await User.destroy({
        where: {
          id: req.params.id
        }
      });
      if (!userData) {
        res.status(404).json({ message: 'No user found with this id'});
        return;
      }
      res.json(userData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
  module.exports = router;
  
