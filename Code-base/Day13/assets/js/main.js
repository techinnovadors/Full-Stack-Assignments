var b ,c ='4.0';
console.log(b, c);
b = 4;
console.log(b, c);

console.log(addFontBoldClass);

function addFontBoldClass() {
    var class_name = "font-bold";
    return class_name;
}
/*

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