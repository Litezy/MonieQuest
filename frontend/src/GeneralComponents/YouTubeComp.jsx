import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { LiteYoutubeEmbed } from 'react-lite-yt-embed';

const YouTubeComp = ({ videoId }) => {

    const youtubeUrl = videoId;
    const videoID = youtubeUrl.split('v=')[1].split('&')[0];


    const embedUrl = `https://www.youtube.com/embed/${videoID}`;
    return (
        <div style={{ width: '95%', margin: '0 auto' }}>
        <iframe
          style={{ width: '100%', height: '350px' }}
          src={embedUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
}

export default YouTubeComp