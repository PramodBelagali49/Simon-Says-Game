let gameSeq=[];
let userSeq=[];

let started=false;

let level=0;
let boxesArr=["box1","box2","box3","box4"];

let h2=document.querySelector("h2");
let startbtn=document.querySelector("#strtbtn");

function startgame(){
    if(started==false){
        started=true;
        levelUp();
    }
}
startbtn.addEventListener("click",startgame);

function gameFlash(btn){
    let orgColor=btn.style.backgroundColor;
    btn.style.backgroundColor="white";
    setTimeout(function(){
        btn.style.backgroundColor=orgColor;
    },150);
    // b.classList.add("flash");
    // setTimeout(function(){
    //     b.classList.remove("flash");
    // },500);
}
function userFlash(btn){
    let orgColor=btn.style.backgroundColor;
    btn.style.backgroundColor="lightgreen";
    setTimeout(function(){
        btn.style.backgroundColor=orgColor;
    },150);
}

function levelUp(){
    userSeq=[];
    level+=1;
    h2.innerText="Level: "+level;

    let rand=Math.floor(Math.random()*4);
    let randbox=boxesArr[rand];
    let flbtn=document.querySelector(`#${randbox}`);
    gameFlash(flbtn);
    gameSeq.push(randbox);
    console.log(gameSeq);
}

function checkAns(indx){
    console.log(`curr level:${level}`);
    if(userSeq[indx]==gameSeq[indx]){
        if(gameSeq.length==userSeq.length){
            setTimeout(levelUp,800);
        }
    }else{
        h2.innerHTML=`<br>Game Over! Your score is:<b>${level}</b> <br><br>`;

        let resetbtn=document.createElement("button");
        resetbtn.innerHTML="<b>Reset<b>";
        resetbtn.style.fontSize="80%";
        
        h2.appendChild(resetbtn);
        resetbtn.addEventListener("click",reset);

        let body=document.querySelector("body");
        body.style.backgroundColor="red";
        setTimeout(function(){
            body.style.backgroundColor="white";
        },150);
    }
}
function btnPress(){
    let btn=this;
    userFlash(btn);
    userSeq.push(btn.id);

    checkAns(userSeq.length-1);
}

let allboxes=document.querySelectorAll(".box");
for(box of allboxes){
    box.addEventListener("click",btnPress);
}


function reset(){
    started=false;
    level=0;
    gameSeq=[];
    userSeq=[];
    h2.innerHTML="<button id='newstrtbtn'><b>Click to Start again<b></button>";
    let newStartbtn=document.querySelector("#newstrtbtn");
    newStartbtn.addEventListener("click", startgame);
}