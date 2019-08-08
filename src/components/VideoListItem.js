import React from 'react';
import he from 'he';

import { Card, Image } from 'semantic-ui-react';

class VideoListItem extends React.Component {
  render() {
    return (
      <Card>
        <Image
          src={this.props.video.snippet.thumbnails.medium.url}
          alt={he.decode(this.props.video.snippet.title)}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>{he.decode(this.props.video.snippet.title)}</Card.Header>
          <Card.Meta>{this.props.video.snippet.description}</Card.Meta>
        </Card.Content>
      </Card>
    );
  }
}

export default VideoListItem;
