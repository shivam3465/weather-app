const fs = require("fs");
const express = require("express");
const request = require("request");
const path = require("path");
const exp = require("constants");
const app = express();
const htmlText = fs.readFileSync('./index.html', "utf-8");

let changeCondition = (curCondition) => {
    curCondition = "Clear"
    if (curCondition === "Clouds") {
        return `<i class="fa-solid fa-cloud" style="color:white"></i>
                <div id="weather">${curCondition}</div>
            `;
    }
    else if (curCondition === "Rain") {
        return `<i class="fa-solid fa-cloud-rain" style="color:#1e4dd7"></i>
                <div id="weather">${curCondition}</div>
            `;
    }
    else if (curCondition === "Mist") {
        return `<i class="fa-solid fa-smog"></i> 
        <div id="weather">${curCondition}</div>
        `;
    }
    else if (curCondition === "Clear") {
        return `<div id="sun">O</div>
                <div id="weather">${curCondition}</div>
                `;
    }
    else if (curCondition === "Haze") {
        return `<img src="https://img.icons8.com/plasticine/100/000000/foggy-night-1.png" />
                <div id="weather">${curCondition}</div>
                `;
    }
    else {
        return `<div id="sun" style="visibility:hidden">&nbsp;</div>
                <div id="weather">${curCondition}</div>
                `;
    }
}

let replaceVal = (text, obj) => {
    text = text.replace("{%location%}", obj.name);
    text = text.replace("{%country%}", obj.sys.country);
    text = text.replace("{%temp%}", obj.main.temp);
    text = text.replace("{%minTemp%}", obj.main.temp_min);
    text = text.replace("{%maxTemp%}", obj.main.temp_max);

    let str = changeCondition(obj.weather[0].main);
    text = text.replace("{%condition%}", str);

    return text;
}
let static=path.join(__dirname,"/public");
console.log(static)
app.use(express.static(static))

let city = "patna";
app.get("/", (req, res) => {
    request(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=502ee5aa337649a2e09c8ab4f2f1f077&units=metric`, (error, response, data) => {
        if (error) console.log(error);
        else {
            let obj = JSON.parse(data);
            let newText = replaceVal(htmlText, obj);
            res.send(newText);
        }
    });
});

app.all("*", (req, res) => {
    console.log("here ",req.url);
    res.status(404).send("404 not found ");
});

let port=5000;
app.listen(port, (error) => {
    console.log(`server listening on ${port}`);
    if (error) console.log(error);
});