// Get the GitHub username input form
const gitHubForm = document.getElementById('gitHubForm');

// Listen for submissions on GitHub username input form
gitHubForm.addEventListener('submit', (e) => {

    // Prevent default form submission action
    e.preventDefault();

    // Get the GitHub username input field on the DOM
    let usernameInput = document.getElementById('usernameInput');
    // Get the value of the GitHub username input field
    let gitHubUsername = usernameInput.value;

    // Get the GitHub repository input field on the DOM
    let repositoryInput = document.getElementById('repositoryInput');
    // Get the value of the GitHub repository input field
    let githubRepository = repositoryInput.value;
    
    // Get the ul with id of userRepos
    let ul = document.getElementById('userRepos');

    // Empty content of the ul from previous executions
    ul.innerHTML = ''

    // Run GitHub API function, passing in the GitHub username
    requestUserRepos(gitHubUsername, githubRepository)
        .then(response => response.json()) // parse response into json
        .then(data => {
            // update html with data from github
            if (data.message === "Not Found") {

                // Create variable that will create li's to be added to ul
                let li = document.createElement('li');

                // Add Bootstrap list item class to each li
                li.classList.add('list-group-item')
                // Create the html markup for each li
            
                // Create the html markup for each li
                li.innerHTML = (
                    `<p><strong>Could not find repository with username:</strong> ${gitHubUsername} <strong> and name: </strong> ${githubRepository} </p>`
                );

                // Append each li to the ul
                ul.appendChild(li);
                
            } else {

                for (let i in data) {
                    // Create variable that will create li's to be added to ul
                    let li = document.createElement('li');

                    // Add Bootstrap list item class to each li
                    li.classList.add('list-group-item')

                    // Create the html markup for each li
                    li.innerHTML = (`
                        <p><strong>Mensagem:</strong> ${data[i].commit.message}</p>
                        <p><strong>Data:</strong> ${data[i].commit.author.date}</p>
                    `);

                    // Append each li to the ul
                    ul.appendChild(li);
                }

            }
        })
})

function requestUserRepos(username, repository) {
    // create a variable to hold the `Promise` returned from `fetch`
    return Promise.resolve(fetch(`https://api.github.com/repos/${username}/${repository}/commits`));
}
