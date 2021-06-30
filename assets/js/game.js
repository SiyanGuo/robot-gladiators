var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 40;
var playerMoney = 10;

var enemyNames = ["Roberto", "Amy", "Trumble"];
var enemyHealth = 50;
var enemyAttack = 55;

// Game States (pseudocode)
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

//fight function (now with parameter for enemy's name)
var fight = function(enemyName) {
  // repeat and execute as long as the enemy-robot is alive
  while (enemyHealth > 0 && playerHealth > 0) {
    // Ask players to fight or skip
    var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "SKIP" || promptFight === "skip") {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?")

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + " has decided to skip this fight. Goodbye!");
        //subtract money from playerMoney for skipping
        playerMoney = playerMoney - 10;
        console.log("playerMoney", playerMoney);
        break;
      }
    }
    //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
    enemyHealth = enemyHealth - playerAttack;
    // Log a resulting message to the console so we know that it worked.
    console.log(
      playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + ' has died!');
      // leave while() loop since enemy is dead
      break;
    } else {
      window.alert(enemyName + ' still has ' + enemyHealth + ' health left!')
    };

    // Subtract the value of `enemyAttack` from the value of `playerHealth` and use that result to update the value in the `playerHealth` variable.
    playerHealth = playerHealth - enemyAttack;
    // Log a resulting message to the console so we know that it worked.
    console.log(
      enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining."
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + " has died!");
      // leave while() loop since player is dead
      break;
    } else {
      window.alert(playerName + " still has " + playerHealth + " health left.");
    }
  }

};

//function to start a new game
var startGame = function() {
  // reset player status
  playerHealth = 100;
  playerAttack = 40;
  playerMoney = 10;

//fight each enemy robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyNames.length; i++) {
    //if player is still alive, keep fighting
    if (playerHealth > 0) {
      //let player know what round they are in, remeber that arryas start at 0 so it needs to have 1 added to it
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
      var pickedEnemyName = enemyNames[i];
      enemyHealth = 50;
      fight(pickedEnemyName);
    } else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  };
  endGame();
};

//function to end the entire game
var endGame = function() {
window.alert("The game has now ended. Let's see how you did!");

// if player is still alive, player wins!
  if (playerHealth > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerMoney + ".");
  } else {
    window.alert("You've lost your robot in battle.");
  }
  // ask player if they'd like to play again
  var playAgainComfirm = window.confirm("Would you like to play again?");

  if (playAgainComfirm) {
    // restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
}

startGame();
