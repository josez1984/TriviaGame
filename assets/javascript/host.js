class Host {
    constructor(params) {
        this.name = params.name;
    }

    showHost() {
        $(".host").css("bottom", "0");
        $(".host").animate({ "left": "+=100%" }, "slow" );
    }

    hideHost() {
        $(".host").css("bottom", "0");
        $(".host").animate({ "left": "-=100%" }, "slow" );
        $('[data-toggle="popover"]').popover('hide');
        $('[data-toggle="popover"]').popover('dispose');
    }

    newMessage(message, hideOnClick) {
        var messageBuild = "";
        var secondCount = 200;
        var hideHostX = this.hideHost;

        $('[data-toggle="popover"]').popover({ 
            placement: 'top' 
        });

        for(var i = 0; i <= message.length; i++) {
            messageBuild = messageBuild + message.charAt(i);
            setTimeout(function(currentMessage){
                $('[data-toggle="popover"]').popover('show');
                $('[data-toggle="popover"]').attr("data-content", currentMessage);
            }, secondCount, messageBuild);
            secondCount += 20;
        }

        setTimeout(function(){
            $('.popover, [data-toggle="popover"]').on("click", function(){
                $('[data-toggle="popover"]').popover('hide');
                $('[data-toggle="popover"]').popover('dispose');
                if(hideOnClick === true) {
                    hideHostX();
                }
                $(".popover").off("click", );
            });
        }, secondCount);

        return secondCount;
    }

    wrongChoiceSequence() {
        var delay = 0;  
        var hostObj = this; 
        hostObj.showHost();
        delay = hostObj.newMessage("Oh no, Thats wrong, sorry...");
        setTimeout(function() {
            delay = hostObj.newMessage("That's ok, try again!");        
            setTimeout(function(){
                hostObj.hideHost();        
            }, delay + 2000);
        }, delay + 1000);
    }

    rightChoiceSequence() {
        var delay = 0;  
        var hostObj = this; 
        hostObj.showHost();
        delay = hostObj.newMessage("Yes, that's correct.....");
        setTimeout(function() {
            delay = hostObj.newMessage("Good job!!!");        
            setTimeout(function(){
                hostObj.hideHost();        
            }, delay + 2000);
        }, delay + 1000);
    }

    getReadySequence() {
        var delay = 0;  
        var hostObj = this; 
        hostObj.showHost();
        delay = hostObj.newMessage("Ready.........");
        setTimeout(function() {
            delay = hostObj.newMessage("Set........");        
            setTimeout(function(){
                delay = hostObj.newMessage("Go!!");   
                setTimeout(function(){
                    hostObj.hideHost();        
                }, delay + 1000)     
            }, delay + 1000);
        }, delay + 1000);
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

