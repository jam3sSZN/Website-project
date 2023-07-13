function roll() {
    const sides = 12;
    var randomnumber = Math.floor(Math.random()* (sides)+ 1);
    let face = document.getElementById("face");
    face.innerHTML = randomnumber;

}

var button = document.getElementById("button");
button.addEventListener("click", roll);