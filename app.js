// function moveHero (e) {
// 	document.onkeydown = 

// }

//20 x 67


//remove from dom after round over/win

//reset hero position at end of everything - be it final victory, defeat, round over
//reset hero image at loss or final victory




let keys = [];

let allowshoot = true;

let hero = {
	top: 790,
	left: 590
};

let frostbolts = [];

let enemies = [];

//if button is clicked, disable button until game is over.
let gameToggle = null;

let interval = null;
let enemiesInterval = null;

let i = 20;
let y = 1;


//make player choose character then start game

$('button').on('click', () => {

	let gameToggle = true
	if (gameToggle = true) {
	 	$('button').css('visibility', 'hidden')
	  // invoke our function to intialize our squares
	  //game.setUpRound();


	interval = setInterval(()=>
	{
		//console.log("gameLoop called");
		moveFrostbolts();
		drawFrostbolts();
		drawEnemies();
		checkKeys();
		collisionDet();
	}, 10);


	enemiesInterval = setInterval(()=>
	{
		spawnNewEnemy();
	}, 900);

	//console.log(interval)
		startKeyHandler();
		setTimer();
	}
})

$('#player1').on('click', () => {
	console.log('its working');
	$('#hero').html("<img src='Images/vivi2.png'>");
});

$('#player2').on('click', () => {
	console.log('its working');
	$('#hero').html("<img src='Images/whiteMage.png'>");
	// $('.frostbolt').html("<img src='Images/tailLaser.png'>");
});


$('#player3').on('click', () => {
	console.log('its working');
	$('#hero').html("<img src='Images/elephantMage.png'>");


});





let roundTimerInterval;

function setTimer(){

    roundTimerInterval = setInterval(function () {
        $("#timer").html(i);
        $("#round").html('Wave ' + y);

     //   for (let fullGame = 0; fullGame >=5; fullGame++) {
	        if (i <= 0) { 
	       		clearInterval(enemiesInterval);
	       		if (enemies.length === 0) {	//frostbolts.length === 0
		        	y++;
		        	if (y===5) {
		        		clearScreen();
		        		//$('#hero').css('left', '580px');
		        		$('#hero').css('background-image', '');
		        		//$('#frostbolt').css('left', '580px');
						alert('YOU HAVE VANQUISHED THE ENEMY SCOUT FORCES! YOUR ARMY HAS ARRIVED TO REINFORCE THE CHOKE POINT BEFORE THE GOBLIN ARMY. PURCHASE EXPANTION PACK FOR NEW SPELLS AND ENEMIES!');
						$('button').css('visibility', 'visible')
		        	} else
			        	alert('You have defeated the wave of goblins! Get ready, The Goblin Commander has allocated new soldiers to overcome your!');
			        	$("#round").html('Round: ' + y)
			        	i = 20;
			        	endKeyHandler();
			        	startKeyHandler();
			        	//$('#hero').css('left', '580px');
			        	//clearInterval(roundTimerInterval);
			        	for (let foes = 0; foes < enemies.length;) {
							enemies.pop();}
						for (let frost = 0; frost < frostbolts.length;) {
			    			frostbolts.pop();}
			    		enemiesInterval = setInterval(()=>
							{
								spawnNewEnemy();
							}, 900);
			    // 			interval = setInterval(()=>
							// {
							// 	//console.log("gameLoop called");
							// 	moveFrostbolts();
							// 	drawFrostbolts();
							// 	drawEnemies();
							// 	checkKeys();
							// 	collisionDet();
							// }, 10);

		    	}
		    }else {
		   			i--;
				}
	}, 1000);
}




//let enemiesArray = [];

//a = keycode 65 d = keycode 68

checkKeys = () => {
	//console.log(e.keyCode);

	if (keys["ArrowLeft"])
	{	
		if (hero.left > 20) {
		//console.log('left');
		hero.left = hero.left - 8;
		moveHero();
	}
	}
	else if (keys["ArrowRight"])
	{	if (hero.left < 1150) {
		//console.log('right');
		hero.left = hero.left + 8;
		moveHero();
	}
	}
	else if (keys[" "] && allowshoot)
	{
		//console.log('spellcast');
		frostbolts.push({
			left: hero.left + 23,
			top: hero.top 
		})
		//drawFrostbolts()
		allowshoot = false;
	}
	if (!keys[" "])
	{
		allowshoot = true;
	}
}

