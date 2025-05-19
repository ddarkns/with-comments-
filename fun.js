// Global variables
var x = 3;  // Counter for login attempts
const acc = [];  // Array to store user accounts
var us;  // Variable for username
var p;   // Variable for password
var i = -1;  // Index counter for account array

// User class definition
class users {
    constructor(username, password) {
        this.username = username;  // Store username
        this.password = password;  // Store password
        this.flag = 0;            // Flag for login status
        this.balance = 0;         // User's account balance
        this.withdraw = 0;        // Amount withdrawn
        this.depostie = 0;        // Amount deposited
    }
}

// Function to check user login credentials
function check() {
    // Get username and password from input fields
    var v1 = document.getElementById('u').value;
    var v2 = document.getElementById('p').value;
    
    // Check if user exists in localStorage
    if(localStorage.getItem(v1)) {
        const lol = JSON.parse(localStorage.getItem(v1));
        var pw = lol.password;
        
        // Verify password
        if(pw == v2) {
            // Set login flag and update localStorage
            lol.flag = 1;
            localStorage.setItem('logged-in', JSON.stringify(lol));
            localStorage.setItem(v1, JSON.stringify(lol));
            document.getElementById('m1').innerHTML = "you have succesfully logged in!!! " + " welcome to your bank system " + lol.username;
            
            // Check for redirect parameters (for reservation system)
            const urlParams = new URLSearchParams(window.location.search);
            const redirect = urlParams.get('redirect');
            
            // Redirect based on parameter
            if(redirect === 'reservation') {
                window.location.href = 'reservation.html';
            } else {
                window.location.href = 'system.html';
            }
        } else {
            // Handle incorrect password
            x = x - 1;
            if(x > 0) {
                document.getElementById('m1').innerHTML = "incorrect password, you have " + x + " tries left!";
            } else {
                alert("you have enterd incorrect password too many times!!!, try again later");
                window.location.href = "bank_system.html";
            }
        }
    } else {
        document.getElementById('m1').innerHTML = "invalid username!!!"
    }
}

// Function to create new user account
function create() {
    i = i + 1;
    const username = document.getElementById("u1").value;
    const password = document.getElementById("p1").value;
    
    // Check if username already exists
    if(localStorage.getItem(username)) {
        document.getElementById("m").innerHTML = "user name already exists,try another";
    } else {
        // Create new user account and store in localStorage
        acc.push(new users(username, password));
        localStorage.setItem(username, JSON.stringify(acc[i]));
        
        alert("account succesfully created!!, you can login now");
        window.location.href = "bs_login.html";
    } 
}

// Function to display welcome message
function wel() {
    const lol2 = JSON.parse(localStorage.getItem('logged-in'));
    document.getElementById("m3").innerHTML = "Welcome " + lol2.username + " to the bank system";
}

// Function to display user's balance
function show() {
    const lol2 = JSON.parse(localStorage.getItem('logged-in'));
    document.getElementById("m4").innerHTML = "Your balance is: " + lol2.balance;
}

// Function to handle deposits
function add() {
    const lol3 = JSON.parse(localStorage.getItem('logged-in'));
    lol3.depostie = Number(document.getElementById('e').value);
    localStorage.setItem('logged-in', JSON.stringify(lol3));
    
    // Update balance with deposit amount
    lol3.balance = lol3.balance + lol3.depostie;
    alert("amount deposited is: " + lol3.depostie);
    
    // Update localStorage with new balance
    localStorage.setItem(lol3.username, JSON.stringify(lol3));
    localStorage.setItem('logged-in', JSON.stringify(lol3));
}

// Function to handle logout
function lo() {
    localStorage.setItem('logged-in', "none");
    alert("you have succesfuly logged out")
    window.location.href = 'bank_system.html';
}

// Function to handle withdrawals
function del() {
    const lol3 = JSON.parse(localStorage.getItem('logged-in'));
    
    // Get withdrawal amount and update flag
    lol3.withdraw = Number(document.getElementById('e').value);
    lol3.flag += lol3.withdraw;
    localStorage.setItem('logged-in', JSON.stringify(lol3));
    
    // Update balance after withdrawal
    lol3.balance = lol3.balance - lol3.withdraw;
    alert("amount withdrawn is: " + lol3.withdraw);
    
    // Update localStorage with new balance
    localStorage.setItem(lol3.username, JSON.stringify(lol3));
    localStorage.setItem('logged-in', JSON.stringify(lol3));
}