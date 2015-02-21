$(document).ready(function(){
    $("#defaultdemo").click(function() {
        simplePopup({
            'pop-title':'Pop Demo', 
            'pop-body':'This is a demonstration of a simple popup. The point is to present information to the user and provide a way to dismiss the popup.', 
            'btn-text':'Dismiss',
            'body-align':'left',
            'auto-break': 35,
        });
    });
    $("#customdemo").click(function() {
        simplePopup({
            'shrink-in':true,
            'slide-in':true,
            'slide-out':true,
            'btn-style':'success', 
            'round-corners':true, 
            'head-align':'center', 
            'body-align':'center', 
            'foot-align':'right', 
            'header-bg-shade':true,
            'footer-bg-shade':false,
            'dragable':true, 
            'auto-break': 35,
            'pop-title':'Pop Demo', 
            'pop-body':'This is a demonstration of a customized popup. Notice the differences in style and presentation.', 
            'btn-text':'Dismiss',
            'click-fn':sampleExitTask
        });
    });
});

function sampleExitTask() {
    $("#exitTaskOutput").html("Action on Popup Dismissal.<br>This event fired at the time the popup was dismissed based on the function assigned to the 'click-fn' option.");
    $("#exitTaskOutput").css({padding: "4px", background: "#ff8080"});
    $("#exitTaskOutput").fadeIn();
    setTimeout(function(){
        $("#exitTaskOutput").fadeOut();
    },6000);
}
