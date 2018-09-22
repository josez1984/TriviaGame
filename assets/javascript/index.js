$(document).ready(function(){
    const app = new App({});
    const host = new Host({});
    app.host = host;

    console.log(app);

    $("#test-hide-div-2").hide();
    $("#test-div-attach").hide();
    $("#welcome-page").hide();

    introSequence(app);
});

function setBackground(app) {
    var bkurls = app.backgrounds;
    $("body").css('background-image', 'url(' + bkurls[randN(bkurls.length, 0)] + ')');
}

function introSequence(app) {
    var delay = 0;

    setBackground(app);
    app.host.hideHost();

    setTimeout(function(){
        app.host.showHost();
        setTimeout(function(){
            delay = app.host.newMessage("Delayed Test Message");
            setTimeout(function(){
                app.host.newMessage("Delayed Test Message 2");
            }, delay);
        }, 1000);
    }, 1000);
}


