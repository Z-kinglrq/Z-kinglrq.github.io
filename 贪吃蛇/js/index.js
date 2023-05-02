
/**
 * 绘制蛇的方法
 */
function drawSnake(snake){
    for(var i = 0;i<snake.snakePos.length;i++){
        if(!snake.snakePos[i].domContent){
            //如果进入此if，说明是第一次创建蛇
            snake.snakePos[i].domContent = document.createElement('div');
            snake.snakePos[i].domContent.style.position = "absolute";
            snake.snakePos[i].domContent.style.width = snakeBody + "px";
            snake.snakePos[i].domContent.style.height = snakeBody + "px";
            snake.snakePos[i].domContent.style.top = snake.snakePos[i].y*snakeBody +"px";
            snake.snakePos[i].domContent.style.left = snake.snakePos[i].x*snakeBody +"px";
            if(snake.snakePos[i].flag==="head"){
                //说明是蛇头
                snake.snakePos[i].domContent.style.background='url("../img/佩奇1.jpg") center/160% no-repeat';
                snake.snakePos[i].domContent.style.borderRadius='50%';
                //根据方向进行旋转
                // switch(snake.direction.flag){
                //     case 'top':{
                //         snake.snakePos[i].domContent.style.transform=`
                //         rotate(-90deg)
                //         `;
                //         break;
                //     }
                //     case 'left':{
                //         snake.snakePos[i].domContent.style.transform=`
                //         rotate(-180deg)
                //         `;
                //         break;
                //     }
                //     case 'right':{
                //         snake.snakePos[i].domContent.style.transform=`
                //         rotate(0deg)
                //         `;
                //         break;
                //     }
                //     case 'button':{
                //         snake.snakePos[i].domContent.style.transform=`
                //         rotate(90deg)
                //         `;
                //         break;
                //     }
                // }
            }else{//蛇身
                snake.snakePos[i].domContent.style.background ='url("../img/爱心2.png") center/100% no-repeat';
                snake.snakePos[i].domContent.style.borderRadius="50%";
            }
        }
        document.querySelector(".container").append(snake.snakePos[i].domContent);
    }
}
/**
 * 绘制食物
 */
function drawFood(){
    //1、食物的坐标是随机的
    //2、食物不能生成在蛇身上
    while(true){
        var isRepeat =false;
        //随机生成一个坐标
        food.x = Math.floor(Math.random() * tr);
        food.y = Math.floor(Math.random() * tr);
        //查看是否符合坐标要求
        for(var i = 0;i<snake.snakePos.length;i++){
            if(snake.snakePos[i].x===food.x&&snake.snakePos[i].y===food.y){
                //进入此if说明当前生成的食物坐标和蛇的坐标冲突了
                isRepeat=true;
                break;
            }
        }
        if(!isRepeat){
            //跳出while循环
            break;
        }
    }
    //整个while循环跳出来之后，食物的坐标一定时ok的
    if(!food.domContent){
        food.domContent = document.createElement('div');
        food.domContent.style.width=snakeBody+'px';
        food.domContent.style.height=snakeBody+'px';
        food.domContent.style.position = "absolute";
        food.domContent.style.background='url("../img/小婕儿1.png") center/110% no-repeat';
        food.domContent.style.borderRadius='50%';
        document.querySelector('.container').append(food.domContent);
    }
    food.domContent.style.left = food.x *snakeBody+'px';
    food.domContent.style.top = food.y*snakeBody+'px';
}
function initGame(){
    // 1、初始化地图
    for(var i = 0; i<tr;i++){
        for(var j =0; j<td;j++){
            gridData.push({
                x:j,
                y:i
            });
        }
    }
    // console.log(gridData);
    // 2、绘制蛇
    drawSnake(snake);
    
    // 3、绘制食物
    drawFood();
}
/**
 * 碰撞检测
 */
