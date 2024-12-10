let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//Změna velikosti okna
window.addEventListener("resize", function(event){
    event.preventDefault()
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.putImageData(imageData, 0, 0);
});

//Barva
let selectedColor = ""; 

function random(){
    let colors = ["black", "blue", "red", "yellow", "orange"]
    let randomColor = Math.floor(Math.random()* colors.length)
    return colors[randomColor]
}

//Velikosti:
//Kruh
let radius = ""

function randomRadius(){
    let randomSize = Math.floor(Math.random(30) * 60)
    return randomSize
}

//Eklipsa
let radius2 = ""

function randomRadius2(){
    let randomSize = Math.floor(Math.random(60)*80)
    return randomSize
}

//Strana a (čtverec, obdélník)
let a = ""

function randomA(){
    let randomSize = Math.floor(Math.random(40) * 60)
    return randomSize
}

//Strana b (obdélník)
let b = ""

function randomB(){
    let randomSize = Math.floor(Math.random(80) * 100)
    return randomSize
}

//Tloušťka tuhy
let pencil = ""

function randomPencil(){
    let randomSize = Math.floor(Math.random(1)*6)
    return randomSize
}

// Šířka tvarů
let width = "";

//Rotace
let angle = "";

// Náhodné slovo - Dadaismus
function randomWordDada(){
    let words = ["Už", "", "vím", "", "dám", "", "dopis", "", "na", "", "zrcadlo", "", "či", "", "do", "", "košíčku", "", "na", "", "šití", "", "však", "", "žel", "", "dosud", "", "mě", "", "nenapadlo", "", "co", "", "psát", "", "jak", "", "dopis", "", "začíti"];
    let randomWord = Math.floor(Math.random()*words.length)
    return words[randomWord]
}

//Pollack velikosti

let PollackSize = ""

// Funkce pro vykreslení tvarů:
// Kruh
function drawCircle(x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth =  width; 
    ctx.arc(0, 0, radius, 0, Math.PI * 2, false);
    ctx.globalAlpha = 1;
    ctx.stroke();
    ctx.restore()
}

//Čtverec
function drawSquare(x, y, angle) {
    ctx.save();
    ctx.translate(x,y)
    ctx.rotate(angle);
    ctx.strokeStyle= selectedColor; 
    ctx.lineWidth =  width;
    ctx.globalAlpha = 1; 
    ctx.strokeRect(- a/2, - a/2, a, a);
    ctx.stroke();
    ctx.restore();
}

//Obdélník
function drawRectangle(x, y, angle){
    ctx.save();
    ctx.translate(x,y)
    ctx.rotate(angle);
    ctx.strokeStyle= selectedColor;
    ctx.lineWidth =  width;
    ctx.globalAlpha = 1;
    ctx.strokeRect(- a/2 , - b/2, a, b);
    ctx.stroke();
    ctx.restore()
}

//Elipsa
function drawEllipse(x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.ellipse(0, 0, radius, radius2, 0, 0, Math.PI * 2);
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth =  width;
    ctx.globalAlpha = 1;
    ctx.stroke();
    ctx.restore();
}

//Tužka
    let lastX = null;
    let lastY = null;

function drawFree(x, y) {
    ctx.lineCap = "round";
    ctx.strokeStyle = selectedColor;
    ctx.lineWidth = pencil;

    if (lastX !== null && lastY !== null) {
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.globalAlpha = 1;
        ctx.stroke();
    }
    lastX = x;
    lastY = y;
}

// Reset posledních souřadnic při uvolnění tlačítka myši
canvas.addEventListener("mouseup",function() {
    lastX = null;
    lastY = null;
});

//Dadaismus
function drawText(x, y, angle) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.font = `${radius}px Arial`; 
    ctx.fillStyle = selectedColor;
    ctx.globalAlpha = 1; 
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    let randomWord = randomWordDada()
    ctx.fillText(randomWord, 0, 0);
    ctx.restore();
}

//Funkce, která vrací celé řádky, pozn. původně chyba z nepozornosti díky vynechané závorce
function drawText2(x, y, angle) {
    let words = ["Už", "vím", "dám", "dopis", "na", "zrcadlo","či", "do", "košíčku", "na", "šití", "však", "žel", "dosud", "mě", "nenapadlo","co", "psát", "jak", "dopis", "začíti", "Už", "vím", "dám", "dopis", "na", "zrcadlo","či", "do", "košíčku", "na", "šití", "však", "žel", "dosud", "mě", "nenapadlo","co", "psát", "jak", "dopis", "začíti"]
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.font = `${radius}px Arial`; 
    ctx.fillStyle = selectedColor;
    ctx.globalAlpha = 1; 
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    let Word = words
    ctx.fillText(Word, 0, 0);
    ctx.restore();
}

