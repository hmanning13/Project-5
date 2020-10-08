//
//GLOBAL VARIABLES
//
const body = document.querySelector("body");
const gallery = document.getElementById("gallery");
const searchContainer = document.querySelector(".search-container");
const employeeData = "https://randomuser.me/api/?nat=us&results=12"
let employeeInfo = [];




//
//FETCH FUNCTIONS 
//

function fetchData(url) {
    return fetch(url)
            .then(checkStatus)
            .then(res => res.json())
            .catch(error => console.log("There was a problem:", error))
}

fetchData(employeeData)
    .then(data => {
        data.results.map(result => employeeInfo.push(result))
        generateGallery(employeeInfo)

})


/*Promise.all([
    fetchData('https://randomuser.me/api/?nat=us&results=12')
])
.then(data => {
    data.results.map(result => employeeInfo.push(result))
    generateGallery(employeeInfo);
    
})
*/
//UPDATE FUNCTIONS ONCE CREATED




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

//GENERATEGALLERY


function createHTML(data) {
    gallery.innerHTML = "";
    data.map((item, index) => generateGallery(item, index));
}


function generateGallery(data) {
    data.map(employee => {
        const html = `
           <div class="card">
              <div class="card-img-container">
                 <img class="card-img" src="${employee.picture.large}" alt="profile picture">
              </div>
              <div class="card-info-container">
                 <h3 id="name" class="card-name cap">${employee.name.first} ${employee.name.last}</h3>
                 <p class="card-text">${employee.email}</p>
                 <p class="card-text cap">${employee.location.city}, ${employee.location.state}<p/>
              <div/>
            </div>
        `;
        gallery.insertAdjacentHTML("beforeend", html);
        gallery.style.backgroundColor = "#5d6850";
    });

};


/*(function generateOptions(data) {
    const options = data.map(item => `
        <option value="${item}">${item}</option>
    `).join("");
    select.innerHTML = options;
}
*/

/*function generateImages(data) {
    const html = `
        <img src="${data}" alt>
        <p>Click to learn more about ${select.value}</p>
    `;
    card.innerHTML = html;
}
*/