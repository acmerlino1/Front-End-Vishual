import React, { Component } from 'react';
import './App.css';

class Canvas extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.canvasRef = React.createRef();
  }

  componentDidUpdate() {
    const canvas = this.canvasRef.current;
    console.log('other canvas', canvas)
    const c = canvas.getContext('2d');
    const width = window.innerWidth;
    const height = window.innerHeight;
    //var x = Math.random() * window.innerWidth;
    console.log('width', window.innerWidth)
    console.log('height', height)
    //var y = Math.random() * window.innerHeight;
    var red = Math.random() * 255;
    var green = Math.random() * 255;
    var blue = Math.random() * 255;
    c.beginPath();
    c.arc(300, 200, 30, 0, Math.PI * 2, false);
    c.strokeStyle = 'red'
    // c.strokeStyle = `rgba(${red}, ${green}, ${blue}, 0.8)`;
    c.stroke();
  }

  render() {
    return (
      this.componentDidUpdate()
    )
  }
}

export default Canvas;