let boxes=document.querySelectorAll('.box');
let sign="X";
let playLimit=0;
let winLists=[
    ["1","2","3"],
    ["4","5","6"],
    ["7","8","9"],
    ["1","4","7"],
    ["2","5","8"],
    ["3","6","9"],
    ["1","5","9"],
    ["3","5","7"],
];
let xList=[];
let oList=[];
for (const box of boxes) {
    box.addEventListener("click",event=>{
            if(playLimit<9){
                ticTac(box);
            }
            else{
                event.preventDefault();
            }
            if(playLimit===9){
                setTimeout(()=>{
                    replayGame();
                },1000);
            }
    });
}
function ticTac(box){
    if (sign==="O") {
        if (!boxReserved(box)) {
            box.textContent="X";
            box.style.color="crimson";
            xList.push(box.getAttribute("data-value"));
            if (checkXWin()) {
                WinEffect(xList,"wheat");
                setTimeout(()=>{
                    replayGame();
                },500);
                return ;
            }
            sign="X";
            incrimnetPlayLimit();
    }
    }else{
        if (!boxReserved(box)) {    
            box.textContent="O";
            box.style.color="Yellow";
            oList.push(box.getAttribute("data-value"));
            if (checkOWin()) {
                WinEffect(oList,"wheat");
                setTimeout(()=>{
                    replayGame();
                },500);
                return ;
            }
            sign="O";
            incrimnetPlayLimit();
        }
    }
}
function incrimnetPlayLimit() {
    return playLimit++;
}
function checkXWin(){
    for (const winList of winLists) {
        if(checkToListAreEqual(winList,xList)){
            return true;
        }
    }
    return false;
}
function checkOWin(){
    for (const winList of winLists) {
       if(checkToListAreEqual(winList,oList)){
            return true;
       }
    }
    return false;
}
function checkToListAreEqual(array1,array2) {
    let equalNumber=0;
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
            if (array1[i]===array2[j]) {
                equalNumber++;
            } 
        }   
    }
    return equalNumber>=3;
}
function boxReserved(box){
    return box.textContent.length>0;
}
function WinEffect(list,color) {
    for (const lst of pureWinList(list)) {
        for (const box of boxes) {
            if (box.getAttribute("data-value")===lst) {
                    box.style.backgroundColor=color;
            }
        }
    }
}
function pureWinList(lst) {
    let purWinList=[];
    for (const winLst of winLists) {
        for (const value of winLst) {
            if (checkToListAreEqual(lst,winLst)) {
                    for (const ls of lst) {
                   if (value===ls) {
                       purWinList.push(value);
                   }
               }
            }
       }
    }
    return purWinList;
}
function replayGame() {
    let replay=confirm("GAME OVER! REPLAY ?");
    if (replay) {
        for (const box of boxes) {
            box.innerHTML="";
            box.style.backgroundColor="#00FFAB";
        }
        xList=[];
        oList=[];
        playLimit=0;
    }
}
