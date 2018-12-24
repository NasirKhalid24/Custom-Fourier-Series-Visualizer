let time = 0;
let wave = [];
let height = 400;
let width = 600;
let background_color = "#000000";
let line_color = "#ffffff";
let line_color_2 = "#646464";
let terms;
let initial_term = 0;
let equation = ["4", "PI * ((2*n) + 1)", "((2*n) + 1)"];

function setup(){
  // Creating the canvas
  width = 0.9 * windowWidth;
  let canvas = createCanvas(width, height);
  canvas.parent('sketch-holder')

  //Set width of controls
  document.querySelector('.controls').style.width = width + "px";

  // Color selector listeners
  document.getElementById("canvas_background").addEventListener("change", (event) =>{
    background_color = event.target.value;
  })
  document.getElementById("canvas_lines").addEventListener("change", (event) =>{
    line_color = event.target.value;
  })
  document.getElementById("canvas_circles").addEventListener("change", (event) =>{
    line_color_2 = event.target.value;
  })

  //Slider for Number of Terms
  slider_terms = createSlider(1, 60, 2)
  slider_terms.parent('slider');
  slider_terms.style(
    'width', '100%',
  )

  //Custom Equation Commands
  document.getElementById("submit").onclick = UpdateCanvasEquation;
}

function UpdateEquation(event){
  switch(event.target.id){
    case "numerator":
      equation[0] = event.target.value;
      break;
    case "denomenator":
      equation[1] = event.target.value;
      break;
    case "coefficient":
      equation[2] = event.target.value;
      break;
    case "series_1":
      if(event.target.checked){
        initial_term = 1;
      }else{
        initial_term = 0;
      }
      break;
  }
}

function UpdateCanvasEquation(){
  equation[0] = document.getElementById("numerator").value;
  equation[1] = document.getElementById("denomenator").value;
  equation[2] = document.getElementById("coefficient").value;
  initial_term = (document.getElementById("series_1").checked) ? 1 : 0;
  wave = []
}
function windowResized() {
  //Canvas width
  width = 0.9 * windowWidth;
  resizeCanvas(width, height);

  //Set width of controls
  document.querySelector('.controls').style.width = width + "px";
}

function draw(){
  background(background_color);
  translate(width/5, height/2);
  
  let x = 0;
  let y = 0;
  let radius = 0;

  document.querySelector(".number_of_terms").innerHTML = "Number of Terms: " + slider_terms.value();
  for(var n = initial_term; n <= slider_terms.value(); n++){
    let numerator = eval(equation[0]);
    let denomenator = eval(equation[1]);
    let coefficient = eval(equation[2]);
    let prev_x = x;
    let prev_y = y;
    radius = numerator/denomenator;
    if(n==initial_term){
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