import React, { Component } from 'react';
import Canvas from './Canvas.js'
import './App.css';

class Animation extends Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    const c = canvas.getContext('2d');
    c.fillRect(0,0, window.innerWidth, window.innerHeight);
  }

  render() {
    return (
      <div>
        <canvas ref={this.canvasRef}></canvas>
        < Canvas />
      </div>
    );
  }
}

export default AnimationEffect;