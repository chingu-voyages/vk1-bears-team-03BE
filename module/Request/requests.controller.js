const Request = require('./Request.model');

// @desc     Get all requests
// @route    GET /api/v1/requests

exports.getRequests = async (req, res, next) => {
    try {
        const requests = await Request.find().populate('item_name');

        return res.status(200).json({
            success: true,
            count: requests.length,
            data: requests
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
}

// @desc     Add request
// @route    POST /api/v1/requests

exports.addRequest = async (req, res, next) => {
    try {
        const { 
            user_id, 
            item_name, 
            request_type, 
            request_date,
            request_status 
        } = req.body;

        const request = await Request.create(req.body);
    
        return res.status(201).json({
            success: true,
            data: request
        });
    } catch (err) {
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);

            return res.status(400).json({
                success: false,
                error: messages
            });
        } else {
                return res.status(500).json({
                    success: false,
                    error: "Server Error"
                });
            }
        }

    }

// @desc     Delete request
// @route    GET /api/v1/requests/:id

exports.deleteRequest = async (req, res, next) => {
    try {
        const request = await Request.findById(req.params.id);

        if(!request){
            return res.status(404).json({
                success: false,
                error: 'No request found'
            });
        }

        await request.remove();
        return res.status(200).json({
            success: true,
            data: {}
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
}

// @desc     Update request
// @route    GET /api/v1/request/:id

exports.updateRequest = async (req, res, next) => {
    try {
        const request = await Request.findByIdAndUpdate(req.params.id);

        if(!request){
            return res.status(404).json({
                success: false,
                error: 'No request found'
            });
        }

        await request.updateOne(req.body);
        const updatedRequest = await Request.findById(req.params.id);
        return res.status(200).json({
            success: true,
            data: updatedRequest
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
}