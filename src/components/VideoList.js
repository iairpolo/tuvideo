import React from 'react';
import { Card } from 'semantic-ui-react';

import VideoListItem from './VideoListItem';

const VideoList = props => {
  const { error, videos } = props;

  if (error) {
    console.log(error);
    return 'Error: algo ha fallado en la conexión con el servidor';
  } else if (!videos) {
    return 'Nada encontrado';
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
