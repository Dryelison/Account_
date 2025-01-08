Banking System CLI

A simple banking system implemented as a Command-Line Interface (CLI) using Node.js. This project allows users to perform basic banking operations such as creating accounts, checking balances, making deposits, and withdrawing money. It uses JSON files to simulate a database for storing account information.

Features
• Create Account: Users can create a new account by providing a unique account name. Each account is stored as a JSON file with an initial balance of 0.
• Check Balance: Displays the current balance of a specified account.
• Deposit: Allows users to deposit a specified amount into their account.
• Withdraw: Enables users to withdraw money, with validation for sufficient balance.
• Exit: Gracefully exits the application.

Technologies Used
• Node.js: Backend runtime for executing JavaScript.
• Inquirer.js: For creating interactive CLI prompts.
• Chalk: For styling terminal output with colors.
• File System (fs): To manage account data stored as JSON files.

How It Works 1. Menu System: Users navigate through the CLI menu to select operations. 2. Persistent Data: Account information is stored in the accounts folder as JSON files, ensuring data is retained between sessions. 3. Error Handling: Validates inputs (e.g., positive numbers for deposits/withdrawals) and handles errors gracefully (e.g., account not found, insufficient funds). 4. User Feedback: Uses chalk to display clear and styled messages for user actions and errors.
