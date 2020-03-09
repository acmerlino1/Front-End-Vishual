import React, { Component } from 'react';
import './App.css';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    const canvas = this.canvasRef.current;
    const c = canvas.getContext('2d');
    const width = window.innerWidth;
    const height = window.innerHeight;
    var x = Math.random() * window.innerWidth;
    console.log('width', window.innerWidth)
    console.log('height', height)
    var y = Math.random() * window.innerHeight;
    var red = Math.random() * 255;
    var green = Math.random() * 255;
    var blue = Math.random() * 255;
    c.beginPath();
    c.arc(x, y, 30, 0, Math.PI * 2, false);
    c.strokeStyle = `rgba(${red}, ${green}, ${blue}, 0.8)`;
    c.stroke();
  }

  render() {
    return (
      <canvas width={window.innerWidth} height={window.innerHeight} ref={this.canvasRef} />
    )
  }
}

export default Canvas;