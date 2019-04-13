'use strict';

const apiKey = "932db4bd336078ced782009f699378848603d64a"

const searchURL = "https://api.github.com/users/";

//  Endpoint
// /users/:username/repos

function getRepos(searchUsername) {
    // We could just leave these out and use defaults?
//     const params = {
//     type: owner,
//     sort: full_name,
//     direction: asc
//   };
//   const queryString = formatQueryParams(params)

 // does this need ":" before username?
  const url = searchURL + searchUsername + '/repos'
  
// '?' + queryString;

  console.log(url);

//   const options = {
//     headers: new Headers({
//       "X-Api-Key": apiKey})
//   };

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

// function formatQueryParams(params) {
//     const queryItems = Object.keys(params)
//       .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
//     return queryItems.join('&');
// }

function displayResults(responseObj) {
    console.log(responseObj);
    $('#results-list').empty();
    for (let i = 0; i < responseObj.length; i++){
      $('#results-list').append(
        `<li><h3><a href="${responseObj[i].url}">${responseObj[i].full_name}</a></h3>
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