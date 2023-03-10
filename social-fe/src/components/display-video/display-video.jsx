import React from "react";

import "./style.scss";

const DisplayVideo = ({ embedId }) => {
  const arrays = embedId.split("/");
  const id = arrays[arrays.length - 1];
  return (
    <div className="video-responsive">
      <iframe
        width="853"
        height="480"
        src={`https://www.youtube.com/embed/${id}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="Embedded youtube"
      />
    </div>
  );
};
export default DisplayVideo;
