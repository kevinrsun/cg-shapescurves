class Renderer {
    // canvas:              object ({id: __, width: __, height: __})
    // num_curve_sections:  int
    constructor(canvas, num_curve_sections, show_points_flag) {
        this.canvas = document.getElementById(canvas.id);
        this.canvas.width = canvas.width;
        this.canvas.height = canvas.height;
        this.ctx = this.canvas.getContext('2d');
        this.slide_idx = 0;
        this.num_curve_sections = num_curve_sections;
        this.show_points = show_points_flag;
    }

    // n:  int
    setNumCurveSections(n) {
        this.num_curve_sections = n;
        this.drawSlide(this.slide_idx);
    }

    // flag:  bool
    showPoints(flag) {
        this.show_points = flag;
        this.drawSlide(this.slide_idx);
    }
    
    // slide_idx:  int
    drawSlide(slide_idx) {
        this.slide_idx = slide_idx;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        switch (this.slide_idx) {
            case 0:
                this.drawSlide0(this.ctx);
                break;
            case 1:
                this.drawSlide1(this.ctx);
                break;
            case 2:
                this.drawSlide2(this.ctx);
                break;
            case 3:
                this.drawSlide3(this.ctx);
                break;
        }
    }

    // ctx:          canvas context
    drawSlide0(ctx) {
        let left_bottom = {x:150, y:250};
        let right_top = {x:650, y:450};
        let color = [0, 0, 255, 255];
        this.drawRectangle(left_bottom, right_top, color, ctx);
    }

    // ctx:          canvas context
    drawSlide1(ctx) {
        let center = {x:400, y:300};
        let radius = 50;
        let color = [0, 50, 0, 255];
        this.drawCircle(center, radius, color, ctx);

        if(this.show_points) {
            let pointColor = [0, 0, 0, 255];
            let points = [];
            let numOfSections = 360 / this.num_curve_sections;
    
            for(let degree = 0; degree < 360; degree = degree + numOfSections) {
                let x = center.x + (radius * Math.cos((degree * Math.PI / 180)));
                let y = center.y + (radius * Math.sin((degree * Math.PI / 180)));
    
                points.push({x: x, y: y});
            }

            for(let i = 0 ; i < points.length; i++) {
                this.drawCircle(points[i], 3, pointColor, ctx);
            }
        }
    }

    // ctx:          canvas context
    drawSlide2(ctx) {
        let pt0 = {x:100, y:100};
        let pt1 = {x:150, y:350};
        let pt2 = {x:420, y:300};
        let pt3 = {x:400, y:120};
        let color = [150, 0, 150, 255];
        this.drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx)

        // Showing the control points
        if(this.show_points) {
            let size = 10;
            let pointColor = [200, 0, 0, 255];

            this.drawCircle(pt0, size, pointColor, ctx);
            this.drawCircle(pt1, size, pointColor, ctx);
            this.drawCircle(pt2, size, pointColor, ctx);
            this.drawCircle(pt3, size, pointColor, ctx);
        }
    }

    // ctx:          canvas context
    drawSlide3(ctx) {
        let linesToDraw = [
            // K
            {x:100, y:100}, {x:100, y:500},
            {x:100, y:300}, {x:200, y:500},
            {x:100, y:300}, {x:200, y:100},

            // e
            {x:225, y:200}, {x:300, y:200},

            // v
            {x:325, y:225}, {x:360, y:125},
            {x:400, y:225}, {x:360, y:125},

            // i
            {x:450, y:125}, {x:450, y:225},

            // n
            {x:510, y:125}, {x:510, y:225},
        ]

        let curvesToDraw = [
            // e
            {x:225, y:200}, {x:225, y:250}, {x:300, y:250}, {x:300, y:200},
            {x:225, y:200}, {x:225, y:100}, {x:300, y:100}, {x:300, y:150},

            // n
            {x:510, y:125}, {x:510, y:250}, {x:600, y:250}, {x:600, y:125},
        ]

        let circleToDraw = [
            // i
            {x:450, y:250}
        ]

        for(let i = 0; i < linesToDraw.length; i = i + 2) {
            this.drawLine(linesToDraw[i], linesToDraw[i + 1], [50, 205, 255, 255], ctx);
        }

        for(let i = 0; i < curvesToDraw.length; i = i + 4) {
            this.drawBezierCurve(curvesToDraw[i], curvesToDraw[i + 1], curvesToDraw[i + 2], curvesToDraw[i + 3], [50, 205, 255, 255], ctx);
        }

        this.drawCircle(circleToDraw[0], 5, [50, 205, 255, 255], ctx)
    }

    // left_bottom:  object ({x: __, y: __})
    // right_top:    object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawRectangle(left_bottom, right_top, color, ctx) {
        let left_top = {x: left_bottom.x, y: right_top.y};
        let right_bottom = {x: right_top.x, y: left_bottom.y};

        this.drawLine(left_bottom, right_bottom, color, ctx);
        this.drawLine(right_bottom, right_top, color, ctx);
        this.drawLine(right_top, left_top, color, ctx);
        this.drawLine(left_top, left_bottom, color, ctx);
    }

    // center:       object ({x: __, y: __})
    // radius:       int
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawCircle(center, radius, color, ctx) {
        let points = [];
        let increment = 360 / this.num_curve_sections;

        // Checks color to see if it is a circle used to show point data
        if(color[0] == 0 && color[1] == 0 && color[2] == 0) {
            increment = 10;
        }

        for(let degree = 0; degree < 360; degree = degree + increment) {
            let x = center.x + (radius * Math.cos((degree * Math.PI / 180)));
            let y = center.y + (radius * Math.sin((degree * Math.PI / 180)));

            points.push({x: x, y: y});
        }

        // Going to length - 1 to avoid out of bounds
        for(let i = 0; i < points.length - 1; i++){
            this.drawLine(points[i], points[i+1], color, ctx);
        }

        // Drawing from last point to the start
        this.drawLine(points[points.length-1], points[0], color, ctx);
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // pt2:          object ({x: __, y: __})
    // pt3:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawBezierCurve(pt0, pt1, pt2, pt3, color, ctx) {
        let points = [];
        let numOfPoints = this.num_curve_sections + 1;
        if(color[0] == 50 && color[1] == 205 && color[2] == 255) numOfPoints = 100; // Checks color to see if it is a curve used to for name
        let t = 0;
        let increment = 1 / numOfPoints;

        for(let i = 0; i < numOfPoints; i++) {
            let x = Math.pow((1 - t), 3) * pt0.x + 3 * Math.pow((1 - t), 2) * t * pt1.x + 3 * (1 - t) * Math.pow(t, 2) * pt2.x + Math.pow(t, 3) * pt3.x;
            let y = Math.pow((1 - t), 3) * pt0.y + 3 * Math.pow((1 - t), 2) * t * pt1.y + 3 * (1 - t) * Math.pow(t, 2) * pt2.y + Math.pow(t, 3) * pt3.y;

            points.push({x: x, y: y});
            t = t + increment;
        }

        for(let i = 0; i < points.length - 1; i++) {
            this.drawLine(points[i], points[i+1], color, ctx);
        }

        if(this.show_points && numOfPoints != 100) {
            let pointColor = [0, 0, 0, 255];
            for(let i = 0; i < points.length; i++){
                this.drawCircle(points[i], 3, pointColor, ctx);
            }
        }
    }

    // pt0:          object ({x: __, y: __})
    // pt1:          object ({x: __, y: __})
    // color:        array of int [R, G, B, A]
    // ctx:          canvas context
    drawLine(pt0, pt1, color, ctx)
    {
        ctx.strokeStyle = 'rgba(' + color[0] + ',' + color[1] + ',' + color[2] + ',' + (color[3]/255.0) + ')';
        ctx.beginPath();
        ctx.moveTo(pt0.x, pt0.y);
        ctx.lineTo(pt1.x, pt1.y);
        ctx.stroke();
    }
};
