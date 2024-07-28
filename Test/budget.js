document.addEventListener('DOMContentLoaded', function() {
    const budgetForm = document.getElementById('budget-form'); // Form to set the budget
    const expenseForm = document.getElementById('expense-form'); // Form to add expenses
    const totalBudgetDisplay = document.getElementById('total-budget'); // Display for the total budget
    const totalExpensesDisplay = document.getElementById('total-expenses'); // Display for the total expenses
    const remainingBalanceDisplay = document.getElementById('remaining-balance'); // Display for the remaining balance
    const expensesList = document.getElementById('expenses-list'); // List to display all expenses

    let totalBudget = 0; // Variable to store the total budget
    let totalExpenses = 0; // Variable to store the total expenses

    function updateSummary() {
        totalBudgetDisplay.textContent = totalBudget.toFixed(2); // Update the total budget display
        totalExpensesDisplay.textContent = totalExpenses.toFixed(2); // Update the total expenses display
        remainingBalanceDisplay.textContent = (totalBudget - totalExpenses).toFixed(2); // Update the remaining balance display
    }

    budgetForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const budgetInput = document.getElementById('budget'); // Get the budget input field
        totalBudget = parseFloat(budgetInput.value); // Set the total budget to the value entered by the user
        budgetInput.value = ''; // Clear the budget input field
        updateSummary(); // Update the summary display
    });

    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        const expenseDetailsInput = document.getElementById('expense-details'); // Get the expense details input field
        const expenseAmountInput = document.getElementById('expense-amount'); // Get the expense amount input field
        
        const expenseDetails = expenseDetailsInput.value; // Get the expense details entered by the user
        const expenseAmount = parseFloat(expenseAmountInput.value); // Get the expense amount entered by the user

        if (expenseDetails && expenseAmount > 0) {
            totalExpenses += expenseAmount; // Add the expense amount to the total expenses

            const listItem = document.createElement('li'); // Create a new list item for the expense
            listItem.innerHTML = `${expenseDetails}: $${expenseAmount.toFixed(2)} <button onclick="removeExpense(this, ${expenseAmount})">✖</button>`;
            expensesList.appendChild(listItem); // Add the list item to the expenses list

            expenseDetailsInput.value = ''; // Clear the expense details input field
            expenseAmountInput.value = ''; // Clear the expense amount input field
            
            updateSummary(); // Update the summary display
        } else {
            alert('Please enter valid expense details and amount.'); // If the expense details or amount are not valid, show an alert
        }
    });

    window.removeExpense = function(button, expenseAmount) {
        const listItem = button.parentElement; // Get the parent element of the button (the list item)
        expensesList.removeChild(listItem); // Remove the list item from the expenses list
        totalExpenses -= expenseAmount; // Subtract the expense amount from the total expenses
        updateSummary(); // Update the summary display
    }
});
