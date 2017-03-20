/**
 * Created by sf on 2017/3/13.
 */
function HistogramChart(option) {
    this._init(option);
}
HistogramChart.prototype={
    _init: function( option ) {
        this.x = option.x || 0;
        this.y = option.y || 0; //柱状图的原点坐标
        this.w = option.w || 0; //柱状图的总宽度
        this.h = option.h || 0; //柱状图高度

        this.data = option.data || [];

        var rectWidth = this.w / this.data.length;
        var self = this;

        this.group = new Konva.Group({
            x:0,
            y:0
        });

        var baseLine = new Konva.Line({
            points:[this.x,this.y,this.x + this.w,this.y],
            strokeWidth:1,
            stroke:'lightgreen'
        });
        this.group.add(baseLine);

        this.data.forEach(function(item,index){
            var rect = new Konva.Rect({
                x:self.x + (1/4 + index) * rectWidth,
                y:self.y - item.value * self.h,
                width:1 / 2 * rectWidth,
                height:item.value * self.h,
                fill:item.color,
                shadowBlur:10,
                shadowColor:'black',
                opacity:.8,
                cornerRadius:10
            });
            self.group.add(rect);

            var bottomText = new Konva.Text({
                x:self.x + (1/2 + index) * rectWidth,
                y:self.y + 10,
                text:item.name,
                fontSize:14,
                fill:item.color,
                rotation:30
            });
            self.group.add(bottomText);

            var topText = new Konva.Text({
                x:self.x + (1/4 + index) * rectWidth,
                y:self.y - item.value * self.h - 20,
                width:1 / 2 * rectWidth,
                align:'center',
                text:item.value * 100 + '%',
                fontSize:14,
                fill:item.color,
                name:'text'
            })
            self.group.add(topText);
        })
    },
    addToGroupOrLayer:function (arg) {
        arg.add(this.group);
    },
    animationPlay:function () {
        var self = this;
        this.group.find('Rect').each(function (item,index) {
            item.y(self.y);
            item.height(0);
            item.to({
                y:self.y - self.data[index].value * self.h,
                height:self.data[index].value * self.h,
                duration:2
            })
        });

        this.group.find('.text').each(function (item,index) {
            item.y(self.y-20);
            item.to({
                y:self.y - self.data[index].value * self.h - 20,
                duration:2
            })
        });
    }
    
}