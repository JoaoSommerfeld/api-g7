const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');

router.get('/', UserController.getUsers);
router.post('/', UserController.postUser);
router.get('/:id_user', UserController.getUmUser);
router.patch('/', UserController.patchUser);
router.delete('/', UserController.deleteUser);

module.exports= router;