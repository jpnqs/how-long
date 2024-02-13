
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
            alert('Game Over!')
        }
    }

    updateDays() {
        
        if (this._petalCount == 1) {
            document.getElementById('days').innerHTML = this._petalCount + ' Day left';
        }else {
            document.getElementById('days').innerHTML = this._petalCount + ' Days left';

        }
    }

    place(x, y) {
        this.html.style.left = x + 'px';
        this.html.style.top = y + 'px';
    }

    createPetals(countTotal, countAvailable) {

        this._petalCount = countAvailable;

        this.updateDays();


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