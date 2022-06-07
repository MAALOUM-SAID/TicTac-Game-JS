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
            }else{
                event.preventDefault();
            }
    });
}
function ticTac(box,event){
    if (sign==="O") {
        box.textContent="X";
        xList.push(box.getAttribute("data-value"));
        if (checkXWin()) {
            WinEffect(xList,"yellow");
        }
        sign="X";
        incrimnetPlayLimit();
    }else{
        box.textContent="O";
        oList.push(box.getAttribute("data-value"));
        if (checkOWin()) {
            WinEffect(oList,"red");
        }
        sign="O";
        incrimnetPlayLimit();
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
function WinEffect(list,color) {
    for (const lst of list) {
        for (const box of boxes) {
            if (box.getAttribute("data-value")===lst) {
                box.style.backgroundColor=color;
            }
        }
    }
}