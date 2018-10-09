import {fabric} from 'fabric';

window.manouetfifi = window.manouetfifi || {};

let pixelPerCm = 1;
// In cm
let roomWidth = 1700;
let roomHeight = 2200;

window.manouetfifi.enableMap = function(elementId) {
  let $elem = $(`#${elementId}`);
  if (!$elem.hasClass("enabled")) {
    $elem.addClass("enabled");
    // create a wrapper around native canvas element (with id="c")
    fabric.Object.prototype.selectable = false;
    let canvas = new fabric.Canvas(elementId);
    canvas.add(new fabric.Rect({ width: roomWidth, height: roomHeight, stroke: 'red', strokeWidth: 8, fill: '' }));
    canvas.add(new fabric.Rect({ width: 100, height: 10, fill: 'blue', top: roomHeight - 10, left: roomWidth/2 - 50 }))

    canvas.add(new fabric.Text('Entrance', {
      left: roomWidth/2 - 100, top: roomHeight - 100,
      fontFamily: "Sans Serif",
      fontSize: 40,
    }));
    canvas.add(new fabric.Circle({ radius: 50, fill: 'red', top: 44, left: 80 }))
    canvas.add(new fabric.Ellipse({ rx: 50, ry: 10, fill: 'yellow', top: 80, left: 35 }))
    canvas.add(new fabric.Rect({ width: 50, height: 50, fill: 'purple', angle: -19, top: 70, left: 1000 }))
    canvas.add(new fabric.Circle({ radius: 50, fill: 'green', top: 700, left: 30 }))
    canvas.add(new fabric.Ellipse({ rx: 50, ry: 10, fill: 'orange', top: 12, left: 100, angle: 30 }))

    canvas.on('mouse:down', function(opt) {
      let evt = opt.e;
      //if (evt.ctrlKey === true) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      //}
    });
    canvas.on('mouse:move', function(opt) {
      if (this.isDragging) {
        let e = opt.e;
        this.viewportTransform[4] += e.clientX - this.lastPosX;
        this.viewportTransform[5] += e.clientY - this.lastPosY;
        let zoom = canvas.getZoom();
        this.viewportTransform[4] += e.clientX - this.lastPosX;
        this.viewportTransform[5] += e.clientY - this.lastPosY;
        if (this.viewportTransform[4] >= 0) {
          this.viewportTransform[4] = 0;
        } else if (this.viewportTransform[4] < canvas.getWidth() - roomWidth * zoom) {
          this.viewportTransform[4] = canvas.getWidth() - (roomWidth+8) * zoom;
        }
        if (this.viewportTransform[5] >= 0) {
          this.viewportTransform[5] = 0;
        } else if (this.viewportTransform[5] < canvas.getHeight() - roomHeight * zoom) {
          this.viewportTransform[5] = canvas.getHeight() - (roomHeight+8) * zoom;
        }
        this.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    });
    canvas.on('mouse:up', function(opt) {
      this.isDragging = false;
      this.selection = true;
    });
    canvas.on('mouse:wheel', function(opt) {
      let delta = -opt.e.deltaY;
      let zoom = canvas.getZoom();
      // 600 is the zoom resolution
      zoom = zoom + delta/800;
      if (zoom > 2) zoom = 2;
      if (zoom < 0.20) zoom = 0.20;
      canvas.setZoom(zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
      if (this.viewportTransform[4] >= 0) {
        this.viewportTransform[4] = 0;
      } else if (this.viewportTransform[4] < canvas.getWidth() - roomWidth * zoom) {
        this.viewportTransform[4] = canvas.getWidth() - roomWidth * zoom;
      }
      if (this.viewportTransform[5] >= 0) {
        this.viewportTransform[5] = 0;
      } else if (this.viewportTransform[5] < canvas.getHeight() - roomHeight * zoom) {
        this.viewportTransform[5] = canvas.getHeight() - roomHeight * zoom;
      }
    })
  }
}
