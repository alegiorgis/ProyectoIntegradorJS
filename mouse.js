// BASED ON https://codepen.io/redspiderfish/pen/MYmeYz
var bee = document.getElementById("wunderbiene");
document.addEventListener("mousemove", getMouse);


bee.style.position = "absolute"; //css
var beepos = { x: 0, y: 0 };

setInterval(followMouse, 20);

var mouse = { x: 0, y: 0 }; //mouse.x, mouse.y

var dir = "right";
function getMouse(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
    //Checking directional change
    if (mouse.x > beepos.x) {
        //dir = "right";
    } else {
        //dir = "left";
    }

    // Adding Rotation based on http://jsfiddle.net/dPDF3
    var img = $('#wunderbiene img');
    if (img.length > 0) {
        var offset = img.offset();
        //function beeMouse(evt) {
        var center_x = (offset.left) + (img.width() / 2);
        var center_y = (offset.top) + (img.height() / 2);
        var mouse_x = e.pageX; var mouse_y = e.pageY;
        var radians = Math.atan2(mouse_x - center_x, mouse_y - center_y);
        var degree = (radians * (180 / Math.PI) * -1) + 180;
        img.css('-moz-transform', 'rotate(' + degree + 'deg)');
        img.css('-webkit-transform', 'rotate(' + degree + 'deg)');
        img.css('-o-transform', 'rotate(' + degree + 'deg)');
        img.css('-ms-transform', 'rotate(' + degree + 'deg)');
        //}

    }


}

function followMouse() {
    //1. find distance X , distance Y
    var distX = mouse.x - beepos.x;
    var distY = mouse.y - beepos.y;
    //Easing motion
    //Progressive reduction of distance
    beepos.x += distX / 40;
    beepos.y += distY / 40;

    bee.style.left = beepos.x + "px";
    bee.style.top = beepos.y + "px";


    //Apply css class
    if (dir == "right") {
        bee.setAttribute("class", "right");
    } else {
        bee.setAttribute("class", "left");
    }

}