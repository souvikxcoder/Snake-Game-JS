var plane=document.getElementById("window");
w=plane.width;
h=plane.height;
var ctx=plane.getContext("2d");
var snakeW=10;
var snakeH=10;
var dir="right";
var frog;
var score=0;
function drawSnake(x,y){
ctx.fillStyle="white";
ctx.fillRect(x*snakeW,y*snakeH,snakeW,snakeH);
ctx.fillStyle="black";
ctx.strokeRect(x*snakeW,y*snakeH,snakeW,snakeH);
}
//snake
function setFrog()
{
    frog={x:Math.floor(Math.random()*49),y:Math.floor(Math.random()*49)};
    if(searchHead(frog))
        setFrog()
}
function drawFrog()
{
    ctx.fillStyle="red";
    ctx.fillRect(frog.x*snakeW,frog.y*snakeH,snakeW,snakeH);
}
var len=4;
snake=[];
for(var i=len-1;i>=0;i--)
    snake.push({x:i+w/20-len,y:h/20});
setFrog();
document.addEventListener("keydown",dirInput);
function dirInput(event)
{
    if((event.keyCode==87 || event.keyCode==38) && dir!="down")
        dir="up";
    else if((event.keyCode==83 || event.keyCode==40) && dir!="up")
        dir="down";
    else if((event.keyCode==65 || event.keyCode==37) && dir!="right")
        dir="left";
    else if((event.keyCode==68 || event.keyCode==39) && dir!="left")
        dir="right";
}
function searchHead(head)
{
    for(var i=0;i<snake.length;i++)
        if(snake[i].x==head.x && snake[i].y==head.y)
            return true;
    return false

}
function drawSnk()
{
    for(var i=0;i<snake.length;i++)
    {
        var X=snake[i].x;
        var Y=snake[i].y;
        drawSnake(X,Y);
    }
}
function draw()
{
    ctx.clearRect(0,0,plane.width,plane.height);
    drawSnk();
    if(!(snake[0].x==frog.x && snake[0].y==frog.y))
        snake.pop();
    else
    {
        score+=10;
        setFrog();
    }
    if(dir=="right")
    {
        var head={x:snake[0].x+1,y:snake[0].y};
        if(!searchHead(head))
            snake.unshift({x:snake[0].x+1,y:snake[0].y});  
        else 
            if(!alert("Game Over\nScore:"+score))  
                location.reload();
    }
    else if(dir=="down")
    {
        var head={x:snake[0].x,y:snake[0].y+1};
        if(!searchHead(head))
            snake.unshift({x:snake[0].x,y:snake[0].y+1});
        else
            if(!alert("Game Over\nScore:"+score))  
                location.reload();
    }
    else if(dir=="left")
    {
        var head={x:snake[0].x-1,y:snake[0].y};
        if(!searchHead(head))
            snake.unshift({x:snake[0].x-1,y:snake[0].y});
        else
            if(!alert("Game Over\nScore:"+score))  
                location.reload();
    }
    else if(dir=="up")
    {
        var head={x:snake[0].x,y:snake[0].y-1};
        if(!searchHead(head))
            snake.unshift({x:snake[0].x,y:snake[0].y-1});
        else
            if(alert("Game Over\nScore:"+score))
                location.relode();
    }
    drawFrog();
    if(snake[0].x>w/10 || snake[0].y>h/10 || snake[0].x<0 || snake[0].y<0 )
        if(!alert("Game Over\nScore:"+score))  
            location.reload();
        }
setInterval(draw,75);
