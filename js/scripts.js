

$(document).ready(function() {

  // Hide buttons until base is clicked. 
  $("#defence-tower").hide();
  $("#sniper").hide();
  $("#machineGun").hide();
  $("#patroller").hide();
  $("#step2").hide();

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
      console.log("watch tower clicked.");
      localCirle = canvas.add(
        new fabric.Circle({ 
			top: 200,
			left:200,
			width: 200, 
			height: 200, 
			fill: '#089fdb', 
			radius: 50, 
			opacity: 0.7 })
      );
      localCirle.lockUniScaling = true;
  });

  // Add base click function.
  $("#base").click(function() {

      // Hide first instruction and base.
      $("#step1").hide();
      $("#base").hide();

      // After base click, show units.
      $("#step2").show();
      $("#defence-tower").show();
      $("#sniper").show();
      $("#machineGun").show();
      $("#patroller").show();
      console.log("watch tower clicked.");
      localCirle = canvas.add(
        new fabric.Rect({
			top: 250,
			left: 200,
			width: 200, 
			height: 200, 
			fill: '#FFF', 
			opacity: 0.7, 
			strokeWidth: 5, 
			stroke: 'rgba(0,0,0,1)' })
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
         fill: '#8b8b80'
       });

      // Triangle for sniper vision.
      var triangle = new fabric.Triangle({
        top: 190,
        left: 195,
        width: 100,
        height: 700,
        fill: '#8b8b80',
        opacity: 0.3
      });

      // Group the shapes for the sniper.
      var sniperGroup = new fabric.Group([ circle, triangle ], {
        top: 300,
        left: 210,
        angle: -50
      });

      canvas.add(sniperGroup);
  });

  // Add a machine gun click function.
  $("#machineGun").click(function() {
      console.log("sniper clicked.");

      // Circle for machine gun.
      var circle = new fabric.Circle({
         top: 110,
         left: 280,
         radius: 20,
         fill: '#24b34b'
       });

      // Triangle for machine gun vision.
      var triangle = new fabric.Triangle({
        top: 150,
        left: 150,
        width: 300,
        height: 200,
        fill: '#24b34b',
        opacity: 0.7
      });

      // Group the shapes for the sniper.
      var machineGunGroup = new fabric.Group([ circle, triangle ], {
        top: 300,
        left: 210,
        angle: -50
      });

      canvas.add(machineGunGroup);
  });

  // Add a rotating shape on click function.
  $("#patroller").click(function() {
      addPatrol();
  });

  function addPatrol() {

    console.log("Patrol initilized.");

    // Circle for patrol vison.
    var patrollerVison = new fabric.Triangle({
      top: 160,
      left: 210,
      width: 200,
      height: 400,
      fill: 'black',
      opacity: 0.7,
      angle: 60,

    });

    // Circle for patrol man.
    var circleMan = new fabric.Circle({
       top: 200,
       left: 275,
       radius: 20,
       fill: 'black'
     });


    var circlePatrolPath = new fabric.Circle({
      top: 200,
      left: 180,
      radius: 40,
      strokeDashArray: [10, 50],
      stroke: 'white',
      strokeWidth: 10,
      fill: 'rgba(0,0,0,0)'
    });

    patrolManPlusVision = new fabric.Group([circleMan, patrollerVison], {
      originX: 'right',
      originY: 'top', 
    });


    patrolManPlusVision.animate({ angle: 30 }, {
      easing: fabric.util.ease.easeOutCubic,
      duration: 2000,
      onChange: canvas.renderAll.bind(canvas),
      onComplete: function onComplete() {
        console.log(Math.round(patrolManPlusVision.angle)),
        patrolManPlusVision.animate({
          angle: Math.round(patrolManPlusVision.angle) === 30 ? -30 : 30
        }, {
          duration: 2000,
          onComplete: onComplete
        });
        //console.log("onComplete end");
      }
    });



    // Group the shapes for the sniper.
    patrolGroup = new fabric.Group([circlePatrolPath, patrolManPlusVision], {
      top: 600,
      left: 410,
      originX: '600',
      originY: '800',
    });

    canvas.add(patrolGroup);  

    console.log(patrolGroup.get('angle'));

  }

  

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
