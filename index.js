const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const page = require("./page.js");

const githubLink="https://api.github.com/users/";
const user = process.argv[2];

makeProfile();
async function makeProfile() {

    //const info = await getInfo();
    const gitPage = await getGithub(user);
    const repos = await getRepos(user);

   const stars = getStars(repos);
   console.log(stars);
   //console.log(info);
    //console.log(gitPage.data);
    //console.log(stars+" stars");

    const currProfile = new Profile(
        gitPage.data.name,
        user,
        gitPage.data.avatar_url,
        gitPage.data.location,
        gitPage.data.blog,
        gitPage.data.bio,
        gitPage.data.public_repos,
        gitPage.data.followers,
        gitPage.data.following,
        stars
        );
        console.log(currProfile);

}//makeProfile

function Profile(name,username,picture,location,blog,bio,repos,followers,following,stars){

    this.name=name;
    this.username=username;
    this.picture= picture;
    this.location= location;
    this.blog=blog;
    this.bio=bio;
    this.repos=repos;
    this.followers=followers;
    this.following=following;
    this.stars=stars;


}//profileConstructor


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

}//getRepos

function getStars(repos){
    let stars=0;
    repos.data.forEach(repo =>{
        console.log(repo.stargazers_count+" stars");
       stars+=repo.stargazers_count;
    });
   console.log("total stars: "+stars);
   return stars;
}