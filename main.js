let start = document.querySelector(".play img");
let play = document.querySelector(".play");
let myInt;
let cockroach = new Audio("./audios/cockroach.m4a");
start.onclick = function() {
    play.style.cssText = "z-index: -5; opacity: 0";
    myInt = setInterval(() => {
        cockroach.play();
    });
}

let boat = {
    place: "right",
    carry: 0
};
let rightWall = ["grass", "sheep", "wolf"];
let moveSound =  new Audio("./audios/move.m4a");
let leftWall = [];
let passed = document.querySelector(".passed");
let move = function(button, item, itemString, itemImg, num1, num2, num3, num4) {
    button.onclick = function() {
        if ((item == boat.place || item == "carried") && (boat.carry == 0 || boat.carry == itemString)) {
            if (item == "right") {
                itemImg.style.cssText = "right: " + num1 + "%";
                rightWall.splice(rightWall.indexOf(itemString), 1);
                item = "carried";
                boat.carry = itemString;
                moveSound.play();
            }
            else if (item == "carried") {
                if (boat.place == "right") {
                    itemImg.style.cssText = "right: " + num2 + "%";
                    rightWall.push(itemString);
                    item = "right";
                    boat.carry = 0;
                    moveSound.play();
                }
                else if (boat.place == "left") {
                    itemImg.style.cssText = "right: " + num3 + "%";
                    leftWall.push(itemString);
                    item = "left";
                    boat.carry = 0;
                    if (leftWall.length == 3) {
                        passed.style.cssText = "z-index: 55; opacity: 1";
                        cockroach.pause();
                        clearInterval(myInt);
                        new Audio("./audios/passed.m4a").play();
                    }
                    else {
                        moveSound.play();
                    }
                }
            }
            else {
                itemImg.style.cssText = "right: " + num4 + "%";
                leftWall.splice(leftWall.indexOf(itemString), 1);
                item = "carried";
                boat.carry = itemString;
                moveSound.play();
            }
        }
    }
}

let grass = "right";
let grassMove = document.querySelector(".grass-move");
let grassImg = document.querySelector(".grass");
move(grassMove, grass, "grass", grassImg, 22, 12, 94.2, 59.8);

let sheep = "right";
let sheepMove = document.querySelector(".sheep-move");
let sheepImg = document.querySelector(".sheep");
move(sheepMove, sheep, "sheep", sheepImg, 22, 7.2, 89.5, 59.8);

let wolf = "right";
let wolfMove = document.querySelector(".wolf-move");
let wolfImg = document.querySelector(".wolf");
move(wolfMove, wolf, "wolf", wolfImg, 22, 0.7, 82.7, 59.8);

let boatMove = document.querySelector(".boat-go");
let boatImg = document.querySelector(".boat");
let faild = document.querySelector(".failed");
let wolfSound = new Audio("./audios/wolf.m4a");
let sheepSound = new Audio("./audios/sheep.m4a");
let boatSound = new Audio("./audios/go.m4a");
boatMove.onclick = function() {
    if (rightWall.length != 3 && boat.place != "sail") {
        if (boat.place == "right") {
            boatImg.style.cssText = "right: 55.5%";
            boat.place = "sail";
            switch(boat.carry) {
                case "grass":
                    grassImg.style.cssText = "right: 59.8%";
                    break;
                case "sheep":
                    sheepImg.style.cssText = "right: 59.8%";
                    break;
                case "wolf":
                    wolfImg.style.cssText = "right: 59.8%";
                    break;
            }
            if (rightWall.includes("sheep") && rightWall.includes("wolf")) {
                sheepImg.style.opacity = 0;
                faild.style.cssText = "z-index: 55; opacity: 1";
                cockroach.pause();
                clearInterval(myInt);
                wolfSound.play();
            }
            else if (rightWall.includes("grass") && rightWall.includes("sheep")) {
                grassImg.style.opacity = 0;
                faild.style.cssText = "z-index: 55; opacity: 1";
                cockroach.pause();
                clearInterval(myInt);
                sheepSound.play();
            }
            else {
                boatSound.play();
            }
            setTimeout(() => {
                boat.place = "left";
            }, 1000);
        }
        else if (boat.place == "left") {
            boatImg.style.cssText = "right: 17.8%";
            boat.place = "sail";
            switch(boat.carry) {
                case "grass":
                    grassImg.style.cssText = "right: 22%";
                    break;
                case "sheep":
                    sheepImg.style.cssText = "right: 22%";
                    break;
                case "wolf":
                    wolfImg.style.cssText = "right: 22%";
                    break;
            }
            if (leftWall.includes("sheep") && leftWall.includes("wolf")) {
                sheepImg.style.opacity = 0;
                faild.style.cssText = "z-index: 55; opacity: 1";
                cockroach.pause();
                clearInterval(myInt);
                wolfSound.play();
            }
            else if (leftWall.includes("grass") && leftWall.includes("sheep")) {
                grassImg.style.opacity = 0;
                faild.style.cssText = "z-index: 55; opacity: 1";
                cockroach.pause();
                clearInterval(myInt);
                sheepSound.play();
            }
            else {
                boatSound.play();
            }
            setTimeout(() => {
                boat.place = "right";
            }, 1000);
        }
    }
}

let reloads = document.querySelectorAll(".reload");
for (i = 0; i < 3; i++) {
    reloads[i].onclick = function() {
        location.reload();
    }
}