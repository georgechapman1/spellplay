// function moveHero (e) {
// 	document.onkeydown = 

// }



//save imgaes into folder
//movement tends to the left
//round timers (each round enemies get tougher)
//reset hero, reset clocks


//record shots made in relation to shots hit - 3 points for a kill -1 point for a cast





let keys = [];

let allowshoot = true;

let hero = {
	top: 800,
	left: 500
};

let frostbolts = [];

let enemies = [];

//if button is clicked, disable button until game is over.
let gameToggle = null;

let interval = null;
let enemiesInterval = null;


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

let roundTimerInterval;

function setTimer(){
  	var i = 15;
  	var y = 1;

    roundTimerInterval = setInterval(function () {
        $("#timer").html('Timer: ' + i);
        $("#round").html('Round: ' + y);
        if (i < 0) {
        	alert('You have defeated the first wave. Get ready, The Goblin Commander has allocated new soldiers to overcome your!');
        	y++;
        	$("#round").html('Round: ' + y)
        	i = 15;
        	for (let foes = 0; foes < enemies.length;) {
				enemies.pop();}
			for (let frost = 0; frost < frostbolts.length;) {
    			frostbolts.pop();}
    			if (y === 2) {

    			}

        } else i--;
    }, 1000);
};



//let enemiesArray = [];

//a = keycode 65 d = keycode 68

checkKeys = () => {
	//console.log(e.keyCode);

	if (keys["ArrowLeft"])
	{	
		if (hero.left > 0) {
		//console.log('left');
		hero.left = hero.left - 10;
		moveHero();
	}
	}
	else if (keys["ArrowRight"])
	{	if (hero.left < 1150) {
		//console.log('right');
		hero.left = hero.left + 10;
		moveHero();
	}
	}
	else if (keys[" "] && allowshoot)
	{
		//console.log('spellcast');
		frostbolts.push({
			left: hero.left + 15,
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

 	document.getElementById('enemies').innerHTML = "";
 	for (let i = 0; i < enemies.length; i++) {
		let ranDistance = Math.floor(Math.random() * 10) - 5; //random integer -5 to 5
		 enemies[i].left = enemies[i].left + ranDistance;  //randomize .left

		 enemies[i].top = enemies[i].top + 1;
		 if (enemies[i].top > 800) {enemies[i].top = -100;}  //pushes them to top so you can remove them
		 if (enemies[i].left < 0) {enemies[i].left = 0;}
		 if (enemies[i].left > 1150) {enemies[i].left = 1150;}
		 document.getElementById('enemies').innerHTML += 
		 `<div class='enemy' style='left:${enemies[i].left}px; top:${enemies[i].top}px'></div>`;

	}
	//remove all the enemies that are flagged for removal
	for (let i = 0; i < enemies.length; i++)
	{
		if (enemies[i].top === -100)
		{
			enemies.splice(i, 1);
			i--;
			clearScreen();
			alert('Game over. You have been overwhelmed!');
			$('button').css('visibility', 'visible')
			
			
			//document.getElementById('frostbolts').innerHTML = "";
		}
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

}

function spawnNewEnemy () {
	enemies.push(
	{
		top: 100,
		left: Math.floor(Math.random() * 1200)
	});
	//console.log("New enemy added");
}



//create frostbolts images based on position of spellcaster
function drawFrostbolts() {

	document.getElementById('frostbolts').innerHTML = ""; //clear it out
	for (var frostbolt = 0; frostbolt < frostbolts.length; frostbolt = frostbolt + 1) { 
        //set up loop to create frostbolts
		document.getElementById('frostbolts').innerHTML += 
		`<div class='frostbolt' style='left:${frostbolts[frostbolt].left}px; top:${frostbolts[frostbolt].top}px'></div>`;
	}

}

function moveFrostbolts() {
	for (let frostbolt = 0; frostbolt < frostbolts.length; frostbolt = frostbolt + 1)
	{
		frostbolts[frostbolt].top = frostbolts[frostbolt].top - 5
		if (frostbolts[frostbolt].top < 80) {
			frostbolts.splice(frostbolt, 1);
		}
	}
}

function collisionDet() {		//for loop in a for loop
	for (let enemy = 0; enemy < enemies.length; enemy++){
		for (let frostbolt = 0; frostbolt < frostbolts.length; frostbolt++){
			if (
				(frostbolts[frostbolt].top <= enemies[enemy].top + 50) &&	 
				(frostbolts[frostbolt].top >= enemies[enemy].top - 50) &&
				(frostbolts[frostbolt].left >= enemies[enemy].left - 50) &&
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