function startKeyHandler()
{
    keys = [];
    $('html').keydown(function(event)
    {
        if (!keys[event.key]) {console.log(event.key);}
        keys[event.key] = true;
    });
    $('html').keyup(function(event)
    {
        keys[event.key] = false;
    });
}

function endKeyHandler()
{
    $('html').off("keydown");
    $('html').off("keyup");
    //reset the keys array
    keys = [];
}


function moveHero() {

	document.getElementById('hero').style.left = hero.left + "px"
 
} moveHero();


function drawEnemies() {

	if (y===1){
	 	document.getElementById('enemies').innerHTML = "";
	 	for (let i = 0; i < enemies.length; i++) {
			// let ranDistance = Math.floor(Math.random() * 10) - 5; //random integer -5 to 5
			//  enemies[i].left = enemies[i].left + ranDistance;  //randomize .left

			 enemies[i].top = enemies[i].top + 1;
			 if (enemies[i].top > 800) {enemies[i].top = -100;}  //pushes them to top so you can remove them
			 if (enemies[i].left < 0) {enemies[i].left = 0;}
			 if (enemies[i].left > 1150) {enemies[i].left = 1150;}
			 document.getElementById('enemies').innerHTML += 
			 `<div class='enemy' style='left:${enemies[i].left}px; top:${enemies[i].top}px'></div>`;

		}
		//remove all the enemies that are flagged for removal
		for (let i = 0; i < enemies.length; i++){
			if (enemies[i].top === -100){
				enemies.splice(i, 1);
				i--;
				clearScreen();
				//$('#hero').css('display', 'none');
				//$('#hero').css('left', '580px');
				//$('.frostbolt').css('left', '580px'); //DEATHRESET
				alert('Game over. You have been overwhelmed! Choose another Spellcaster!');
				$('button').css('visibility', 'visible')
				
				
				//document.getElementById('frostbolts').innerHTML = "";
			}
		}
	}else if (y===2){
			document.getElementById('enemies').innerHTML = "";
		 	for (let i = 0; i < enemies.length; i++) {
				// let ranDistance = Math.floor(Math.random() * 10) - 5; //random integer -5 to 5
				//  enemies[i].left = enemies[i].left + ranDistance;  //randomize .left

				 enemies[i].top = enemies[i].top + 1.5;
				 if (enemies[i].top > 800) {enemies[i].top = -100;}  //pushes them to top so you can remove them
				 if (enemies[i].left < 0) {enemies[i].left = 0;}
				 if (enemies[i].left > 1150) {enemies[i].left = 1150;}
				 document.getElementById('enemies').innerHTML += 
				 `<div class='enemy' style='left:${enemies[i].left}px; top:${enemies[i].top}px'></div>`;

			}
			//remove all the enemies that are flagged for removal
			for (let i = 0; i < enemies.length; i++){
				if (enemies[i].top === -100){
					enemies.splice(i, 1);
					i--;
					clearScreen();
					//$('#hero').css('left', '580px');
					alert('Game over. You have been overwhelmed!');
					$('button').css('visibility', 'visible')
				
				}

			}
	}else if (y===3){
			document.getElementById('enemies').innerHTML = "";
		 	 for (let i = 0; i < enemies.length; i++) {
				let ranDistance = Math.floor(Math.random() * 20) - 10; //random integer -5 to 5
				 enemies[i].left = enemies[i].left + ranDistance;  //randomize .left

				 enemies[i].top = enemies[i].top + 1;
				 if (enemies[i].top > 800) {enemies[i].top = -100;}  //pushes them to top so you can remove them
				 if (enemies[i].left < 0) {enemies[i].left = 0;}
				 if (enemies[i].left > 1150) {enemies[i].left = 1150;}
				 document.getElementById('enemies').innerHTML += 
				 `<div class='enemy' style='left:${enemies[i].left}px; top:${enemies[i].top}px'></div>`;
			}
			//remove all the enemies that are flagged for removal
			for (let i = 0; i < enemies.length; i++){
				if (enemies[i].top === -100){
					enemies.splice(i, 1);
					i--;
					clearScreen();
					$('#hero').css('left', '580px');
					alert('Game over. You have been overwhelmed!');
					$('button').css('visibility', 'visible')
				
				}

			}
		}else if (y===4){
			document.getElementById('enemies').innerHTML = "";
		 	for (let i = 0; i < enemies.length; i++) {
				let ranDistance = Math.floor(Math.random() * 20) - 10; //random integer -5 to 5
				 enemies[i].left = enemies[i].left + ranDistance;  //randomize .left

				 enemies[i].top = enemies[i].top + 2;
				 if (enemies[i].top > 800) {enemies[i].top = -100;}  //pushes them to top so you can remove them
				 if (enemies[i].left < 0) {enemies[i].left = 0;}
				 if (enemies[i].left > 1150) {enemies[i].left = 1150;}
				 document.getElementById('enemies').innerHTML += 
				 `<div class='enemy' style='left:${enemies[i].left}px; top:${enemies[i].top}px'></div>`;

			}
			//remove all the enemies that are flagged for removal
			for (let i = 0; i < enemies.length; i++){
				if (enemies[i].top === -100){
					enemies.splice(i, 1);
					i--;
					clearScreen();
					//$('#hero').css('left', '580px');
					alert('Game over. You have been overwhelmed!');
					$('button').css('visibility', 'visible')
				
				}

			}
		}else if (y===5){
			
					clearScreen();
					//$('#hero').css('left', '580px');
					alert('YOU HAVE VANQUISHED THE ENEMY SCOUT FORCES! YOUR ARMY HAS ARRIVED TO REINFORCE THE CHOKE POINT BEFORE THE GOBLIN ARMY. PURCHASE EXPANTION PACK FOR NEW SPELLS AND ENEMIES!');
					$('button').css('visibility', 'visible')
				
		}
}

