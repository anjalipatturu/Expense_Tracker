const Transaction = require("../models/Transaction");

// Add transaction
const addTransaction = async (req, res) => {
    try {
        const {
            title,
            amount,
            type,
            category,
            date
        } = req.body;

        const transaction = await Transaction.create({
            title,
            amount,
            type,
            category,
            date
        });

        res.status(201).json({
            success: true,
            message: "Transaction added successfully",
            data: transaction
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add transaction",
            error: error.message
        });
    }
};

// Get all transactions
const getTransactions = async (req, res) => {
    try {
        const transactions = await Transaction
            .find()
            .sort({ date: -1 });

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch transactions",
            error: error.message
        });
    }
};

// Update transaction
const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        const transaction =
            await Transaction.findByIdAndUpdate(
                id,
                req.body,
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Transaction updated successfully",
            data: transaction
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update transaction",
            error: error.message
        });
    }
};

// Delete transaction
const deleteTransaction = async (req, res) => {
    try {
        const { id } = req.params;

        const transaction =
            await Transaction.findByIdAndDelete(id);

        if (!transaction) {
            return res.status(404).json({
                success: false,
                message: "Transaction not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Transaction deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete transaction",
            error: error.message
        });
    }
};

// Get financial summary
const getSummary = async (req, res) => {
    try {
        const transactions = await Transaction.find();

        let totalIncome = 0;
        let totalExpenses = 0;

        transactions.forEach((transaction) => {
            if (transaction.type === "income") {
                totalIncome += transaction.amount;
            }

            if (transaction.type === "expense") {
                totalExpenses += transaction.amount;
            }
        });

        const balance = totalIncome - totalExpenses;

        res.status(200).json({
            success: true,
            data: {
                totalIncome,
                totalExpenses,
                balance
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to calculate summary",
            error: error.message
        });
    }
};

module.exports = {
    addTransaction,
    getTransactions,
    updateTransaction,
    deleteTransaction,
    getSummary
};