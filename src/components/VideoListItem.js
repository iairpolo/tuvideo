import React from 'react';
import he from 'he';

class VideoListItem extends React.Component {
  render() {
    return (
      <div className="VideoListItem">
        <img
          src={this.props.video.snippet.thumbnails.medium.url}
          alt={he.decode(this.props.video.snippet.title)}
        />
        <h3>{he.decode(this.props.video.snippet.title)}</h3>
        <p>{this.props.video.snippet.description}</p>
      </div>
    );
  }
}

export default VideoListItem;
