(function() {
  var canvas = this.__canvas = new fabric.StaticCanvas('battleField');

  canvas.add(
    new fabric.Rect({ top: 100, left: 100, width: 50, height: 50, fill: '#f55' }),
    new fabric.Circle({ top: 140, left: 230, radius: 75, fill: 'green' }),
    new fabric.Triangle({ top: 300, left: 210, width: 100, height: 100, fill: 'blue' })
  );

  function animate() {
    canvas.item(0).animate('top', canvas.item(0).getTop() === 500 ? '100' : '500', { 
      duration: 1000,
      onChange: canvas.renderAll.bind(canvas),
      onComplete: animate
    });
  }
  animate();
})();