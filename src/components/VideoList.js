import React from 'react';
import { Card } from 'semantic-ui-react';

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
      <Card.Group itemsPerRow={4}>
        {this.props.videos.map(video => (
          <VideoListItem key={video.id.videoId} video={video} />
        ))}
      </Card.Group>
    );
  }
}

export default VideoList;
