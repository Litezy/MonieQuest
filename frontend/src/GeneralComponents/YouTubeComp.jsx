import React from 'react'

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css';
import { LiteYoutubeEmbed } from 'react-lite-yt-embed';

const YouTubeComp = ({videoId,title}) => {
    return (
        <div className="youtube-embed">
          <LiteYoutubeEmbed
            id={videoId}
            title={title}
            poster="sddefault" // Options: 'default', 'hqdefault', 'mqdefault', 'sddefault', 'maxresdefault'
          />
        </div>
      );
}

export default YouTubeComp