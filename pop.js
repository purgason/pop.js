/*!
 * pop.js
 * https://github.com/purgason/pop.js
 *
 * Copyright 2015 David Purgason
 * Released under the MIT license
 */

var popNamespace = {};
var dfltOptions = {};
popNamespace.popframe = [
    '<div id="pop-holder" class="pop-holder">',
    '<div class="pop-shell">',
    '<div id="pop-head" class="pop-head">',
    '<div class="pop-data-head"></div>',
    '</div>',
    '<div class="pop-bod">',
    '<div class="pop-data-cell"></div>',
    '</div>',
    '<div class="pop-foot">',
    '<div class="pop-data-foot"></div>',
    '</div>',
    '</div>',
    '</div>',
    '<div class="modalbg"></div>'
].join('');
document.write(popNamespace.popframe);

// Basic Options Popup function
function simplePopup(optObj, callback) {
    //Set defaults for pop up
    $(".pop-shell").css({width: "0px", height: "0px"});
    popNamespace.popHeight = 0;
    popNamespace.popWidth = 0;
    dfltOptions =  {
        'shrink-in': true,
        'slide-in': false,
        'slide-out': false,
        'btn-style': 'none',
        'round-corners': 'true',
        'head-align': 'center',
        'body-align': 'center',
        'foot-align': 'center',
        'header-bg-shade': false,
        'footer-bg-shade': false,
        'dragable': true,
        'pop-title': 'Title Here',
        'pop-body': 'Body Content Here',
        'btn-text': 'OK',
        'auto-break': -1,
        'click-fn': function () {}
    };
    if (!optObj) {
        optObj = {};
    }

    // Adjust defaults for passed options
    if (optObj['btn-style']) {
        if (optObj['btn-style']==='default' || optObj['btn-style']==='error' || optObj['btn-style']==='success' || optObj['btn-style']==='primary' || optObj['btn-style']==='none') {
            dfltOptions['btn-style'] = optObj['btn-style'];
        }
    }
    if (optObj['round-corners']===true || optObj['round-corners']===false) {
        dfltOptions['round-corners'] = optObj['round-corners'];
    }
    if (optObj['head-align']) {
        if (optObj['head-align']==='left' || optObj['head-align']==='center' || optObj['head-align']==='right') {
            dfltOptions['head-align'] = optObj['head-align'];
        }
    }
    if (optObj['body-align']) {
        if (optObj['body-align']==='left' || optObj['body-align']==='center' || optObj['body-align']==='right') {
            dfltOptions['body-align'] = optObj['body-align'];
        }
    }
    if (optObj['foot-align']) {
        if (optObj['foot-align']==='left' || optObj['foot-align']==='center' || optObj['foot-align']==='right') {
            dfltOptions['foot-align'] = optObj['foot-align'];
        }
    }
    if (optObj['auto-break']) {
        dfltOptions['auto-break'] = optObj['auto-break'];
    }
    if (optObj['header-bg-shade']===false || optObj['header-bg-shade']===true) {
        dfltOptions['header-bg-shade'] = optObj['header-bg-shade'];
    }
    if (optObj['footer-bg-shade']===false || optObj['footer-bg-shade']===true) {
        dfltOptions['footer-bg-shade'] = optObj['footer-bg-shade'];
    }
    if (optObj['shrink-in']===false || optObj['shrink-in']===true) {
        dfltOptions['shrink-in'] = optObj['shrink-in'];
    }
    if (optObj['slide-in']===false || optObj['slide-in']===true) {
        dfltOptions['slide-in'] = optObj['slide-in'];
    }
    if (optObj['slide-out']===false || optObj['slide-out']===true) {
        dfltOptions['slide-out'] = optObj['slide-out'];
    }
    if (optObj.dragable===false || optObj.dragable===true) {
        dfltOptions.dragable = optObj.dragable;
    }
    if (optObj['click-fn']) {
        dfltOptions['click-fn'] = optObj['click-fn'];
    }
    if (optObj['pop-title']) {
        dfltOptions['pop-title'] = optObj['pop-title'];
    }
    if (optObj['pop-body']) {
        dfltOptions['pop-body'] = optObj['pop-body'];
    }
    if (optObj['btn-text']) {
        dfltOptions['btn-text'] = optObj['btn-text'];
    }

    // Auto add break tags to the body text
    if (dfltOptions['auto-break']!==-1) {
        if (!dfltOptions['pop-body'].match(/<.+?>/g)) {
            dfltOptions['pop-body'] = ['<div class="pop-text-wrapper">', breakText(dfltOptions['pop-body'],dfltOptions['auto-break']), '</div>'].join('');
        }
    }

    // Clear any added class objects
    $(".pop-shell").removeClass("corner-style-round-all");
    $(".pop-head").removeClass("head-align-left head-align-center head-align-right");
    $(".pop-bod").removeClass("body-align-left body-align-center body-align-right");
    $(".pop-foot").removeClass("foot-align-left foot-align-center foot-align-right");
    $(".pop-data-head").removeClass("corner-style-round-tops header-bg-shade-true header-bg-shade-false");
    $(".pop-data-cell").removeClass("body-align-center body-align-right");
    $(".pop-data-foot").removeClass("corner-style-round-btms footer-bg-shade-true footer-bg-shade-false");
    $(".pop-dismiss-btn").removeClass("btn-style-error btn-style-success btn-style-primary");

    // Set dragable option
    if(dfltOptions.dragable) {
        popNamespace.moveHandle = document.getElementById('pop-head');
        popNamespace.moveHandle.style.cursor = "move";
        popNamespace.movePop = document.getElementById('pop-holder');
        popNamespace.moveHandle.addEventListener('mousedown', mouseDown, false);
        window.addEventListener('mouseup', mouseUp, false);
    }

    // Add optional/default class styles
    if(dfltOptions['btn-style']==='none') {
        $(".pop-data-foot").html('<div tabindex="1" class="pop-dismiss-txt-btn"></div>');
        $(".pop-dismiss-txt-btn").html(dfltOptions['btn-text']);
        $(".pop-dismiss-txt-btn").addClass(("btn-style-" + dfltOptions['btn-style']));
        // bind click event to text-only dismiss button
        $(".pop-dismiss-txt-btn").click(function() {
            exitFn();
        });
    } else {
        $(".pop-data-foot").html('<button tabindex="1" class="pop-dismiss-btn" value="ok">OK</button>');
        $(".pop-dismiss-btn").html(dfltOptions['btn-text']);
        $(".pop-dismiss-btn").addClass(("btn-style-" + dfltOptions['btn-style']));
        // bind click event to dismiss button
        $(".pop-dismiss-btn").click(function() {
            exitFn();
        });
    }
    if (dfltOptions['round-corners']) {
        $(".pop-holder").addClass("corner-style-round-all");
        $(".pop-shell").addClass("corner-style-round-all");
        $(".pop-data-head").addClass("corner-style-round-tops");
        $(".pop-data-foot").addClass("corner-style-round-btms");
    }
    $(".pop-data-head").addClass(("header-bg-shade-"+dfltOptions['header-bg-shade']));
    $(".pop-data-foot").addClass(("footer-bg-shade-"+dfltOptions['footer-bg-shade']));
    $(".pop-head").addClass(("head-align-"+dfltOptions['head-align']));
    $(".pop-bod").addClass(("body-align-"+dfltOptions['body-align']));
    $(".pop-foot").addClass(("foot-align-"+dfltOptions['foot-align']));
    $(".pop-data-head").html(dfltOptions['pop-title']);
    $(".pop-data-cell").html(dfltOptions['pop-body']);

    // Position popup at center of window
    assignPopEvent("resize", false, function(){
        popNamespace.scrollOSX = $(document).scrollLeft();
        popNamespace.scrollOSY = $(document).scrollTop();
        $(".pop-holder").css({left: (($(window).width()/2)-($(".pop-shell").width()/2) + popNamespace.scrollOSX) + "px"});
        $(".pop-holder").css({top: (($(window).height()/2)-($(".pop-shell").height()/2) + popNamespace.scrollOSY) + "px"});
        $(".modalbg").css({top: popNamespace.scrollOSY + "px", left: popNamespace.scrollOSX + "px"});
    }); 
    assignPopEvent("scroll", false, function(){
        popNamespace.scrollOSX = $(document).scrollLeft();
        popNamespace.scrollOSY = $(document).scrollTop();
        $(".pop-holder").css({left: (($(window).width()/2)-($(".pop-shell").width()/2) + popNamespace.scrollOSX) + "px"});
        $(".pop-holder").css({top: (($(window).height()/2)-($(".pop-shell").height()/2) + popNamespace.scrollOSY) + "px"});
        $(".modalbg").css({top: popNamespace.scrollOSY + "px", left: popNamespace.scrollOSX + "px"});

    });
    $(".pop-holder").css({visibility: "hidden", display: "block"});
    popNamespace.popWidth = $(".pop-shell").width();
    popNamespace.popHeight = $(".pop-shell").height();
    popNamespace.scrollOSX = $(document).scrollLeft();
    popNamespace.scrollOSY = $(document).scrollTop();
    $(".pop-holder").css({visibility: "visible", display: "none"});
    $(".pop-holder").css({left: (($(window).width()/2)-((popNamespace.popWidth)/2) + popNamespace.scrollOSX) + "px"});
    $(".pop-holder").css({top: (($(window).height()/2)-((popNamespace.popHeight)/2) + popNamespace.scrollOSY) + "px"});
    $(".modalbg").css({top: popNamespace.scrollOSY + "px", left: popNamespace.scrollOSX + "px"});

    // Make popup visible
    if (dfltOptions['slide-in']) {
        $(".pop-holder").css({top: (($(window).height()/2)-($(".pop-shell").height()/2) + popNamespace.scrollOSY) + 50 + "px"});
        $(".pop-holder").fadeIn(150).animate({
            top: (($(window).height()/2)-($(".pop-shell").height()/2) + popNamespace.scrollOSY) + "px"
        },{duration: 150, queue: false});
    } else {
        $(".pop-holder").fadeIn(150);
    }

    if (dfltOptions['shrink-in']===true) {
        $(".pop-shell").css({width: (popNamespace.popWidth + 30)+"px",height: (popNamespace.popHeight + 30)+"px"});
        $(".pop-shell").animate({
            height: (popNamespace.popHeight) + "px",
            width: (popNamespace.popWidth) + "px"
        },{duration: 150, queue: false});
        $(".pop-holder").animate({
            left: (($(window).width()/2)-((popNamespace.popWidth)/2) + popNamespace.scrollOSX + 15) + "px",
            top: (($(window).height()/2)-((popNamespace.popHeight)/2) + popNamespace.scrollOSY + 15) + "px"
        },{duration: 150, queue: false});
    }
    $(".modalbg").fadeIn(150);
    if(dfltOptions['btn-style']==='none') {
        $(".pop-dismiss-txt-btn").focus();
    } else {
        $(".pop-dismiss-btn").focus();
    }
    if(callback) {callback();}
}

