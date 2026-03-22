//Javascript file Github Repository Gallery
// Author: Isaiah Hames
// Date: 03.22.2026
// Description: This file contains the JavaScript code for fetching and displaying GitHub repositories based on user input.
// It uses the Fetch API to retrieve data from the GitHub API and dynamically updates the webpage with the repository information.


const apiUrl = "https://api.github.com/users/IsaiahHames/repos";
// Make a GET request using the Fetch API
function getRepos() {
fetch(apiUrl)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return response.json();
  })
  .then((repoData) => {
    // Process the retrieved repo data
    console.log("Repos resolved: My Repo Data:", repoData);
    displayRepos(repoData);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
}
let myRepos = getRepos();



const searchButton = document.getElementById("searchBTN");
searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    const githubUser = document.getElementById("githubUser").value;

    if (githubUser === "") {
        alert("Please enter a GitHub username");
    } else {
        const apiUrl = "https://api.github.com/users/" + githubUser + "/repos";
        // Make a GET request using the Fetch API
        function getRepos() {
            fetch(apiUrl)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then((repoData) => {
                    // Process the retrieved repo data
                    console.log("Repos resolved: My Repo Data:", repoData);
                    displayRepos(repoData);
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        }
        let myRepos = getRepos();
        console.log("Repos we just fetched: ", myRepos);
    }
});

function displayRepos(repoData) {
    const main = document.querySelector("main");
    if(main.contains(document.getElementById("repo-sec"))) {
    main.removeChild(document.getElementById("repo-sec"));
    }

    const repoSec = document.createElement("section");
    repoSec.id = "repo-sec";

    repoData.slice(0,10).forEach(repo => {
        const repoDiv = document.createElement("div");
        repoDiv.classList.add("repo-div");

        const githubIcon = document.createElement("i");
        githubIcon.classList.add("fab", "fa-github");
        const repoTitle = document.createElement("h4");
        const repoLink = document.createElement("a");
        repoLink.textContent = repo.name;
        repoLink.href = repo.html_url;

        const repoDesc = document.createElement("p");
        repoDesc.textContent = repo.description || "No description available";

        const repoCreated = document.createElement("p");
        repoCreated.textContent = "Created at: " + new Date(repo.created_at).toLocaleDateString();

        const repoUpdated = document.createElement("p");
        repoUpdated.textContent = "Updated at: " + new Date(repo.updated_at).toLocaleDateString();

        const repoWatchers = document.createElement("p");
        repoWatchers.textContent = "Watchers: " + repo.watchers_count;

        const repoLanguage = document.createElement("p");
        fetch(repo.languages_url)
            .then(response => response.json())
            .then(data => {
                const languages = Object.keys(data);
                repoLanguage.textContent = "Languages: " + (languages.length > 0 ? languages.join(", ") : "N/A");
            })
            .catch(error => {
                console.error("Error fetching languages:", error);
                repoLanguage.textContent = "Languages: N/A";
            });

        repoTitle.appendChild(githubIcon);
        repoTitle.appendChild(repoLink);
        repoDiv.appendChild(repoTitle);
        repoDiv.appendChild(repoDesc);
        repoDiv.appendChild(repoCreated);
        repoDiv.appendChild(repoUpdated);
        repoDiv.appendChild(repoWatchers);
        repoDiv.appendChild(repoLanguage);

        repoSec.appendChild(repoDiv);
        main.appendChild(repoSec);
    });
}