

$(document).ready(function() {

  (function() {
    canvas = new fabric.Canvas('Canvas');
    fabric.Object.prototype.transparentCorners = false;
    // canvas.on('mouse:over', function(e) {
    //   e.target.setFill('red');
    //   canvas.renderAll();
    // });

    // canvas.on('mouse:out', function(e) {
    //   e.target.setFill('green');
    //   canvas.renderAll();
    // });

  })();

  // Add tower click function.
  $("#defence-tower").click(function() {
    newColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
      console.log("watch tower clicked.");
      localCirle = canvas.add(
        new fabric.Circle({ top: Math.floor(Math.random() * 600) + 1  , left: Math.floor(Math.random() * 800) + 1, width: 200, height: 200, fill: newColor, radius: 50, opacity: 0.7 })
      );
      localCirle.lockUniScaling = true;
  });

  // Add base click function.
  $("#base").click(function() {
    newColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
      console.log("watch tower clicked.");
      localCirle = canvas.add(
        new fabric.Rect({ top: Math.floor(Math.random() * 600) + 1  , left: Math.floor(Math.random() * 800) + 1, width: 200, height: 200, fill: newColor, opacity: 0.7, strokeWidth: 5, stroke: 'rgba(0,0,0,1)' })
      );
      localCirle.lockUniScaling = true;
  });


  // Clear canvas function
  $("#canvas-clear").click(function() {
      canvas.clear();
      console.log("clear it!");
  });


});
