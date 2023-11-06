song1 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

function preload() {
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(600, 500);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}

function draw() {
    image(video, 0, 0, 600, 500);
}

function modelLoaded() {
    console.log("posenet is now initialized...");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x ;
        leftWristY = results[0].pose.leftWrist.y ;
        console.log("left wrist X = " + leftWristX + " left wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x ;
        rightWristY = results[0].pose.rightWrist.y ;
        console.log("right wrist X = " + rightWristX + " right wrist Y = " + rightWristY);
    }
}
