(function() {
  canvas = this.__canvas = new fabric.StaticCanvas('battleField');

  

  canvas.add(
    // new fabric.Rect({ top: 100, left: 100, width: 50, height: 50, fill: '#f55' })
    //new fabric.Circle({ top: 140, left: 230, radius: 75, fill: 'green' }),
    //new fabric.Triangle({ top: 300, left: 210, width: 100, height: 100, fill: 'blue' })
  );

  function animate() {
    // canvas.item(0).animate('top', canvas.item(0).getTop() === 500 ? '100' : '500', { 
    //   duration: 1000,
    //   onChange: canvas.renderAll.bind(canvas),
    //   onComplete: animate
    // });
  }
  animate();
})();

$(document).ready(function() {

    // Add tower click function.
    $("#defence-tower").click(function() {
      newColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
        console.log("watch tower clicked.");
        canvas.add(
          new fabric.Rect({ top: Math.floor(Math.random() * 300) + 1  , left: Math.floor(Math.random() * 800) + 1, width: 200, height: 200, fill: newColor })
        );
    });


    // Clear canvas function
    $("#canvas-clear").click(function() {
        canvas.clear();
    });

    
});