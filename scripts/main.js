import { 
	SNAKE_SPEED,
	update as updateSnake,
	draw as drawSnake,
	snakeIntersection,
	getSnakeHead
} from "./snake.js";

import {
	outsideGrid
} from "./grid.js";

import {
	update as foodUpdate,
	draw as foodDraw
} from "./food.js";

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");


function main(currentTime){
	if(gameOver){
		if(confirm("You lost. Press Ok to restart")){
			window.location = "/";
		}
		return;
	}

	const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
	if(secondsSinceLastRender < 1 / SNAKE_SPEED){ return; }
	window.requestAnimationFrame(main);
	lastRenderTime = currentTime;

	update();
	draw();
}

window.requestAnimationFrame(main);

function update(){
	updateSnake();
	foodUpdate();
	checkFailure();
}

function draw() {
	gameBoard.innerHTML = "";
	drawSnake(gameBoard);
	foodDraw(gameBoard);
}

function checkFailure(){
	gameOver = 
		outsideGrid(getSnakeHead) || 
		snakeIntersection();
}