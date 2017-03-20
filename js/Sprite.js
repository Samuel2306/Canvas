/**
 * Created by sf on 2017/3/7.
 */
function Sprite(option){
    this._init(option);
}
Sprite.prototype={
    _init:function(option){
        this.x = option.x === 0 ? 0 : option.x || 10;
        this.y = option.y === 0 ? 0 : option.y || 10;

        this.originWidth = 40;
        this.originheight = 65;

        this.w = option.w || this.originWidth;
        this.h = option.h || this.originheight;



        this.fps = option.fps || 10;
        this._imgSrc = option.imgSrc || '';
        this._dirIndex = 0;
    },
    render:function (ctx) {
        var self = this;
        var img = new Image();
        img.src=this._imgSrc;
        img.onload=function () {
            var frameIndex=0;
            setInterval(function () {
                ctx.clearRect(0,0,canvas.width,canvas.height)
                ctx.drawImage(img,frameIndex*self.originWidth,self._dirIndex*self.originheight,self.originWidth,self.originheight,self.x,self.y,self.w,self.h);
                frameIndex++;
                frameIndex = frameIndex%4;
            },1000/self.fps)
        }
    },
    changeDir:function (dir) {
        if (dir=="left"){
            this._dirIndex=1;
        }else if (dir=="right"){
            this._dirIndex=2;
        }else if (dir=="top"){
            this._dirIndex=3;
        }else if (dir=="bottom"){
            this._dirIndex=0;
        }
    }
};
