song1 = "";
song2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1_status = "";
song2_status = "";

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
    song1.isPlaying()
    song1_status = "true";
    fill("red");
    stroke("black");
    
    if (scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        leftWristY_to_number = Number(leftWristY);
        leftWristY_without_decimals = floor(leftWristY_to_number);
        song2.stop();
        if(song1_status == "true") {
            song1.isPlaying();
            document.getElementById("song").innerHTML = "Song 1 is played...";
        }
    }

    song2.isPlaying()
    song2_status = "true";
    
    if (scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        rightWristY_to_number = Number(rightWristY);
        rightWristY_without_decimals = floor(rightWristY_to_number);
        song1.stop();
        if(song2_status == "true") {
            song2.isPlaying();
            document.getElementById("song").innerHTML = "Song 2 is played...";
        }
    }
}

function modelLoaded() {
    console.log("posenet is now initialized...");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("left wrist score = " + scoreLeftWrist);
        scoreRightWrist = results[0].pose.keypoints[9].score;
        console.log("Right wrist score = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x ;
        leftWristY = results[0].pose.leftWrist.y ;
        console.log("left wrist X = " + leftWristX + " left wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x ;
        rightWristY = results[0].pose.rightWrist.y ;
        console.log("right wrist X = " + rightWristX + " right wrist Y = " + rightWristY);
    }
}

function song_name() {
    song.play();
}
