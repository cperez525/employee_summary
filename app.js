// Import dependencies/classes
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Create folder path for created html file later
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

// Not using the following 2 lines at the moment, but keeping them for future use
const Choice = require("inquirer/lib/objects/choice");
const { type } = require("os");

// Instantiate employees array to store created employees for passing into render function
const employees = []

// Main app function to create employees for team
function createTeam() {

    inquirer

        // Prompts for user to provide information about employee
        .prompt([

            {
                type: "input",
                name: "name",
                message: "What is the name of the employee you would like to add?"
            },

            {
                type: "input",
                name: "id",
                message: "What is the ID# of this employee?"
            },

            {
                type: "input",
                name: "email",
                message: "What is this employee's email address?",
                
                // source of email validation expression: https://gist.github.com/Amitabh-K/ae073eea3d5207efaddffde19b1618e8
                validate: input => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(input)               
            },

            {
                type: "list",
                name: "role",
                message: "What is this employee's position?",
                choices: ["Manager", "Engineer", "Intern"]
            },
        ]).then((answers) => {

            // Asks additional prompt depending on the role selected for the employee created, then asks if user wants to create additional user
            switch (answers.role) {

                case "Manager":

                    inquirer
                        .prompt([

                            {
                                type: "input",
                                name: "officeNumber",
                                message: "What is this manager's office number?"
                            }
                        ]).then((answers2) => {

                            const manager = new Manager(answers.name, answers.id, answers.email, answers2.officeNumber)
                            employees.push(manager)

                            continueTeam()
                        })
                    break;

                case "Engineer":

                    inquirer
                        .prompt([

                            {
                                type: "input",
                                name: "github",
                                message: "What is this engineer's github profile link?"
                            }
                        ]).then((answers2) => {

                            const engineer = new Engineer(answers.name, answers.id, answers.email, answers2.github)
                            employees.push(engineer)

                            continueTeam()
                        })
                    break;

                case "Intern":

                    inquirer
                        .prompt([

                            {
                                type: "input",
                                name: "school",
                                message: "What school does/did this intern go to?"
                            }
                        ]).then((answers2) => {

                            const intern = new Intern(answers.name, answers.id, answers.email, answers2.school)
                            employees.push(intern)

                            continueTeam()
                        })
                    break;
            }

        })
}

// Function asking user if they want to create additional user
function continueTeam() {

    inquirer
        .prompt([
            {
                type: "list",
                name: "continue",
                message: "Add another team member?",
                choices: ["Yes", "No"]
            }
        ]).then((answers) => {

            // Loops user back to createTeam function if they choose "Yes";
            // If user chooses "No", creates output folder if one doesn't already exists, and writes team.html file in that folder based on employee array
            if (answers.continue === "Yes") {

                createTeam()
            } else {

                console.log("Thank you for providing this team's information!")

                if (!fs.existsSync(OUTPUT_DIR)){

                    fs.mkdir(OUTPUT_DIR, function(err) {

                        if (err) {

                            console.log(err)
                        }
                    })
                    fs.writeFile(outputPath, render(employees), "utf-8", function(err) {

                        if (err) {

                            console.log(err)
                        }
                    })
                } else {

                    fs.writeFile(outputPath,render(employees), "utf-8", function(err) {
                        
                        if (err) {
                            
                            console.log(err)
                        }
                    })
                }
            }
        })
}

createTeam()