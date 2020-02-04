const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const page = require("./page.js");

const githubLink="https://api.github.com/users/";


makeProfile();
async function makeProfile() {

    const info = await getInfo();
    const gitPage = await getGithub(info.user);
    const gitRepos = await getRepos(info.user);
    console.log(info);
    console.log(gitPage);
    console.log(gitRepos);


}




function getInfo() {
   return inquirer.prompt([{
        message: "What is your github username?",
        name: "user"
    }, {
        message: "What is your favorite color",
        name: "color",
        type: "list",
        choices: ["red", "blue", "yellow", "green", "magenta"]
    }]);

}//getInfo


function getGithub(userName){

    return axios.get(githubLink+userName).catch(e =>{
        console.log("Error retrieving results");
    });
}//getGithub

function getRepos(userName){

    return axios.get(githubLink+userName+"/repos").catch(e =>{
        console.log("error retrieving github repos");
    })

}