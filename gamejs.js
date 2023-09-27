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

// Replace these placeholders with actual values
const initialHero = "C";
const initialHeroine = "T";
const initialMovieName = "S";
const correctAnswer = "stalin";
const clue = "naluguriki sahayam cheddam";

// Manually provide YouTube links for male and female players
const maleVideoUrl = "https://www.youtube.com/embed/q2mt5XNgFVE";
const femaleVideoUrl = "https://www.youtube.com/embed/Q8FUQawC_1I";

clueIconElement.addEventListener("mouseenter", () => {
    // Change cursor to a hand click symbol when mouse is over the clue icon
    clueIconElement.classList.add("clue-closed");
});

clueIconElement.addEventListener("mouseleave", () => {
    // Restore default cursor when mouse leaves the clue icon
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
        clueIconElement.textContent = "🔍";
    }
});

submitButton.addEventListener("click", () => {
    const userGuess = guessInput.value.trim().toLowerCase();

    if (userGuess === correctAnswer.toLowerCase()) {
        // Play the correct sound
        correctSound.play();

        // Reveal all letters for hero, heroine, and movie name
        heroInitialElement.textContent = initialHero + "hiranjeevi";
        heroineInitialElement.textContent = initialHeroine + "risha";
        movieNameInitialElement.textContent = initialMovieName + "talin";

        // Update the result message
        resultElement.textContent = "Congratulations! You guessed it correctly.";
        resultElement.style.color = "green";

        // Prompt the player for their gender after a brief delay
        setTimeout(() => {
            const playerGender = prompt("Congratulations! You guessed correctly. Please enter your gender (Male/Female):");

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
                resultElement.textContent = "This song is dedicated for you (" + playerGender + ")";
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
            heroInitialElement.textContent = initialHero + "hiranjeevi";
            heroineInitialElement.textContent = initialHeroine + "risha";
            movieNameInitialElement.textContent = initialMovieName + "talin";
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
