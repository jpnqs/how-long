

class BlossomMouth {

    constructor() {

        this.height = 40;

        this.html  = document.createElement('div');

        this.html.classList.add('blossom-mouth');
        
        // position absolute
        this.html.style.position = 'absolute';
        this.html.style.zIndex = 100;

        // add child elements mouth_oh.png and mouth_smile.png
        const mouthOh = document.createElement('img');
        mouthOh.src = 'assets/mouth_oh.png';
        // set height
        mouthOh.style.height = this.height + 'px';
        mouthOh.classList.add('mouth-oh');
        this.html.appendChild(mouthOh);
        
        this.mouthOh = mouthOh;

        const mouthSmile = document.createElement('img');
        mouthSmile.src = 'assets/mouth_smile.png';
        mouthSmile.classList.add('mouth-smile');
        // set height
        mouthSmile.style.height = this.height + 'px';
        this.html.appendChild(mouthSmile);
        
        this.mouthSmile = mouthSmile;

        this.setState('smile');

    }

    place(x, y) {
        this.html.style.left = x + 'px';
        this.html.style.top = y + 'px';
    }

    placeAtBlossom(blossom) {
        this.place(blossom.html.offsetLeft + 75, blossom.html.offsetTop + 115);
    }

    appendTo(parent) {
        parent.appendChild(this.html);
    }

    setState(state) {   
        this.mouthOh.style.display = state === 'oh' ? 'block' : 'none';
        this.mouthSmile.style.display = state === 'smile' ? 'block' : 'none';
    }


}