if (document.getElementById('screen1')) {
  document.getElementById('screen1').onload = function() {
    this.parentElement.className += ' loaded';
  };
  // Init
  const container = document.getElementsByClassName('ot-demo');
  const inner = document.getElementsByClassName('phone-demo');

  let counter = 0;
  const updateRate = 10;
  const isTimeToUpdate = function() {
    return counter++ % updateRate === 0;
  };

  const update = function(event) {
    mouse.updatePosition(event);
    updateTransformStyle(
      (mouse.y / inner[0].offsetHeight / 2).toFixed(2),
      (mouse.x / inner[0].offsetWidth / 2).toFixed(2)
    );
  };

  const onMouseEnterHandler = function(event) {
    update(event);
  };
  const onMouseLeaveHandler = function() {
    inner.style = '';
  };
  const onMouseMoveHandler = function(event) {
    if (isTimeToUpdate()) {
      update(event);
    }
  };

  container[0].onmouseenter = onMouseEnterHandler;
  container[0].onmouseleave = onMouseLeaveHandler;
  container[0].onmousemove = onMouseMoveHandler;

  // Mouse
  const mouse = {
    _x: 0,
    _y: 0,
    x: 0,
    y: 0,
    updatePosition(event) {
      const e = event || window.event;
      this.x = e.clientX - this._x;
      this.y = (e.clientY - this._y) * -1;
    },
    setOrigin(e) {
      this._x = e.offsetLeft + Math.floor(e.offsetWidth / 2);
      this._y = e.offsetTop + Math.floor(e.offsetHeight / 2);
    },
    show() {
      return `(${this.x}, ${this.y})`;
    }
  };
  // Track the mouse position relative to the center of the container.
  mouse.setOrigin(container[0]);

  const updateTransformStyle = function(x, y) {
    console.log(`${x},${y}`);
    const style = `rotateX(${x}deg) rotateY(${y}deg) rotateZ(2deg)`;
    inner[0].style.transform = style;
    inner[0].style.webkitTransform = style;
    inner[0].style.mozTransform = style;
    inner[0].style.msTransform = style;
    inner[0].style.oTransform = style;
  };
}
