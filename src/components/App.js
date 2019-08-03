import React from 'react';

class App extends React.Component {
  state = { data: [] };

  handleSubmit = e => {
    e.preventDefault();

    const API_KEY = process.env.REACT_APP_YT_API_KEY;
    const API_URL = 'https://www.googleapis.com/youtube/v3/search?';
    const MAX_RESULTS = 20;

    fetch(
      `${API_URL}part=snippet&q=${e.target.search.value}&maxResults=${MAX_RESULTS}&key=${API_KEY}`
    )
      .then(response => response.json())
      .then(response => this.setState({ data: response.items }))
      .catch(error => {
        let fetchError = new Error('Algo ha fallado en la conexión con el servidor');
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="search" className="search" />
          <button>Buscar</button>
        </form>
      </div>
    );
  }
}

export default App;
