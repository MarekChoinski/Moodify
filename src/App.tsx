import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { getArgumentFromHash } from './utils';

import config from './config/config';
import './App.css';

import axios from 'axios';
import { useSelector } from 'react-redux';

import { tokenRefreshed } from './redux/spotify/actions';

const App: React.FC = () => {

  const dispatch = useDispatch()

  const [token, setToken] = useState("");
  const isTokenExpired = useSelector((state: any) => state.spotify.tokenExpired);

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
      dispatch(() => tokenRefreshed());
      axios.defaults.headers.common = { 'Authorization': `Bearer ${token}` }
      //here dispatch get songs
    }
    setToken(token);

  }, [isTokenExpired]);

  return (
    <body>
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
    </body >

  );
}

export default App;
