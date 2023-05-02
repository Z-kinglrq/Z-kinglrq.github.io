// 游戏相关的配置
var gridData = [];//储存地图对象

// 整个网格的行与列
var tr = 30,
    td = 30;
//蛇的大小
var snakeBody = 20;

//明确新的蛇头和旧的蛇头的位置关系
//我们在确定新的蛇头坐标的时候，会拿旧的蛇头做一个计算得出新的蛇头位置
var directionNum = {
    left:{x:-1,y:0,flag:'left'},
    right:{x:1,y:0,flag:'right'},
    top:{x:0,y:-1,flag:'top'},
    button:{x:0,y:1,flag:'button'}
}
// 蛇相关的配置信息
var snake = {
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
var food ={
    x:0,y:0,domContent:""
}
//游戏分数
var score = 0;
//停止计时器
var timerStop = null;
//速度
var time = 100;