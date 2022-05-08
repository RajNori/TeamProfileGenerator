const fs = require("fs");
const inquirer = require("inquirer");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");


const container = {
    teamMembers: []
};


console.log(`

`);
askMainMenu();


function askMainMenu() {

    inquirer
        .prompt([{
            name: "role",
            message: "Add a team member:\n",
            type: "list",
            choices: [
                "Manager",
                "Engineer",
                "Intern",
                new inquirer.Separator(),
                "Build Team Webpage ->"
            ]
        }])
        .then(function(answers) {


            let cb_afterAskingQuestions = function() {
                container.teamMembers.push(this.getTeamMemberObject());
                askMainMenu();
            }

            switch (answers.role) {

                case "Manager":


                    let managerInfo = new Manager();
                    managerInfo.askQuestions(cb_afterAskingQuestions.bind(managerInfo));

                    break;
                case "Engineer":


                    let engineerInfo = new Engineer();
                    engineerInfo.askQuestions(cb_afterAskingQuestions.bind(engineerInfo));

                    break;
                case "Intern":


                    let internInfo = new Intern();
                    internInfo.askQuestions(cb_afterAskingQuestions.bind(internInfo));

                    break;
                default:
                    buildTeamPage();
                    return;
            }
        })
        .catch(error => {
            console.error("Error: " + error);
        });
}

function buildTeamPage() {
    console.log("Outputted to load/data.json\nOpen load/ in web browser to see your team members.");
    console.log(container);

    const filepath = "load/data.json";
    const text = JSON.stringify(container);
    fs.writeFileSync(filepath, text);
}