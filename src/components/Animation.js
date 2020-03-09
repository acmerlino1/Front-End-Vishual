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
    if (canvas !== undefined) {
      this.setState({
        canvas: canvas
      })
    }
    console.log('canvas', canvas)
    console.log('state canvas', this.state.canvas)
    const c = canvas.getContext('2d');
    c.fillStyle = 'grey';
    c.fillRect(0,0, canvas.width, canvas.height);
    var x = Math.random() * 200;
    var y = Math.random() * 200;
    for (var i = 0; i < 100; i++) {
      c.beginPath();
      c.arc(x, y, 30, 0, Math.PI * 2, false);
      c.strokeStyle = 'red'
      // c.strokeStyle = `rgba(${red}, ${green}, ${blue}, 0.8)`;
      c.stroke();
    }
    
  }

  render() {
    return (
      <div>
        <canvas width={window.innerWidth} height={window.innerHeight} ref={this.canvasRef} />
        {/* < Canvas canvas={this.state.canvas}/> */}
      </div>
    );
  }
}

export default Animation;