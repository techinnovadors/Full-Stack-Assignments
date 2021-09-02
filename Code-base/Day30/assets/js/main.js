const baseURL = 'http://localhost:8080';
let data = {
  id: 1,
  age: 23,
  email: 'assd@asd.com',
  contact_number: '213123',
  country: 'in',
  gender: 'Mle',
  name: "KC",
  books_published: [],
  publications_associated: []
}

fetch(`${baseURL}/authors`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(res =>
    console.log(res)
  )
  .catch(function (res) {
    console.log(res)
  })


fetch(`${baseURL}/authors/1`)
  .then(res => res.json())
  .then(res =>
    console.log(res)
  )
  .catch(function (res) {
    console.log(res)
  })




/*****
 * 
 *  fetch -->  browser hits the node api -->
 *  node > index.js > cors express.json > routes > author.roues > authorcontroller > helper.js > 
 *  1/ if valid > author Model > mongoose > mongodb   > authorcontroll >  json is returned
 *  2/ if invalid > json is returned
 *  -----------------------> 
 * 
 * then you come back to main.js -> 1st then get actually resquest obj --> 2nd then is your front-end logic. 
 * 
 * 
 */