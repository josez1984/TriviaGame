$(document).ready(function(){
    const app = new App({});
    const host = new Host({});
    app.host = host;

    console.log(app);

    $("#test-hide-div-2").hide();
    $("#test-div-attach").hide();
    $("#welcome-page").hide();
    $("#game-section").hide();

    introSequence(app);

    $(".difficulty-btn").on("click", function(){
        app.difficulty = parseInt($(this).data('value'));
        $("#current-difficulty-text").text($(this).text() + "/ " + app.questionSeconds + " seconds to answer each question.");
        $("#welcome-screen-btn-start").show();
    });

    $("#welcome-screen-btn-start").on("click", function(){
        console.log("STarting..");
        $([document.documentElement, document.body]).animate({
            scrollTop: $("#navbar-id").offset().top
        }, 2000);
        $("#welcome-page").hide();
        startGame(app);
    }); 
});

function startGame(app) {
    var newQuestion = app.newQuestion();
    var questionBuild = "";
    var secondCount = 200;

    $("#game-section").show();

    for(var i = 0; i <= newQuestion.question.length; i++) {
        questionBuild = questionBuild + newQuestion.question.charAt(i);
        setTimeout(function(currentQuestion){
            $("#question-text").text(currentQuestion);
        }, secondCount, questionBuild);
        secondCount += 20;
    }

    $.each(newQuestion.choices, function(key, value){
        console.log(key + ": " + value);
        var buttonHtml = '<div class="row p-1"><div class="col-sm"><button class="btn btn-block game-choice-button" data-value="' + key + '">' + value + '</button></div></div>';
        $("#question-card-choices").append(buttonHtml);        
    });
}

function setBackground(app) {
    // var bkurls = app.backgrounds;
    // $("body").css('background-image', 'url(' + bkurls[randN(bkurls.length, 0)] + ')');
}

function introSequence(app) {
    var delay = 0;

    setBackground(app);
    app.host.hideHost();
    
    setTimeout(function(){
        app.host.showHost();
        setTimeout(function(){
            delay = app.host.newMessage("Hi. Welcome to Girl Trivia. I'll be your game host for today");        
            setTimeout(function(){
                delay = app.host.newMessage("Choose a difficulty and we can get started.");
                setTimeout(function(){
                    delay = app.host.newMessage("Basically, You have to answer as many question as fast as you can. If you run out of time, the game is over, and you lose. Lol. Have fun.", true);
                    setTimeout(function(){
                        $("#welcome-page").show();
                    }, delay + 1000);
                }, delay + 1000);
            }, delay + 1000);
        }, 1000);
    }, 1000);
}