// Funkce Pollockův drip
function pollockDrip(x, y) {
    for (let i = 0; i < 7; i++) {
        let size = PollackSize
        let dx = (Math.random() - 0.5) * 100; 
        let dy = (Math.random() - 0.5) * 100; 

        ctx.beginPath();
        ctx.arc(x + dx, y + dy, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = selectedColor;
        ctx.globalAlpha = Math.random();
        ctx.fill();
    }
}

// Zajištění správného kreslení
 let mouseOnCanvas = false

 canvas.addEventListener("mouseenter", function(){
    mouseOnCanvas = true
 })

 canvas.addEventListener("mouseleave", function(){
    mouseOnCanvas = false
 })

// Kreslení při stisknutí levého tlačítka
addEventListener("mousemove", function(event) {
    event.preventDefault();
    const rect = canvas.getBoundingClientRect();
    const x = (event.clientX - rect.left);
    const y = (event.clientY  - rect.top);

    //Kontrola zda podmínka běží, jestliže true pak se kód spustí
    if(!mouseOnCanvas) return;

    let color = document.getElementById("color");
    let colorValue = color.value

    //Barvy
    if (colorValue === "1") {
        selectedColor = "black";
    }else if(colorValue === "2"){
        selectedColor = "white"
    } else if (colorValue === "3") {
        selectedColor = random();
    }else if (colorValue === "4"){
        selectedColor = "red"
    }else if(colorValue === "5"){
        selectedColor = "blue"
    }else if(colorValue === "6"){
        selectedColor = "green"
    }else if(colorValue === "7"){
        selectedColor = "orange"
    }else if(colorValue === "8"){
        selectedColor = "yellow"
    }

    //Velikost
    let size = document.getElementById("size");
    let sizeValue = size.value

    if(sizeValue === "1"){
        radius = 30;
        radius2 = 60;
        a = 40;
        b = 80;
        pencil = 3
        PollackSize = Math.random() * 10 + 5; 
    }else if(sizeValue === "2"){
        radius = 80;
        radius2 = 120;
        a = 80;
        b = 120;
        pencil = 6
        PollackSize = Math.random() * 30 + 10; 
    }else if(sizeValue === "3"){
        radius = randomRadius();
        radius2 = randomRadius2()
        a = randomA();
        b = randomB();
        pencil = randomPencil()
        PollackSize = Math.random() * 10 + Math.floor(Math.random() * 30);
    }

    //Rotace
    let rotation = document.getElementById("rotation");
    let rotationValue = rotation.value;

    if(rotationValue === "1"){
        angle = 0
    }else if(rotationValue === "2"){
        angle = angle + 0.1;
    }else if(rotationValue === "3"){
        angle = angle - 0.1;
    }

    //Šířka

    let widthDoc = this.document.getElementById("width")
    let widthValue = widthDoc.value

    if(widthValue === "1"){
        width = 1
    }else if(widthValue === "2"){
        width = 2
    }else if(widthValue === "3"){
        width = 3
    }else if(widthValue === "4"){
        width = 4
    }else if(widthValue === "5"){
        width = 5
    }
    

    //Pozadí
    let background =  this.document.getElementById("background")

    background.addEventListener("change", function(event){
        event.preventDefault()
        let backgroundValue = background.value;

        if (backgroundValue === "1") {
            canvas.style.backgroundColor = "#ecf0f1";
            canvas.style.border = "4px solid #2c3e50"

            //Čištění plátna
            event.preventDefault()
            ctx.clearRect(0, 0, canvas.width, canvas.height) 
        } else if (backgroundValue === "2") {
            canvas.style.backgroundColor = "#000000"; 
            canvas.style.border = "4px solid #ecf0f1";

            //Čištění plátna
            event.preventDefault()
            ctx.clearRect(0, 0, canvas.width, canvas.height)
        }
    });

    //Výběr tvarů
    let shapes = document.getElementById("shapes");
    let shapesValue = shapes.value;

    if (event.buttons === 1) { 
        if (shapesValue === "1") {
            drawCircle(x, y, angle);
        }else if (shapesValue === "2") {
            drawSquare(x, y, angle);
        }else if(shapesValue === "3"){
            drawRectangle(x, y, angle)
        }else if (shapesValue === "4"){
            drawEllipse(x, y, angle);
        }else if(shapesValue === "5"){
            drawFree(x, y);
        }else if (shapesValue === "6") {
            drawText(x, y, angle);
        }else if (shapesValue === "7") {
            drawText2(x, y, angle);
        }else if (shapesValue === "8") {
            pollockDrip(x, y); // Nový nástroj
        }
    }

});

// funkce pro uložení
document.addEventListener("DOMContentLoaded", () => {
    let saveButton = document.getElementById("saveCanvas");

    saveButton.addEventListener("click", () => {
        let link = document.createElement("a");
        link.download = "abstract_image.jpg"; 
        link.href = canvas.toDataURL(); 
        link.click(); 
    });
});


// funkce pro vymazání
let form = document.querySelector(".form");

form.addEventListener("submit", function(event) {
    event.preventDefault()
    ctx.clearRect(0, 0, canvas.width, canvas.height)
});


