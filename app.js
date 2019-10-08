// function moveHero (e) {
// 	document.onkeydown = 

// }




var hero = {
	top: 700,
	left: 500
};

var frostbolts = [];

var enemies = [
	{top: 300, left:400},
	{top: 300, left:500}
	
];

//a = keycode 65 d = keycode 68

document.onkeydown = function(e) {
	//console.log(e.keyCode);

	if (e.keyCode === 65) {
		console.log('left');
		hero.left = hero.left - 10;
		moveHero();
	} 
	else if 
		(e.keyCode === 68) {
		console.log('right');
		hero.left = hero.left + 10;
		moveHero();
		}
	else if 
		(e.keyCode === 32) {
			console.log('spellcast');
			frostbolts.push({
				left: hero.left + 15,
				top: hero.top 
			})
			drawFrostbolts() 
		}
	

}

function moveHero() {

	document.getElementById('hero').style.left = hero.left + "px"
 
} moveHero();


function drawEnemies() {

	//document.getElementById('enemies').innerHTML = ""; //clear it out
	 //for (var enemy = 0; enemy < enemies.length; enemy = enemy + 1) { 
 //        //set up loop to create enemies that spawn at random .lefts (width 1200)
	let ranDistance = Math.floor(Math.random() * 1000);
	console.log(ranDistance);
	 var enemyDistance = enemies.left + ranDistance;
	 `<div class='enemy' style='left:${enemies[enemy].left + enemyDistance}px; top:${enemies[enemy].top}px'></div>`;
	 //console.log(enemyDistance + ' enemyDistance');
	 //make .left bigger than 0
	// document.getElementById('frostbolts').innerHTML += 
	// 	`<div class='enemy' style='left:${enemies[enemy].left}px; top:${enemies[enemy].top}px'></div>`;


	// 	document.getElementById('enemies').innerHTML += 
	// 	`<div class='enemy' style='left:${enemies[enemy].left}px; top:${enemies[enemy].top}px'></div>`;

	

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
	for (var frostbolt = 0; frostbolt < frostbolts.length; frostbolt = frostbolt + 1)
		frostbolts[frostbolt].top = frostbolts[frostbolt].top - 5
}


function gameLoop() {
	setTimeout(gameLoop, 100);
	moveFrostbolts();
	drawFrostbolts();
	drawEnemies();

} gameLoop();









