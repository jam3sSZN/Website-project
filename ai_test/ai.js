const APIKEY = "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";

let exampleObject = {
    "prompt": "A cute baby sea otter",
    "n": 2,
    "size": "1024x1024"
}

let obj = {
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "system", "content": "You are a helpful assistant."}, {"role": "user", "content": "Hello!"}]
}


function doAI() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState != 4) return;
        if (this.status != 200) {
            alert(`Payload bad (code ${this.status})`);
            return;
        }
        document.getElementById("jsontext").innerHTML = this.responseText;
        display(JSON.parse(this.responseText));
    }
    // let URL = `https://api.openai.com/v1/images/generations`;
    // let URL = `https://api.openai.com/v1/models`;
    let URL = `https://api.openai.com/v1/chat/completions`;
    xhttp.open("POST", URL, true);
    xhttp.setRequestHeader("Authorization", `Bearer ${APIKEY}`)
    xhttp.setRequestHeader("Content-Type", `application/json`)
    xhttp.send(JSON.stringify(obj));
    // xhttp.send();
}

function display(idk) {
    
}