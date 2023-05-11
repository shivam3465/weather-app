let Location=document.getElementById("location");
let date=document.getElementById("date");
let tem=document.getElementById("tem");
let temMinMax=document.getElementById("temMinMax");

let curDate=new Date();
let day,month,todayDate,hours,minutes,amPm="Am";
let Month=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
let Day=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

let d=curDate.getDay()
let mon=curDate.getMonth()
todayDate=curDate.getDate()
hours=curDate.getHours()
minutes=curDate.getMinutes()
day=Day[d];
month=Month[mon];

let setDay=()=>{
    if(hours>=12){
        amPm="Pm";
        hours=hours%12;
    }
    if(hours===0) hours=12;
    if(minutes<10) minutes=`0${minutes}`;
    date.innerHTML=`${day} | ${month} ${todayDate} | ${hours}:${minutes}${amPm}`

}
setDay();