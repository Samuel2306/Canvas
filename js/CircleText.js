/**
 * Created by sf on 2017/3/11.
 */
function CircleText(option){
    this._init(option);
}
CircleText.prototype={
    _init:function (option) {
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.innerRadius = option.innerRadius || 0;
        this.outerRadius = option.outerRadius || 0;
        this.text = option.text || 'canvas';
        this.innerStyle = option.innerStyle || 'red';
        this.outerStyle = option.outerStyle || 'blue';

        this.group = new Konva.Group({
            x:this.x,
            y:this.y
        });
        var innerCircle = new Konva.Circle({
            x:0,
            y:0,
            radius:this.innerRadius,
            fill:this.innerStyle,
            opacity:.8
        });
        var outerRing = new Konva.Ring({
            x:0,
            y:0,
            innerRadius:this.innerRadius,
            outerRadius:this.outerRadius,
            fill:this.outerStyle,
            opacity:.5
        });
        var text = new Konva.Text({
            x:0-this.outerRadius,
            y:-7,
            width:this.outerRadius * 2,
            align:'center',
            text:this.text,
            fontSize:14,
            fontFamily:'微软雅黑',
            fontStyle:'bold',
            fill:'#fff'
        });
        this.group.add(innerCircle);
        this.group.add(outerRing);
        this.group.add(text);
    },
    addToGroupOrLayer:function (arg) {
        arg.add(this.group);
    }
}
