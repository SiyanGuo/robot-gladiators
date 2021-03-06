// Game States (pseudocode)
// "WIN" - Player robot has defeated all enemy-robots
//    * Fight all enemy-robots
//    * Defeat each enemy-robot
// "LOSE" - Player robot's health is zero or less

//function to generate a random numeric value
var randomNumber = function (min, max) {
  var value = Math.floor(Math.random() * (max - min + 1) + min);
  return value;
};

var fightOrSkip = function () {
  // Ask players to fight or skip
  var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
  // conditonal recursive function call 
  if (!promptFight) {
    window.alert("You need to provide a valid answer! Please try again.");
    return fightOrSkip();
  };
  promptFight = promptFight.toLowerCase();
  // if player picks "skip" confirm and then stop the loop
  if (promptFight === "skip") {
    // confirm player wants to skip
    var confirmSkip = window.confirm("Are you sure you'd like to quit?")

    // if yes (true), leave fight
    if (confirmSkip) {
      window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
      //subtract money from playerInfo.money for skipping
      playerInfo.money = Math.max(0, playerInfo.money - 10);
      console.log("playerInfo.money", playerInfo.money);
      //return true if player wants to leave
      return true;
    }
    return false;
  }
};

//fight function (now with parameter for enemy's name)
var fight = function (enemy) {

   // keep track of who goes first
  var isPlayerTurn = true;
  // randomly change turn order
  if ( Math.random() < 0.5) {
    isPlayerTurn = false;
  };

  // repeat and execute as long as the enemy-robot is alive
  while (enemy.health > 0 && playerInfo.health > 0) {

    if (isPlayerTurn) {
      if (fightOrSkip()) {
        break;
      };
      //Subtract the value of `playerInfo.attack` from the value of `enemy.health` and use that result to update the value in the `enemy.health` variable
      var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
      enemy.health = Math.max(0, enemy.health - damage);
      // Log a resulting message to the console so we know that it worked.
      console.log(
        playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining."
      );

      // check enemy's health
      if (enemy.health <= 0) {
        window.alert(enemy.name + ' has died!');
        //award player money for winning
        playerInfo.money = playerInfo.money + 20;
        // leave while() loop since enemy is dead
        break;
      } else {
        window.alert(enemy.name + ' still has ' + enemy.health + ' health left!')
      };

    } else {
      // Subtract the value of `enemy.attack` from the value of `playerInfo.health` and use that result to update the value in the `playerInfo.health` variable.
      var damage = randomNumber(enemy.attack - 3, enemy.attack);
      playerInfo.health = Math.max(0, playerInfo.health - damage);
      // Log a resulting message to the console so we know that it worked.
      console.log(
        enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
      );

      // check player's health
      if (playerInfo.health <= 0) {
        window.alert(playerInfo.name + " has died!");
        // leave while() loop since player is dead
        break;
      } else {
        window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
      }
  
    }
// switch turn order for next round
    isPlayerTurn = !isPlayerTurn;
  }
};

//function to start a new game
var startGame = function () {
  // reset player status
  playerInfo.reset();

  //fight each enemy robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyInfo.length; i++) {
    //if player is still alive, keep fighting
    if (playerInfo.health > 0) {
      //let player know what round they are in, remeber that arryas start at 0 so it needs to have 1 added to it
      window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
      //pick new enemy to fight based on the index of the enemyInfo array
      var pickedEnemyObj = enemyInfo[i];
      //set health for picked enemy
      pickedEnemyObj.health = randomNumber(40, 60);
      //pass the pickedEnemyObj object variable's value into the fight function, where it will assume the value of the enemy parameter
      fight(pickedEnemyObj);
      // if we're not at the last enenmy in the array
      if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
        //ask if player wants to use the store before next round
        var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");
        //if yes, take them to the shop() function
        if (storeConfirm) {
          shop();
        }
      }
    }  // if player is not alive, break out of the loop and let endGame function run
    else {
      window.alert("You have lost your robot in battle! Game Over!");
      break;
    }
  }
  // after loop ends, we are either out of player.health or enemies to fight, so run endGame
  endGame();
};

//function to end the entire game
var endGame = function () {
  window.alert("The game has now ended. Let's see how you did!");

  // if player is still alive, player wins!
  if (playerInfo.health > 0) {
    window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    //check localStorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highScore");
    if (highScore === null) {
      highScore = 0;
    }

    // if player has more money than the high score, player has new high score
    if (playerInfo.money > highScore){
      localStorage.setItem("highScore", playerInfo.money);
      localStorage.setItem("name", playerInfo.name);
      alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    } else {
      window.alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!")
    }

  } else {
    window.alert("You've lost your robot in battle.");
  };

  // ask player if they'd like to play again
  var playAgainComfirm = window.confirm("Would you like to play again?");

  if (playAgainComfirm) {
    // restart the game
    startGame();
  } else {
    window.alert("Thank you for playing Robot Gladiators! Come back soon!");
  }
};

//go to shop between battles function
var shop = function () {
  var shopOptionPrompt = window.prompt("Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one 1 for REFILL, 2 for UPGRADE, or 3 for LEAVE.")
  shopOptionPrompt = parseInt(shopOptionPrompt)

  //use switch case to caryy out action
  switch (shopOptionPrompt) {
    case 1:
      playerInfo.refillHealth();
      break;
    case 2:
      playerInfo.upgradeAttack();
      break;
    case 3:
      window.alert("Leaving the store.")
      break;
    default:
      window.alert("You did not pick a valid option. Try again.");
      shop();
      break;
  }
};

var getPlayerName = function () {
  var name = "";
  while (name === "" || name === null) {
    name = window.prompt("What is your robot's name?");
  }
  console.log("Your robot's name is " + name);
  return name;
};

var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 70,
  money: 100,
  reset: function () {
    this.health = 100;
    this.attack = 70;
    this.money = 100;
  },
  refillHealth: function () {
    if (this.money >= 7) {
      window.alert("Refilling player's health by 20 for 7 dollars.");
      this.health += 20;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  },
  upgradeAttack: function () {
    if (this.money >= 7) {
      window.alert("Upgrading player's attack by 6 for 7 dollars");
      this.attack += 6;
      this.money -= 7;
    } else {
      window.alert("You don't have enough money!");
    }
  }
};

// var enemy.names=["aa", "bb", "cc"];
var enemyInfo = [
  {
    name: "Roberto",
    attack: randomNumber(10, 14)
  },
  {
    name: "Amy",
    attack: randomNumber(10, 14)
  },
  {
    name: "Trumble",
    attack: randomNumber(10, 14)
  }
];

startGame();
