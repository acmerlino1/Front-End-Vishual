import React, { Component } from "react";
import Konva from "konva";
import { Stage, Layer, Circle, Rect } from "react-konva";
import "./App.css";

class Visualizer extends Component {
  constructor(props) {
    super(props);
    var circleArray = [];
    for (var i = 0; i < 20; i++) {
      circleArray.push(
        new movingCircle(
          i,
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight,
          (Math.random() - 0.5) * 50,
          (Math.random() - 0.5) * 50,
          Math.random() * 30 + 20,
          Math.random() * 255,
          Math.random() * 255,
          Math.random() * 255
        )
      );
    }
    this.state = {
      songInfo: this.props.songFeatures,
      circleArray: circleArray
    };

    this.circles = {};
  }

  componentDidMount() {
    this.applyCache();

    setInterval(() => {
      let circleArray = this.state.circleArray;
      for (var i = 0; i < circleArray.length; i++) {
        let c = circleArray[i];
        c.update();
      }
      this.setState({
        circleArray: circleArray
      });
    }, 50);
  }

  applyCache() {
    var values = Object.values(this.circles);
    for (var i = 0; i < values.length; i++) {
      var c = values[i];
      c.cache();
      c.getLayer().batchDraw();
    }
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
            return (
              <Circle
                filters={[Konva.Filters.Noise]}
                noise={1}
                x={c.x}
                y={c.y}
                radius={c.radius}
                fill={fill}
                ref={node => {
                  this.circles[c.id] = node;
                }}
              />
            );
          })}
        </Layer>
      </Stage>
    );
  }
}

export default Visualizer;

function movingCircle(id, x, y, dx, dy, radius, r, g, b) {
  this.id = id;
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
