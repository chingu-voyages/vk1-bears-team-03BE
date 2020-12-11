const express = require('express');
const router = express.Router();
const { getUsers, addUser, deleteUser, updateUser } = require('../controllers/users');

router
    .route('/')
    .get(getUsers)
    .post(addUser);

router
    .route('/:id')
    .delete(deleteUser) 
    .patch(updateUser);

module.exports = router;