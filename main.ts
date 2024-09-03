#! /usr/bin/env node
import {input,number,select} from "@inquirer/prompts"
import chalk from "chalk"
import { log } from "console";
// Interfaces of Bank Accout
interface BankAccount{
    accountNumber: number;
    balance: number;
    withDraw(amount:number) : void
    deposit(amount:number) : void
    checkBalance(): void
}
// creating Bank Account class
class BankAccount implements BankAccount{
    accountNumber: number;
    balance: number;

    constructor(accountNumber:number, balance:number){
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    // debit money
    withDraw(amount: number): void {
        if(this.balance>= amount){
            this.balance -= amount;
            console.log(`Withdrawal of $${amount} Successfull!!.Remaining Balance: $${this.balance}`);

        }else {
            console.log("Insufficient Balance");
            
        }
     }
    //  credit Money
    deposit(amount: number): void {
        if(amount >100){
            amount -=1; //charged $1 fee if more than $100 is credited to the account
        } this.balance += amount;
        console.log(`Deposit of $${amount} Successful!!,Remaining Balance:$${this.balance}`);
        
    }
    // check balance
    checkBalance(): void {
        console.log(`Current Balance: $${this.balance}`);
        
    }

}
class Customer{
    firstname: string;
    lastname: string;
    gender:string;
    age:number;
    mobileNumber: number;
    account : BankAccount;
    constructor(firstname: string,
        lastname: string,
        gender:string,
        age:number,
        mobileNumber: number,
        account : BankAccount){
            this.firstname = firstname;
            this.lastname = lastname;
            this.age = age;
            this.gender = gender;
            this.mobileNumber = mobileNumber;
            this.account = account
        }
}
const accounts:BankAccount[] = [
    new BankAccount(1001,500),
     new BankAccount(1002,1000),
new BankAccount(1003,2000)
];
// creating Customers
const customers:Customer[] = [
    new Customer ("Mahnoor","khan","Female",22,3398754321,accounts[0]),
    new Customer("Mehwish","Malik","Female",21,3312456789,accounts[1]),
    new Customer("Daniyal","Malik","Male",26,3321546987,accounts[2])

]
// function to Interact with bank account
async function service(){
    do{
       
        const accountNumberInput:any = await number({
            message:"Enter Your Account Number"
        })
        const customer = customers.find(customer => customer.account.accountNumber === accountNumberInput)
        if(customer){
            console.log(chalk.yellow(`******** Welcome!!${customer.firstname} ${customer.lastname } ********`));
            const answer = await select({
                message:"Select an Operation",
                choices:["Deposit","Withdraw","Check Balance","Exit"]
            });
            switch(answer){
case "Deposit":
    const depositAmount:any = await number({
        message:"Enter the Amount to Deposit:"
    })
    customer.account.deposit(depositAmount)
break;
 

    case "Withdraw":
        const withDrawAmount:any = await number({
            message:"Enter the Amount to WithDraw:"
        })
        customer.account.withDraw(withDrawAmount)
    break;
            
                case "Check Balance":
                   
                    customer.account.checkBalance()
                break;
                case "Exit":
                    console.log("Exiting Bank Program...");
                    console.log(chalk.yellow("\n Thanks For Using Our Bank Services.Have a Good Day!!"));
                    return;
                    
        }
    }else{
        console.log("Invalid Account Number.Please Try Again");
        
    }
}while(true)

}
service()
