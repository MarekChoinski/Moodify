import React, { useState, useEffect, Dispatch } from 'react';
import { useDispatch, connect } from 'react-redux'
import { getArgumentFromHash } from './utils';

import config from './config/config';
import './App.css';

import axios from 'axios';
import { useSelector } from 'react-redux';

import { tokenRefreshed, getSongs } from './redux/spotify/actions';
import { bindActionCreators } from 'redux';

const mapStateToProps = (state: any) => ({
  isTokenExpired: state.spotify.isTokenExpired,
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators(
    {
      getSongs,
    },
    dispatch
  );

type Props = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps> &
{};

const App: React.FC<Props> = (props) => {

  const { isTokenExpired, getSongs } = props;

  const dispatch = useDispatch()

  const [token, setToken] = useState("");
  // const isTokenExpired = useSelector((state: any) => );

  useEffect(() => {

    const localStoragedToken = localStorage.getItem("token");
    let token: string = "";

    // check if there is token already in localstorage
    if (localStoragedToken && localStoragedToken !== "undefined") {
      token = localStoragedToken!;
    }
    // if no - try to achieve this from url
    else {
      const hash: any = getArgumentFromHash();
      window.location.hash = "";
      localStorage.setItem('token', hash.access_token || "");
    }

    // if token is available
    if (token) {
      console.log("jest token i powinno pobrac piosenki");

      dispatch(() => tokenRefreshed());
      axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
      dispatch(() => getSongs());
      //here dispatch get songs
    }
    setToken(token);

  }, [isTokenExpired]);

  return (
    <main>


      <button onClick={() => dispatch({ type: 'moodify/TOKEN_EXPIRED' })}
      >expire token</button>
      {token ?

        <span>{token}</span> :
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
