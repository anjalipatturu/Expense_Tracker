const express = require("express");

const {
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    getSummary
} = require("../controllers/transactionController");

const router = express.Router();


// Dashboard summary
router.get("/summary", getSummary);


// Get all transactions
router.get("/", getTransactions);


// Add transaction
router.post("/", addTransaction);


// Update transaction
router.put("/:id", updateTransaction);


// Delete transaction
router.delete("/:id", deleteTransaction);


module.exports = router;