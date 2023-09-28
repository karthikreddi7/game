
// Function to share on Twitter
function shareOnTwitter() {
    // Define the sharing message
    const shareMessage = "Guess the flick Day 1:-I guessed the movie name in " + (4 - attempts + 1) + " attempts! Can you beat me? #GuessTheFlick               https://guess-the-flick.netlify.app/";

    // Twitter sharing URL
    const twitterShareUrl = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(shareMessage);

    // Check if the user is on an iOS or Android device
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);

    // Determine whether to open in-app or in a browser
    if (isIOS) {
        // Open in the Twitter app on iOS if available
        window.location.href = "twitter://post?message=" + encodeURIComponent(shareMessage);
    } else if (isAndroid) {
        // Open in the Twitter app on Android if available
        window.location.href = "twitter://post?message=" + encodeURIComponent(shareMessage);
    } else {
        // Open in a browser if not on iOS or Android
        window.open(twitterShareUrl);
    }
}

// Function to share the game on Instagram (Web)
function shareOnInstagramWeb() {
    // You can provide a message or caption for Instagram sharing here
    const shareMessage = "Guess the flick Day 1-I guessed the movie name in " + (4 - attempts + 1) + " attempts! Can you beat my score?";
    alert("Instagram sharing is limited on web browsers. Please share manually: " + shareMessage);
}

// Function to share the game on Facebook (Web)
function shareOnFacebookWeb() {
    const shareUrl = "https://www.facebook.com/sharer/sharer.php?u=" + window.location.href;
    window.open(shareUrl, "_blank");
}

document.getElementById("instagram-icon").addEventListener("click", shareOnInstagramWeb);
document.getElementById("facebook-icon").addEventListener("click", shareOnFacebookWeb);

// Attach the shareOnTwitter function to the Twitter share button click event
const twitterShareButton = document.getElementById("twitter-icon");
twitterShareButton.addEventListener("click", shareOnTwitter);

const heroInitialElement = document.getElementById("hero-initial");
const heroineInitialElement = document.getElementById("heroine-initial");
const movieNameInitialElement = document.getElementById("movie-name-initial");
const guessInput = document.getElementById("guess");
const submitButton = document.getElementById("submit");
const resultElement = document.getElementById("result");
const clueTextElement = document.getElementById("clue-text");
const clueIconElement = document.getElementById("clue-icon");
const correctSound = document.getElementById("correctSound");
const incorrectSound = document.getElementById("incorrectSound");
const aboutIcon = document.getElementById("about-icon");
const aboutDescription = document.getElementById("about-description");

// Replace these placeholders with actual values
const initialHero = "N";
const initialHeroine = "Y";
const initialMovieName = "C";
const correctAnswer = "courier boy kalyan";
const clue = "DTDC, Blue dart, Fed ex etc.";
// Manually provide YouTube links for male and female players
const maleVideoUrl = "https://www.youtube.com/embed/IjqEuyYQXk0";
const femaleVideoUrl = "https://www.youtube.com/embed/K6AMgkHZFXQ";

let attempts = 4;

clueIconElement.addEventListener("mouseenter", () => {
    // Change cursor to a hand click symbol when the mouse is over the clue icon
    clueIconElement.classList.add("clue-closed");
});

clueIconElement.addEventListener("mouseleave", () => {
    // Restore the default cursor when the mouse leaves the clue icon
    clueIconElement.classList.remove("clue-closed");
});

clueIconElement.addEventListener("click", () => {
    if (clueTextElement.style.display === "none" || clueTextElement.style.display === "") {
        // Display the clue text when the clue icon is clicked
        clueTextElement.style.display = "inline";
        clueIconElement.textContent = "❌"; // Change the icon to a close symbol
    } else {
        // Hide the clue text and change the icon back to the search symbol
        clueTextElement.style.display = "none";
        clueIconElement.textContent = "🔍(click on this)";
    }
});

aboutIcon.addEventListener("click", () => {
    if (aboutDescription.style.display === "none" || aboutDescription.style.display === "") {
        aboutDescription.style.display = "block";
    } else {
        aboutDescription.style.display = "none";
    }
});

submitButton.addEventListener("click", () => {
    const userGuess = guessInput.value.trim().toLowerCase();

    // Calculate the Levenshtein distance between the user's guess and the correct answer
    function levenshteinDistance(str1, str2) {
        const m = str1.length;
        const n = str2.length;
        const dp = new Array(m + 1).fill(null).map(() => new Array(n + 1).fill(0));

        for (let i = 0; i <= m; i++) {
            for (let j = 0; j <= n; j++) {
                if (i === 0) {
                    dp[i][j] = j;
                } else if (j === 0) {
                    dp[i][j] = i;
                } else if (str1[i - 1] === str2[j - 1]) {
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
                }
            }
        }

        return dp[m][n];
    }

    // Calculate the Levenshtein distance between the user's guess and the correct answer
    const distance = levenshteinDistance(userGuess, correctAnswer.toLowerCase());

    if (distance <= 2) { // You can adjust the distance threshold as needed
        // Play the correct sound
        correctSound.play();

        // Reveal all letters for hero, heroine, and movie name
        heroInitialElement.textContent = initialHero + "ithin";
        heroineInitialElement.textContent = initialHeroine + "ami gautham";
        movieNameInitialElement.textContent = initialMovieName + "ourier boy kalyan";

        // Update the result message
        resultElement.textContent = "Congratulations! You guessed it correctly.";
        resultElement.style.color = "green";


        // Prompt the player for their gender after a brief delay
        setTimeout(() => {
            const playerGender = prompt("Congratulations! You guessed correctly. Please enter your gender (Male/Female) and we will dedicate a song for you:");

            if (playerGender !== null) {
                let youtubeVideoUrl = "";

                if (playerGender.toLowerCase() === "male") {
                    // Use the YouTube link for male players
                    youtubeVideoUrl = maleVideoUrl;
                } else if (playerGender.toLowerCase() === "female") {
                    // Use the YouTube link for female players
                    youtubeVideoUrl = femaleVideoUrl;
                }

                // Display the dedication message
                resultElement.textContent = "This song is dedicated to you";
                resultElement.style.color = "green";

                if (youtubeVideoUrl !== "") {
                    // Create an iframe element to embed the YouTube video
                    const youtubeIframe = document.createElement("iframe");
                    youtubeIframe.src = youtubeVideoUrl;
                    youtubeIframe.width = "280";
                    youtubeIframe.height = "160";
                    youtubeIframe.allowfullscreen = "true";

                    // Append the YouTube video
                    resultElement.appendChild(youtubeIframe);
                }
            }
        }, 1000); // Delay the prompt for a better user experience
    } else {
        // Play the incorrect sound
        incorrectSound.play();

        attempts--;

        if (attempts === 0) {
            // No more attempts left, display the answers and a message
            heroInitialElement.textContent = initialHero + "ithin";
            heroineInitialElement.textContent = initialHeroine + "ami gautham";
            movieNameInitialElement.textContent = initialMovieName + "ourier boy kalyan";
            resultElement.textContent = "You lost. Better luck tomorrow!";
            resultElement.style.color = "red";
            submitButton.disabled = true; // Disable the submit button
        } else {
            // Update the result message with the remaining attempts
            resultElement.textContent = "Incorrect. Try again. Remaining attempts: " + attempts;
            resultElement.style.color = "red";
        }
    }
});
