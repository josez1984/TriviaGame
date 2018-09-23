$(document).ready(function(){
    const app = new App({});
    const host = new Host({});
    app.host = host;

    console.log(app);

    $("#test-hide-div-2").hide();
    $("#test-div-attach").hide();
    $("#welcome-page").hide();

    introSequence(app);

    $(".difficulty-btn").on("click", function(){
        app.difficulty = parseInt($(this).data('value'));
        $("#current-difficulty-text").text($(this).text() + "/ " + app.questionSeconds + " seconds to answer each question.");
        $("#welcome-screen-btn-start").show();
    });

    $("#welcome-screen-btn-start").on("click", function(){
        console.log("STarting..");
    }); 
});

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


