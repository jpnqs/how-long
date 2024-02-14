

// enum for mouth states
const MouthState = {
    OH: 'oh',
    SMILE: 'smile',
    SAD: 'sad',
    NEUTRAL: 'neutral',
    SLIGHT_SMILE: 'slightSmile'
};



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

        // mouth_sad.png
        const mouthSad = document.createElement('img');
        mouthSad.src = 'assets/mouth_sad.png';
        mouthSad.classList.add('mouth-sad');
        // set height
        mouthSad.style.height = this.height + 'px';
        this.html.appendChild(mouthSad);

        this.mouthSad = mouthSad;

        // mouth_neutral.png
        const mouthNeutral = document.createElement('img');
        mouthNeutral.src = 'assets/mouth_neutral.png';
        mouthNeutral.classList.add('mouth-neutral');
        // set height
        mouthNeutral.style.height = this.height + 'px';
        this.html.appendChild(mouthNeutral);
        
        this.mouthNeutral = mouthNeutral;

        // mouth_slight_smile.png
        const mouthSlightSmile = document.createElement('img');
        mouthSlightSmile.src = 'assets/mouth_slight_smile.png';
        mouthSlightSmile.classList.add('mouth-slight-smile');
        // set height
        mouthSlightSmile.style.height = this.height + 'px';
        this.html.appendChild(mouthSlightSmile);

        this.mouthSlightSmile = mouthSlightSmile;


        this.defaultState = MouthState.SMILE;

        this.setState(this.defaultState);

    }

    setDefaultState(state) {
        this.defaultState = state;
        this.setState(state);
    }

    backToDefaultState() {
        this.setState(this.defaultState);
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
        this.mouthSad.style.display = state === 'sad' ? 'block' : 'none';
        this.mouthNeutral.style.display = state === 'neutral' ? 'block' : 'none';
        this.mouthSlightSmile.style.display = state === 'slightSmile' ? 'block' : 'none';


    }


}