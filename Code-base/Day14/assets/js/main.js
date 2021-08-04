/*

    HOISTING
    ' b = undefined                           '
    ' c = undefined                           '
    ' addFontBoldClass =  {                   '
    '        var class_name = "font-bold";    '
    '       return class_name;                '
    '    }                                    '
    '-----------------------------------------'
    Memory Space / Global Space

    ' b = undefined                           '
    ' c = undefined                           '
    ' addFontBoldClass =  {                   '
    '        var class_name = "font-bold";    '
    '       return class_name;                '
    '    }                                    '
    '-----------------------------------------'
    Content Execution Space
    
  var a = document.getElementById('demo').classList; //statement
        
    everything inside a {} is a block

  == will check only the Value of the variable NOT THE DATA TYPE
    number + number = number
    string + string/number/boolean = string
    js programs is collection of statements.

*/

/* 
   INSERT   
   CLEAR
   BACKSPACE   // it will remove the last character from the input  
   in Java/C++ we have substring

   equal
*/

var expression = document.getElementById("result");

function insert(val) {
  expression.value += val;
}

function backspace() {
  expression.value = expression.value.slice(0, -1);
}

function clear() {
  expression.value = "";
}

function equal() {
  console.log(expression.value);
  expression.value = eval(expression.value);
}

/**
 * Eval input is string
 * 
 * 
 * Processing it will convert the String into Javascript Code
 * 
 * and then it will execute.
 * 
 * **/