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

var b = ["String", 5, 50.1, {
  name: "iron-man.jpg",
  alt: "I am IRON MAN"
}]

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push
 * 
 * 
 * 
 */

b.push("This is element at index 4");
console.log(b[3]);

b[10] = 200;
b[7] = avengers;
console.log(b);


/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift
 * 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join
 */
b.unshift("At the start")
console.log(b.join(" | "))
console.log(b)
/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop
 *
 */
var last_el = b.pop();

////6 7,8,9 10=200
console.log(last_el)
console.log(b)


/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift
 */

var first_el = b.shift();
console.log(first_el);


/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice
 */
var start = 0,
  end = 4;
var a = b.slice(start, end)


/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
 */
var start = 0,
  end = 4;
var c = b.splice(start, end, ...avengers)


console.log(a, c);

console.log(b)