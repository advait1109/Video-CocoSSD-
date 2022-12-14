statuses ="";
object = [];
function start(){
    console.log("start");
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById('status').innerHTML = "Status: Detecting objects";
}
function setup() {
    console.log("setup");
    canvas = createCanvas(380, 380);
    video=createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    canvas.center();
    }
function draw() {
    image(video, 0, 0, 380, 380);
    r=random(255);
    g=random(255);
    b=random(255);
    if (statuses != "") {
        document.getElementById("status").innerHTML="Objects Detected";
        console.log("ifdraw");
        document.getElementById("num_objects").innerHTML="Number of Objects Detected = "+object.length;
        for (var i = 0; i < object.length; i++) {
            fill(r,g,b);
            percent = floor(object[i].confidence * 100);
            textSize(18);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            noFill();
            stroke(r,g,b);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);
            console.log("fordraw");
        }
    }
}
function modelLoaded() {
    console.log('Model has Loaded');
    statuses = true;
    objectDetector.detect(video, gotResult);
}
function gotResult(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        console.log(results);
        object = results;
        console.log("results");
    }
}