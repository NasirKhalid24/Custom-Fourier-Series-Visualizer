let time = 0;
let wave = [];
let height = 400;
let width = 600;
let background_color = "#000000";
let line_color = "#ffffff";
let line_color_2 = "#646464";
let terms;

function setup(){
  // Creating the canvas
  width = 0.9 * windowWidth;
  let canvas = createCanvas(width, height);
  canvas.parent('sketch-holder')

  // Color selector listeners
  document.querySelector("#canvas_background").addEventListener("change", (event) =>{
    background_color = event.target.value;
  })
  document.querySelector("#canvas_lines").addEventListener("change", (event) =>{
    line_color = event.target.value;
  })
  document.querySelector("#canvas_circles").addEventListener("change", (event) =>{
    line_color_2 = event.target.value;
  })

  //
  slider_terms = createSlider(1, 60, 2)
  slider_terms.parent('slider');
  // slider_terms.size(100);
  slider_terms.style(
    'width', '100%',
  )
}

function windowResized() {
  width = 0.9 * windowWidth;
  resizeCanvas(width, height);
}

function draw(){
  background(background_color);
  translate(width/5, height/2);
  
  let x = 0;
  let y = 0;
  let radius = 0;

  document.querySelector(".number_of_terms").innerHTML = "Number of Terms: " + slider_terms.value();

  for(let j = 1; j <= slider_terms.value(); j++){
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
    stroke(line_color_2);
    noFill();
    ellipse(prev_x, prev_y, radius*2);
    stroke(line_color);
    line(prev_x, prev_y, x, y);

    // Remove unnecessary points to maintain speed
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