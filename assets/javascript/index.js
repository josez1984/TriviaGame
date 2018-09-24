$(document).ready(function(){
    const app = new App({});
    const host = new Host({});
    app.host = host;
    app.addNewPlayer("Player 1");
    
    $("#welcome-page").hide();
    $("#game-section").hide();
    $("#status-page").hide();
    $("#summary-page").hide();
    $("#mode-page").hide();

    if(app.showHost === 1) {
        app.host.hideHost();
        introSequence(app);
    } else {
        $("#mode-page").show();
        app.host.hideHost();
    }

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

    $(".multiplayer-btn").on("click", function(){
        var mode = parseInt($(this).data('value'));
        if(mode === 2) {
            app.addNewPlayer("Player 2");
            $(".player-2-card-col").show();
            $("#game-section-card").toggleClass("rotate-180-deg");           
            $(".footer-text").hide();
            $(".card-header").hide();           
        } else {
            $(".player-2-card-col").hide();          
        }
        $("#welcome-page").show();
        $("#mode-page").hide();
    });
});

function restart(app) {
    $("#welcome-page").hide();
    $("#game-section").hide();
    $("#summary-page").hide();
    $("#mode-page").hide();
    
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

function answerCorrect(app, playerId) {
    app.host.rightChoiceSequence();
    $("#welcome-page").hide();
    $("#game-section").hide();
    $("#summary-page").hide();
    $("#mode-page").hide();

    $("#status-page-text").text('Congratulations ' + app.players[playerId].name + ', thats the right answer!!');
    $("#status-page").show();
    
    app.players[playerId].correct = app.players[playerId].correct + 1;
    
    setTimeout(function(){
        nextQuestion(app)
    }, 2000);
}

function answerWrong(app, correctAnswer, playerId) {
    app.host.wrongChoiceSequence();

    $("#welcome-page").hide();
    $("#game-section").hide();
    $("#summary-page").hide();
    $("#mode-page").hide();

    $("#status-page-text").text("Wrong answer. The correct answer is: " + correctAnswer);
    $("#status-page").show();
    
    app.players[playerId].wrong = app.players[playerId].wrong + 1;

    setTimeout(function(){
        nextQuestion(app)
    }, 2000);
}

function gameChoiceBtnClick(app) {
    $(".game-choice-button").on("click", function(){
        var playerId = parseInt($(this).data('player-id'))
        var questionKey = parseInt($(this).data('question-idx'));
        var userChoice = parseInt($(this).data('choice'));
        var rightChoice = app.questions[questionKey].correctChoice;
        clearInterval(app.questionCountdownId);

        if(rightChoice === userChoice) {
            answerCorrect(app, playerId);
        } else {
            answerWrong(app, app.questions[questionKey].choices[rightChoice], playerId);
        }
    });
}

function showCountdown(app) {
    $("#welcome-page").hide();
    $("#game-section").hide();
    $("#summary-page").hide();
    $("#mode-page").hide();

    $("#status-page-text").text("Next question in...");
    $("#status-page").show();
}

function startGame(app) {
    app.host.getReadySequence();
    nextQuestion(app);
    if(app.players.length > 1) {
        navGuis(false);
    }
}

function timeOver(app) {
    $("#welcome-page").hide();
    $("#game-section").hide();
    $("#summary-page").hide();
    $("#mode-page").hide();

    var key = app.questionKey;
    var rightChoice = app.questions[key].correctChoice;
    var rightChoiceText = app.questions[key].choices[rightChoice];

    $("#status-page-text").text("Ooops. Times's up. The correct answer is: " + rightChoiceText);
    $("#status-page").show();

    for(var i = 0; i < app.players.length; i++) {
        app.players[i].wrong = app.players[i].wrong + 1;
    }

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
                    $(".question-remaining-time").text(y);
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
                $(".footer-text").text("Correct: " + app.players[0].correct + ", Wrong: " + app.players[0].wrong + ", Questions left: " + app.questionsLeft());
    
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

function navGuis(display) {
    if(display === true) {
        $(".jumbotron, .navbar").show();
    } else {
        $(".jumbotron, .navbar").hide();
    }
}

function gameOver(app) {
    $("#welcome-page").hide();
    $("#game-section").hide();
    $("#status-page").hide();
    $("#summary-page").show();
    $("#mode-page").hide();

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
                    $("#mode-page").show();
                }, delay + 1000);
            }, delay + 1000);
        }, delay + 1000);
    }, 1000);
}

function gameCardHtml() {
    return '<div class="row p-2">'
                + '<div class="col-sm">'  
                    + '<div id="game-section-card" class="card text-center">'
                        + '<div class="card-header">Question</div>'
                            + '<div id="question-card-body" class="card-body">'
                                + '<h5 id="question-remaining-time" class="card-title">time Remaining</h5>'
                                + '<p id="question-text" class="card-text"></p>'
                                + '<div id="question-card-choices" class="container">'
                                + '</div>'
                            + '</div>'
                        + '<div id="footer-text" class="card-footer">footer area</div>'
                    + '</div>'
                + '</div>'
            + '</div>';
}

