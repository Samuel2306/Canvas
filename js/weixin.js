/**
 * Created by sf on 2017/3/17.
 */
var stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,//全屏
    height: window.innerHeight
});

var sceneBiuilders = [buliderHtml5Scene, buliderC3Scene, buliderDemoScene];
var sceneIndex = 0;
function buliderHtml5Scene(){
    var bgLayer = new Konva.Layer();
    var animateLayer = new Konva.Layer();
    var lightLayer = new Konva.Layer();

    var rect = new Konva.Rect({
        x:-100,
        y:-100,
        fill:'red',
        width:100,
        height:100,
        opacity:.4
    });

    return new ItcastScene({
        name:'场景1',
        layers:[bgLayer, animateLayer, lightLayer],
        stage:stage,
        init:function(){
            animateLayer.add(rect);
            this.layers.forEach(function(layer){
                layer.draw();
            })
        },
        pre:function(){
            rect.to({
                x:300,
                y:300,
                duration:2,
                scaleX:2,
                scaleY:2,
                opacity:1
            });
        },
        post:function ( dopre ) {
            var self = this;
            rect.to({
                x:-100,
                y:-100,
                duration:2,
                scaleX:0.5,
                scaleY:0.5,
                opacity:.4,
                onFinish:function(){
                    self.layers.forEach(function(layer){
                        layer.destroy();
                    })
                    dopre();
                }
            });
        }
    })
}

function buliderC3Scene(){
    var bgLayer = new Konva.Layer();
    var animateLayer = new Konva.Layer();
    var lightLayer = new Konva.Layer();

    //柱状图的数据
    var data = [
        { name: '前端', value: '.8', color: 'green'},
        { name: 'PHP', value: '.3', color: 'blue'},
        { name: 'Java', value: '.7', color: 'red'},
        { name: 'UI', value: '.9', color: 'orange'},
        { name: 'IOS', value: '.4', color: 'purple'},
        { name: 'Android', value: '.9', color: 'pink'}
    ];

    var h = new HistogramChart({
        x : 1/8 * stage.width(),
        y : 3/4 * stage.height(),
        w : 3/4 * stage.width(),
        h : 1/2 * stage.height(),
        data:data
    })

    return new ItcastScene({
        name:'场景2',
        layers:[bgLayer, animateLayer, lightLayer],
        stage:stage,
        init:function(){
            h.addToGroupOrLayer(animateLayer);
            this.layers.forEach(function(layer){
                layer.draw();
            })
        },
        pre:function(){
            h.animationPlay();
        },
        post:function ( dopre ) {
            this.layers.forEach(function(layer){
                layer.destroy();
            })
            dopre();
        }
    })
}

function buliderDemoScene(){
    var bgLayer = new Konva.Layer();
    var animateLayer = new Konva.Layer();
    var lightLayer = new Konva.Layer();

    var rect = new Konva.Rect({
        x:-100,
        y:-100,
        fill:'blue',
        width:100,
        height:100,
        opacity:.4
    });

    return new ItcastScene({
        name:'场景1',
        layers:[bgLayer, animateLayer, lightLayer],
        stage:stage,
        init:function(){
            animateLayer.add(rect);
            this.layers.forEach(function(layer){
                layer.draw();
            })
        },
        pre:function(){
            rect.to({
                x:300,
                y:300,
                duration:2,
                scaleX:2,
                scaleY:2,
                opacity:1
            });
        },
        post:function ( dopre ) {
            var self = this;
            rect.to({
                x:-100,
                y:-100,
                duration:2,
                scaleX:0.5,
                scaleY:0.5,
                opacity:.4,
                onFinish:function(){
                    self.layers.forEach(function(layer){
                        layer.destroy();
                    })
                    dopre();
                }
            });
        }
    })
}

sceneBiuilders[sceneIndex]().play();

function addStageEvent(){
    var startY=0;
    var endY=0;
    stage.on('contentMousedown contentTouchstart',function (e) {
        if(e.type == 'contentMousedown'){
            startY=e.evt.screenY;
        }else{
            startY=e.evt.touches[0].screenY;
        }
    });

    stage.on('contentMousemove contentTouchmove',function (e) {
        if(e.type == 'contentMousemove'){
            endY=e.evt.screenY;
        }else{
            endY=e.evt.touches[0].screenY;
        }
    });

    stage.on('contentMouseup contentTouchend',function (e) {
        if(endY > startY ){
            if(sceneIndex > 0){
                sceneIndex -= 1;
                sceneBiuilders[sceneIndex]().play();
            }
        }else{
            if(sceneIndex < sceneBiuilders.length - 1){
                sceneIndex += 1;
                sceneBiuilders[sceneIndex]().play();
            }
        }
    });
}

addStageEvent();
