document.addEventListener('DOMContentLoaded', function() {
    const budgetForm = document.getElementById('budget-form');
    const expenseForm = document.getElementById('expense-form');
    const totalBudgetDisplay = document.getElementById('total-budget');
    const totalExpensesDisplay = document.getElementById('total-expenses');
    const remainingBalanceDisplay = document.getElementById('remaining-balance');
    const expensesList = document.getElementById('expenses-list');

    let totalBudget = 0;
    let totalExpenses = 0;

    function updateSummary() {
        totalBudgetDisplay.textContent = totalBudget.toFixed(2);
        totalExpensesDisplay.textContent = totalExpenses.toFixed(2);
        remainingBalanceDisplay.textContent = (totalBudget - totalExpenses).toFixed(2);
    }

    budgetForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const budgetInput = document.getElementById('budget');
        totalBudget = parseFloat(budgetInput.value);
        budgetInput.value = '';
        updateSummary();
    });

    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const expenseDetailsInput = document.getElementById('expense-details');
        const expenseAmountInput = document.getElementById('expense-amount');
        
        const expenseDetails = expenseDetailsInput.value;
        const expenseAmount = parseFloat(expenseAmountInput.value);

        if (expenseDetails && expenseAmount > 0) {
            totalExpenses += expenseAmount;

            const listItem = document.createElement('li');
            listItem.innerHTML = `${expenseDetails}: $${expenseAmount.toFixed(2)} <button onclick="removeExpense(this, ${expenseAmount})">✖</button>`;
            expensesList.appendChild(listItem);

            expenseDetailsInput.value = '';
            expenseAmountInput.value = '';
            
            updateSummary();
        } else {
            alert('Please enter valid expense details and amount.');
        }
    });

    window.removeExpense = function(button, expenseAmount) {
        const listItem = button.parentElement;
        expensesList.removeChild(listItem);
        totalExpenses -= expenseAmount;
        updateSummary();
    }
});
