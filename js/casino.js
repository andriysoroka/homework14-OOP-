function Casino(slots, money) {
	this.money = money;
	this.mashines = [];
	this.moneyInMashine = Math.floor(money / slots);
	this.moneyInFirstMashine = Math.round(this.moneyInMashine + (money - this.moneyInMashine * slots));
	for (let i = 0; i < slots - 1 ; i++) {
		this.mashines[i] = new SlotMachine(this.moneyInMashine);
	}
	this.getTotal = function() {
		var total = this.mashines.reduce(function(acc, cur) {
			return acc + cur.money;
		}, 0);
		return total;
	}
	this.getMashines = function() {
		console.log(this.mashines.length);
	}
	this.addNewMachine = function() {
		var newMashine = this.mashines.reduce(function(acc, cur) {
			return Math.max(acc, cur.money) / 2;
		}, 0);
		return  this.mashines.push(new SlotMachine(newMashine));
	}
	this.removeMashine = function(number) {
		var removeM = this.mashines[number-1].money;
		this.mashines.splice(number-1, 1);
		this.money += removeM;
	}
	this.takeMoney = function(takeMon) {
		if(this.getTotal() < takeMon) {
			return console.log("to much money, please try one more time with less amount");
		} else {
			this.mashines.sort(function(a, b) {
					return b.money - a.money;
				}),
				someMoney = takeMon;
			for(let i = 0; i < sorted.length; i++) {
					if (sorted[i].money < someMoney) {
						someMoney = takeMon - sorted[i].money;
						sorted[i].money = 0;
					} else if(sorted[i].money === takeMon) {
						sorted[i].money = 0;
						break;
					} else {
						sorted[i].money = sorted[i].money - someMoney;
						break;
					}
//				this.mashines = sorted;
				return this.mashines;
			}
		}
	}
	this.mashines.unshift(new SlotMachine(this.moneyInFirstMashine));
}

function SlotMachine(money) {
	this.money = money;
	this.getTotalMoney = function() {
		return this.money;
	}
	this.takeMoney = function(money) {
		if(money > this.money) {
			return console.log("to much money, please try one more time with less amount, or take money from casino");
		} else {
			this.money -= money;
			return this.money;
		}
	}
	this.putMoney = function(money) {
		this.money = money + this.money;
	}
	this.play = function(money) {
		this.playerMoney = money;
		if (this.playerMoney * 2 > this.money) {
			return console.log(`please put less money, or go to the next mashine`);
		} else {
			this.randomNumbers = [];
			this.randomNumbFirst = this.randomNumbers.push(Math.floor(Math.random() * 10));
			this.randomNumbSecond = this.randomNumbers.push(Math.floor(Math.random() * 10));
			this.randomNumbThird = this.randomNumbers.push(Math.floor(Math.random() * 10));
			if (this.randomNumbers[0] === this.randomNumbers[1] || 
				this.randomNumbers[1] === this.randomNumbers[2] || 
				this.randomNumbers[0] === this.randomNumbers[2]) {
					this.playerMoney *= 2;
					this.money -= this.playerMoney;
					return console.log(`Сongratulation! Your numbers is ${this.randomNumbers.join("")} and your prise is ${this.playerMoney}!`)
			} else if(this.randomNumbers.join("") === "777") {
				this.randomNumbers[0] -= 2;
				this.randomNumbers[1] -= 1;
				return console.log(`Your numbers is ${this.randomNumbers.join("")}, and your prise is 0`)
			} else if(this.randomNumbers[0] === this.randomNumbers[1] && this.randomNumbers[1] === this.randomNumbers[2]){
				this.playerMoney = this.money;
				this.money = 0;
				return console.log(`Сongratulation! Your numbers is ${this.randomNumbers.join("")} and your prise is ${this.playerMoney}!`);
			} else {
				this.money += this.playerMoney;
				return console.log(`Your numbers is ${this.randomNumbers.join("")}, and your prise is 0 ${this.money}`);
			}
		}
	}
}

var j = new Casino(6, 6000);
j.getMashines();
j.getTotal();
j.addNewMachine();
j.removeMashine(7);
j.takeMoney(100);
j.mashines[3].putMoney(200);
j.mashines[2].getTotalMoney(100);
j.mashines[4].play(50);
j.mashines[2].play(50);
j.mashines[3].play(50);

//module.exports = SlotMachine;
//module.exports = Casino;
