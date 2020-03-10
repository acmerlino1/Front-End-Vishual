import React, { Component } from "react";
import { Stage, Layer, Circle, Rect } from "react-konva";
import "./App.css";

class Visualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      circleArray: []
    };
  }

  componentDidMount() {
    this.setState({
      songInfo: this.props.songFeatures
    });
    for (var i = 0; i < 20; i++) {
      this.state.circleArray.push(
        new movingCircle(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight,
          (Math.random() - 0.5) * 9,
          (Math.random() - 0.5) * 9,
          Math.random() * 30 + 20,
          Math.random() * 255,
          Math.random() * 255,
          Math.random() * 255
        )
      );
    }

    setInterval(() => {
      let circleArray = this.state.circleArray;
      for (var i = 0; i < circleArray.length; i++) {
        let c = circleArray[i];
        c.update();
      }
      this.setState({
        circleArray: circleArray
      });
    }, 10);
  }

  render() {
    return (
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          zIndex: -1
        }}
      >
        <Layer>
          {this.state.circleArray.map(c => {
            const fill = `rgb(${c.r}, ${c.g}, ${c.b})`;
            return <Circle x={c.x} y={c.y} radius={c.radius} fill={fill} />;
          })}
        </Layer>
      </Stage>
    );
  }
}

export default Visualizer;

function movingCircle(x, y, dx, dy, radius, r, g, b) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.r = r;
  this.g = g;
  this.b = b;

  this.update = function() {
    if (this.x + this.radius > window.innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > window.innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;
  };
}
