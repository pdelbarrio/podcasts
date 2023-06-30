import { useLocation } from "react-router-dom";
import PodcastSidebar from "../PodcastSidebar/PodcastSidebar";
import "./EpisodeDetail.css";

export default function EpisodeDetail() {
  let { state } = useLocation();
  console.log(state);
  const title = state.episode.title;
  const description = state.episode.description;
  const audio = state.episode.enclosureUrl;

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
        <p className="description">{description}</p>
        <audio controls="controls">
          <source src={audio} type="audio/ogg" />{" "}
        </audio>
      </div>
    </div>
  );
}
