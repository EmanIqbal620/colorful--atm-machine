#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";


//Initialize usr balance and pin code
let myBalance = 6000;
let myPin = 1234;

//Print welcome mesage
console.log(chalk.blue("\n\tWelcome to Eman Iqbal - ATM Machine\n"));

let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        message: ("Enter your pin code:"), /////
        type: "number",
    }
])
if(pinAnswer.pin === myPin){
    console.log(chalk.green("\nPin is Correct, LoginSuccesfully!\n")); //////mirske
   // console.log(`Current Account Balance is ${myBalance}`)

    let operationAns =await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: "Select an operation:",
            choices: ["Withdraw Amount", "Check Balance"]
        }
    ])

    if(operationAns.operation === "Withdraw Amount"){
        let WithdrawAns = await inquirer.prompt([
            {
               name: "withdrawMethod",
               type: "list",
               message: "Select a Withdraw method:",
                choices: ["Fast Cash","Enter Amount"]
            }
        ])
        if(WithdrawAns.withdrawMethod === "Fast Cash"){
                let fastCashAns = await inquirer.prompt([
                    {
                     name: "FastCash",
                     type: "list",
                     message: "Select Amount:" ,
                     choices: [1000, 2000, 5000, 10000, 20000, 50000]
                    }
        ])    
        if(fastCashAns.fastCash > myBalance){
            console.log(chalk.red("Insufficient Balance"));
        }
        else{
            myBalance -= fastCashAns.fastCash
            console.log(`${fastCashAns.fastCash} withdraw Successfully`)
            console.log(`Your Remaining Balance is: ${myBalance}`);
        }
        }
         else if(WithdrawAns.withdrawMethod === "Enter Amount"){  
            let amountAns = await inquirer.prompt([
                {
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to Withdraw:"
                }
            ])
            if(amountAns.amount > myBalance){
                console.log("Insufficient Balance");
            }
            else{
                myBalance -= amountAns.amount;
                console.log(`${amountAns.amount} Withdraw Successfully`);
                console.log(`YourRemainingalance is: ${myBalance}`);
            }
        } 
    }
    else if (operationAns.operation === "Check Balance"){
        console.log(`Your Account Balance is : ${myBalance}`);
    }
}
else{
    console.log(chalk.red("pin is Incorrect", "Try again!"));
}