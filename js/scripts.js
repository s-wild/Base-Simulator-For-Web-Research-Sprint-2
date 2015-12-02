/*
* Custom javascript file which uses heatmap.js and fabric.js to generate shapes, animations and heatmaps.
*
*/ 
$(document).ready(function() {

  // Global variables.
  manSizeRadius = 10;
  runAnimate = true; 
  var snipers = [];
  var machineGunners = [];
  var patrols = [];

  // Hide buttons until base is clicked. 
  $("#defence-tower, #sniper, #machineGun, #patroller, #step2, #run-simuation, #run-heatmap, #clear-heatmap, #save-simuation, #heatMapShow, #heatMapHide").hide();

  // Create fabric object from id on the page.
  (function() {
    canvas = new fabric.Canvas('Canvas');
    fabric.Object.prototype.transparentCorners = false;
  })();

  // Add tower click function.
  $("#defence-tower").click(function() {
    localCirle = canvas.add(
      new fabric.Circle({ 
    		top: 160,
    		left:290,
    		fill: '#089fdb', 
    		radius: 140, 
    		opacity: 0.7,
        lockUniScaling: true,


      })
    );
    localCirle.lockUniScaling = true;
  });

  // Add base click function.
  $("#base").click(function() {

      // Hide first instruction and base.
      $("#step1, #base").hide();
      $("#step2").css("background-color", "#D9534F");
      $("#step2").css("color", "white");

      // After base click, show units.
      $("#step2, #defence-tower, #sniper, #machineGun, #patroller").show();

      localRect = canvas.add(
        new fabric.Rect({
  			top: 200,
  			left: 330,
  			width: 200, 
  			height: 200, 
  			fill: '#FFF', 
  			opacity: 0.7, 
  			strokeWidth: 5, 
  			stroke: 'rgba(0,0,0,1)',
        lockUniScaling: true,
        lockScalingX: true,
        lockScalingY: true,
        lockMovementX: true,
        lockMovementY: true,
        lockRotation: true })
      );
  });

  // Add a sniper click function.
  $("#sniper").click(function() {
	  $("#run-simuation").show();
      addSniper();
  });

	  function addSniper(){

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
      top: 570,
      left: 220,
      width: 50,
      height: 100,
      fill: '#363636',
      opacity: 0.7,
      angle: -80,

    });

    // Circle for patrol man.
    var circleMan = new fabric.Circle({
       top: 530,
       left: 200,
       radius: manSizeRadius,
       fill: '#363636'
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
      lockUniScaling: true,
      lockScalingX: true,
      lockScalingY: true
    }));

    canvas.add(patrols[patrols.length-1]);  
  }

  $("#stop-simuation").hide();

  // Run simulation function
  $("#run-simuation").click(function() {
    $("#canvas-clear").hide();

    $("#defence-tower, #sniper, #machineGun, #patroller").hide();

    heatMapCreate()

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
      patrols[index].animate({ angle: patrolsAngles[index] }, {
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
        },
      abort: function(){
            return runAnimate;

          }
      });

      // Heat map functionality. 
      unitIndex = patrols[index];
      heatMapInterval(unitIndex, false, true);
    }
	
    function simulateSniper(index) {
      var lookup = {};
      // console.log(snipers[index]);
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
        },
        abort: function(){
          return runAnimate;
        }
      });
      unitIndex = snipers[index];
	  console.log("simulating sniper");
      heatMapInterval(unitIndex);
    }
	
  	function simulateMachineGunner(index){
  	 machineGunners[index].animate({ angle: machineGunnerAngles[index]+30 }, {
        //easing: fabric.util.ease.easeOutCubic,
        duration: 4000,
        onChange: canvas.renderAll.bind(canvas),
        onComplete: function onComplete() {
          machineGunners[index].animate({
            angle: machineGunners[index].angle === machineGunnerAngles[index]+30 ? machineGunnerAngles[index]-30 : machineGunnerAngles[index]+30
          }, {
            duration: 4000,
  		  onChange: canvas.renderAll.bind(canvas),
            onComplete: onComplete,
  		  abort: function(){
                return runAnimate;
              }
          });
        },
  	  abort: function(){
                return runAnimate;

              }
      });
     unitIndex = machineGunners[index];
     heatMapInterval(unitIndex, true)
  	}

    function enemyUnit() {
      // Circle for  vison.
      initPositionleft = 300;
      initPositionTop = 20;
  	  if(typeof enemyItem !== 'undefined'){
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
  });

  // Stop simulation function
  $("#stop-simuation").click(function() {
    $("#canvas-clear").show();

    runAnimate = true;
    $("#save-simuation").show();
    $("#stop-simuation").hide();
    $("#heatMapHide").show();
  	if(patrols.length >= 1){
  		for (i=0; i < patrols.length; i++){
  			patrols[i].angle = patrolAngles[i];
  		}
  	}
		if(snipers.length >= 1){
			for (i=0; i < snipers.length; i++){
				snipers[i].angle = sniperAngles[i];
			}
		}
		if(machineGunners.length >= 1){
			for (i=0; i < machineGunners.length; i++){
				machineGunners[i].angle = machineGunnerAngles[i];
			}
		}

    // Stop heatmap intervals.
    if(typeof SimulateHeatMap !== 'undefined') {
      clearInterval(SimulateHeatMap);
    }
	
  });

  // Stop simulation function
  $("#stop-simuation").click(function() {

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

    $(".heatmap-canvas").remove();


    // Hide elements on canvas clear.
    $("#stop-simuation, #defence-tower, #sniper, #machineGun, #patroller, #run-simuation, #step2, #save-simuation, #heatMapShow, #heatMapHide").hide();

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
    $('#Canvas').removeClass('snowBG');
		$('#Canvas').removeClass('grassBG');
		$('#Canvas').addClass('sandBG');
	});

  // Changes canvas background to snow image.
	$('#changeToSnow').click(function() {
    $('#Canvas').removeClass('grassBG');
		$('#Canvas').removeClass('sandBG');
		$('#Canvas').addClass('snowBG');
	});

  // Heatmap function.
  function heatMapCreate(){
    // create configuration object
    // minimal heatmap instance configuration
    canvasHeight = $('#CanvasContainer').height();
    canvasWidth = $('#CanvasContainer').width();

    $('#CanvasContainer').height(canvasHeight);
    heatmapInstance = h337.create({
      // only container is required, the rest will be defaults
      container: document.querySelector('#CanvasContainer'),
	  maxOpacity: 0.5,
	  //max: 10000000
    });
	
	//
  }

  function heatMapInterval (unitIndex, gunner, patrol) {
    
    // Heat map functionality. #
    SimulateHeatMap = window.setInterval(function(){
    	this.patrol = patrol !== false;
    	if(typeof gunner != 'undefined'){
    		if(gunner == true)
    		{
    			val = 0.01;
    		}
    		else	
    		{
    			val = 0.05;
    		}
      }
      else {
      	val = 0.05;
      }

      // console.log(PatrolIndex);
      if (runAnimate == false) {
        // Check if a sniper is on page.
        if (typeof unitIndex != 'undefined') {
          unitIndex.setCoords();
          // console.log("Top::" + snipers[index].bottom);
          attrunitBrX = Math.round(unitIndex.oCoords.mb.x); 
          attrunitBrY = Math.round(unitIndex.oCoords.mb.y);

      			if(typeof patrol == 'undefined'){
      					topX = Math.round(unitIndex.oCoords.mt.x); 
      					topY = Math.round(unitIndex.oCoords.mt.y); 

      					//calculate step
      				  xStep = (topX-attrunitBrX)/10;
      				  yStep = (topY-attrunitBrY)/10;
      				  
      				  for(i=0; i<9; i++){
      					  heatMapAdd(Math.round(attrunitBrX+(xStep*(i+1))),Math.round(attrunitBrY+(yStep*(i+1))), val);
      				  }
      				
                //heatMapAdd(attrunitBrX, attrunitBrY);
          		  heatMapAdd(Math.round(unitIndex.oCoords.bl.x), Math.round(unitIndex.oCoords.bl.y));
          		  heatMapAdd(Math.round(unitIndex.oCoords.br.x), Math.round(unitIndex.oCoords.br.y));
      				
      			}
      			else {
      				heatMapAdd(attrunitBrX,attrunitBrY, 0.2);
      			}
        }
      }
     }, 400);
  }
  
  // Add heatmap points for sniper.
  function heatMapAdd(attrunitBrX, attrunitBrY, val){ 
  	if(typeof val == 'undefined'){
  		val = 0.05;
  	}
    // datapoint for sniper
    var dataPointUnit = { 
      x: attrunitBrX, // x coordinate of the datapoint, a number 
      y: attrunitBrY, // y coordinate of the datapoint, a number
      value: val, // the value at datapoint(x, y),
      radius: 70,
    };
  	//check if points are being added multiple times, and if the "value" of the point is too high
  	var currentData = heatmapInstance.getData();
  	var arrPoints = $.map(currentData, function(el) { return el });
  	notInArray = true;
  	for(step=0; step<arrPoints.length-1; step++)
  	{
  		if(arrPoints[i].value > 0.95){
  			arrPoints[i].value = 0.95;
  		}
  		if(dataPointUnit.x == arrPoints[i].x && dataPointUnit.y == arrPoints[i].y){
  			notInArray = false;
  		}
  	}
  	if(notInArray == true){
  		heatmapInstance.addData(dataPointUnit);
  	}
  }

  // Save simulation function.
  $('#save-simuation').click(function() {
    saveHeatMap();
  });

  // Remove heatmap.
  $('#clear-heatmap').click(function() {
    clearHeatMap();
    $('#clear-heatmap').hide();
    $('#run-heatmap').show();
  });

  // Hide heatmap
  $('#heatMapHide').click(function() {
    showAddUnits();
    $('.heatmap-canvas, #heatMapHide').hide();
    $('#heatMapShow').show();

  });

  // Show heatmap
  $('#heatMapShow').click(function() {
    hideAddUnits();
    $('.heatmap-canvas, #heatMapHide').show();
    $('#heatMapShow').hide();
  });

  // Clear local storage
  $('#clearStorage').click(function() {
    clearLocalStorage();
  });

  // Clear heatmap
  function clearHeatMap() {
    heatmapInstance.store.setDataSet({data:[]});
  }

  // Save heatmap @TODO Save Data for heatmap.
  function saveHeatMap() {
    var currentData = heatmapInstance.getData();
    uuid = guid();
    var stringUuid =String(uuid)
    console.log(stringUuid);
    localStorage.setItem(stringUuid, JSON.stringify(currentData));
  }

  // Hide units in the control panel control panel.
  function hideAddUnits() {
    $('#base, #defence-tower, #sniper, #machineGun, #patroller').hide();
  }

  // Show units in the control panel control panel.
  function showAddUnits() {
    $('#defence-tower, #sniper, #machineGun, #patroller').show();
  }

  // Check if data is in local storage and add buttons.
  if (localStorage.length >= 1) {
    for (var i = 0; i < localStorage.length; i++){
      $( '<button type="button" class="getScenario btn btn-primary scenario-button" value="' + i +'">Scenario ' + i + '</button>' ).appendTo( "#result");
    }
  }

  // get scenario button click.
  $('.getScenario').click(function() {
    hideAddUnits();
    $("#heatMapHide").show();
    selectedHeatMap = $(this).attr('value');
    console.log(selectedHeatMap);
    getHeatMaps(selectedHeatMap)
  });

  // Save heatmap @TODO Save Data for heatmap.
  function getHeatMaps(selectedHeatMap) {
    // Clear data in heatmap.
    // heatmapInstance.setDataSet({data:[]});
    var arrJson = $.map(localStorage, function(el) { return el });
    scenarioSelected = arrJson[selectedHeatMap];
    console.log(scenarioSelected);
    if(typeof heatmapInstance == 'undefined'){
      heatMapCreate();
    }
    heatmapInstance.setData(JSON.parse(scenarioSelected));
  }

  // Create Unique ID
  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  // Clear all local storage.
  function clearLocalStorage() {
    localStorage.clear();
  }
  
}); // End of document load javascript

// This function detects keyboard press events which is used to move a Fabric.JS rectangle.
$(document).keypress(function(e) {

  // Prevent long keypress bug
  e.preventDefault();
  animateKeypress(e)

   // This function moves the enemy rectangle using w,a,s,d keyboard keys.
   function animateKeypress(e) {

    if (typeof enemyItem !== 'undefined') {
      if(e.which == 119) {
        console.log(canvas.enemyItem);
        enemyItem.animate('top', initPositionTop-=20 , { 
          duration: 100,
          onChange: canvas.renderAll.bind(canvas),
        });
      }
      if(e.which == 97) {
        console.log(canvas.enemyItem);
        enemyItem.animate('left', initPositionleft-=20 , { 
          duration: 100,
          onChange: canvas.renderAll.bind(canvas),
        });
      }
      if(e.which == 100) {
        console.log(canvas.enemyItem);
        enemyItem.animate('left', initPositionleft+=20 , { 
          duration: 100,
          onChange: canvas.renderAll.bind(canvas),
        });
      }
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