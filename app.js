const canvas=document.querySelector("#jsCanvas");
const ctx=canvas.getContext('2d');
const range=document.querySelector("#jsRange");
const current=document.querySelector(".current-mode button");
const mode=document.querySelector("#jsMode");
const save=document.querySelector("#jsSave");
const colors=document.querySelectorAll(".controls-color");
const erase=document.querySelector("#jsErase");

canvas.width=900;
canvas.height=500;
const INITIAL_COLOR="#2C2C2C";

ctx.fillStyle="white"; //채우기 색
ctx.fillRect(0,0,canvas.width,canvas.height);  //배경색 초기화
ctx.strokeStyle=INITIAL_COLOR;  //선의 색
ctx.lineWidth=2.5;  //선의 굵기


let painting=false;
let filling=false;

function stopPainting(){
    painting=false;
}

function startPainting(){
    painting=true;
}

function onMouseMove(event){  //canvas 위에서 그림을 그리고 있는 상태
    const x=event.offsetX;
    const y=event.offsetY;
    if(!painting){  //경로를 만든다
        ctx.beginPath(); 
        ctx.moveTo(x,y);  
    }else{  //그린다, 마우스를 움직이는 동안 계속 발생
        ctx.lineTo(x,y); 
        ctx.stroke();  //선을 그린다

    }
}

function onMouseEnter(event){
    x=event.offsetX;
    y=event.offsetY;
    ctx.moveTo(x,y);
}

function earseAll(){
    window.location.reload();
}

function changeColor(event){
    ctx.strokeStyle=event.target.style.backgroundColor;
    ctx.fillStyle=event.target.style.backgroundColor; 

}

function handleRangeChange(event){
    ctx.lineWidth=event.target.value;
}

function handleModeClick(){
    if(filling===true){
        filling=false;
        mode.innerText="Fill";
        current.innerText="CURRENT MODE - PAINT";
    }else{
        filling=true;
        mode.innerText="Paint";
        current.innerText="CURRENT MODE - Fill";
    }
}

function fillmodeCanvasClick(){
    if(filling){
        ctx.fillRect(0,0,canvas.width,canvas.height);  
    }
}

function canvasSave(){
    const image=canvas.toDataURL();
    const link=document.createElement("a");
    link.href=image;
    link.download="My drawing";
    link.click();
}

function handleCM(event){
    event.preventDefault();
}


if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting); //canvas 위에서 클릭한 상태
    canvas.addEventListener("mouseup",stopPainting);  //canvas 위에서 클릭을 땔 때
    canvas.addEventListener("mousenter",onMouseEnter);  //마우스가 클릭된 상태일 때 
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("mousedown",fillmodeCanvasClick);  //채우기 모드에서
    canvas.addEventListener("contextmenu",handleCM);  //우클릭 방지
}


erase.addEventListener("click",earseAll);

Array.from(colors).forEach(color => 
    color.addEventListener("click",changeColor));


if(range){   //굵기 조절
    range.addEventListener("input",handleRangeChange);
}
 
if(mode){  //모드 변경
    mode.addEventListener("click",handleModeClick);
}

if(save){  //저장
    save.addEventListener("click",canvasSave);
}

