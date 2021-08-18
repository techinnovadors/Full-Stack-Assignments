// function expression(exp) {
//   let temp = "VJ";

//   const greet = (who) => {
//     console.log(who, exp, temp)
//   }
//   greet("PR")
//   return greet;
// }



// var greetFn = expression("Annoyed");


// console.log("Expression Memmory is removed")

// greetFn("Harvey");




function expression(exp, callback) {
  let temp = "VJ";
  console.log("Inside expression ",
    exp, temp)
  callback(temp);
}

const greet = (who) => {
  console.log("Inside Greet");
  console.log("Great", who);
  // expression(who,slap);
}

const slap = (who) => {
  console.log("Inside slap");
  console.log("Great", who);
  greet(who);
}


expression("Happy", happy_ads);


