
class Blossom {

    constructor() {

        this.html = document.createElement('div');

        this.html.classList.add('blossom');

        this._petalCount = 0;

        // position absolute
        this.html.style.position = 'absolute';

       this.html.style.zIndex = 99;

        this.height = 200;
        this.width = 200;
        
        this.totalDays = 0;

        // add blossom_face svg to the blossom
        const blossomFace = document.createElement('img');
        blossomFace.src = 'assets/blossom_face.svg';
        blossomFace.classList.add('blossom-face');
        this.html.appendChild(blossomFace);

        this.heightWidth(this.height, this.width);
        // place it in the center of the screen
        this.place(window.innerWidth / 2 - this.width / 2, window.innerHeight / 2 - this.height / 2);
        
        this.mouth = new BlossomMouth();

    }

    appendTo(parent) {
        parent.appendChild(this.html);
        this.mouth.placeAtBlossom(this);
        this.mouth.appendTo(parent);
    }

    onDetatchPetal() {  
        this._petalCount -= 1;

        this.updateDays();
        if (this._petalCount === 0) {
            this.confetti();
            //alert('Game Over!')
        }
    }

    confetti() {

        // activate sun
        document.getElementById('sun').style.display = 'block';

        const jsConfetti = new JSConfetti()

        jsConfetti.addConfetti({
            emojis: ['❤️', '💗', '💕', '💖'],
            emojiSize: 120,
            confettiRadius: 10,
            confettiNumber: 100,
        }).then(() => {
            jsConfetti.clearCanvas();
            document.getElementsByTagName('canvas')[0].remove();
        });

    }

    updateDays() {
        
        this.determineMouthState(this._petalCount);

        if (this._petalCount == 1) {
            document.getElementById('days').innerHTML = this._petalCount + ' Day left';
        }else {
            document.getElementById('days').innerHTML = this._petalCount + ' Days left';

        }
    }

    determineMouthState(days) {
        // calculate how many % is done this.totalDays = 100% days = x%
        const percentage = 100 - ( 100 / this.totalDays * days );
        // if percentage is less than 10% -> sad
        if (percentage < 10) {
            this.mouth.setDefaultState('sad');
        } else if (percentage < 30) {
            this.mouth.setDefaultState('neutral');
        } else if (percentage < 50) {
            this.mouth.setDefaultState('slightSmile');
        } else {
            this.mouth.setDefaultState('smile');
        }
    }

    place(x, y) {
        this.html.style.left = x + 'px';
        this.html.style.top = y + 'px';
    }

    createPetals(countTotal, countAvailable) {

        this.totalDays = countTotal;
        this._petalCount = countAvailable;

        this.updateDays();

        if (countAvailable === 0) {
            this.confetti();
            return;
        }

        // create countAvailable petals and place them circularly around the blossom
        // countTotal is used to calculate the space between each petal

        const angle = 360 / countTotal;
        const radius = this.height / 2 - 18;
        const petalSize = 150;

        for (let i = 0; i < countTotal; i++) {
            if (i >= countAvailable) continue;
            const petal = new Petal();
            petal.appendTo(document.body);
            petal.setRotation(i * angle + 90);
            // place has to be document absolute position
            // the anchor point is the bottom center of the pedal, 
            // and this anchor point is placed on the circle
            const x = this.html.offsetLeft + this.width  / 2 - petalSize / 2 + radius * Math.cos(angle * i * Math.PI / 180) + 38;
            const y = this.html.offsetTop + this.height - petalSize / 2 + radius * Math.sin(angle * i * Math.PI / 180) - 175;
            petal.place(x, y);


            petal._attachedToBlossom = true;
            game.gameObjects.push(petal);

        }
        
    }

    heightWidth(h, w) {
        this.html.style.height = h + 'px';
        this.html.style.width = w + 'px';
    }

}