function clearScreen () {
	clearInterval(interval);
	clearInterval(enemiesInterval);
	clearInterval(roundTimerInterval);
	for (let foes = 0; foes < enemies.length;) {
		enemies.pop();
	}
	for (let frost = 0; frost < frostbolts.length;) {
    	frostbolts.pop();}
    i = 20;
    y = 1;

}

function spawnNewEnemy () {
	enemies.push(
	{
		top: 100,
		left: 12 + Math.floor(Math.random() * 1200)
	});
	//console.log("New enemy added");
}



//create frostbolts images based on position of spellcaster
function drawFrostbolts() {

	document.getElementById('frostbolts').innerHTML = ""; //clear it out
	for (var frostbolt = 0; frostbolt < frostbolts.length; frostbolt = frostbolt + 1) { 
        //set up loop to create frostbolts
		document.getElementById('frostbolts').innerHTML += 
		`<div class='frostbolt' style='left:${frostbolts[frostbolt].left - 6}px; top:${frostbolts[frostbolt].top -20}px'></div>`;
	}

}

function moveFrostbolts() {
	for (let frostbolt = 0; frostbolt < frostbolts.length; frostbolt = frostbolt + 1)
	{
		frostbolts[frostbolt].top = frostbolts[frostbolt].top - 5
		if (frostbolts[frostbolt].top < 97) {
			frostbolts.splice(frostbolt, 1);
		}
	}
}

function collisionDet() {		//for loop in a for loop
	for (let enemy = 0; enemy < enemies.length; enemy++){
		for (let frostbolt = 0; frostbolt < frostbolts.length; frostbolt++){
			if (
				(frostbolts[frostbolt].top <= enemies[enemy].top + 50) &&	 
				(frostbolts[frostbolt].top >= enemies[enemy].top - 20) &&
				(frostbolts[frostbolt].left >= enemies[enemy].left - 16) &&
				(frostbolts[frostbolt].left <= enemies[enemy].left + 50)

				){
				console.log('hit!');	
				enemies.splice(enemy, 1);
				// enemies--;
				frostbolts.splice(frostbolt, 1)	

				// frostbolts--;										//finesse the px
			}


		}

	}


}







