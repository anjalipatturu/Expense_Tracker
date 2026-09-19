import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/transactions";

function App() {
    const [transactions, setTransactions] = useState([]);

    const [summary, setSummary] = useState({
        totalIncome: 0,
        totalExpenses: 0,
        balance: 0
    });

    const [formData, setFormData] = useState({
        title: "",
        amount: "",
        type: "expense",
        category: "",
        date: ""
    });

    const [editingId, setEditingId] = useState(null);

    // Fetch transactions
    const fetchTransactions = async () => {
        try {
            const response = await fetch(API_URL);
            const result = await response.json();

            setTransactions(result.data || []);
        } catch (error) {
            console.error("Failed to fetch transactions:", error);
        }
    };

    // Fetch summary
    const fetchSummary = async () => {
        try {
            const response = await fetch(`${API_URL}/summary`);
            const result = await response.json();

            setSummary(result.data);
        } catch (error) {
            console.error("Failed to fetch summary:", error);
        }
    };

    // Load data when page opens
    useEffect(() => {
        fetchTransactions();
        fetchSummary();
    }, []);

    // Handle form changes
    const handleChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
        });
    };

    // Add / Update transaction
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (
            !formData.title ||
            !formData.amount ||
            !formData.category ||
            !formData.date
        ) {
            alert("Please fill all fields");
            return;
        }

        try {
            const url = editingId
                ? `${API_URL}/${editingId}`
                : API_URL;

            const method = editingId ? "PUT" : "POST";

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    amount: Number(formData.amount)
                })
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

            resetForm();

            fetchTransactions();
            fetchSummary();

        } catch (error) {
            console.error("Transaction error:", error);
            alert("Something went wrong");
        }
    };

    // Delete transaction
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await fetch(`${API_URL}/${id}`, {
                method: "DELETE"
            });

            fetchTransactions();
            fetchSummary();

        } catch (error) {
            console.error("Delete error:", error);
        }
    };

    // Edit transaction
    const handleEdit = (transaction) => {
        setEditingId(transaction._id);

        setFormData({
            title: transaction.title,
            amount: transaction.amount,
            type: transaction.type,
            category: transaction.category,
            date: transaction.date.split("T")[0]
        });

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            title: "",
            amount: "",
            type: "expense",
            category: "",
            date: ""
        });

        setEditingId(null);
    };

    // Format money
    const formatMoney = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="app">

            {/* Header */}
            <header className="header">
                <div>
                    <h1>💰 Expense Tracker</h1>
                    <p>Manage your income and expenses easily</p>
                </div>
            </header>


            <main className="container">

                {/* Summary Cards */}
                <section className="summary-grid">

                    <div className="summary-card income">
                        <div className="card-icon">💰</div>

                        <div>
                            <p>Total Income</p>
                            <h2>
                                {formatMoney(summary.totalIncome)}
                            </h2>
                        </div>
                    </div>


                    <div className="summary-card expense">
                        <div className="card-icon">💸</div>

                        <div>
                            <p>Total Expenses</p>
                            <h2>
                                {formatMoney(summary.totalExpenses)}
                            </h2>
                        </div>
                    </div>


                    <div className="summary-card balance">
                        <div className="card-icon">💵</div>

                        <div>
                            <p>Current Balance</p>
                            <h2>
                                {formatMoney(summary.balance)}
                            </h2>
                        </div>
                    </div>

                </section>


                {/* Add Transaction */}
                <section className="form-section">

                    <div className="section-title">
                        <h2>
                            {editingId
                                ? "✏️ Edit Transaction"
                                : "➕ Add Transaction"}
                        </h2>

                        {editingId && (
                            <button
                                className="cancel-btn"
                                onClick={resetForm}
                            >
                                Cancel
                            </button>
                        )}
                    </div>


                    <form onSubmit={handleSubmit}>

                        <div className="form-grid">

                            <div className="form-group">
                                <label>Title</label>

                                <input
                                    type="text"
                                    name="title"
                                    placeholder="e.g. Grocery Shopping"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="form-group">
                                <label>Amount</label>

                                <input
                                    type="number"
                                    name="amount"
                                    placeholder="Enter amount"
                                    value={formData.amount}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="form-group">
                                <label>Type</label>

                                <select
                                    name="type"
                                    value={formData.type}
                                    onChange={handleChange}
                                >
                                    <option value="expense">
                                        Expense
                                    </option>

                                    <option value="income">
                                        Income
                                    </option>
                                </select>
                            </div>


                            <div className="form-group">
                                <label>Category</label>

                                <input
                                    type="text"
                                    name="category"
                                    placeholder="e.g. Food"
                                    value={formData.category}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="form-group">
                                <label>Date</label>

                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>


                        <button
                            className="submit-btn"
                            type="submit"
                        >
                            {editingId
                                ? "Update Transaction"
                                : "Add Transaction"}
                        </button>

                    </form>

                </section>


                {/* Transactions */}
                <section className="transactions-section">

                    <div className="section-title">
                        <h2>📋 Transactions</h2>

                        <span className="transaction-count">
                            {transactions.length} transactions
                        </span>
                    </div>


                    {transactions.length === 0 ? (

                        <div className="empty-state">
                            <div className="empty-icon">
                                📭
                            </div>

                            <h3>No transactions yet</h3>

                            <p>
                                Add your first income or expense above.
                            </p>
                        </div>

                    ) : (

                        <div className="transaction-list">

                            {transactions.map((transaction) => (

                                <div
                                    className="transaction-card"
                                    key={transaction._id}
                                >

                                    <div className="transaction-info">

                                        <div className="transaction-icon">
                                            {transaction.type === "income"
                                                ? "💰"
                                                : "💸"}
                                        </div>

                                        <div>
                                            <h3>
                                                {transaction.title}
                                            </h3>

                                            <p>
                                                {transaction.category}
                                                {" • "}
                                                {new Date(
                                                    transaction.date
                                                ).toLocaleDateString("en-IN")}
                                            </p>
                                        </div>

                                    </div>


                                    <div className="transaction-right">

                                        <strong
                                            className={
                                                transaction.type === "income"
                                                    ? "amount income-text"
                                                    : "amount expense-text"
                                            }
                                        >
                                            {transaction.type === "income"
                                                ? "+"
                                                : "-"}
                                            {formatMoney(transaction.amount)}
                                        </strong>


                                        <div className="actions">

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    handleEdit(transaction)
                                                }
                                            >
                                                ✏️
                                            </button>


                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    handleDelete(
                                                        transaction._id
                                                    )
                                                }
                                            >
                                                🗑️
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}

                </section>

            </main>

        </div>
    );
}

export default App;