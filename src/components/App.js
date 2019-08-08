import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Header, Input, Button, Loader } from 'semantic-ui-react';
import './styles/App.css';
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
        <Header dividing textAlign="center">
          <form onSubmit={this.handleSubmit}>
            <Input
              focus
              action={{ color: 'blue', content: 'Buscar' }}
              placeholder="Búsqueda..."
              type="text"
              name="search"
              onChange={this.handleChange}
              value={this.state.searchValue}
            />
            {/* <Button primary>Buscar</Button> */}
          </form>
        </Header>

        <main>
          <VideoList videos={this.state.data.videos} error={this.state.error} />

          {this.state.loading && (
            <Loader active inline="centered" size="large">
              Buscando...
            </Loader>
          )}
          {this.state.data.nextPageToken && (
            <Button primary onClick={this.handleClick}>
              Cargar más resultados
            </Button>
          )}
        </main>
      </React.Fragment>
    );
  }
}

export default App;
