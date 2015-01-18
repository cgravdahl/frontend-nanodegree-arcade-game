/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine is available globally via the Engine variable and it also makes
 * the canvas' context (ctx) object globally available to make writing app.js
 * a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        requestAnimationFrame = win.requestAnimationFrame,
        cancelAnimationFrame = win.cancelAnimationFrame,
        myAni,
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        if(GFNC.paused === false && GFNC.winner === false){
            update(dt);
            render();
        }else if(GFNC.paused === true && GFNC.winner === true){

            reset();
            ctx.fillText("Winner! Please click to Continue", 10,100);
        }else if(GFNC.paused === true && GFNC.winner === false){
            reset();
            ctx.fillText("Game Over, Please click to Continue", 10,100);
        }
        

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */

        myAni = requestAnimationFrame(main); 
    }  
    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        ctx.globalAlpha = 1;
        lastTime = Date.now();
        main();
        
    }

    function gameMenu() {
        if(GFNC.paused === false){
            init();
        }else{
            ctx.font = "30px Arial";
            ctx.fillText("Please click to Continue", 10,100);
            this.addEventListener('click', function(){
            GFNC.paused = false;
            GFNC.winner = false;
            gameMenu();
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            },true)
            
        }
    }
    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        checkCollisions();
    }

    /* This is called by the update function  and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to  the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
             enemy.update(dt);
         });
         player.update(dt);
    }
    /* The check collision function that is called on each update to check if
     * the player or the enimies interact with each other using AADD. Then 
     * thows the paused variable to true, which is checked in the main()
     * each time the frame runs.
     */
    function checkCollisions(){
        var p1 = player.collision();
        var e1 = {};
        allEnemies.forEach(function(enemy){
            e1 = enemy.collision()
            if (p1.x < e1.x + e1.width &&
            p1.x + p1.width > e1.x &&
            p1.y < e1.y + e1.height&&
            p1.height + p1.y > e1.y){
            GFNC.paused = true;
        }
        });
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }
        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });
        player.render();
    }

    /* This function stops the animation for the game, sets a timeout
     * for clearing the canvas after a game stop. Resets the variables for 
     * winning and if the game is paused, resets the player and sets a click
     * event to restart the game and removes that click event.
     */
    function reset() {
        cancelAnimationFrame(myAni);
        var myTime = setTimeout(function(){ctx.clearRect(0, 0, canvas.width, canvas.height);},5000);
        this.addEventListener('click', function(){
        GFNC.paused = false;
        GFNC.winner = false;
        player.x = 202;
        player.y = 320;
        this.removeEventListener('click');
        clearTimeout(myTime);
        },true)
    }
    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(gameMenu);
    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);