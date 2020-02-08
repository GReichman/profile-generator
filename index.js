const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");
const page = require("./page.js");
const util = require("util");
const pdf = require("html-pdf");

const githubLink = "https://api.github.com/users/";
const asyncWrite = util.promisify(fs.writeFile);

// const user = process.argv[2];
// const defaultColor = "blue";


makeProfile();
async function makeProfile() {

    const info = await getInfo();
    const user = info.user;
    const defaultColor = info.color;

    console.log("Getting user data...");
    const gitPage = await getGithub(user);
    const repos = await getRepos(user);

    const stars = getStars(repos);

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
    // console.log(currProfile);
    console.log("Creating pdf...")
    const fileName = "./html/" + user + ".html";
    const html = page.createPage(currProfile, colorPicker(defaultColor));

    asyncWrite(fileName, html).then(() => {

        const input = fs.readFileSync(fileName, 'utf8');
        const options = { format: "Letter" };

        pdf.create(input, options).toFile("./pdf/" + user + ".pdf", (err, res) => {
            if (err) {
                throw err;
            }
            // console.log("pdf created!");
            // console.log(res);


        });

    });
    console.log("Done!");

}//makeProfile

function Profile(name, username, picture, location, blog, bio, repos, followers, following, stars) {

    this.name = name;
    this.username = username;
    this.picture = picture;
    this.location = location;
    this.blog = blog;
    this.bio = bio;
    this.repos = repos;
    this.followers = followers;
    this.following = following;
    this.stars = stars;


}//profileConstructor


function getInfo() {
    return inquirer.prompt([{
        message: "What is your github username?",
        name: "user"
    }, {
        message: "What is your favorite color",
        name: "color",
        type: "list",
        choices: ["red", "blue", "yellow", "green", "purple"]
    }]);

}//getInfo


function getGithub(userName) {

    return axios.get(githubLink + userName).catch(e => {
        console.log("Error retrieving results");
    });
}//getGithub

function getRepos(userName) {

    return axios.get(githubLink + userName + "/repos").catch(e => {
        console.log("error retrieving github repos");
    })

}//getRepos

function getStars(repos) {
    let stars = 0;
    repos.data.forEach(repo => {
        stars += repo.stargazers_count;
    });
    return stars;
}

function colorPicker(chosenColor) {
    const colors = [];
    switch (chosenColor) {
        // body color
        // headerRow/infoCol color
        // bodyRow color
        case "red":
            colors.push("#771922");
            colors.push("#49060C");
            colors.push("#D2616C");

            break;

        case "blue":
            colors.push("#1C1C56");
            colors.push("#0C0C35");
            colors.push("#535398");
            break;

        case "yellow":
            colors.push("#898509");
            colors.push("#686500");
            colors.push("#CBC97A");
            break;

        case "green":
            colors.push("#167107");
            colors.push("#0C5600");
            colors.push("#6EA865");
            break;

        case "purple":
            colors.push("#590459");
            colors.push("#440044");
            colors.push("#835383");
            break;
    }//switch

    const colorObj = new ColorObject(colors[0], colors[1], colors[2]);
    return colorObj;


}//colorPicker

function ColorObject(color1, color2, color3) {
    this.base = color1;
    this.head = color2;
    this.body = color3;
}//ColorObject