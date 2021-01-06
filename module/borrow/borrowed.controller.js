const Borrow = require('./Borrow.model');

// @desc     Get all borrow lists
// @route    GET /api/v1/borrowedlists

exports.getBorrowedLists = async (req, res, next) => {
    try {
        const requests = await Borrow.find().populate('item_name').populate('user_name', '-password');

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

// @desc     Add borrow record
// @route    POST /api/v1/borrowlists

exports.addBorrowList = async (req, res, next) => {
    try {
        const { 
            user_id, 
            item_name, 
            request_type, 
            request_date,
            request_status 
        } = req.body;

        const request = await Borrow.create(req.body);
    
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

// @desc     Delete Borrow List
// @route    GET /api/v1/requests/:id

exports.deleteBorrowedList = async (req, res, next) => {
    try {
        const borrowlist = await Borrow.findById(req.params.id);

        if(!borrowlist){
            return res.status(404).json({
                success: false,
                error: 'No borrow list found'
            });
        }

        await borrowlist.remove();
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

// @desc     Update borrowlist
// @route    GET /api/v1/request/:id

exports.updateBorrowedList = async (req, res, next) => {
    try {
        const borrowlist = await Borrow.findByIdAndUpdate(req.params.id);

        if(!borrowlist){
            return res.status(404).json({
                success: false,
                error: 'No borrow list found'
            });
        }

        await borrowlist.updateOne(req.body);
        const updatedBorrowList = await Borrow.findById(req.params.id);
        return res.status(200).json({
            success: true,
            data: updatedBorrowList
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            error: "Server Error"
        });
    }
}