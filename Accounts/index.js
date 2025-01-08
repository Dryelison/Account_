// extern modules

const inquirer = require("inquirer").default;
const chalk = require("chalk");

// intern modules
const fs = require("fs");

operation();

function operation() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "action",
        message: "What would you like to do?",
        choices: [
          "Create account",
          "Check Balance",
          "Deposit",
          "Withdraw",
          "Exit",
        ],
      },
    ])
    .then((answer) => {
      const action = answer["action"];

      if (action === "Create account") {
        createAccount();
      } else if (action === "Deposit") {
        deposit();
      } else if (action === "Check Balance") {
        getAccountBalance();
      } else if (action === "Withdraw") {
        withdraw();
      } else if (action === "Exit") {
        console.log(chalk.bgBlue.black("Thank you for using the Accounts"));
        process.exit();
      }
    })
    .catch((err) => console.log(err));
}

//create an account

function createAccount() {
  console.log(chalk.bgGreen.black("Congratulations on choosing our bank."));
  console.log(chalk.green("Set Account Options"));

  buildAccount();
}

function buildAccount() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "Enter a name for your account",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      console.log(accountName);

      if (!fs.existsSync("accounts")) {
        fs.mkdirSync("accounts");
      }

      if (fs.existsSync(`accounts/${accountName}.json`)) {
        console.log(
          chalk.bgRed.black("This account exists, please choose another one")
        );
        buildAccount();
        return;
      }
      fs.writeFileSync(
        `accounts/${accountName}.json`,
        '{"balance": 0}',
        function (err) {
          console.log(err);
        }
      );
      console.log(
        chalk.green("Congratulations, your account has been created")
      );
      operation();
    })
    .catch((err) => console.log(err));
}

// Add an amount to user account

function deposit() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "What is your account name?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      //verify if account exists
      if (!checkAccount(accountName)) {
        return deposit();
      }

      inquirer
        .prompt([
          {
            name: "amount",
            message: "How much would you like to deposit?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];

          //add an amount
          addAmount(accountName, amount);
          operation();
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function checkAccount(accountName) {
  if (!fs.existsSync(`accounts/${accountName}.json`)) {
    console.log(
      chalk.bgRed.black("This account doesn`t exist, please choose another one")
    );
    return false;
  }
  return true;
}

function addAmount(accountName, amount) {
  const accountData = getAccount(accountName);

  if (!amount) {
    console.log(chalk.bgRed.black("An error occurred, please try again!"));
    return deposit();
  }
  accountData.balance = parseFloat(amount) + parseFloat(accountData.balance);
  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );
  console.log(
    chalk.green(
      `The amount of R$${amount} has been deposited into your account`
    )
  );
}

function getAccount(accountName) {
  const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
    encoding: "utf8",
    flag: "r",
  });
  return JSON.parse(accountJSON);
}

// Show account balance

function getAccountBalance() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "What is your account name?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];
      //verify if account exists
      if (!checkAccount(accountName)) {
        return getAccountBalance();
      }

      const accountData = getAccount(accountName);
      console.log(
        chalk.bgBlue.black(
          `Hello, the balance of your account is R$${accountData.balance}`
        )
      );
      operation();
    })
    .catch((err) => console.log(err));
}

function withdraw() {
  inquirer
    .prompt([
      {
        name: "accountName",
        message: "What the name of your account?",
      },
    ])
    .then((answer) => {
      const accountName = answer["accountName"];

      if (!checkAccount(accountName)) {
        return withDraw();
      }
      inquirer
        .prompt([
          {
            name: "amount",
            message: "How much would you like to withdraw?",
          },
        ])
        .then((answer) => {
          const amount = answer["amount"];
          removeAmount(accountName, amount);
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
}

function removeAmount(accountName, amount) {
  const accountData = getAccount(accountName);
  if (!amount) {
    console.log(chalk.bgRed.black("An error occurred, please try again"));
    return withdraw();
  }
  if (accountData.balance < amount) {
    console.log(chalk.bgRed.black("Insufficient balance"));
    return withdraw();
  }

  accountData.balance = parseFloat(accountData.balance) - parseFloat(amount);

  fs.writeFileSync(
    `accounts/${accountName}.json`,
    JSON.stringify(accountData),
    function (err) {
      console.log(err);
    }
  );
  console.log(chalk.green(`Withdrawal of $${amount} was successful!`));
  operation();
}