function isCollide(newHead){
    var collideCheckInfo = {
        isCollide:false,//是否碰到墙或身体
        isEat:false//是否迟到食物
    }
    //1、是否碰墙
    if(newHead.x<0||newHead.x>=td||newHead.y<0||newHead.y>=tr){
        collideCheckInfo.isCollide = true;
        return collideCheckInfo;
    }
    //2、检测是否碰到自己
    for(var i = 0;i<snake.snakePos.length;i++){
        if(snake.snakePos[i].x===newHead.x && snake.snakePos[i].y===newHead.y){
            collideCheckInfo.isCollide = true;
            return collideCheckInfo;
        }
    }
    //3、是否迟到食物
    if(newHead.x===food.x && newHead.y===food.y){
        collideCheckInfo.isEat = true;
        score++;//分数自增
    }
    return collideCheckInfo;
}
/**
 * 蛇的移动方法
 */
function snakeMove(){
    var oldHead = snake.snakePos[snake.snakePos.length-1]
    //根据方向计算出新的蛇头的坐标
    var newHead = {
        domContent:"",
        x:oldHead.x + snake.direction.x,
        y:oldHead.y + snake.direction.y,
        flag:"head"
    }
    //进行碰撞检测
    var collideCheckResult = isCollide(newHead);
    if(collideCheckResult.isCollide){
       if( window.confirm(`
        游戏结束，你当前的分数是${score}，分，是否需要结束游戏？
        `)){
            document.querySelector('.container').innerHTML =`
                <!-- 开始游戏按钮 -->
                <button class="startBtn" style="display:none"></button>
                <!-- 暂停游戏按钮 -->
                <button class="pauseBtn" style="display:none"></button>
            `;
            score = 0;
            snake ={
                //蛇一开始移动的方向
                direction:directionNum.right,//一开始像右移动
                //蛇的初始位置
                snakePos :[
                    {x:0,y:0,domContent:"",flag:"body"},
                    {x:1,y:0,domContent:"",flag:"body"},
                    {x:2,y:0,domContent:"",flag:"body"},
                    {x:3,y:0,domContent:"",flag:"head"},
                ]
            }
            food ={
                x:0,y:0,domContent:""
            }
            initGame();
        }else{
            document.onkeydown = null;
            clearInterval(timerStop);
        }
        return;
    }
    //将旧的头修改为身体
    oldHead.flag='body';
    oldHead.domContent.style.background='url("../img/爱心2.png") center/100% no-repeat';
    oldHead.domContent.style.borderRadius="50%";
    snake.snakePos.push(newHead);
    //是否迟到东西
    if(collideCheckResult.isEat){
        //重新生成食物
        drawFood();
    }else{
        //没有迟到食物，移除最后一个元素
        document.querySelector(".container").removeChild(snake.snakePos[0].domContent);
        snake.snakePos.shift();
    }
    //重新绘制蛇
    drawSnake(snake);
}
function startGame(){
    timerStop = setInterval(function(){
        snakeMove();
    },time)
}
/**
 * 绑定事件
 */
function bindEvent(){
    //1、首先时键盘事件，用户按下上下左右，蛇能够移动
    document.onkeydown = function(e){
        if((e.key==='ArrowUp'||e.key.toLocaleLowerCase()==='w') && snake.direction.flag!=='button'){
            snake.direction = directionNum.top;
        }
        if((e.key==='ArrowDown'||e.key.toLocaleLowerCase()==='s') && snake.direction.flag!=='top'){
            snake.direction = directionNum.button;
        }
        if((e.key==='ArrowLeft'||e.key.toLocaleLowerCase()==='a') && snake.direction.flag!=='right'){
            snake.direction = directionNum.left;
        }
        if((e.key==='ArrowRight'||e.key.toLocaleLowerCase()==='d') && snake.direction.flag!=='left'){
            snake.direction = directionNum.right;
        }
    }
    //2、计时器自动调用蛇移动的方法
    startGame();

    //3、点击暂停
    document.querySelector('.container').onclick = function(e){
        if(e.target.className==="container"){
            document.querySelector('.pauseBtn').style.display = 'block';
        clearInterval(timerStop);
        }else{
            e.stopPropagation();
        document.querySelector('.pauseBtn').style.display = 'none';
        startGame();
        }
    }
}
// 游戏的主方法

function main(){
    //用户点击了开始游戏之后，再进行后续的工作
    document.querySelector('.startBtn').onclick = function(e){
        e.stopPropagation();
        document.querySelector('.startBtn').style.display = "none";
        // 1、首先初始化游戏
    initGame();
    //2、绑定事件
    bindEvent();
    }
}
main();