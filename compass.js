/*const isIOS = navigator.userAgent.match(/(iPod|iPhone|iPad)/) && navigator.userAgent.match(/AppleWebKit/);
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
            
    else
        document.getElementById("kompass").style.background = "url(img/kompass.webp), url(img/huette.png)";
        /*var csslink = document.getElementById("css");
        var href = csslink.getAttribute("href");
        if(href == "sueden.css")
            csslink.setAttribute("href", "norden.css");


        
}, true);

function(e){
    var direction = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    document.getElementById("nadel").style.transform = "rotate(" + (-direction + 45) + "deg)";
}
*/
/*const compassCircle = document.querySelector(".compass-circle");
    const myPoint = document.querySelector(".my-point");*/
    const startBtn = document.querySelector(".start-btn");
    const isIOS =
      navigator.userAgent.match(/(iPod|iPhone|iPad)/) &&
      navigator.userAgent.match(/AppleWebKit/);

    function init() {
      startBtn.addEventListener("click", startCompass);
      /*navigator.geolocation.getCurrentPosition(locationHandler);*/

      if (!isIOS) {
        window.addEventListener("deviceorientationabsolute", handler, true);
      }
    }

    function startCompass() {
      if (isIOS) {
        DeviceOrientationEvent.requestPermission()
          .then((response) => {
            if (response === "granted") {
              window.addEventListener("deviceorientation", handler, true);
            } else {
              alert("has to be allowed!");
            }
          })
          .catch(() => alert("not supported"));
      }
    }

    function handler(e) {
      compass = e.webkitCompassHeading || Math.abs(e.alpha - 360);
      /*compassCircle.style.transform = `translate(-50%, -50%) rotate(${-compass}deg)`;*/
      document.getElementById("nadel").style.transform = "rotate(" + (-compass + 45) + "deg)";

      // ±15 degree
      if (
        (pointDegree < Math.abs(compass) &&
          pointDegree + 15 > Math.abs(compass)) ||
        pointDegree > Math.abs(compass + 15) ||
        pointDegree < Math.abs(compass)
      ) {
        myPoint.style.opacity = 0;
      } else if (pointDegree) {
        myPoint.style.opacity = 1;
      }
    }

    let pointDegree;

    function locationHandler(position) {
      const { latitude, longitude } = position.coords;
      pointDegree = calcDegreeToPoint(latitude, longitude);

      if (pointDegree < 0) {
        pointDegree = pointDegree + 360;
      }
    }

    function calcDegreeToPoint(latitude, longitude) {
      // Qibla geolocation
      const point = {
        lat: 21.422487,
        lng: 39.826206
      };

      const phiK = (point.lat * Math.PI) / 180.0;
      const lambdaK = (point.lng * Math.PI) / 180.0;
      const phi = (latitude * Math.PI) / 180.0;
      const lambda = (longitude * Math.PI) / 180.0;
      const psi =
        (180.0 / Math.PI) *
        Math.atan2(
          Math.sin(lambdaK - lambda),
          Math.cos(phi) * Math.tan(phiK) -
            Math.sin(phi) * Math.cos(lambdaK - lambda)
        );
      return Math.round(psi);
    }

    init();
