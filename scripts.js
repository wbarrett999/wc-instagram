//Create an event for when the window is scrolled
window.addEventListener('scroll', function(){
    var distance = window.pageYOffset || document.documentElement.scrollTop
    var header = document.querySelector('header')
    if (distance > 200) {
        header.classList.add('header--small')
    }
    else {
        header.classList.remove('header--small')
    }
})
/* Beginning of the code */

function addClickEvents() {
    // Add click events to all the images
    const images = document.querySelectorAll('.image')
    //console.log(images)
    /*images.forEach(function(image,index){
        console.log(image)
    })
    // the foreach is equivalent to this for loop
    for (var i=0; i>images.length; i++) {
        var image = images[i]
        image.addEventListener(....... must finish)
    }
    */
    images.forEach(function(image,index) {
        //console.log(image)
        //e.preventDefault() // Stop the click event from refreshing
        //image.addEventListener('click', console.log('images working', index))
        // look at mdn (mozilla development network) developer.mozilla.org
        // console.dir
        image.addEventListener('click', function(e){
            e.preventDefault() 
            const source = this.querySelector('img').src
            //console.log(this)
            //console.log(source, index)
            //console.dir(this)
            const id  = source.split('=')[1]
            console.log(id)
            showFullImage(id)

        })
    })
}
/* this end of the code */

// create showFullImage function
// function showFullImage(id) {}
const showFullImage = id => {
    const fullContainer = document.querySelector('.full') //the div
    //const fullImage = document.querySelector('.full img') //the img within the div
    const fullImage = fullContainer.querySelector('img') //the img within the div
    // Set the src of the fullImage to be the larger version of the image
    fullImage.src = `http://unsplash.it/800/?image= ${id}`
    //remove the hidden class from the fullContainer to show it
    fullContainer.classList.remove('hidden')
}
// Add click event to the .full div so it adds the hidden class when clicked
// 1) Declare variable for .full div
// 2) Add click Event
// 3) Add hidden class when clicked
const fullContainer = document.querySelector('.full')   
fullContainer.addEventListener('click', function(){
    this.classList.add('hidden')
})


// Load Data from http://unsplash.it/list
// then convert JSON
// Then grab 20 random images
// Then add images to HTML and call addClickEvents()
        /*fetch('http://unsplash.it/list')
        //.then( result => result.json())
        .then(function(result) {
            return result.json()
        })
        .then(result =>)
        */

//Use fetch() to load remote data , then promises
fetch('http://unsplash.it/list')
//.then(function(result){
.then(result => {
    //console.log(result)
    //result.json() //convert the text into JSON data
    return result.json() //convert the text into JSON data and return or make available
})
.then(result => {
    //console.log(result)
    //Now that we have the data, we can work with it!
    // Initializing an array with 20 random numbers
    let randomArray = []
    for(let i=0;i<20;i++) {
        // Generate randdom numbers, randoms is the array
        randomArray.push(Math.round(Math.random()*result.length))
    }
    let images = result.filter(image => {
        return randomArray.includes(image.id)
    })
    //console.log(randomArray,images)
    populateImages(images)
    addClickEvents()
    addErrorEvents()
})
/*.catch(error => {
    console.log('Something went wrong!!!!')
})*/
// Add Error Events to the images incase the image is not available
function addErrorEvents() {
    // Find the img tags inside the .image
    const images = document.querySelectorAll('.image img')
    // Loop through them and add an "error" event
    images.forEach(function(image,index){
        image.addEventListener('error', function(){
            console.log('ERROR')
            this.src = `http://unsplash.it/300/?image=580`
        })
    })
    // console.log('ERROR!') when the event occurs
}
// This function will add all images we loaded remotely to the HTML page

function populateImages(imageArray) {
    // Need a variable for the image container
    const imageContainer = document.querySelector('.images .inner')

    // Then need to loop through the imageArray
    // Looping or console.log to see the array
    // using Arrow funciton == imageArray.forEach( (image,index) => {
    imageArray.forEach(function(image,index) {
        //console.log(image)
        //const html = '<p>Paragraph</p>'
        //const html = `<a href="#" class="image">
        //                <img src="http://unsplash.it/300/?image=69" alt="">
        //                <span class="image__cover">View Image</span>
        //              </a>`
        const html = `<a href="#" class="image">
                        <img src="http://unsplash.it/300/?image=${image.id}" 
                        alt="${image.author} ${image.filename}">
                        <span class="image__cover">View Image</span>
                      </a>`
        imageContainer.innerHTML += html
    })

}
/* <a href="#" class="image">
        <img src="http://unsplash.it/300/?image=69" alt="">
        <span class="image__cover">View Image</span>
   </a>
*/