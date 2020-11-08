let serial;
let latestData = "waiting for data";


let currentR;
let currentG;
let currentB;

let backgroundR;
let backgroundG;
let backgroundB;

let eraserR = 0;
let eraserG = 0;
let eraserB = 0;


let positionArray = [];


let initialX = 100;
let initialY = 100;
let thickness= 16;

let myCanvas;


function setup() {
    myCanvas = createCanvas(2500, 1600);
    background(0);

    serial = new p5.SerialPort();

    serial.list();
    serial.open('COM3');
    serial.on('connected', serverConnected);
    serial.on('list', gotList);
    serial.on('data', gotData);
    serial.on('error', gotError);
    serial.on('open', gotOpen);
    serial.on('close', gotClose);
    fill(255);
    textSize(30);
    fill(128, 0, 0);
    rect(0, 0, width, 70);
    fill(255);
    text("Artuino Sketchpad", 15, 50);
    fill(128, 0, 0);
    rect(0, 1520, width, 80);
    fill(255);
    text("Commands:  TAB-Reset   DOWN-Thickness Down   UP-Thickness Up   LEFT-Pen Color   RIGHT-Background Color   ESC-Eraser Mode   SHIFT-Shift Joystick   DELETE-Save", 15, 1570);
    fill(255);
}


function draw() {

    if (mouseIsPressed && mouseY > 80 && mouseY < 1500) {
        noStroke();
        ellipse(mouseX, mouseY, thickness, thickness);
    }

    // console.log(latestData);
    noStroke();
    ellipse(initialX, initialY, 20, 20);

    if(positionArray[1] > 1000) {
        initialX-=3;
    }

    if (positionArray[1] < 10) {
        initialX +=3;
    }

    if (positionArray[2] > 1000) {
        initialY +=3;
    }

    if (positionArray[2] < 10) {
        initialY -=3;
    }
    
    if (positionArray[0] == 0) {
        currentR = random(0, 255);
        currentG = random(0, 255);
        currentB = random(0, 255);
        fill(currentR, currentB, currentG);
    }
}


function keyPressed() {
    if (keyCode === LEFT_ARROW) {
        currentR = random(0, 255);
        currentG = random(0, 255);
        currentB = random(0, 255);
        console.log(currentR, currentG, currentB);
        fill(currentR, currentB, currentG);
    }

    if (keyCode === RIGHT_ARROW) {
        backgroundR = random(0, 255);
        backgroundG = random(0, 255);
        backgroundB = random(0, 255);
        eraserR = backgroundR;
        eraserG = backgroundG;
        eraserB = backgroundB;
        fill(backgroundR, backgroundG, backgroundB);
        rect(0, 70, width, 1450);
        fill(currentR, currentB, currentG);
    }

    if (keyCode === UP_ARROW) {
        thickness+=4;
    }

    if (keyCode === DOWN_ARROW) {
        thickness-=4;
    }

    if (keyCode === TAB) {
        fill(0);
        rect(0, 70, width, 1450);
        fill(255);
    }

    if (keyCode === SHIFT) {
        initialX = mouseX;
        initialY = mouseY;
    }

    if (keyCode === ESCAPE) {
        fill(eraserR, eraserG, eraserB);
    }

    if (keyCode === DELETE){
        saveCanvas(myCanvas, "myArtuinoSketch", "jpg");
    } 
}


function serverConnected() {
    print("Connected to Server");
}

function gotList(thelist) {
    print("List of Serial Ports:");

    for (let i = 0; i < thelist.length; i++) {
        print(i + " " + thelist[i]);
    }
}

function gotOpen() {
    print("Serial Port is Open");
}

function gotClose() {
    print("Serial Port is Closed");
    latestData = "Serial Port is Closed";
}

function gotError(theerror) {
    print(theerror);
}

function gotData() {
    let currentString = serial.readLine();
    trim(currentString);
    if (!currentString) return;
    latestData = currentString;
    positionStringArray = latestData.split(",");

    a = (positionStringArray[0]);
    b = (positionStringArray[1]);
    c = (positionStringArray[2]);
    
    positionArray[0] = parseInt(a);
    positionArray[1] = parseInt(b);
    positionArray[2] = parseInt(c);

    print(positionArray);
}