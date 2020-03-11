import React, { Component } from 'react';
import Script from 'react-load-script';
import './App.css';


class SpPlayer extends Component {

  constructor(props) {
    super(props);
    this.handleLoadSuccess = this.handleLoadSuccess.bind(this);
    this.handleLoadFailure = this.handleLoadSuccess.bind(this);
    this.cb = this.cb.bind(this);
  }

  componentDidMount() {
    window.onSpotifyWebPlaybackSDKReady = () => {
      this.handleLoadSuccess();
    };
  }

  handleLoadSuccess() {
    this.setState({ scriptLoaded: true });
    console.log("Script loaded");
    const token = `${localStorage.getItem('spotify_access_token')}`;;
    const player = new window.Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); }
    });
    console.log("this is the playa data",player);

    localStorage.setItem('player', player)
    // Error handling
    player.addListener('initialization_error', ({ message }) => { console.error(message); });
    player.addListener('authentication_error', ({ message }) => { console.error(message); });
    player.addListener('account_error', ({ message }) => { console.error(message); });
    player.addListener('playback_error', ({ message }) => { console.error(message); });

    // Playback status updates
    player.addListener('player_state_changed', state => { console.log(state); });

    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect();

  }

  player = `${localStorage.getItem('player')}`

  seeIfItsThere() {
    console.log("Script loaded");
    const token = `${localStorage.getItem('spotify_access_token')}`;;
    const player = new window.Spotify.Player({
      name: 'Web Playback SDK Quick Start Player',
      getOAuthToken: cb => { cb(token); }
    });
    player.togglePlay() 
    console.log("YEP WE STILL playing?")
    // this is far as i got and now it does nothing
  }

  cb(token) {
    return(token);
  }

  handleScriptCreate() {
    this.setState({ scriptLoaded: false });
    console.log("Script created");
  }

  handleScriptError() {
    this.setState({ scriptError: true });
    console.log("Script error");
  }

  handleScriptLoad() {
    this.setState({ scriptLoaded: true});
    console.log("Script loaded");
  }
    // // On click pause 
    // document.getElementById("playpausebutton").onclick = () => {
    // player.nextTrack().then(() => {
    //   console.log('Skipped to next track!');
    // });
    // }
  


  imageClick = () => {
    console.log('Click!!!!');
  }
  // this is just to check that I can call it this way 

  render () {
    return (
      <React.Fragment>
        <Script
          url="https://sdk.scdn.co/spotify-player.js"
          onCreate={this.handleScriptCreate.bind(this)}
          onError={this.handleScriptError.bind(this)}
          onLoad={this.handleScriptLoad.bind(this)}
        />
        <div className="playpausebutton">
         <img ref={this.playpausebutton}
          src={require("../playpause.png")}
          style={{width: 40}}
          onClick={this.seeIfItsThere}/>
        </div>
      </React.Fragment>
    );
  }
}

export default SpPlayer;
