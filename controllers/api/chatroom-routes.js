const Chatroom = require('../../models/Chatroom');
const router = require('express').Router();

router.get('/', (req, res) => {
    
    Chatroom.findAll({})
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    console.log(req.body)
    Chatroom.create({
        username: req.body.username,
        message: req.body.message
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.delete('/', (req, res) => {
    Chatroom.destroy({
        where: {
            id: req.body.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'The id was invalid check its value.' })
            return;
        }
        res.json(dbUserData)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;