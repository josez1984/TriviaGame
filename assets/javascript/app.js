class App {
    constructor(params) {
        this.players = [];
        this.difficulty = this.difficulty;
    }

    get backgrounds() {
        return this.backgroundsList();
    }
    
    get questionSeconds() {
        if(this.difficulty === 1) {
            return 10;
        } else if(this.difficulty === 2) {
            return 7;
        } else if(this.difficulty === 3) { 
            return 4;
        }
        return 0;
    }

    backgroundsList() {
        return [
            'assets/images/Background/bright-countryside-dawn-302804.jpg',
            'assets/images/Background/forces-of-nature-lightning-amazing-storm.jpg',
            'assets/images/Background/1368568.jpg',
            'assets/images/Background/1368591.jpg',
            'assets/images/Background/1368585.jpg',
            'assets/images/Background/1368606.jpg',
            'assets/images/Background/1368626.jpg',
            'assets/images/Background/1368636.jpg',
            'assets/images/Background/1368640.jpg',
            'assets/images/Background/1368654.jpg',
            'assets/images/Background/1368673.jpg',
            'assets/images/Background/1368681.jpg',
            'assets/images/Background/1368734.jpg',
            'assets/images/Background/1368764.jpg',
            'assets/images/Background/1368769.jpg'
        ];
    }
}

// // function App(Params) {
// //     this.players = [];
// //     this.maxPlayers = 
// // }

// $(document).ready(function(){
//     // $("#test-hide-div-2").hide();
//     // $("#test-div-attach").hide();
//     // $("#main-page").empty();

//     // setTimeout(function(){
//     //     $("#main-page").append("#test-hide-div-2");
//     // }, 2000);
//     appStart();
// });

// function appStart() {
//     setBackground();
//     $("#welcome-page").show();
//     $("#test-page").hide();
// }

// function setBackground() {
//     var bkurls = backgrounds();
//     $("body").css('background-image', 'url(' + bkurls[randN(bkurls.length, 0)] + ')');
// }

// function backgrounds() {
//     return [
//         'assets/images/Background/bright-countryside-dawn-302804.jpg',
//         'assets/images/Background/forces-of-nature-lightning-amazing-storm.jpg',
//         'assets/images/Background/1368568.jpg',
//         'assets/images/Background/1368591.jpg',
//         'assets/images/Background/1368585.jpg',
//         'assets/images/Background/1368606.jpg',
//         'assets/images/Background/1368626.jpg',
//         'assets/images/Background/1368636.jpg',
//         'assets/images/Background/1368640.jpg',
//         'assets/images/Background/1368654.jpg',
//         'assets/images/Background/1368673.jpg',
//         'assets/images/Background/1368681.jpg',
//         'assets/images/Background/1368734.jpg',
//         'assets/images/Background/1368764.jpg',
//         'assets/images/Background/1368769.jpg'
//     ];
// }

// function randN(multiplier, plus) {
//     return Math.floor(Math.random() * multiplier) + plus;
// }