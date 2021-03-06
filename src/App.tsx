import React, { useState, useEffect} from 'react';
import { connect } from 'react-redux'
import { getArgumentFromHash } from './utils';

import config from './config/config';
import './style.css';

import axios from 'axios';

import { tokenRefreshed, fetchSongs, playMoodSong } from './redux/spotify/actions';
import {
  setValency,
  setEnergy,
  setDanceability,
} from './redux/mood/actions';
import { bindActionCreators } from 'redux';
import MoodSlider from './components/MoodSlider/MoodSlider';
import Player from './components/Player';
import { Main, Logo, SpotifyButton, MoodLabel, PlayerMoodContainer, LoadingSongs } from './App.style';
import NoActivePlayerWarning from './components/NoActivePlayerWarning';


const mapStateToProps = (state: any) => ({
  isTokenExpired: state.spotify.isTokenExpired,
  isSpotifyPlayerActive: state.spotify.isSpotifyPlayerActive,
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
  ReturnType<typeof mapDispatchToProps>;

const App: React.FC<Props> = (props) => {

  const {
    isTokenExpired,
    isSpotifyPlayerActive,
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

  }, [isTokenExpired, fetchSongs, playMoodSong]);


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
    <Main
      color1={actualSong && actualSong.colors.Muted}
      color2={actualSong && actualSong.colors.DarkMuted}
    >
      <Logo
        color1={actualSong && actualSong.colors.Vibrant}
        color2={actualSong && actualSong.colors.DarkVibrant}
      >
        Moodify
      </Logo>

      {!isSpotifyPlayerActive && token &&
        <NoActivePlayerWarning
          onClick={() => playMoodSong()}
        />
      }

      {token ?

        (actualSong ?
          <PlayerMoodContainer blurred={!isSpotifyPlayerActive as boolean}>
            <Player
              title={actualSong.title}
              artist={actualSong.artist}
              albumCover={actualSong.albumCover}
            />
            <MoodLabel> How happy are you? </MoodLabel>
            <MoodSlider
              onReleased={handleValencyChange} />
            <MoodLabel> Are you full of energy? </MoodLabel>
            <MoodSlider
              onReleased={handleEnergyChange} />
            <MoodLabel> How about dance? </MoodLabel>
            <MoodSlider
              onReleased={handleDanceabilityChange} />

          </PlayerMoodContainer> :
          <LoadingSongs>Loading songs from your Spotify...</LoadingSongs>
        ) :

        <SpotifyButton
          className="btn btn--loginApp-link"
          href={`${config.authEndpoint}?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=${config.scopes.join(
            "%20"
          )}&response_type=token&show_dialog=true`}
        >
          Connect with Spotify
        </SpotifyButton >
      }

    </Main>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
