function expression(exp) {
  let temp = "VJ";
  
  const greet = (who) => {
    console.log(who, exp, temp)
  }
  greet("PR")
  return greet;
}



var greetFn = expression("Annoyed");


console.log("Expression Memmory is removed")

greetFn("Harvey");