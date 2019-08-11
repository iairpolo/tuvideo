import React from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Container, Header, Form, Input, Button, Divider, Loader } from 'semantic-ui-react';
import './styles/App.css';
import YouTube from 'react-youtube';

import VideoList from './VideoList';

class App extends React.Component {
  state = {
    loading: false,
    error: null,
    searchValue: '',
    lastSearch: '',
    data: {
      videos: [],
      nextPageToken: '',
      resultsPerPage: 0,
      totalResults: 0
    }
  };

  fetchVideos = () => {
    const API_KEY = process.env.REACT_APP_YT_API_KEY;
    const API_URL = 'https://www.googleapis.com/youtube/v3/search?';
    const MAX_RESULTS = 20;

    this.setState({ loading: true, error: null });

    fetch(
      `${API_URL}part=snippet&q=${
        this.state.lastSearch
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
            resultsPerPage: this.state.data.resultsPerPage + MAX_RESULTS,
            totalResults: response.pageInfo.totalResults
          }
        })
      )
      .catch(error => {
        this.setState({ loading: false, error });
      });
  };

  handleChange = e => {
    this.setState({
      searchValue: e.target.value
    });
  };

  handleSubmit = async e => {
    e.preventDefault();
    e.target.searchInp.blur();
    // Obliga a detener el codigo hasta que termina de modificarse el state:
    await this.setState({
      lastSearch: this.state.searchValue,
      data: { videos: [], nextPageToken: '' }
    });
    this.fetchVideos();
  };

  render() {
    return (
      <React.Fragment>
        <Header textAlign="center">
          <Form onSubmit={this.handleSubmit}>
            <Input
              size="big"
              autoFocus
              placeholder="Búsqueda..."
              type="text"
              name="searchInp"
              onChange={this.handleChange}
              value={this.state.searchValue}
            />
            <Button size="big" primary className="searchBtn">
              Buscar
            </Button>
          </Form>
        </Header>
        <Divider />
        <main>
          <Container fluid>
            <VideoList videos={this.state.data.videos} error={this.state.error} />
          </Container>
          {!this.state.lastSearch && (
            <Container className="complement">
              {!this.state.lastSearch && <h1 className="firstTitle">¿Qué video quieres ver?</h1>}
            </Container>
          )}
          <Container textAlign="center" className="searchMore">
            {this.state.loading && (
              <Loader active inline="centered" size="large">
                Buscando...
              </Loader>
            )}
            {this.state.data.nextPageToken && (
              <Button size="big" primary onClick={this.fetchVideos}>
                Cargar más resultados
              </Button>
            )}
          </Container>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
