const isIOS = navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/);
if(!isIOS){
    window.addEventListener("deviceorientationabsolute", function, true);
}

window.addEventListener("deviceorientation", function(event) {
    var direction = event.webkitCompassHeading || Math.abs(event.alpha - 360);
	document.querySelector("#mag").innerHTML = "alpha = " + event.alpha + "<br>" + "beta = " + event.beta + "<br>" + "gamma = " + event.gamma + "<br>" + "direction = " + direction;

    document.getElementById("nadel").style.transform = "rotate(" + (-event.alpha + 45) + "deg)";
    if(event.alpha > 90 && event.alpha < 270)
        document.getElementById("kompass").style.background = "url(img/kompass.webp), url(img/strandstuhl.png)";
        /*var csslink = document.getElementById("css");
        var href = csslink.getAttribute("href");
        if(href == "norden.css")
            csslink.setAttribute("href", "sueden.css");
            */
    else
        document.getElementById("kompass").style.background = "url(img/kompass.webp), url(img/huette.png)";
        /*var csslink = document.getElementById("css");
        var href = csslink.getAttribute("href");
        if(href == "sueden.css")
            csslink.setAttribute("href", "norden.css");*/


        
}, true);

function(e){
    var direction = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    document.getElementById("nadel").style.transform = "rotate(" + (-direction + 45) + "deg)";
}

