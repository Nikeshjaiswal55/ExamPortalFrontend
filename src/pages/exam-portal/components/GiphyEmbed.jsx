import React from 'react';

function GiphyEmbed() {
  return (
    <>
      <div className="embed-responsive embed-responsive-16by9">
        <iframe
          src="https://giphy.com/embed/LESpNIDaNBUcRIPzng"
          className="embed-responsive-item"
          allowFullScreen
          title="Giphy Embed"
        ></iframe>
      </div>
    </>
  );
}

export default GiphyEmbed;
