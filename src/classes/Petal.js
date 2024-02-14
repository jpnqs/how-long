
class Petal {

  constructor() {

    this.html = document.createElement('div');

    this.html.classList.add('petal');

    this._isDragging = false;
    this._flySpeed = 2;

    this._plopSound = new SoundClip('assets/plop.mp3');

    // add a bit of randomness to _swayIntensity
    this._swayIntensity = 20;
    this._swayIntensity += Math.random() * 10;
    this._attachedToBlossom = true;
    this._dragPosition = {x: 0, y: 0};
    this._currentRotation = 0;
    this._wasClicked = false;

    this.html.style.zIndex = 80;
    // set transform anchor to the bottom center 
    this.html.style.transformOrigin = 'center bottom';

    this._initEvents();
    
  }

  place(x, y) {
    this.html.style.left = x + 'px';
    this.html.style.top = y + 'px';
  }

  setRotation(deg) {
    this._currentRotation = deg;
    this.html.style.transform = 'rotate(' + deg + 'deg)';
  }

  appendTo(parent) {
    parent.appendChild(this.html);
  }

  _initEvents() {
    // initiate event handlers for touch and mouse drag and drop events
    this.html.addEventListener('touchstart', this._onDragStart.bind(this));
    this.html.addEventListener('touchend', this._onDragEnd.bind(this));
    this.html.addEventListener('touchmove', this._onDragging.bind(this));
    // on mouse out -> drag end
    this.html.addEventListener('mouseout', this._onDragEnd.bind(this));

    this.html.addEventListener('mousedown', this._onDragStart.bind(this));
    this.html.addEventListener('mouseup', this._onDragEnd.bind(this));
    this.html.addEventListener('mousemove', this._onDragging.bind(this));
    // on touch out -> drag end
    this.html.addEventListener('touchcancel', this._onDragEnd.bind(this));

  }

  _onDragStart(event) {
    this._isDragging = true;
    // get drag position for the element
    if (event instanceof TouchEvent) {
        event = event.touches[0];
    } 

    // drag position is the center of the element at the start of the drag
    // it
    this._dragPosition = {
        x: this.html.offsetWidth / 2,
        y: this.html.offsetHeight / 2
    };



    // var dragPosX = event.clientX - this.html.getBoundingClientRect().left;
    // var dragPosY = event.clientY - this.html.getBoundingClientRect().top;

    // // adjsut drag position relative to the rotation of the element this._currentRotation
    // var x = dragPosX * Math.cos(this._currentRotation * Math.PI / 180) - dragPosY * Math.sin(this._currentRotation * Math.PI / 180);
    // var y = dragPosX * Math.sin(this._currentRotation * Math.PI / 180) + dragPosY * Math.cos(this._currentRotation * Math.PI / 180);

    

    // this._dragPosition = {
    //     x: x,//dragPosX,
    //     y: yzzdragPosY
    // };

    blossom.mouth.setState('oh');
    this._plopSound.play();
    setTimeout(() => {
      if (blossom.mouth.defaultState !== 'smile') {
        blossom.mouth.setState('slightSmile');
        setTimeout(() => {
          blossom.mouth.backToDefaultState();
        }, 750);
      }

    }, 500)
    console.log('drag start');
  }

  _onDragEnd(event) {
    this._isDragging = false;
    console.log('drag end');
    if (!this._wasClicked) {
      return;
    }

    if (this._attachedToBlossom) {
      blossom.onDetatchPetal();
    }

    this._attachedToBlossom = false;
    // set z index so it goes over the blossom
    this.html.style.zIndex = 100;
  }

  _onDragging(event) {
    if (!this._isDragging) {
      return;
    }

    this.html.style.zIndex = 100;

    if (event instanceof TouchEvent) {
        event = event.touches[0];
    }
    // set position to the current cursor position
    // also take into account the drag position
    this.html.style.left = event.clientX - this._dragPosition.x + 'px';
    this.html.style.top = event.clientY - this._dragPosition.y + 'px';
    this._wasClicked = true;
    console.log('dragging');

  }

  update() {
    // if petal is not attached to the blossom and not dragged anymore, it should fly to the nearest border
    // this method is called sequencely by the Game class 30 times per second
    if (!this._isDragging && !this._attachedToBlossom) {
      this._fall();
    } else {
      this._idle();
    }
  }

  _idle() {
    // idle animation
    // light swaying rotation
    // addecuate to the current position
    // do this formula Math.sin(Date.now() / 1000) * 10 but also add the current rotation
    
    this.html.style.transform = 'rotate(' + (Math.sin(Date.now() / 1000) * 10 + this._currentRotation) + 'deg)';
  }

  _fall() {
    // fall slowly to the bottom in a sinus pattern left / right swaying
    let x = parseFloat(this.html.style.left);
    let y = parseFloat(this.html.style.top);
    this.setRotation(90);
    y += this._flySpeed;
    // bit random flaying left / right
    x += Math.sin(y / this._swayIntensity) * 2;
    // also add sway rotation
    this.html.style.transform = 'rotate(' + Math.sin(y / this._swayIntensity) * 10 + 'deg)';

    this.html.style.left = x + 'px';
    this.html.style.top = y + 'px';

    // if petal is out of the screen, remove it
    if (y > window.innerHeight) {
      this.html.remove();
    }

  }

}