function breakText(bodyText, breakLength) {
    popNamespace.tempBody = bodyText.replace(/\s+/gm, ' ');
    popNamespace.bodyLen = popNamespace.tempBody.length;
    popNamespace.breakat = breakLength;

    var bodyArr = popNamespace.tempBody.split(' ');
    var newBodyArr = [];
    var tempString = "";
    bodyArr.forEach(function(item) {
        if (tempString.length<popNamespace.breakat) {
            if (tempString.length>0) {tempString += " ";}
            tempString += item;
        } else {
            newBodyArr.push(tempString);
            tempString = item;
        }
    });
    newBodyArr.push(tempString);
    return newBodyArr.join('<br>');
}

function assignPopEvent(event, useCap, func) {
    useCap = useCap ? useCap : false;
    if (window.addEventListener) {
        window.addEventListener(event, func, useCap);
    }
    else {
        window.attachEvent("on"+event, func);
    }
}

function mouseUp() {
    window.removeEventListener('mousemove', divMove, true);
}

function mouseDown(e) {
    popNamespace.offY= e.clientY-parseInt(popNamespace.movePop.offsetTop);
    popNamespace.offX= e.clientX-parseInt(popNamespace.movePop.offsetLeft);
    window.addEventListener('mousemove', divMove, true);
}

function divMove(e) {
    popNamespace.movePop.style.top = (e.clientY-popNamespace.offY) + 'px';
    popNamespace.movePop.style.left = (e.clientX-popNamespace.offX) + 'px';
}

function exitFn(customExit) {
    if (dfltOptions['slide-out']) {
        $(".pop-holder").fadeOut(150).animate({
            top: (($(window).height()/2)-($(".pop-shell").height()/2) + popNamespace.scrollOSY) + 100 + "px"
        },{duration: 150, queue: false});
    } else {
        $(".pop-holder").fadeOut(150);
    }
    $(".modalbg").fadeOut(150);
    if (customExit) {
        customExit();
    } else {
        dfltOptions['click-fn']();
    }
}
