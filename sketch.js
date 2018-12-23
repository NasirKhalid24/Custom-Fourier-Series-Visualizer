let time = 0;
let wave = [];

const width = 600;
const height = 400;


function setup(){
  createCanvas(width, height);
  slider = createSlider(1, 100, 2)
  slider.position(0, height)
}

function draw(){
  background(0);
  textSize(20);
  fill(255);
  text('Iterations', 0 , height);
  translate(width/5, height/2);
  
  let x = 0;
  let y = 0;
  let radius = 0;
  let n = 0;

  for(let j = 1; j <= slider.value(); j++){
    let numerator = '2';
    let denomenator = 'PI * j';
    let coefficient = 'j';
    let prev_x = x;
    let prev_y = y;
    numerator = eval(numerator);
    denomenator = eval(denomenator);
    coefficient = eval(coefficient);
    radius = numerator/denomenator;
    if(j==1){
      initial_radius = radius
    }
    radius = map(radius, 0, initial_radius, 0, 100)
    x += radius * cos(coefficient * time);
    y += radius * sin(coefficient * time);
    stroke(100);
    noFill();
    ellipse(prev_x, prev_y, radius*2);
    stroke(255);
    line(prev_x, prev_y, x, y);
    if (wave.length > width){
      wave.pop();
    }
  }
  wave.unshift(y);

  distance = width/3;
  line(x, y, distance, wave[0]);
  translate(distance, 0);

  beginShape();
  for(let i = 0; i < wave.length; i++){
    noFill();
    vertex(i, wave[i]);
  }
  endShape();

  time += 0.08;
}

