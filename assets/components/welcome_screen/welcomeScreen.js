function WelcomeScreen() {
    this.animateShow = function(addOrRemove) {
        console.log("WelcomeScreen.animateShow(" + addOrRemove + ")");
        $("#welcome-screen-jumbotron").toggleClass("slideInLeft", addOrRemove );
    }
}