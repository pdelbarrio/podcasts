/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { useContext } from "react";
import { PodcastContext } from "../../context/podcast.context";
import "./PodcastList.css";

export default function PodcastList({ podcasts }) {
  const { startNavigationLoading } = useContext(PodcastContext);

  if (!podcasts) {
    return <div>No data available</div>;
  }

  const handleStartNavigating = () => {
    startNavigationLoading();
  };

  return (
    <div className="container">
      {podcasts.map((entry) => {
        const name = entry["im:name"]?.label;
        const image = entry["im:image"]?.[2]?.label;
        const artist = entry["im:artist"]?.label;
        const podcastId = entry.id.attributes["im:id"];

        return (
          <Link
            className="podcastContainer"
            to={`/podcast/${podcastId}`}
            key={podcastId}
            onClick={handleStartNavigating}
          >
            <div className="podcastWrapper">
              <img className="podcastCover" src={image} alt={name} />
              <div className="podcastInfo">
                <p className="podcastName">{name}</p>
                <p className="podcastAuthor">Author: {artist}</p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
