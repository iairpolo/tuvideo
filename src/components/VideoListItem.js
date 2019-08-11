import React from 'react';
import he from 'he';
import './styles/VideoListItem.css';
import { Card, Image, Modal } from 'semantic-ui-react';
import YouTube from 'react-youtube';

class VideoListItem extends React.Component {
  state = { open: false };

  handleOpen = () => this.setState({ open: true });
  handleClose = () => this.setState({ open: false });

  render() {
    const {
      video: {
        id: { videoId },
        snippet: video
      }
    } = this.props;
    const { open } = this.state;
    const opts = { width: '100%', playerVars: { autoplay: 1 } };

    return (
      <>
        <Card onClick={this.handleOpen}>
          <Image
            src={video.thumbnails.medium.url}
            alt={he.decode(video.title)}
            wrapped
            ui={false}
          />
          <Card.Content>
            <Card.Header>{he.decode(video.title)}</Card.Header>
            <Card.Description>{video.description}</Card.Description>
          </Card.Content>
        </Card>

        <Modal onClose={this.handleClose} open={open} closeIcon>
          <YouTube videoId={videoId} opts={opts} />
        </Modal>
      </>
    );
  }
}

export default VideoListItem;
