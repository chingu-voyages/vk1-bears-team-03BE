const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { assetModel } = require("../Asset/Asset.model");

const RequestSchema = new Schema({
    user_name: {
        type: Schema.Types.ObjectId, 
        ref: 'User',
        required: [true, 'Please specify the owner of this request']
    },
    item_name: {
        type: Schema.Types.ObjectId, 
        ref: assetModel,
        required: [true, 'Please specify the item associated with this request']
    },
    request_type: {
        type: String,
        trim: true,
        enum: ['Borrow', 'Return'],
        default: "Available",
        required: true
    },
    request_date: {
        type: Date,
        default: Date.now
    },
    request_status: {
        type: String,
        trim: true,
        enum: ['Pending', 'Approved', 'Denied', 'Archived'],
        default: "Pending"
    },  
},
{
  versionKey: false,
  timestamps: true,
}
);

module.exports = mongoose.model('Request', RequestSchema);