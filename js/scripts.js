//
//GLOBAL VARIABLES
//






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


//generateOptions
//generateImages


//
//HELPER FUNCTIONS
//