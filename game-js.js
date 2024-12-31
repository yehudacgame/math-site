var current = 0;
var score = 0;
var lives = 3;

function showAlert(message, isSuccess) {
    var alert = document.getElementById("alert");
    alert.textContent = message;
    alert.className = "alert " + (isSuccess ? "success" : "error");
    alert.style.display = "block";
    setTimeout(function() {
        alert.style.display = "none";
    }, 1500);
}

function endGame() {
    document.getElementById("game").style.display = "none";
    document.getElementById("gameOver").style.display = "block";
    document.getElementById("finalScore").textContent = score;
}

function checkAnswer(answer) {
    if (answer === words[current][1]) {
        score++;
        document.getElementById("score").textContent = score;
        showAlert("!כל הכבוד", true);
    } else {
        lives--;
        document.getElementById("lives").textContent = "❤️".repeat(lives);
        showAlert(words[current][0] + " = " + words[current][1], false);
    }

    if (current === 4 || lives === 0) {
        endGame();
    } else {
        current++;
        showWord();
    }
}

function showWord() {
    document.getElementById("word").textContent = words[current][0];
    document.getElementById("progress").textContent = (current + 1) + "/5";
    
    var options = document.getElementById("options");
    options.innerHTML = "";
    
    var answers = [words[current][1]];
    while (answers.length < 4) {
        var random = words[Math.floor(Math.random() * words.length)][1];
        if (answers.indexOf(random) === -1) {
            answers.push(random);
        }
    }
    
    for (var i = answers.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = answers[i];
        answers[i] = answers[j];
        answers[j] = temp;
    }
    
    for (var i = 0; i < answers.length; i++) {
        var button = document.createElement("button");
        button.textContent = answers[i];
        button.className = "button";
        button.onclick = function(answer) {
            return function() { checkAnswer(answer); };
        }(answers[i]);
        options.appendChild(button);
    }
}

showWord();
