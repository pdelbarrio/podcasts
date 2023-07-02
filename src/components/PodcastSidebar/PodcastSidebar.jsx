/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import "./PodcastSidebar.css";
import { useContext, useEffect } from "react";
import { PodcastContext } from "../../context/podcast.context";

export default function PodcastSidebar({
  artwork,
  collectionName,
  artistName,
  podcastDescription,
  podcastId,
}) {
  const { startNavigationLoading, stopNavigationLoading } =
    useContext(PodcastContext);

  useEffect(() => {
    stopNavigationLoading();
  }, [stopNavigationLoading]);

  const handleStartNavigating = () => {
    startNavigationLoading();
  };

  return (
    <div className="podcastDetail-sidebar">
      <div>
        <Link
          className="podcastContainer"
          to={`/podcast/${podcastId}`}
          onClick={handleStartNavigating}
        >
          <img
            className="podcastDetail-cover"
            src={artwork}
            alt="Podcast Artwork"
          />
        </Link>
      </div>
      <Link to={`/podcast/${podcastId}`} className="linkPodcast">
        <p className="collectionName">{collectionName}</p>
        <p className="artistName">by {artistName}</p>
      </Link>
      <div>
        <p className="descriptionTitle">Description: </p>
        <p className="description">{parse(podcastDescription)}</p>
      </div>
    </div>
  );
}
