function Sprite(e,t){this.x=e;this.y=t}function Enemy(e,t,n){this.sprite="images/enemy-bug.png";this.speed=n}function Player(e,t){this.x=e;this.y=t;this.sprite="images/char-boy.png"}function randNum(e,t){var n=Math.floor(Math.random()*(e-t+1)+t);return n}(function(){function r(e){if(e instanceof Array){e.forEach(function(e){i(e)})}else{i(e)}}function i(t){if(e[t]){return e[t]}else{var r=new Image;r.onload=function(){e[t]=r;if(o()){n.forEach(function(e){e()})}};e[t]=false;r.src=t}}function s(t){return e[t]}function o(){var t=true;for(var n in e){if(e.hasOwnProperty(n)&&!e[n]){t=false}}return t}function u(e){n.push(e)}var e={};var t=[];var n=[];window.Resources={load:r,get:s,onReady:u,isReady:o}})();var Engine=function(e){function l(){var e=Date.now(),t=(e-a)/1e3;if(GFNC.paused===false&&GFNC.winner===false){p(t);m()}else if(GFNC.paused===true&&GFNC.winner===true){y();i.fillText("Winner! Please click to Continue",10,100)}else if(GFNC.paused===true&&GFNC.winner===false){y();i.fillText("Game Over, Please click to Continue",10,100)}a=e;u=s(l)}function c(){i.globalAlpha=1;a=Date.now();l()}function h(){if(GFNC.paused===false){c()}else{i.font="30px Arial";i.fillText("Use your arrow keys to control",10,100);i.fillText("Please click to Continue",10,150);this.addEventListener("click",function(){GFNC.paused=false;GFNC.winner=false;h();i.clearRect(0,0,r.width,r.height)},true)}}function p(e){d(e);v()}function d(e){allEnemies.forEach(function(t){t.update(e)});player.update(e)}function v(){var e=player.collision();var t={};allEnemies.forEach(function(n){t=n.collision();if(e.x<t.x+t.width&&e.x+e.width>t.x&&e.y<t.y+t.height&&e.height+e.y>t.y){GFNC.paused=true}})}function m(){var e=["images/water-block.png","images/stone-block.png","images/stone-block.png","images/stone-block.png","images/grass-block.png","images/grass-block.png"],t=6,n=5,r,s;for(r=0;r<t;r++){for(s=0;s<n;s++){i.drawImage(Resources.get(e[r]),s*101,r*83)}}g()}function g(){allEnemies.forEach(function(e){e.render()});player.render()}function y(){o(u);var e=setTimeout(function(){i.clearRect(0,0,r.width,r.height)},2e3);this.addEventListener("click",function(){GFNC.paused=false;GFNC.winner=false;player.x=202;player.y=320;this.removeEventListener("click");clearTimeout(e)},true)}var t=e.document,n=e.window,r=t.createElement("canvas"),i=r.getContext("2d"),s=n.requestAnimationFrame,o=n.cancelAnimationFrame,u,a,f=r.width/2;r.width=505;r.height=606;t.body.appendChild(r);Resources.load(["images/stone-block.png","images/water-block.png","images/grass-block.png","images/enemy-bug.png","images/char-boy.png"]);Resources.onReady(h);e.ctx=i}(this);var LVL=1,ROW=[45,140,220];Function.prototype.inheritsFrom=function(e){if(e.constructor==Function){this.prototype=new e;this.prototype.constructor=this;this.prototype.parent=e.prototype}else{this.prototype=e;this.prototype.constructor=this;this.prototype.parent=e}return this};Sprite.prototype.render=function(){ctx.drawImage(Resources.get(this.sprite),this.x,this.y)};Enemy.inheritsFrom(Sprite);Enemy.prototype.update=function(e){if(this.x<ctx.canvas.width){this.x+=this.speed*e}else{this.x=randNum(-100,-250);this.row=randNum(-1,3);this.y=ROW[this.row];this.speed=speed=50+randNum(50,150)}};Enemy.prototype.render=function(){this.parent.render.call(this)};Enemy.prototype.collision=function(){var e={x:this.x,y:this.y,width:50,height:70};return e};Player.inheritsFrom(Sprite);Player.prototype.update=function(e){if(this.y<=50){GFNC.winner=true;GFNC.paused=true;this.score+=10}};Player.prototype.render=function(){this.parent.render.call(this)};Player.prototype.handleInput=function(e){var t=83,n=103;if(e=="up"){this.y-=t}else if(e=="down"&&this.y<400){this.y+=t}else if(e=="left"&&this.x>=0){this.x-=n}else if(e=="right"&&this.x<400){this.x+=n}};Player.prototype.collision=function(){var e={x:this.x,y:this.y,width:80,height:50};return e};var allEnemies=[],maxEnemy=LVL+3;for(i=0;i<maxEnemy;i++){var x=randNum(0,250);var y=randNum(-1,3);var speed=50+randNum(0,150);allEnemies.push(new Enemy(x,y,speed))}var player=new Player(202,320);document.addEventListener("keyup",function(e){var t={37:"left",38:"up",39:"right",40:"down"};player.handleInput(t[e.keyCode])});var GFNC=function(e,t){this.paused=true;this.winner=false}