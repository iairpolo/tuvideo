import React from 'react';
import { Card } from 'semantic-ui-react';

import VideoListItem from './VideoListItem';

const VideoList = props => {
  const { error, videos, lastSearch, loading } = props;

  if (error) {
    console.log(error);
    return 'Error: algo ha fallado en la conexión con el servidor';
  } else if (videos.length === 0 && lastSearch !== '' && !loading) {
    return <h2>Nada encontrado</h2>;
  }
  return (
    <Card.Group centered>
      {videos.map(video => (
        <VideoListItem key={video.id.videoId} video={video} />
      ))}
    </Card.Group>
  );
};

export default VideoList;
