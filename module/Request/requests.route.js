const express = require('express');
const requestRoutes = express.Router();
const { 
    getRequests, 
    addRequest, 
    deleteRequest, 
    updateRequest 
} = require('./requests.controller');

requestRoutes
    .route('/')
    .get(getRequests)
    .post(addRequest);

requestRoutes
    .route('/:id')
    .delete(deleteRequest)
    .patch(updateRequest);

export { requestRoutes };