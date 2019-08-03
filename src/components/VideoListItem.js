import React from 'react';

function VideoListItem(props) {
  const { video } = props;

  return (
    <div className="VideoListItem">
      <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title} />
      <h3>{video.snippet.title}</h3>
      <p>{video.snippet.description}</p>
    </div>
  );
}

export default VideoListItem;
