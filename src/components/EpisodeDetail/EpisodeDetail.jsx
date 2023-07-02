import { useLocation } from "react-router-dom";
import { useContext, useEffect } from "react";
import parse from "html-react-parser";
import PodcastSidebar from "../PodcastSidebar/PodcastSidebar";
import "./EpisodeDetail.css";
import { PodcastContext } from "../../context/podcast.context";

export default function EpisodeDetail() {
  const { stopNavigationLoading } = useContext(PodcastContext);
  let { state } = useLocation();
  console.log(state);
  const title = state.episode.title;
  const description = state.episode.description;
  const audio = state.episode.enclosureUrl;

  useEffect(() => {
    stopNavigationLoading();
  }, [stopNavigationLoading]);

  return (
    <div className="episode-container">
      <PodcastSidebar
        artwork={state.podcastArtwork}
        collectionName={state.podcastTitle}
        artistName={state.podcastAutor}
        podcastDescription={state.podcastDescription}
        podcastId={state.podcastId}
      />
      <div className="episode-wrapper">
        <p className="title">{title}</p>
        <p className="description">{parse(description)}</p>
        <audio controls="controls">
          <source src={audio} type="audio/ogg" />{" "}
        </audio>
      </div>
    </div>
  );
}
