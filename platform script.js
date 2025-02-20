// Generate 20 random OTPs
const generatedOTPs = new Set();
while (generatedOTPs.size < 20) {
    generatedOTPs.add(Math.floor(100000 + Math.random() * 900000).toString());
}
console.log("Generated OTPs:", Array.from(generatedOTPs)); // For testing

let usedOTPs = new Set();
let timerInterval;

// Validate OTP function
function validateOTP() {
    const userOTP = document.getElementById("otp-input").value.trim();
    const otpError = document.getElementById("otp-error");

    if (generatedOTPs.has(userOTP) && !usedOTPs.has(userOTP)) {
        usedOTPs.add(userOTP); // Mark OTP as used
        document.getElementById("otp-container").classList.add("hidden");
        document.getElementById("main-container").classList.remove("hidden");
        startTimer(60 * 60); // Start 60-minute timer
        preventTabSwitch();
    } else {
        otpError.innerText = "Invalid or already used OTP!";
    }
}

// Start timer function
function startTimer(duration) {
    let timer = duration, minutes, seconds;
    timerInterval = setInterval(function () {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;

        document.getElementById("timer").textContent = 
            `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

        if (--timer < 0) {
            clearInterval(timerInterval);
            alert("Time's up! Session ended.");
            location.reload();
        }
    }, 1000);
}

// Redirect to compiler
function redirect(language) {
    const links = {
        c: "https://www.onlinegdb.com/online_c_compiler",
        python: "https://www.onlinegdb.com/online_python_compiler",
        java: "https://www.onlinegdb.com/online_java_compiler"
    };
    window.location.href = links[language];
}

// Prevent tab switching
function preventTabSwitch() {
    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            alert("Tab switch detected! Session ended.");
            location.reload();
        }
    });
}

// Disable Copy-Paste to Avoid Plagiarism
document.addEventListener("copy", (event) => {
    event.preventDefault();
    alert("Copying is not allowed!");
});

document.addEventListener("paste", (event) => {
    event.preventDefault();
    alert("Pasting is not allowed!");
});   
