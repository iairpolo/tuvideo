import React from 'react';
import YouTube from 'react-youtube';

import VideoList from './VideoList';

class App extends React.Component {
  state = {
    loading: false,
    error: null,
    data: []
  };

  handleSubmit = e => {
    e.preventDefault();

    const API_KEY = process.env.REACT_APP_YT_API_KEY;
    const API_URL = 'https://www.googleapis.com/youtube/v3/search?';
    const MAX_RESULTS = 20;

    this.setState({ loading: true, error: null });

    fetch(
      `${API_URL}part=snippet&q=${
        e.target.search.value
      }&maxResults=${MAX_RESULTS}&type=video&key=${API_KEY}`
    )
      .then(response => response.json())
      .then(response => this.setState({ loading: false, data: response.items }))
      .catch(error => {
        this.setState({ loading: false, error: error });
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="search" className="search" />
          <button>Buscar</button>
        </form>

        <VideoList videos={this.state.data} loading={this.state.loading} error={this.state.error} />
      </div>
    );
  }
}

export default App;
