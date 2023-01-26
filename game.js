//Game Variables
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var level = 0;
var gameInProgress = false;


//Random color generator
function nextSequence() {
    //Increase Level
    level++;
    $("h1").text("Level: " + level);
    //Generate a random number
    randomNumber = Math.floor(Math.random() * 4);

    //Pick a random color
    var randomChosenColor = buttonColors[randomNumber];

    //Add the color to the game pattern array
    gamePattern.push(randomChosenColor);

    //Flash
    $("#" + randomChosenColor).fadeOut(200).fadeIn(200);
    playSound(randomChosenColor);
}

//Start the game
$(document).on("keydown", function (event) {
    gameInProgress = true;
    $("#score").remove();
    startOver();
    if (event.key) {
        nextSequence();
    }
});

//Tile Clicked
$(".btn").click(function (event) {
    if (gameInProgress) {
        var userChosenColor = event.target.id;
        userClickedPattern.push(userChosenColor);
        checkAnswer((userClickedPattern.length - 1));
        animatePress(userChosenColor);
        playSound(userChosenColor);
    }
});


//Audio
function playSound(name) {
    var track = new Audio("sounds/" + name + ".mp3");
    track.play();
}

//User Click Animation
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

//Check Answer
function checkAnswer(currentLevel) {
    //Current tile check
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");

        // If all the tiles match
        if (userClickedPattern.length === gamePattern.length) {
            console.log("Pattern Success");
            userClickedPattern = [];
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("Wrong");
        $("body").addClass("game-over");
        gameInProgress = false;
        $("h1").text("Game Over. Press Any Key To Restart");
        $("h1").after("<h1 id = 'score'> Your Score: " + (level - 1) + "</h1>");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startOver();
    }
}

//Restart Game. Clear levels and arrays
function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}