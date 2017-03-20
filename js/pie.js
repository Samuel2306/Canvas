/**
 * Created by sf on 2017/3/14.
 */
function PieChart(option) {
    this._init(option);
}
PieChart.prototype={
    _init:function (option) {
        this.x = option.x || 0;
        this.y = option.y || 0;
        this.radius = option.radius || 0;
        this.data = option.data || 0;
        this.group = new Konva.Group({
            x:0,
            y:0
        });
        var self = this;
        var startAngle = -90;

        this.data.forEach(function (item,index) {
            var angle = item.value * 360;
            var angle1= startAngle + 1/2 * angle;
            var wedge = new Konva.Wedge({
                x:self.x,
                y:self.y,
                angle:angle,
                radius:self.radius,
                fill:item.color,
                rotation:startAngle
            });
            self.group.add(wedge);
            var text = new Konva.Text({
                x:self.x + (self.radius + 30) * Math.cos(Math.PI / 180 * angle1),
                y:self.y + (self.radius + 30) * Math.sin(Math.PI / 180 * angle1),
                text:item.value * 100 + '%',
                fill:item.color
            });

            if( angle1 > 90 && angle1 < 270){
                text.x(text.x()-text.getTextWidth());
            }
            self.group.add(text);

            startAngle += angle;
        });

        var circle = new Konva.Circle({
            x:self.x,
            y:self.y,
            radius:self.radius + 10,
            stroke:"#ccc",
            strokeWidth:2
        })

        this.group.add(circle);

        this.wedges = this.group.find('Wedge');
    },
    addToGroupOrLayer:function (arg) {
       arg.add(this.group);
    },
    animationPlay:function (index) {
        index = index || 0;
        
        var self = this;

        if(index == 0){
            for(var i=0;i<self.data.length;i++){
                self.wedges[i].angle(0);
            }
        }
        if(index < this.data.length){
            var item = this.wedges[index];
            item.angle(0);
            item.to({
                angle:self.data[index].value * 360,
                duration:2 * self.data[index].value,
                onFinish:function () {
                    index += 1;
                    self.animationPlay(index);
                }
            });
        }
    }
}