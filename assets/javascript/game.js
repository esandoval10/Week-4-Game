function showGamePg() { 
    document.getElementById('startPg').style.display = "none";
    document.getElementById('gamePg').style.display = "block";
    game.startGame();
  } 

var game = {

    characters : [

        obiWan = {
            name : "Obi-Wan Kenobi",
            image: "assets/images/obiWan.png",
            healthPoints : 140,
            attackPower : 8,
            counterAttack : 15,
            identity : "obiWan",
            attackHold : 8,
        },
        
        lukeSky = {
            name : "Luke Skywalker",
            image: "assets/images/lukeSky.png",
            healthPoints : 130,
            attackPower : 10,
            counterAttack : 5,
            identity : "lukeSky",
            attackHold : 10,
        },
        
        darthMaul = {
            name : "Darth Maul",
            image: "assets/images/darthMaul.png",
            healthPoints : 180,
            attackPower : 4,
            counterAttack : 25,
            identity : "darthMaul",
            attackHold : 4,
        },
        
        darthSid = {
            name : "Darth Sid",
            image: "assets/images/darthSid.png",
            healthPoints : 150,
            attackPower : 6,
            counterAttack : 20,
            identity : "darthSid",
            attackHold : 6,
        },
        
    ],

    startGame : function(){

        for (var i = 0; i < game.characters.length; i++) {
            var charAdd = game.characters[i];
            game.fillChars(charAdd, 'selectFighter');
        }
    },

    fillChars : function(character, status){
        var charContainer = $("<div class='col-sm-3 characterContainer " + status + "' data-name ='" + character.identity + "'>");
        var charCard = $("<div class = 'card' >");
        var charName = $("<div class='card-header text-center'>").text(character.name);
        var charImage = $("<div class='card-body'>");
        var imgUrl = $("<img alt='image' class='img-fluid charImage' >").attr("src", character.image);
        var charHealth = $("<div class='card-footer text-center' >" ).text("HP: " + character.healthPoints);
        charImage.append(imgUrl);
        charContainer.append(charCard, charName, charImage, charHealth);
        $('#select').append(charContainer);
    },
   
    displayChar : function(displayHere, character){ 
        var oneCard = $(displayHere);
        oneCard.attr("data-name", character.identity);
        var oneName = $("<div class='card-header text-center'>").text(character.name);
        var oneImage = $("<div class='card-body'>");
        var oneUrl = $("<img alt='image' class='img-fluid charImage' >").attr("src", character.image);
        var oneHealth = $("<div class='card-footer text-center' >" ).text("HP: " + character.healthPoints);
        oneImage.append(oneUrl);
        oneCard.append(oneName, oneImage, oneHealth);
    },

    findName : function(selectedName){
        for(var i = 0; i < game.characters.length; i++){
            if (game.characters[i].identity === selectedName)
            return game.characters[i];
        }
        return null;
    },

    charRemover : function(charToRmv, updatedStatus){
        var hasRemoved = false;
        for(var i = 0; i < game.characters.length; i++){
            if (game.characters[i].identity === charToRmv.identity){
                game.characters.splice(i, 1);
            }
        }
        hasRemoved = true;
        if (hasRemoved === true && updatedStatus != "playerFighting"){
            $("#select").empty();
            for (var i = 0; i < game.characters.length; i++) {
                var charsMod = game.characters[i];
                game.fillChars(charsMod, updatedStatus);
            }
        }

        else if (hasRemoved === true && updatedStatus === "playerFighting"){
            $("#select").empty();
            for (var i = 0; i < game.characters.length; i++) {
                var charsMod = game.characters[i];
                game.fillChars(charsMod, updatedStatus);
            }
        }
    },

    battleSystem : function(player, enemy){
        player.healthPoints = player.healthPoints - enemy.counterAttack;
        enemy.healthPoints = enemy.healthPoints - player.attackPower;
        player.attackPower = player.attackPower + player.attackHold;
    },

    toggleAttack : function(){
        var addAttack = $("#button");
        addAttack.addClass("btn-danger");
        addAttack.text("Fight");
        addAttack.css("display", "block");
    },

    toggleRestart : function(){
        var addReset = $("#button");
        addReset.removeClass("btn-danger")
        addReset.addClass("btn-success");
        addReset.text("Restart");
        addReset.css("display", "block");

    },

    showMessage : function(message){
        var displayMessage = $("#message");
        if (message === "gameWon"){
            displayMessage.text("Congratulations You are the most Powerful Jedi alive");
        }
        else if (message === "gameOver"){
            displayMessage.text("GAME OVER: You have fallen to your strongest opponents");
        }

    }
}; 

var player = null;
var playerName = "";
var enemy = null;
var enemyName = "";
var gameStatus = "selectingPlayer";
var killCount = 0;

document.getElementById('startPg').style.display = "block";
document.getElementById('gamePg').style.display = "none";

$("#startBtnn").click(function(){
    document.getElementById('startPg').style.display = "none";
    document.getElementById('gamePg').style.display = "block";
game.startGame();
});


$(document).on('click', '.selectFighter', function() {
    playerName = $(this).data('name');
    console.log(playerName);

    if (player === null) {
        // game.player = game.findName(playerName);
        player = game.findName(playerName);
        console.log(player);
        game.displayChar('#player', player);

        game.charRemover(player, 'selectEnemy');

    } 
});

$(document).on('click', '.selectEnemy', function() {
    enemyName = $(this).data('name');
    console.log(enemyName);

    if (enemy === null) {
        // game.player = game.findName(playerName);
        enemy = game.findName(enemyName);
        console.log(enemy);
        game.displayChar('#enemy', enemy);

        game.charRemover(enemy, 'playerFighting');
        game.toggleAttack();

    } 
});

$(document).on('click', '.btn-danger', function() {
    if(enemy.healthPoints > 0 && player.healthPoints > 0){
        player.healthPoints = player.healthPoints - enemy.counterAttack;
        enemy.healthPoints = enemy.healthPoints - player.attackPower;
        player.attackPower = player.attackPower + player.attackHold;
        $("#player").empty();
        game.displayChar('#player', player);
        $("#enemy").empty();
        game.displayChar('#enemy', enemy);
    }
    else if(player.healthPoints > 0 && enemy.healthPoints <= 0){
            game.charRemover(enemy, 'selectEnemy');
            enemy = null;
            var removeBttn = $("#button");
            removeBttn.css("display", "none");
            $("#enemy").empty();
            killCount++;
            if (killCount >= 3) {
                game.showMessage('gameWon');
                game.toggleRestart();
            }
        }
    else if(enemy.healthPoints > 0 && player.healthPoints <= 0 ){
        game.showMessage('gameOver');
        game.toggleRestart();
    }
});

$(document).on('click', '.btn-success', function() {
    location.reload();
});