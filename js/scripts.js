//
//GLOBAL VARIABLES
//
const body = document.querySelector("body");
const gallery = document.getElementById("gallery");
const searchContainer = document.querySelector(".search-container");





//
//FETCH FUNCTIONS 
//

function fetchData(url) {
    return fetch(url)
            .then(checkStatus)
            .then(res => res.json())
            .catch(error => console.log("There was a problem:", error))
}


Promise.all([
    fetchData('https://randomuser.me/api/?nat=us&results=12')
])
.then(data => {
    const userList = data[0].message;

    generateOptions(userList);
    generateImages(userList);
})




//
//HELPER FUNCTIONS
//
function checkStatus(response) {
    if(response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}


function generateOptions(data) {
    const options = data.map(item => `
        <option value="${item}">${item}</option>
    `).join("");
    select.innerHTML = options;
}


function generateImages(data) {
    const html = `
        <img src="${data}" alt>
        <p>Click to learn more about ${select.value}</p>
    `;
    card.innerHTML = html;
}