import React, { Component } from 'react';
import './App.css';

import { Stage, Layer, Group, Circle } from 'react-konva';
import MarbleSprite from './monster-marble-sheet.jpeg';
import { range } from 'd3-array';
import { timer } from 'd3-timer';

const Marbles = {
  circle_1: { x; -222, y: -177, c: '#8664d5' },
  circle_2: { x; -222, y: -299, c: '#e47178' },
  circle_3: { x; -222, y: -420, c: '#5c96ac' },

  circle_4: { x; -400, y: -177, c: '#c8b405' },
  circle_5: { x; -400, y: -299, c: '#7d7e82' },
  circle_6: { x; -400, y: -420, c: '#fa9801' },

  circle_4: { x; -576, y: -177, c: '#98b42b' },
  circle_4: { x; -576, y: -299, c: '#b20717' },
  circle_4: { x; -576, y: -420, c: '#a88534' },
};


class Marble extends Component {
  onDragEnd() {
    const { x,y } = this.props,
         circle = this.refs.circle;

         this.props.onShoot({
           x: cicrle.attrs.x,
           y: cicrle.attrs.y,
           vx: (circle.attrs.x-x)/7,
           vy: (circle.attr.y-y)/7
         });
  }

  render() {
    const { x, y, sprite, type, draggable } = this.props;

    return (
      <Circle x={x} y={y} radius={MarbleR}
              fillPattersIamge={black}
              fillPatternOffSet={Marble[types]}
              fillPAtternScale={{ x: Marble*2/ 111, y:Marble*2/111}}
              shadowColour = {Marbles[type].c} 
              shadowBlur="15"
              shadowOpacity="1"
              draggable={draggable}
              onDragEnd={this.onDragEnd.bind(this)}
              ref="circle"
              />
      )
  }
}

class Collisions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sprite: null,
      marbles: this.initalPositions
    }
  }

  get initalPositions(){
    const {width, height } = this.props,
          center = width/2;

    let marbles = range(3,0,-1).map(y => {
      if (y===3) return [{x: center, y: 200,
                           vx: 0, vy: 0}];

      const left = center - y*(MarblesR+5),
            right = center + y*(MarbleR+5);

      return range(left, right, MarbleR*2+5).map(x => ({
        x: x,
        y: 200-y*(MarbleR*2+5),
        vx: 0,
        vy: 0
      }));

      marbles = marbles.concat({
        x: width/2,
        y: height-150,
        vx: 0,
        vy: 0
      })

      return marbles


    })
  }

  // constructor(props) {
  //   super(props)
  //   this.state = {
  //   }
  // }
  // onTrackUpdated(track) {
  //   const spotifyURL = "https://api.spotify.com/v1/audio-features/"
  //   fetch(spotifyURL + track, {
  //     headers: {
  //       "Accept": "application/json",
  //       "Content-Type": "application/json",
  //       "Authorization": "Bearer " + this.props.oAuth
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(response => {
  //     this.setState({
  //       track: track,
  //       visInfo: response,
  //     })
  //     console.log("SONG VIS RESPONCE INFOOO", response)
  //     sessionStorage.setItem("vis_info", response)
      
  //   })
  //   // console.log("VIS INFO ", console.log(JSON.stringify(sessionStorage.getItem("vis_info")))) 
  //   // console.log("SONG FEATURES INFOOO", sessionStorage.getItem('vis_info'))
  // }

  componentDidMount() {
    const sprite = new Image();
    sprite.src = MarbleSprite;

    sprite.onload = () => {
      this.setState({
        sprite: sprite
      });
       this.timer = timer(() => this.gameLoop)
      }
    };
   soot(newPos, i) {
     let marbles = this.state.marbles;

     marbles[i] = newPos;

     this.setState({
       marbles: marbles
     });
   }

   gameLoop() {
     const { width, height } = this.props;
     const moveMarble = ({x,y,vx,vy}) => ({
       x: x+vx,
       y: y+vy,
       vx: ((x+vx <MarbleR) ? -vx : (x+vx > widthMarbleR) ? -vx : vx)*.9
       vy: ((y+vy <MarbleR) ? -vy : (y+vy > height-MarbleR) ? -vy : vy)*.99
     });

     this.setState({
       marbles: this.state.marbles.map(moveMarble)
     });
   }
 }

  render() {

    const {sprite} = this.state,
          {width, height} = this.props,
          marbleTypes = Object.keys(Marbles);
    
    if (!sprite) {
      return <div></div>
    }
    return (
        <Stage width={width} height={height}>
           <Layer>
              <Group>
                {this.state.marbles.map(({x: x, y: y}, i) => (
                    <Marble x={x}
                            y={y}
                            type={marbleTypes[i%marbleTypes.length]}
                            sprite={sprite}
                            draggable="true"
                            onShoot={(newPos) => this.shoot(newPos, i)}
                            key={`marble-${i}`} />
                        ))}
                    </Group>
                </Layer>
            </Stage>
    )
  }
}



export default VisualizerInfo;
