const { getTransaction, addTransaction, getTransactionSummary, deleteTransaction } = require("../controller/transactionController")

const router = require("express").Router()

router
    .post("/transactions", getTransaction)
    .get("/transactions/:id", getTransactionSummary)
    .delete("/transactions/:id", deleteTransaction)
    .post("/add-transactions", addTransaction)


module.exports = router