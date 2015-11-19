

$(document).ready(function() {
	var snipers = [];
	var machineGunners = [];
	var patrols = [];
  // Global variables.
  manSizeRadius = 10;
  runAnimate = true;

  // Hide buttons until base is clicked. 
  $("#defence-tower, #sniper, #machineGun, #patroller, #step2, #run-simuation").hide();

  (function() {
    canvas = new fabric.Canvas('Canvas');
    fabric.Object.prototype.transparentCorners = false;
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
      $("#step1, #base").hide();

      // After base click, show units.
      $("#step2, #defence-tower, #sniper, #machineGun, #patroller").show();

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

		snipers.push(new fabric.Group([ circle, triangle ], {
        top: 500,
        left: 300,
        angle: -45,
    		centeredRotation: false,
    		originX: "center",
    		originY: "top",
			lockUniScaling: true,
			lockScalingX: true,
			lockScalingY: true
      }));
	  
 
     
	
	  
    canvas.add(snipers[snipers.length-1]);
	 }

  // Add a machine gun click function.
  $("#machineGun").click(function() {
	 $("#run-simuation").show();
    console.log("machine gunner clicked.");

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
    machineGunners.push(new fabric.Group([ circle, triangle ], {
      top: 300,
      left: 210,
      angle: -50,
	    centeredRotation: false,
		originX: "center",
    	originY: "top",
	  	lockUniScaling: true,
		lockScalingX: true,
		lockScalingY: true
    }));

    canvas.add(machineGunners[machineGunners.length-1]);
  });

  // Add a rotating shape on click function.
  $("#patroller").click(function() {
    $("#run-simuation").show();
    addPatrol();
  });

  function addPatrol() {

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
    patrols.push(new fabric.Group([circlePatrolPath, patrolManPlusVision], {
      top: 300,
      left: 300,
      originX: 'center',
      originY: 'center',
    }));

    canvas.add(patrols[patrols.length-1]);  
  }

  $("#stop-simuation").hide();

  // Run simulation function
  $("#run-simuation").click(function() {

  	runAnimate = false;
	
	//get angles 
	
	sniperAngles = [];
	machineGunnerAngles = [];
	patrolsAngles = [];
	for (i=0; i < snipers.length; i++){
		sniperAngles.push(snipers[i].angle);
	}
	for (i=0; i < machineGunners.length; i++){
		machineGunnerAngles.push(machineGunners[i].angle)
	}
	for (i=0; i < patrols.length; i++){
		patrolsAngles.push(patrols[i].angle);
	}
  	simulate()

    $("#run-simuation").hide();
    $("#stop-simuation").show();

    // Check if defence units exist.
  	function simulate(){
  		if(patrols.length >= 1){
			for (i=0; i < patrols.length; i++){
				simulatePatrol(i);
			}
		}
  		if(snipers.length >= 1){
			for (i=0; i < snipers.length; i++){
				simulateSniper(i);
			}
  		}
		if(machineGunners.length >= 1){
			for (i=0; i < machineGunners.length; i++){
				simulateMachineGunner(i);
			}
		}
		
  	}
  	
    function simulatePatrol(index) {

        //the variable is defined
        // Rotate the group of shapes every second by -10 degrees..
        var rotationAmount = 10;
        patrols[index].animate({ angle: patrolsAngles[index]-rotationAmount }, {
          duration: 1000,
          onChange: canvas.renderAll.bind(canvas),
          onComplete: function onComplete() {
            //console.log(Math.round(patrolManPlusVision.angle)),
            patrols[index].animate({
              angle: patrolsAngles[index]-=rotationAmount
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
   
  	
	
	function simulateSniper(index) {
	   snipers[index].animate({ angle: sniperAngles[index]+45 }, {
      //easing: fabric.util.ease.easeOutCubic,
      duration: 6000,
      onChange: canvas.renderAll.bind(canvas),
      onComplete: function onComplete() {
        snipers[index].animate({
          angle: snipers[index].angle === sniperAngles[index]+45 ? sniperAngles[index]-45 : sniperAngles[index]+45
        }, {
          duration: 6000,
		  onChange: canvas.renderAll.bind(canvas),
          onComplete: onComplete,
		  abort: function(){
              return runAnimate;
            }
        });
      }
    });
	}
	
	function simulateMachineGunner(index){
	 machineGunners[index].animate({ angle: machineGunnerAngles[index]+30 }, {
      //easing: fabric.util.ease.easeOutCubic,
      duration: 1000,
      onChange: canvas.renderAll.bind(canvas),
      onComplete: function onComplete() {
        machineGunners[index].animate({
          angle: machineGunners[index].angle === machineGunnerAngles[index]+30 ? machineGunnerAngles[index]-30 : machineGunnerAngles[index]+30
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

    function enemyUnit() {
      // Circle for patrol vison.
      initPositionleft = 300;
      initPositionTop = 400;
	  if(typeof enemyItem !== 'undefined')
	  {
		  enemyItem.remove();
	  }
      enemyItem = new fabric.Rect({
        top: initPositionTop,
          left: initPositionleft,
          width: 20, 
          height: 20, 
          fill: '#000', 
          opacity: 0.7, 
          strokeWidth: 5, 
          stroke: 'rgba(255,255,255,1)' 
      });
      canvas.add(enemyItem);
    }
    enemyUnit()

    // var keyValue = $( "#Canvas" ).keypress().value;
    // console.log(keyValue);



    // var code = e.keyCode || e.which;
    // console.log(code);

    // if(code == 13) { //Enter keycode
    //   //Do something
    // }

    // @TODO - considering a function to move a rectangle by keyboard press. Not sure if this is a good idea.
    // var canvasWrapper = document.getElementById('CanvasContainer');
    // canvasWrapper.addEventListener("keydown", doKeyDown, false);
    // function doKeyDown(e) {
    //   document.onkeydown = function(e) {
    //       console.log();
    //       switch (e.keyCode) {
    //           case 38:  /* Up arrow was pressed */
    //               console.log('up works')
    //             break;
    //           case 40:  /* Down arrow was pressed */
    //               console.log('down works')
    //             break;
    //           case 37:  /* Left arrow was pressed */
    //               console.log('left works')
    //             break;
    //           case 39:  /* Right arrow was pressed */
    //              console.log('right works')
    //             break;
    //       }
    //   }
    // }
    
  });

  // Stop simulation function
  $("#stop-simuation").click(function() {
    runAnimate = true;
    $("#run-simuation").show();
    $("#stop-simuation").hide();
  });

canvas.observe('after:render', function(e) {
	if(typeof enemyItem !== 'undefined'){
    var targ = enemyItem;
	
    targ.setCoords();

    // filter out itself
    var items = canvas.getObjects().filter(function(o){
        return targ !== o;
    });
    
    var hit = false;

    for (var i = 0, n = items.length; i < n; i++) {
        var m = items[i];
        
        if (targ.intersectsWithObject(m)) {
            targ.setFill("red");
            hit = true;
        } else {
            if (!hit) {
                targ.setFill("#CCCCCC");
            }
        }

    }
	}
});

  // Get users mouse points for debugging.
  canvas.on('mouse:down', function(options) {
    console.log(options.e.clientX, options.e.clientY);
  });

  // Clear canvas function
  $("#canvas-clear").click(function() {
    canvas.clear();
	  runAnimate = true;
	 snipers = [];
	 machineGunners = [];
	 patrols = [];

    // Hide elements on canvas clear.
    $("#stop-simuation, #defence-tower, #sniper, #machineGun, #patroller, #run-simuation, #step2").hide();

    // Show elements on canvas clear.
    $("#step1, #base").show();
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
$(document).keypress(function(e) {
   animateUp(e)

   function animateUp(e) {
    // Get top left of shape.
    // topLeft = enemyItemo.Coords.tl.x;
    // console.log(topLeft);

    if (typeof enemyItem !== 'undefined') {
      console.log(e.which);
      if(e.which == 119) {
        console.log(canvas.enemyItem);
        enemyItem.animate('top', initPositionTop-=20 , { 
          duration: 100,
          onChange: canvas.renderAll.bind(canvas),
        });
      }
    }

    if (typeof enemyItem !== 'undefined') {
      console.log(e.which);
      if(e.which == 97) {
        console.log(canvas.enemyItem);
        enemyItem.animate('left', initPositionleft-=20 , { 
          duration: 100,
          onChange: canvas.renderAll.bind(canvas),
        });
      }
    }

    if (typeof enemyItem !== 'undefined') {
      console.log(e.which);
      if(e.which == 100) {
        console.log(canvas.enemyItem);
        enemyItem.animate('left', initPositionleft+=20 , { 
          duration: 100,
          onChange: canvas.renderAll.bind(canvas),
        });
      }
    }

    if (typeof enemyItem !== 'undefined') {
      console.log(e.which);
      if(e.which == 115) {
        console.log(canvas.enemyItem);
        enemyItem.animate('top', initPositionTop+=20 , { 
          duration: 100,
          onChange: canvas.renderAll.bind(canvas),
        });
      }
    }



  }
});