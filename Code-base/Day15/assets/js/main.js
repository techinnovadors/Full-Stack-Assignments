/**
 * 
 * Use Loops , Functions 
 * 
 * And Manipulate the DOM
 * 
 * 
 * 
 */




//This is a JSON.. JavaScript Object Notion
let avengers = [{
  name: "black-widow.jpg",
  alt: "The Black widow is my fav"
}, {
  name: "iron-man.jpg",
  alt: "I am IRON MAN"
}, {
  name: "captain-marvel.jpg",
  alt: "The Prettiest"
}, {
  name: "dr-strange.jpg",
  alt: "It's precisely what's kept you from greatness"
}, {
  name: "the-hulk.jpg",
  alt: "It's like I was MEANT FOR THIS"
}, {
  name: "thor.jpg",
  alt: "Bring me THANOS!!!!"
}, {
  name: "hawk-eye.jpg",
  alt: "The Black widow forever"
}, {
  name: "spiderman.jpg",
  alt: "Big FAN Of CAP"
}];

const imageUrl = "./assets/images";


document.getElementById("gallery").innerHTML = function () {
  let gridHTML = '';
  try {
    avengers.forEach(avenger => {
      gridHTML += generateColumn(avenger.name, avenger.alt);
    });
    return gridHTML;
  } catch (Error) {
    console.log(Error);
    return "Avengers in the End Game";
  }
}();



function generateColumn(imgSrc, imgAlt) {
  return `<div class="col-12 d-flex justify-content-center align-items-center col-md-6 col-lg-3">
          <img class="img-fluid" src="${imageUrl}/${imgSrc}" alt="${imgAlt}">
      </div>`;
}



/***
 * add_to_avaengers_arr() 
 * 
 *      Add to avengers json.
 *      It will create a new column. 
 * 
 */ 