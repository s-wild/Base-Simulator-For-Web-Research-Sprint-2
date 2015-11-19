

$(document).ready(function() {

  // Global variables.
  manSizeRadius = 10;
  runAnimate = true;


  // Hide buttons until base is clicked. 
  $("#defence-tower").hide();
  $("#sniper").hide();
  $("#machineGun").hide();
  $("#patroller").hide();
  $("#step2").hide();
  $("#run-simuation").hide();

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
			radius: 100, 
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
	  $("#run-simuation").show();
      addSniper();
  });
	  function addSniper(){
      console.log("sniper clicked.");

      // Circle for sniper.
      var circle = new fabric.Circle({
         top: 140,
         left: 225,
         radius: manSizeRadius,
         fill: '#8b8b80'
       });

      // Triangle for sniper vision.
      var triangle = new fabric.Triangle({
        top: 170,
        left: 210,
        width: 50,
        height: 300,
        fill: '#8b8b80',
        opacity: 0.3
      });
	   /* var invisTriangle = new fabric.Triangle({
        top: 140-700,
        left: 200,
        width: 100,
        height: -700,
        fill: '#8b8b80',
        opacity: 0.0
      });*/

      // Group the shapes for the sniper.
      sniperGroup = new fabric.Group([ circle, triangle ], {
        top: 500,
        left: 300,
        angle: -45,
    		centeredRotation: false,
    		originX: "center",
    		originY: "top"
      });
	
	  
      canvas.add(sniperGroup);
	  }

  // Add a machine gun click function.
  $("#machineGun").click(function() {
      console.log("sniper clicked.");

      // Circle for machine gun.
      var circle = new fabric.Circle({
         top: 125,
         left: 215,
         radius: manSizeRadius,
         fill: '#24b34b'
       });

      // Triangle for machine gun vision.
      var triangle = new fabric.Triangle({
        top: 150,
        left: 150,
        width: 150,
        height: 75,
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
      $("#run-simuation").show();
      addPatrol();
  });

  function addPatrol() {

    console.log("Patrol initilized.");

    // Circle for patrol vison.
    var patrollerVison = new fabric.Triangle({
      top: 65,
      left: 170,
      width: 50,
      height: 100,
      fill: 'black',
      opacity: 0.7,
      angle: 50,

    });

    // Circle for patrol man.
    var circleMan = new fabric.Circle({
       top: 75,
       left: 175,
       radius: manSizeRadius,
       fill: 'black'
     });


    // Patrol path
    var circlePatrolPath = new fabric.Circle({
      top: 50,
      left: 50,
      radius: 250,
      strokeDashArray: [10, 50],
      stroke: 'white',
      strokeWidth: 10,
      fill: 'rgba(0,0,0,0)'
    });

    patrolManPlusVision = new fabric.Group([circleMan, patrollerVison], {
    });

    // Group the shapes for the sniper.
    patrolGroup = new fabric.Group([circlePatrolPath, patrolManPlusVision], {
      top: 300,
      left: 300,
      originX: 'center',
      originY: 'center',
    });

    canvas.add(patrolGroup);  

    console.log(patrolGroup.get('angle'));

  }

  $("#stop-simuation").hide();

  // Run simulation function
  $("#run-simuation").click(function() {


	runAnimate = false;  
	simulate()
  


    $("#run-simuation").hide();
    $("#stop-simuation").show();

	function simulate(){
		if(typeof patrolGroup !== 'undefined'){
			simulatePatrol();
		}
		if(typeof sniperGroup !== 'undefined'){
			simulateSniper();
		}
	}
	
    function simulatePatrol() {
    if (typeof patrolGroup !== 'undefined') {

      //the variable is defined
      // Rotate the group of shapes every second by -10 degrees..
      var rotationDegrees = -10;
      patrolGroup.animate({ angle: rotationDegrees }, {
        duration: 1000,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: function onComplete() {
          //console.log(Math.round(patrolManPlusVision.angle)),
          patrolGroup.animate({
            angle: rotationDegrees-=10
          }, {
            duration: 1000,
            onChange: canvas.renderAll.bind(canvas),
            onComplete: onComplete,
            abort: function(){
              return runAnimate;
            }
          });
        }
      });
    }
    }
	
	function simulateSniper() {
		
		sniperGroup.animate({ angle: 45 }, {
      //easing: fabric.util.ease.easeOutCubic,
      duration: 2000,
      onChange: canvas.renderAll.bind(canvas),
      onComplete: function onComplete() {
        sniperGroup.animate({
          angle: Math.round(sniperGroup.angle) === 45 ? -45 : 45
        }, {
          duration: 2000,
		  onChange: canvas.renderAll.bind(canvas),
          onComplete: onComplete,
		  abort: function(){
              return runAnimate;
            }
        });
      }
    });
	}

    // var counter = 0;
    // var myInterval = setInterval(function () {
    //   counter-=5;
    //   simulatePatrol()

    // }, 1000);

    // function simulatePatrol() {
    //   console.log(counter);
    //   //patrolGroup.animate({ angle: 60 });
    //   patrolGroup.animate('angle', counter, {
    //     onChange: canvas.renderAll.bind(canvas)
    //   });
    // }



    // @TODO - considering a function to move a rectangle by keyboard press. Not sure if this is a good idea.
    var canvasWrapper = document.getElementById('CanvasContainer');
    canvasWrapper.addEventListener("keydown", doKeyDown, false);
    function doKeyDown(e) {
      document.onkeydown = function(e) {
          console.log();
          switch (e.keyCode) {
              case 38:  /* Up arrow was pressed */
                  console.log('up works')
                break;
              case 40:  /* Down arrow was pressed */
                  console.log('down works')
                break;
              case 37:  /* Left arrow was pressed */
                  console.log('left works')
                break;
              case 39:  /* Right arrow was pressed */
                 console.log('right works')
                break;
            }
      }
    }
    
  });


  // Stop simulation function
  $("#stop-simuation").click(function() {
    runAnimate = true;
    $("#run-simuation").show();
    $("#stop-simuation").hide();
  });

  // Get users mouse points for debugging.
  canvas.on('mouse:down', function(options) {
    console.log(options.e.clientX, options.e.clientY);
  });

  // Clear canvas function
  $("#canvas-clear").click(function() {
      canvas.clear();
	  runAnimate = true;
    $("#stop-simuation").hide();
      // Hide buttons until base is clicked. 
      $("#defence-tower").hide();
      $("#sniper").hide();
      $("#machineGun").hide();
      $("#patroller").hide();
      $("#run-simuation").hide();
      $("#step2").hide();
      $("#step1").show();
      $("#base").show();
  });
  
  // On page load, set grass background image in canvas.
  $('#Canvas').addClass('grassBG');

  // Changes canvas background to grass image.
  $('#changeToGrass').click(function() {
		$('#Canvas').removeClass('sandBG');
		$('#Canvas').removeClass('snowBG');
		$('#Canvas').addClass('grassBG');
	});

  // Changes canvas background to sand image.
	$('#changeToSand').click(function() {
		$('#Canvas').removeClass('grassBG');
		$('#Canvas').removeClass('snowBG');
		$('#Canvas').addClass('sandBG');
	});

  // Changes canvas background to snow image.
	$('#changeToSnow').click(function() {
		$('#Canvas').removeClass('grassBG');
		$('#Canvas').removeClass('sandBG');
		$('#Canvas').addClass('snowBG');
	});



});
