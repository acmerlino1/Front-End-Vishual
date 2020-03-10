import React, { Component } from 'react';
import './App.css';

class VisualizerInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  onTrackUpdated(track) {
    const spotifyURL = "https://api.spotify.com/v1/audio-features/"
    fetch(spotifyURL + track, {
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.props.oAuth
      }
    })
    .then(response => response.json())
    .then(response => {
      this.setState({
        track: track,
        visInfo: response,
      })
      console.log("SONG VIS RESPONCE INFOOO", response)
      sessionStorage.setItem("vis_info", response)
      
    })
    // console.log("VIS INFO ", console.log(JSON.stringify(sessionStorage.getItem("vis_info")))) 
    // console.log("SONG FEATURES INFOOO", sessionStorage.getItem('vis_info'))
  }

  componentDidMount() {
    this.onTrackUpdated(this.props.track);
  }

  render() {

    
    if (!this.state.visInfo) {
      return <div></div>
    }
    return (
    <div className="VisualizerInfo">
     <div>   
       <div>
        <div id="dropzone">
            <p>Drop an image</p>
              <canvas id="canvas"></canvas>
              <canvas id="_canvas"></canvas>
             <p id="N"><label>number of slices:</label><input type="range" value="16" min="6" max="70" autocomplete="off" step="2"/>
              <span>16</span>
            </p>
         </div>  


        <img src={ this.state.nowPlaying.image} style={{ width: 200}} />
      </div>
     </div>
    </div>
    )
  }
}



export default VisualizerInfo;
