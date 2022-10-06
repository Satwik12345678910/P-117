function setup(){
    canvas=createCanvas(280,280);
    canvas.position(500,200);
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}

function clearCanvas(){
    background("white");
}

function preload()
{
    classifier=ml5.imageClassifier('DoodleNet');
}

function draw()
{
    strokeWeight(5);
    stroke(0);
    
    if (mouseIsPressed) {
        line(pmouseX,pmouseY,mouseX,mouseY);
    }
}

function classifyCanvas()
{
    classifier.classify(canvas,gotResult);
}

function gotResult(error,results,drawn)
{
    console.log(drawn);
    document.getElementById('drawn').innerHTML='Sketch To Be Drawn: '+results[0].label;

    if(error){
        console.error(error);

    }
    console.log(results);
    document.getElementById('label').innerHTML='Your Sketch: '+results[0].label;

    document.getElementById('confidence').innerHTML='Confidence: '+Math.round(results[0].confidence*100)+'%';

    utterThis=new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
    

}