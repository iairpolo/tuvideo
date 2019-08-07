import React from 'react';
import YouTube from 'react-youtube';

import VideoList from './VideoList';

class App extends React.Component {
  state = {
    loading: false,
    error: null,
    searchValue: '',
    data: {
      videos: [],
      nextPageToken: '',
      resultsPerPage: 0,
      totalResults: 0
    }
  };

  fetchVideos = e => {
    const API_KEY = process.env.REACT_APP_YT_API_KEY;
    const API_URL = 'https://www.googleapis.com/youtube/v3/search?';
    const MAX_RESULTS = 20;

    this.setState({ loading: true, error: null });

    fetch(
      `${API_URL}part=snippet&q=${
        this.state.searchValue
      }&maxResults=${MAX_RESULTS}&type=video&key=${API_KEY}${
        this.state.data.nextPageToken ? `&pageToken=${this.state.data.nextPageToken}` : ''
      }`
    )
      .then(response => response.json())
      .then(response =>
        this.setState({
          loading: false,
          data: {
            videos: [].concat(this.state.data.videos, response.items),
            nextPageToken: response.nextPageToken,
            resultsPerPage: this.state.resultsPerPage + response.pageInfo.resultsPerPage,
            totalResults: response.pageInfo.totalResults
          }
        })
      )
      .catch(error => {
        this.setState({ loading: false, error: error });
      });
  };

  handleChange = e => {
    this.setState({
      searchValue: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.fetchVideos(e);
  };

  handleClick = () => {
    this.fetchVideos();
  };

  render() {
    return (
      <React.Fragment>
        <header>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              name="search"
              className="search"
              onChange={this.handleChange}
              value={this.state.searchValue}
            />
            <button>Buscar</button>
          </form>
        </header>

        <main>
          <VideoList videos={this.state.data.videos} error={this.state.error} />

          {this.state.loading && <div className="Loading">Cargando...</div>}
          {this.state.data.nextPageToken && (
            <button className="btn" onClick={this.handleClick}>
              Cargar más resultados
            </button>
          )}
        </main>
      </React.Fragment>
    );
  }
}

export default App;
