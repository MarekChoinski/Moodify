import React, { useState, useEffect, Dispatch } from 'react';
import { useDispatch, connect } from 'react-redux'
import { getArgumentFromHash } from './utils';

import config from './config/config';
import './style.css';

import axios from 'axios';
import { useSelector } from 'react-redux';

import { tokenRefreshed, fetchSongs, playMoodSong } from './redux/spotify/actions';
import {
  setValency,
  setEnergy,
  setDanceability,
} from './redux/mood/actions';
import { bindActionCreators } from 'redux';
import MoodSlider from './components/MoodSlider';
import Player from './components/Player';


const mapStateToProps = (state: any) => ({
  isTokenExpired: state.spotify.isTokenExpired,
  actualSong: state.spotify.actualSong,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      tokenRefreshed: () => tokenRefreshed(),
      setValency: (value) => setValency(value),
      setEnergy: (value) => setEnergy(value),
      setDanceability: (value) => setDanceability(value),
      playMoodSong: () => playMoodSong(),
      fetchSongs: (playMoodSong) => fetchSongs(playMoodSong),
    },
    dispatch
  );

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
{};

const App: React.FC<Props> = (props) => {

  const {
    isTokenExpired,
    fetchSongs,
    setValency,
    setEnergy,
    setDanceability,
    playMoodSong,
    actualSong,
  } = props;

  const [token, setToken] = useState("");

  useEffect(() => {
    console.log("test");

    const localStoragedToken = localStorage.getItem("token");
    let _token: string = "";

    // check if there is token already in localstorage
    // and check if it isn't expired
    // if no - try to achieve this from url
    console.log(isTokenExpired, !localStoragedToken, localStoragedToken === "undefined");
    if (isTokenExpired || !localStoragedToken) {
      const hash: any = getArgumentFromHash();
      window.location.hash = "";
      localStorage.setItem('token', hash.access_token || "");
    }
    _token = localStorage.getItem("token") || "";
    console.log(_token);


    // if token is available
    if (_token) {
      axios.defaults.headers.common = { 'Authorization': `Bearer ${_token}` };
      fetchSongs(playMoodSong);
    }

    tokenRefreshed();
    setToken(_token);

  }, [isTokenExpired]);


  const handleValencyChange = React.useCallback((value: number) => {
    setValency(value);
    playMoodSong();
  }, [setValency, playMoodSong]);

  const handleEnergyChange = React.useCallback((value: number) => {
    setEnergy(value);
    playMoodSong();
  }, [setEnergy, playMoodSong]);

  const handleDanceabilityChange = React.useCallback((value: number) => {
    setDanceability(value);
    playMoodSong();
  }, [setDanceability, playMoodSong]);

  return (
    <main>
      {"token ex p + " + isTokenExpired + " token "}
      {/* <button onClick={() => dispatch({ type: 'moodify/TOKEN_EXPIRED' })}
      >expire token</button> */}





      {token ?

        (actualSong ?

          <Player
            title={actualSong.title}
            artist={actualSong.artist}
            albumCover={actualSong.albumCover}
            albumCoverColors={actualSong.colors}
          /> : <span></span>) :

        <a
          className="btn btn--loginApp-link"
          href={`${config.authEndpoint}?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=${config.scopes.join(
            "%20"
          )}&response_type=token&show_dialog=true`}
        >
          Login to Spotify
            </a>
      }

      <br />
      valency <br />
      <MoodSlider
        onReleased={handleValencyChange} /><br />
      energy <br />
      <MoodSlider
        onReleased={handleEnergyChange} /><br />
      danceability <br />
      <MoodSlider
        onReleased={handleDanceabilityChange} />

      <br />

    </main>

  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
