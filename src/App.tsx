import React, { useState, useEffect, Dispatch } from 'react';
import { useDispatch, connect } from 'react-redux'
import { getArgumentFromHash } from './utils';

import config from './config/config';
import './App.css';

import axios from 'axios';
import { useSelector } from 'react-redux';

import { tokenRefreshed, fetchSongs } from './redux/spotify/actions';
import { bindActionCreators } from 'redux';
import MoodSlider from './components/MoodSlider/MoodSlider';

const mapStateToProps = (state: any) => ({
  isTokenExpired: state.spotify.isTokenExpired,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      fetchSongs: () => fetchSongs(),
      tokenRefreshed: () => tokenRefreshed(),
    },
    dispatch
  );

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
{};

const App: React.FC<Props> = (props) => {

  const { isTokenExpired, fetchSongs } = props;

  const [token, setToken] = useState("");

  useEffect(() => {
    console.log("test");

    const localStoragedToken = localStorage.getItem("token");
    let _token: string = "";

    // check if there is token already in localstorage
    // and check if it isn't expired
    // if no - try to achieve this from url
    console.log(isTokenExpired, !localStoragedToken, localStoragedToken === "undefined");
    if (isTokenExpired || !localStoragedToken || localStoragedToken === "undefined") {

      const hash: any = getArgumentFromHash();
      window.location.hash = "";
      localStorage.setItem('token', hash.access_token || "");
    }
    _token = localStoragedToken!;
    console.log(_token);


    // if token is available
    if (_token) {
      axios.defaults.headers.common = { 'Authorization': `Bearer ${_token}` };
      // fetchSongs();
    }

    tokenRefreshed();
    setToken(_token);

  }, [isTokenExpired]);

  return (
    <main>
      {"token ex p + " + isTokenExpired + " token "}
      {/* <button onClick={() => dispatch({ type: 'moodify/TOKEN_EXPIRED' })}
      >expire token</button> */}
      <br />
      valency <br />
      <MoodSlider /><br />
      energy <br />
      <MoodSlider /><br />
      danceability <br />
      <MoodSlider />


      {token ?

        <span></span> :
        <a
          className="btn btn--loginApp-link"
          href={`${config.authEndpoint}?client_id=${config.clientId}&redirect_uri=${config.redirectUri}&scope=${config.scopes.join(
            "%20"
          )}&response_type=token&show_dialog=true`}
        >
          Login to Spotify
            </a>
      }

    </main>

  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
