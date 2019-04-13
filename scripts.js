'use strict';

const searchURL = "https://api.github.com/users/";

function getRepos(searchUsername) {
  const url = searchURL + searchUsername + '/repos'
  console.log(url);
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(error => {
      $('#js-error-message').text(`Uh ho... Something bad happened: ${error.message}`);
    });
}

function displayResults(responseObj) {
    console.log(responseObj);
    $('#results-list').empty();
    for (let i = 0; i < responseObj.length; i++){
      $('#results-list').append(
        `<li><h3><a href="${responseObj[i].html_url}">${responseObj[i].name}</a></h3>
        <p>Description: ${responseObj[i].description}</p>
        <p>Language(s): ${responseObj[i].language}</p>
        <p>Forks: ${responseObj[i].forks_count}</p>
        </li>`
      )};
    $('#results').removeClass('hidden');
};
  
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchUsername = $('#js-search-git-username').val();
    getRepos(searchUsername);
  });
}

$(watchForm);