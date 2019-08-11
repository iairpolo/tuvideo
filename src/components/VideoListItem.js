import React from 'react';
import he from 'he';
import './styles/VideoListItem.css';
import { Card, Image } from 'semantic-ui-react';

const VideoListItem = props => {
  const video = props.video.snippet;

  return (
    <Card>
      <Image src={video.thumbnails.medium.url} alt={he.decode(video.title)} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{he.decode(video.title)}</Card.Header>
        <Card.Description>{video.description}</Card.Description>
      </Card.Content>
    </Card>
  );
};

export default VideoListItem;
