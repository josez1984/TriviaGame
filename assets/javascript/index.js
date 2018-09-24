$(document).ready(function(){
    const app = new App({});
    const host = new Host({});
    app.host = host;

    $("#welcome-page").hide();
    $("#game-section").hide();
    $("#status-page").hide();
    $("#summary-page").hide();

    if(app.showHost === 1) {
        app.host.hideHost();
        introSequence(app);
    } else {
        $("#welcome-page").show();
        app.host.hideHost();
    }

    app.addNewPlayer("Player 1");

    $(".difficulty-btn").on("click", function(){
        app.difficulty = parseInt($(this).data('value'));
        $("#current-difficulty-text").text($(this).text() + "/ " + app.questionSeconds + " seconds to answer each question.");
        $("#welcome-screen-btn-start").show();
    });

    $("#welcome-screen-btn-start").on("click", function(){
        $("#welcome-page").hide();
        startGame(app);
    });

    $("#restart-game-btn").on("click", function(){
        restart(app);
    });
});

function restart(app) {
    $("#welcome-page").hide();
    $("#game-section").hide();
    $("#summary-page").hide();

    $("#status-page-text").text("Starting over...");
    $("#status-page").show();
    
    for(var i = 0; i < app.players.length; i++) {
        app.players[i].correct = 0;
        app.players[i].wrong = 0;
    }

    for(var i = 0; i < app.questions.length; i++) {
        app.questions[i].alreadyAsked = 0;
    }

    setTimeout(function(){
        startGame(app);
    }, 2000);
}

function answerCorrect(app) {
    app.host.rightChoiceSequence();
    $("#welcome-page").hide();
    $("#game-section").hide();
    $("#summary-page").hide();

    $("#status-page-text").text("Congratulations, thats the right answer!!");
    $("#status-page").show();
    
    app.players[0].correct = app.players[0].correct + 1;
    
    setTimeout(function(){
        nextQuestion(app)
    }, 2000);
}

function answerWrong(app, correctAnswer) {
    app.host.wrongChoiceSequence();

    $("#welcome-page").hide();
    $("#game-section").hide();
    $("#summary-page").hide();

    $("#status-page-text").text("Wrong answer. The correct answer is: " + correctAnswer);
    $("#status-page").show();
    
    app.players[0].wrong = app.players[0].wrong + 1;

    setTimeout(function(){
        nextQuestion(app)
    }, 2000);
}

function gameChoiceBtnClick(app) {
    $(".game-choice-button").on("click", function(){
        var questionKey = parseInt($(this).data('question-idx'));
        var userChoice = parseInt($(this).data('choice'));
        var rightChoice = app.questions[questionKey].correctChoice;
        clearInterval(app.questionCountdownId);

        if(rightChoice === userChoice) {
            answerCorrect(app);
        } else {
            answerWrong(app, app.questions[questionKey].choices[rightChoice]);
        }
    });
}

function showCountdown(app) {
    $("#welcome-page").hide();
    $("#game-section").hide();
    $("#summary-page").hide();

    $("#status-page-text").text("Next question in...");
    $("#status-page").show();
}

function startGame(app) {
    app.host.getReadySequence();
    nextQuestion(app);
}

function timeOver(app) {
    $("#welcome-page").hide();
    $("#game-section").hide();
    $("#summary-page").hide();

    var key = app.questionKey;
    var rightChoice = app.questions[key].correctChoice;
    var rightChoiceText = app.questions[key].choices[rightChoice];

    $("#status-page-text").text("Ooops. Times's up. The correct answer is: " + rightChoiceText);
    $("#status-page").show();

    setTimeout(function(){
        nextQuestion(app)
    }, 2000);
}

function nextQuestion(app) {
    if(app.questionsLeft() > 0) {
        showCountdown();
        var x = 3;
        var intervalId = setInterval(function() {
            if(x === 0) {
                clearInterval(intervalId);   
                $("#game-section").show();

                var y = app.questionSeconds;
                var questionCountdown = setInterval(function() {
                    $("#question-remaining-time").text(y);
                    if(y === 0) {
                        clearInterval(questionCountdown);
                        timeOver(app);
                        return;
                    }
                    y = y - 1;
                }, 1000);

                app.questionCountdownId = questionCountdown;
                app.newQuestion();
                $('html, body').animate({scrollTop: $(document).height()}, 'slow');
                
                gameChoiceBtnClick(app);
                $("#status-page").hide();
            } 
            $("#status-page-text").text(x);
            x = x - 1;
        }, 1000);
    } else {
        gameOver(app);
    }
}

function gameOver(app) {
    $("#welcome-page").hide();
    $("#game-section").hide();
    $("#status-page").hide();
    $("#summary-page").show();

    $("#correct-answers-text").text("Correct: " + app.players[0].correct);
    $("#wrong-answers-text").text("Wrong: " + app.players[0].wrong);
}

function setBackground(app) {
    // var bkurls = app.backgrounds;
    // $("body").css('background-image', 'url(' + bkurls[randN(bkurls.length, 0)] + ')');
}

function introSequence(app) {
    var delay = 0;

    setBackground(app);

    app.host.showHost();
    setTimeout(function(){
        delay = app.host.newMessage("Hi. Welcome to Girl Trivia. I'll be your game host for today");        
        setTimeout(function(){
            delay = app.host.newMessage("Choose a difficulty and we can get started.");
            setTimeout(function(){
                delay = app.host.newMessage("Basically, You have to answer as many question as fast as you can. If you run out of time, the game is over, and you lose. Lol. Have fun.", true);
                setTimeout(function(){
                    app.host.hideHost();
                    $("#welcome-page").show();
                }, delay + 1000);
            }, delay + 1000);
        }, delay + 1000);
    }, 1000);
}


