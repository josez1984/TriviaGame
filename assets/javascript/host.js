class Host {
    constructor(params) {
        
    }

    showHost() {
        console.log("Calling the showHost() function.");
        $(".host").css("bottom", "0");
        $(".host").animate({ "left": "+=100%" }, "slow" );
    }

    hideHost() {
        console.log("Calling the hideHost() function.");
        $(".host").css("bottom", "0");
        $(".host").animate({ "left": "-=100%" }, "slow" );
    }

    newMessage(message) {
        var messageBuild = "";
        var secondCount = 200;
        $('[data-toggle="popover"]').popover({ 
            placement: 'top' 
        });
        for(var i = 0; i <= message.length; i++) {
            messageBuild = messageBuild + message.charAt(i);
            setTimeout(function(currentMessage){
                $('[data-toggle="popover"]').popover('show');
                $('[data-toggle="popover"]').attr("data-content", currentMessage);
            }, secondCount, messageBuild);
            secondCount += 125;
        }
        return secondCount;
    }
}

// $( "#right" ).click(function() {
//     var leftVal = $(".block").css("left");
//     console.log("left: " + leftVal);
//     $( ".block" ).animate({ "left": "+=50px" }, "slow" );
// });
   
// $( "#left" ).click(function(){
//     var leftVal = $(".block").css("left");
//     console.log("left: " + leftVal);
//     $( ".block" ).animate({ "left": "-=50px" }, "slow" );
// });

// $("#show").click(function(){
//     var leftVal = $(".block").css("left");
//     console.log("left: " + leftVal);
//     $(".block").css("bottom", "0");
//     $( ".block" ).animate({ "left": "+=100%" }, "slow" );
// });

// $("#hide").click(function(){
//     var leftVal = $(".block").css("left");
//     console.log("left: " + leftVal);
//     $(".block").css("bottom", "0");
//     $( ".block" ).animate({ "left": "-=100%" }, "slow" );
// });

// $('.box').click(function() {    
//     if($("#image1").is(':visible')){
//         console.log("The host is visible.");
//     } else {
//         console.log("The host is not visible");
//     }
    
//     var leftVal = $("#image1").css("left");
//     console.log("left: " + leftVal);
//     $(this).animate({
//         left: '-50%'
//     }, 500, function() {
//         $(this).css('left', '150%');
//         $(this).appendTo('#host-container');
//     });

//     $(this).next().animate({
//         left: '50%'
//     }, 500);
// });

