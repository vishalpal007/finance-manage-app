const asyncHandler = require("express-async-handler");
const validator = require("validator")
const Transaction = require("../modals/Transaction");
const jwt = require("jsonwebtoken")


exports.addTransaction = asyncHandler(async (req, res) => {

    const { amount, type, category, date, description } = req.body


    if (!validator.isNumeric(amount) || parseFloat(amount) <= 0) {
        return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    if (!validator.isIn(type, ['income', 'expense'])) {
        return res.status(400).json({ message: 'Type must be income or expense' });
    }

    if (!validator.isLength(category, { min: 1 })) {
        return res.status(400).json({ message: 'Category is required' });
    }

    const currentDate = new Date();
    const inputDate = new Date(date);

    if (!validator.isISO8601(date) || inputDate > currentDate) {
        return res.status(400).json({ message: 'Invalid date or date is in the future' });
    }


    let transactionId

    const token = req.cookies.finance

    jwt.verify(token, process.env.JWT_KEY, async (err, decode) => {
        transactionId = decode.userId
        await Transaction.create({ amount, type, category, date, description, transactionId })
        res.status(201).json({ message: "transaction add success" })
    })


})



exports.getTransaction = asyncHandler(async (req, res) => {
    let transactionId;

    const token = req.cookies.finance;

    jwt.verify(token, process.env.JWT_KEY, async (err, decode) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        transactionId = decode.userId;

        const { startDate, lastDate } = req.body;

        // Validate startDate and lastDate using validator
        if (!validator.isISO8601(startDate) || !validator.isISO8601(lastDate)) {
            return res.status(400).json({ message: 'Invalid date format' });
        }

        const result = await Transaction.find({
            transactionId,
            date: { $gte: startDate, $lte: lastDate }
        });

        res.status(200).json({ message: 'Transaction Fetch success', result });
    });
});



exports.getTransactionSummary = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (!validator.isMongoId(id)) {
        return res.status(400).json({ message: 'Invalid transaction ID' });
    }

    const result = await Transaction.findById(id);

    if (!result) {
        return res.status(404).json({ message: 'No Transaction Found' });
    }

    res.json({ message: 'Transaction Summary fetch Success', result });
});



exports.deleteTransaction = asyncHandler(async (req, res) => {

    const { id } = req.params


    if (!validator.isMongoId(id)) {
        return res.status(400).json({ message: 'Invalid transaction ID' });
    }


    await Transaction.findByIdAndDelete(id)

    res.json({ message: "Transaction delete Success" })
})