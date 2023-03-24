let playButton = document.getElementById('play')
let resultDiv = document.getElementById('result')
let p1NameDiv = document.getElementById('p1Name')
let p2NameDiv = document.getElementById('p2Name')
let p1HealthDiv = document.getElementById('p1Health')
let p2HealthDiv = document.getElementById('p2Health')


updatename = (p1,p2,gameState) => {
    p1NameDiv.innerText=p1.name
    p2NameDiv.innerText=p2.name
    gameState = game.isOver
   
    

}

updategame = (pla,enemy,gameState) => {
    // console.log(pla.name)
    if(pla.name==player1.name){
        p1HealthDiv.innerText = pla.health
        p2HealthDiv.innerText = enemy.health
    }
    else if(pla.name==player2.name){
        // console.log(pla.health)
        p2HealthDiv.innerText = pla.health
        p1HealthDiv.innerText = enemy.health
    }

    if(p1.health <= 0 || p2.health <= 0){
        game.isOver = true
        gameState=game.isOver
        console.log(p1.name);
        resultDiv.innerText = game.declareWinner(pla,enemy)
    }
 
    

}




class player{
    
    constructor(health,name,attackDmg){
        this.health = health
        this.name = name
        this.attackDmg = attackDmg
    }
    
    strike(pla, enemy, attackDmg){
        // console.log(enemy.name)
        // console.log(pla.name)
        let damage = Math.ceil(Math.random()*attackDmg)
        // console.log(damage)
        if(enemy.health-damage<0){
            enemy.health = 0
        }
        else{
            enemy.health -=damage
        }
            // console.log(enemy.health)
        updategame(pla, enemy, game.isOver)
    }

    heal(pla , enemy){ 
       
        let heal = Math.ceil(Math.random()*10)
        if(pla.health+heal<100){
            pla.health += heal
        }
        else{
            pla.health = 100
        }
        console.log(pla.health);

        updategame(pla,enemy,game.isOver)
        
    }
}

class Game{
    constructor(){
        this.isOver = false
    }
    play(ply1,ply2){}

    checkIsOver(){

    }
    declareWinner(pla1,pla2){
        let msg
        if(pla1.health == 0){
            msg = `${pla2.name} Wins`
            return msg
        }
        else if(pla2.health == 0){
            msg = `${pla1.name} Wins`
            return msg 
            
        }     


        document.getElementById('victory').play()

    }
    reset(pl1,pl2){
        game.isOver = false
        pl1.health = 100
        pl2.health = 100
        p2HealthDiv.innerText = pl1.health
        p1HealthDiv.innerText = pl2.health
        resultDiv.innerText = ""
    }
}


let player1 = new player(100,"Koothi",10)
let player2 = new player(100,"Maji",10)

let game = new Game()

let p1 = player1
let p2 = player2

updatename(p1,p2,game.isOver)

// p1.strike(p1,p2,10)

let gameState



document.addEventListener('keydown' ,function(e){
    if (e.key == "q" && p2.health>0){
        player1.strike(player1, player2, player1.attackDmg)
        document.getElementById('p1attack').play()
    }
})

document.addEventListener('keydown' ,function(e){
    if (e.key == "w" && p1.health<100){
        player1.heal(player1 , player2)
        document.getElementById('p1heal').play()
    }
})

document.addEventListener('keydown' ,function(e){
    if (e.key == "o" && p1.health>0){
        player1.strike(player2, player1, player1.attackDmg)
        document.getElementById('p2attack').play()
    }
})

document.addEventListener('keydown' ,function(e){
    if (e.key == "p" && p2.health>100){
        player2.heal(player2 , player1)
        document.getElementById('p2heal').play()
    }
})

