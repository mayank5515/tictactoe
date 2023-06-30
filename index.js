const boxes=document.querySelectorAll('.box');
const gameInfo=document.querySelector('.game-info');
const newGameBtn=document.querySelector('.btn');
let currentPlayer;
let gameGrid;
const winningPos=[
[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]
];


function resetGame(){
    currentPlayer="X";
    gameGrid=["","","","","","","","",""];
    boxes.forEach((box,index)=>{

        boxes[index].style.pointerEvents="all";
        // box.classList=`box box${index+1}`; WHAT IS THIS
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText=`Current Player - ${currentPlayer}`;
}

resetGame();
function swapTurn(){
    if(currentPlayer==="X"){
        currentPlayer="O"
    }
    else{
        currentPlayer="X";
    }
    gameInfo.innerText=`Current Player - ${currentPlayer}`;

}
function handleClickIndex(index){
    if(gameGrid[index]===""){
        boxes[index].innerHTML=currentPlayer;
        gameGrid[index]=currentPlayer;
        swapTurn(); //ye toh i understand
        gameOver(); //we checking if the game has finished or not (either by win ya tie)
    }
}

function gameOver(){
    let ans="";

    // all boxes (3) should not be empty and they must have same value also check winningPos array
    winningPos.forEach((pos)=>{
        if((gameGrid[pos[0]]!==""||gameGrid[pos[1]]!==""||gameGrid[pos[2]]!=="")&&(gameGrid[pos[0]]===gameGrid[pos[1]])&&(gameGrid[pos[1]]===gameGrid[pos[2]]))
        {
            //checking winner
            if(gameGrid[pos[0]]==="X"){
                ans="X";
            }
            else{
                ans="O";
            }
            boxes.forEach((box)=>{
                box.style.pointerEvents="none";
            })
            boxes[pos[0]].classList.add("win");
            boxes[pos[1]].classList.add("win");
            boxes[pos[2]].classList.add("win");
        }
    }
    )

    if(ans!==""){
        gameInfo.innerHTML=`Winner Player - ${ans}`;
        // newGameBtn.classList.add("active");
        newGameBtn.style.display='flex';

        // newGameBtn.addEventListener('click',resetGame());
        // boxes.forEach((index)=>{
        //     boxes[index].style.pointerEvents="none";
        // })
    }
    //check whether is it tie or not
    let count=0;
   gameGrid.forEach((box)=>{

    if(box!==""){
        count++;
    }


   })

   if(count==9){

    gameInfo.innerHTML=`Game Tied`;
    // newGameBtn.classList.add("active");
    newGameBtn.style.display='flex';
    // newGameBtn.addEventListener('click',resetGame());

   }

}
boxes.forEach((box,index)=>{
    box.addEventListener('click',()=>{
        handleClickIndex(index);
    })
})
newGameBtn.addEventListener("click", resetGame);