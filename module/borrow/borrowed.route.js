const express = require('express');
const borrowedRoutes = express.Router();
const { 
    getBorrowedLists, 
    addBorrowList, 
    deleteBorrowedList, 
    updateBorrowedList 
} = require('./requests.controller');

borrwedRoutes
    .route('/')
    .get(getBorrowedLists)
    .post(addBorrowList);

borrwedRoutes
    .route('/:id')
    .delete(deleteBorrowedList)
    .patch(updateBorrowedList);

export { borrowedRoutes };