const canvas=document.querySelector("#jsCanvas");
const ctx=canvas.getContext('2d');
const range=document.querySelector("#jsRange");
const current=document.querySelector(".current-mode button");
const mode=document.querySelector("#jsMode");
const save=document.querySelector("#jsSave");
const colors=document.querySelectorAll(".controls-color");
const erase=document.querySelector("#jsErase");

/*canvas의 사용을 위해 css size와 pixel을manipulating 할size를 가져야함
  css상의 크기만큼 pixel을 다룰 수 있는 element로서의 크기를 지정해 줘야함 */
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
        ctx.beginPath();  //경로의 생성
        ctx.moveTo(x,y);  //선의 시작 좌표
    }else{  //그린다, 마우스를 움직이는 동안 계속 발생
        ctx.lineTo(x,y); //선의 끝 좌표
        /* lineTo: 현재 sub-path의 마지막 점을 특정 좌표와 직전으로 연결
        path의 마지막 점을 연결하기 위해서 painting 시작 전에도 path를 저장해 주는 것 */
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
    ctx.fillStyle=event.target.style.backgroundColor;  //fill모드에서 사용할 색

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
        ctx.fillRect(0,0,canvas.width,canvas.height);  //사각형 생성
    }
}

function canvasSave(){
    const image=canvas.toDataURL();
    /* 기본적으로 png 설정된 type parameter에 의해 지정된 포맷의 이미지 표현을
    포함한 dataURL을 반환함 */ 
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
    canvas.addEventListener("mouseup",stopPainting);  //canvas 위에서 클릭하지 않은 상태
    canvas.addEventListener("mousenter",onMouseEnter);  //마우스가 클릭된 상태일 때 
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("mousedown",fillmodeCanvasClick);  //채우기 모드에서
    canvas.addEventListener("contextmenu",handleCM);  //우클릭 방지
}


erase.addEventListener("click",earseAll);

Array.from(colors).forEach(color => 
    color.addEventListener("click",changeColor));
//Array.from은 object로부터 array를 만듬

if(range){   //굵기 조절
    range.addEventListener("input",handleRangeChange);
}
 
if(mode){  //모드 변경
    mode.addEventListener("click",handleModeClick);
}

if(save){  //저장
    save.addEventListener("click",canvasSave);
}

