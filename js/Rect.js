/**
 * Created by sf on 2017/3/8.
 */
function Rect( option ){
    this._init(option);
}
Rect.prototype={
    _init:function (option) {
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.w = option.w || 0;
        this.h = option.h || 0;
        this.fillStyle = option.fillStyle || 'red';
        this.strokeStyle = option.strokeStyle || 'blue';
        this.rotation = option.rotation || 0;
        this.opacity = option.opacity === 0 ? 0 : option.opacity || 1;
        this.scaleX = option.scaleX || 1;
        this.scaleY = option.scaleY || 1;
    },
    render:function (ctx) {
        ctx.save();
        //ctx.beginPath();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation*Math.PI/180);
        ctx.globalAlpha=this.opacity;
        ctx.scale(this.scaleX,this.scaleY);
        ctx.rect(0,0,this.w,this.h);
        ctx.fillStyle = this.fillStyle;
        ctx.fill();
        ctx.strokeStyle = this.strokeStyle;
        ctx.stroke();
        ctx.restore();
    }
}
