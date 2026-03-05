// let number=prompt("enter any one number")

// if(number % 2 ===0){
//     alert("this number is even")
// }else{
//     alert("this is a odd number.")
// }

// let text = prompt("enter any string:");
// text = text.toLocaleLowerCase();
// let count = 0;

// for (let i=0; i<text.length; i++){
//   if (text[i]=='a'|| text[i]=='e'||  text[i]=='i'|| text[i]=='o'|| text[i]=='u'){
//     count++
//   }
// }
// alert("total vowels are" + count);

// let text = prompt("Enter your string");
// let rev = "";

// for (let i = text.length - 1; i >= 0; i--) {
//     rev += text[i];
// }

// alert(`Your reverse string is: ${rev}`)

// let value = [4, 9, 1, 11, 3];

// let min = value[0];
// let max = value[0];

// for (let i = 0; i < value.length; i++) {
//     if (value[i] < min) {
//         min = value[i];
//     }
//     if (value[i] > max) {
//         max = value[i];
//     }
// }

// alert(`Minimum number = ${min}`);
// alert(`Maximum number = ${max}`);

// let arr = [2, 5, 8, 1];
// let sum = 0;

// for (let i = 0; i < arr.length; i++) {
//     sum += arr[i];
// }

// alert(`Total is = ${sum}`);

// let user1 = Number(prompt("Enter first number"));
// let user2 = Number(prompt("Enter second number"));
// let user3 = Number(prompt("Enter third number"));

// let total = 0;

// if (user1 % 2 == 0) {
//   total += user1;
// } else if (user2 % 2 == 0) {
//   total += user2;
// } else if (user3 % 2 == 0) {
//   total += user3;
// }

// alert(`Total even numbers sum: ${total}`);

// let name = prompt("Enter your username");

// if (name.includes(" ")) {
//     alert("Invalid username");
// } else {
//     alert("Valid username");
// }

// let name = prompt("Enter your name");
// let rev = "";

// for (let i = name.length - 1; i >= 0; i--) {
//     rev += name[i];
// }

// alert(`Reverse string: ${rev}`);

//t input = prompt("Enter your sentence");

// Trim removes leading/trailing spaces
// input = input.trim();

// Split string by space
// let words = input.split(" ");

// Count words
// let count = words.length;

// alert(`Total words: ${count}`);


// let arr = [12, 5, 9, 44, 2, 18];
// let max = arr[0]; // first element as starting max

// for (let i = 1; i < arr.length; i++) {
//     if (arr[i] > max) {
//         max = arr[i];
//     }
// }

// alert(`Maximum number is: ${max}`);

// let text = prompt("Enter any string:");
// let result = "";

// for (let i = 0; i < text.length; i++) {
//     let char = text[i].toLowerCase();
//     if ("aeiou".includes(char)) {
//         result += "*";
//     } else {
//         result += text[i];
//     }
// }

// alert(`String after replacing vowels: ${result}`);

// let N = Number(prompt("Enter any number"));
// let total = 0;

// for (let i = 1; i <= N; i++) {
//     total += i;
// }

// alert(`Sum of first ${N} numbers is: ${total}`);


let input = prompt("Enter string here");

// Lowercase for uniform comparison
let str = input.toLowerCase();
let rev = "";

// Reverse the string
for (let i = str.length - 1; i >= 0; i--) {
    rev += str[i];
}

// Compare original & reversed
if (str === rev) {
    alert("Palindrome string");
} else {
    alert("String is not palindrome");
}
