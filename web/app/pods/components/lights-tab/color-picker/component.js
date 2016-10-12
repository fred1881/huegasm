import Ember from 'ember';

const {
  Component,
  $
} = Ember;

export default Component.extend({
  classNames: ['color-picker'],
  rgb: null,
  canvas: null,
  canvasContext: null,
  pressingDown: false,

  mouseUp(){
    this.set('pressingDown', false);
  },

  mouseMove(event){
    if (this.get('pressingDown')) {
      this.mouseDown(event);
    }
  },

  mouseDown(event){
    let canvasOffset = $(this.get('canvas')).offset(),
      canvasX = Math.floor(event.pageX - canvasOffset.left),
      canvasY = Math.floor(event.pageY - canvasOffset.top);

    // get current pixel
    let imageData = this.get('canvasContext').getImageData(canvasX, canvasY, 1, 1),
      pixel = imageData.data;

    this.set('pressingDown', true);

    if (!(pixel[0] === 0 && pixel[1] === 0 && pixel[2] === 0)) {
      this.set('rgb', [pixel[0], pixel[1], pixel[2]]);
    }
  },

  // https://dzone.com/articles/creating-your-own-html5
  didInsertElement(){
    // handle color changes
    let canvas = $('#picker')[0],
      canvasContext = canvas.getContext('2d'),
      image = new Image();

    image.src = 'assets/images/colormap.png';
    image.onload = function () {
      canvasContext.drawImage(image, 0, 0, image.width, image.height); // draw the image on the canvas
    };

    this.setProperties({
      canvas: canvas,
      canvasContext: canvasContext
    });
  }
});
