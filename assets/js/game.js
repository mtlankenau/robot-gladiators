// fight function (now with parameter for enemy's name)
var fight = function(enemy) {
    console.log(enemy);
    // repeat and execute as long as the enemy-robot is alive
    while(playerInfo.health > 0 && enemy.health > 0) {
        //Ask player whether or not they want to fight
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

        // if a player choses to skip, confirm and then stop the loop
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true), leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has chosen to skip the fight...at a cost!");
                //subtract money from playerMoney for skipping
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                // Log a resulting message to the console so we know that it worked
                console.log("playerMoney", playerInfo.money);
                break;
            }
        }

        // generate random damage value to deduct from enemyHealth based on playerAttack
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);

        enemy.health = Math.max(0, enemy.health - damage);
        
        // Log a resulting message to the console so we know that it worked
        console.log(
            playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
        );

        // check enemy's health. if health is zero or less, exit from the fight loop
        if (enemy.health <= 0) {
            window.alert(enemy.name + " has died!");
            // award player money for winning
            playerInfo.money = playerInfo.money + 20;
            // leave while() loop since enemy is dead
            break;
        }   else {
            window.alert(enemy.name + " still has " + enemy.health + " health left.");
        }

        // generate random damage value to deduct from playerHealth based on enemyAttack
        var damage = randomNumber(enemy.attack - 3, enemy.attack);

        playerInfo.health = Math.max(0, playerInfo.health - damage);

        // Log a resulting message to the console so we know that it worked
        console.log(
            enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        )

        // check player's health. if health is zero or less, exit from the fight loop
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            // leave while() loop if player has died
            break;
        }   else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};

// function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

// playerInfo object defined
var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 100,
    money: 10,
    reset: function() {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function() {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    },
    upgradeAttack: function() {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.")
            this.attack += 6;
            this.money -= 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
    }
};

// enemyInfo array defined
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

// function to start a new game
var startGame = function() {
    //reset player stats
    playerInfo.reset();

    // for loop begins: fight each enemy robot by looping over them and fighting them one at a time
    for(var i = 0; i < enemyInfo.length; i++) {
        // if player is still alive, keep fighting
        if (playerInfo.health > 0) {
            // let player know what round they are in, remember that arrays start at 0 so it needs to have a 1 added to it
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) + " commencing! Good luck!");
    
            //pick new enemy to fight based on the index of the enemyNames array
            var pickedEnemyObj = enemyInfo[i];
    
            // reset enemyHealth before starting a new fight/round
            pickedEnemyObj.health = randomNumber(40, 60);
    
            //pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
            fight(pickedEnemyObj);

            // if we're not at the last enemy in the array
            if (playerInfo.health > 0 && i < enemyInfo.length -1) {
                // ask if player wants to use the store before the next round
                var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

                // if yes, take them to the store() function
                if (storeConfirm) {
                    shop();
                }
            }
        }
        // if playerHealth drops to 0 or below, alert player that the game is over
        else {
            window.alert("You have lost your robot in battle! Game over!");
            // and exit from the fight loop
            break;
        }
    }

    // after the loop ends, player is either out of health or enemies to fight, so run the endGame function
    endGame();
};

//function to end the entire game
var endGame = function() {
    window.alert("The game has now ended. Let's see how you did!");

    // if player is still alive, player wins!
    if (playerInfo.health > 0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    // if player is no longer alive,
    else {
        window.alert("You've lost your robot in battle.");
    }

    // ask player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?");

    if (playAgainConfirm) {
        // restart the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
};

// go to shop between battles function
var shop = function() {
    // ask player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice."
    );

    // use switch to carry out action
    switch (shopOptionPrompt) {

        // if REFILL or refill are entered,
        case "REFILL":
        case "refill":
            playerInfo.refillHealth();
            break;
        
        // if UPGRADE or upgrade are entered,
        case "UPGRADE":
        case "upgrade":
            playerInfo.upgradeAttack();
            break;

        // if LEAVE or leave are entered,
        case "LEAVE":
        case "leave":
            window.alert("Leaving the store.");
            console.log(playerInfo.name + " chose 'LEAVE' and still has " + playerInfo.attack + " maximum attack, " + playerInfo.health + " health, and " + playerInfo.money + " money remaining.");

            // do nothing, so function will end
            break;

        // if none of the previous options are entered,
        default:
            window.alert("You did not pick a valid option. Try again.");

            // call shop() again to force player to pick a valid option
            shop();
            break;
    }
};


// start the game when the page loads
startGame();
