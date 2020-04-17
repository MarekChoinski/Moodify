import React, { useState, useEffect } from 'react';
import logo from './logo.svg';

import config from './config/config';
import './App.css';

import axios from 'axios';





const hash: any = window.location.hash
  .substring(1)
  .split("&")
  .reduce((initial: any, item: any) => {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";

const App: React.FC = () => {

  const [token, setToken] = useState("");

  useEffect(() => {

    console.log(hash);


    let _token = hash.access_token;

    console.log("token", _token);


    if (_token) {


      axios.get("https://api.spotify.com/v1/me/player", { headers: { Authorization: "Bearer " + _token } }).then((response: any) => {
        console.log(response.data);
      })
        .catch((error) => {
          console.log('error 3 ' + error);
        });

      // fetch("https://randomuser.me/api/?format=json&results=10")
      //   .then(res => res.json())
      //   // .then(json => setContacts(json.results));
      //   .then(json => console.log(json.results));
    }
  }, []);

  return (
    <body>
      <main>
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
    </body>

  );
}

export default App;
