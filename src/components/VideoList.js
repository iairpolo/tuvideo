import React from 'react';

import VideoListItem from './VideoListItem';

class VideoList extends React.Component {
  render() {
    if (this.props.error) {
      console.log(this.props.error);
      return 'Error: algo ha fallado en la conexión con el servidor';
    } else if (!this.props.videos) {
      return 'Nada encontrado';
    }
    return (
      <div className="VideoList">
        {this.props.videos.map(video => (
          <VideoListItem key={video.id.videoId} video={video} />
        ))}
      </div>
    );
  }
}

export default VideoList;
