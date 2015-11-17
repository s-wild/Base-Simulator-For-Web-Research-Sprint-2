

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

  // Add a sniper click function.
  $("#sniper").click(function() {
      console.log("sniper clicked.");

      // Circle for sniper.
      var circle = new fabric.Circle({
         top: 140,
         left: 230,
         radius: 20,
         fill: 'black'
       });

      // Triangle for sniper vision.
      var triangle = new fabric.Triangle({
        top: 190,
        left: 195,
        width: 100,
        height: 700,
        fill: 'black',
        opacity: 0.3
      });

      // Group the shapes for the sniper.
      var sniperGroup = new fabric.Group([ circle, triangle ], {
        top: 300,
        left: 210,
        angle: -50
      });

      canvas.add(sniperGroup);
      locaSniper.lockUniScaling = true;
  });

  // Add a machine gun click function.
  $("#machineGun").click(function() {
      console.log("sniper clicked.");

      // Circle for machine gun.
      var circle = new fabric.Circle({
         top: 110,
         left: 280,
         radius: 20,
         fill: 'black'
       });

      // Triangle for machine gun vision.
      var triangle = new fabric.Triangle({
        top: 150,
        left: 150,
        width: 300,
        height: 200,
        fill: 'black',
        opacity: 0.7
      });

      // Group the shapes for the sniper.
      var machineGunGroup = new fabric.Group([ circle, triangle ], {
        top: 300,
        left: 210,
        angle: -50
      });

      canvas.add(machineGunGroup);
      locaSniper.lockUniScaling = true;
  });

  // Add a pratroller on click function.
  $("#patroller").click(function() {
      console.log("sniper clicked.");

      // Circle for patrol vison.
      var patrollerVison = new fabric.Triangle({
        top: 300,
        left: 110,
        width: 200,
        height: 400,
        fill: 'black',
        opacity: 0.7,
        angle: 10
      });

      // Circle for patrol man.
      var circleMan = new fabric.Circle({
         top: 300,
         left: 180,
         radius: 20,
         fill: 'black'
       });

      // Circle for patrol radius.
      var circlePatrolRadius = new fabric.Circle({
         top: 50,
         left: 180,
         radius: 400,
         fill: 'black',
         strokeWidth: 5,
         fill: '#fff',
         stroke: '#666'
       });

      // Group the shapes for the sniper.
      var patrolGroup = new fabric.Group([ circlePatrolRadius, patrollerVison ,circleMan ], {
        top: 300,
        left: 210,
        
      });

      canvas.add(patrolGroup); 
      locaSniper.lockUniScaling = true;
  });

  // Clear canvas function
  $("#canvas-clear").click(function() {
      canvas.clear();
  });
  
  $('#Canvas').addClass('grassBG');
  
  $('#changeToGrass').click(function() 
	{
		$('#Canvas').removeClass('sandBG');
		$('#Canvas').removeClass('snowBG');
		$('#Canvas').addClass('grassBG');
	});
	$('#changeToSand').click(function() 
	{
		$('#Canvas').removeClass('grassBG');
		$('#Canvas').removeClass('snowBG');
		$('#Canvas').addClass('sandBG');
	});
	$('#changeToSnow').click(function() 
	{
		$('#Canvas').removeClass('grassBG');
		$('#Canvas').removeClass('sandBG');
		$('#Canvas').addClass('snowBG');
	});



});
