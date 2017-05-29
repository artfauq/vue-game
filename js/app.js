new Vue({
    el: '#app',
    data: {
        gameRunning: false,
        playerLP: 100,
        opponentLP: 100,
        feedbacks: []
    },
    methods: {
        changeGameStatus: function() {
            this.gameRunning = !this.gameRunning;

            if (this.gameRunning) {
                this.playerLP = 100;
                this.opponentLP = 100;
                this.feedbacks = [];
            }
        },
        attack: function() {
            this.startRound(this.calculateDamage(1, 5), 0);
        },
        specialAttack: function() {
            this.startRound(this.calculateDamage(3, 8), 0);
        },
        heal: function() {
            this.startRound(0, this.calculateDamage(6, 3));
        },
        startRound: function(playerDP, playerHP) {
            var opponentDP = this.calculateDamage(1, 5);

            var newPlayerLP = this.playerLP - opponentDP + playerHP;
            if (newPlayerLP <= 0) {
                this.playerLP = 0;
                this.changeGameStatus();
                alert('You lost !');
            } else if (newPlayerLP > 100) {
                this.playerLP = 100;
            } else {
                this.playerLP = this.playerLP - opponentDP + playerHP;
            }

            var newOpponentLP = this.opponentLP - playerDP;
            if (newOpponentLP <= 0) {
                this.opponentLP = 0;
                this.changeGameStatus();
                alert('You won !');
            } else {
                this.opponentLP -= playerDP;
            }

            this.feedbacks.unshift({
                playerDP: playerDP,
                playerHP: playerHP,
                opponentDP: opponentDP,
            });
        },
        calculateDamage: function(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }
    }
});