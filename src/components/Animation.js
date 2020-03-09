import React, { Component } from 'react';
import Canvas from './Canvas.js'
import './App.css';

class Animation extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    const canvas = this.canvasRef.current;
    this.setState({
      canvas: canvas
    })
    console.log('canvas', canvas)
    const c = canvas.getContext('2d');
    c.fillStyle = 'blue';
    c.fillRect(0,0, canvas.width, canvas.height);
  }

  render() {
    return (
      <div>
        <canvas width={window.innerWidth} height={window.innerHeight} ref={this.canvasRef} />
        < Canvas canvas={this.state.canvas}/>
      </div>
    );
  }
}

export default Animation;