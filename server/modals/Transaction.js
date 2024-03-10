const mongoose = require("mongoose")


const transactionSchema = new mongoose.Schema({

    transactionId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    category: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String
    },

    startDate: {
        type: Date
    },


    lastDate: {
        type: Date
    }

}, { timestamps: true })


module.exports = mongoose.model("transaction", transactionSchema)