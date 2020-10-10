//
//GLOBAL VARIABLES
//
const body = document.querySelector("body");
const gallery = document.getElementById("gallery");
const searchContainer = document.querySelector(".search-container");
const employeeData = "https://randomuser.me/api/?nat=us&results=12"
const cards = document.querySelectorAll(".card");
let cardsArray = [];
let employeeInfo = [];
let index = ''



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

        const cards = document.querySelectorAll(".card");
        cardsArray = Array.from(cards);

        cards.forEach(card => {
            card.addEventListener("click", (e) => {
                const selectedCard = e.target.closest(".card")
                index = cardsArray.indexOf(selectedCard);
                generateInfo(employeeInfo[index], index);
            })
        })
        
    
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





function generateInfo(employee, index) {
    const modalHTML = `
       <div class="modal-container">
          <div class="modal">
             <button type="button" id="modal-close-btn" class="modal-close-btn">X</button>
             <div class="modal-info-container">
                <img class="modal-img" src="${employee.picture.large}" alt="profile-picture">
                <h3 id="name" class="modal-name cap">${employee.name.first} ${employee.name.last}</h3>
                <p class= "modal-text">${employee.email}</p>
                <p class= "modal-text cap">${employee.location.city}</p>
                <p class="modal-text">${employee.cell.replace} </p>
                <p class= "modal-text">${employee.location.street.number} ${employee.location.street.name} ${employee.location.city}, ${employee.location.state} ${employee.loaction.zip}</p>
                <p class= "modal-text">Birthday: ${employee.dob.date.slice(5,7)}/${employee.dob.date.slice(8,10)}/${employee.dob.date.slice(2,4)}</p>
              </div>
            </div>

           <div class="modal-btn-container">
               <button type="button" id="modal-prev" class= "modal-prev btn">Prev</button>
               <button type= "button" id= "modal-next" class= "modal-next btn">Next</button>
            </div>
        </div>
    `;
    body.insertAdjacentHTML("beforeend", modalHTML)
    
}


//
//MODAL FUNCTION
//

const modal = document.querySelector(".modal-container");
const closeButton = document.querySelector(".modal-close-btn");
const prevButton = document.querySelector(".modal-prev");
const nextButton = document.querySelector(".modal-next");

//function toggleModal(emploee, index) {
    //document.querySelector(".modal-container").remove();
    //generateInfo(employee, index);
//}


