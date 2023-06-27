import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./PodcastDetail.css";

export default function PodcastDetail() {
  const [podcastInfo, setPodcastInfo] = useState({});
  const { podcastId } = useParams();

  useEffect(() => {
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://itunes.apple.com/lookup?id=${podcastId}`
    )}`;

    fetch(url)
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        const parsedData = JSON.parse(data.contents);
        const podcastData = parsedData.results[0];
        console.log(parsedData);
        const updatedPodcastInfo = {
          artworkUrl600: podcastData.artworkUrl600,
          collectionName: podcastData.collectionName,
          artistName: podcastData.artistName,
          description: podcastData.description, // TODO:
        };

        setPodcastInfo(updatedPodcastInfo);
      })
      .catch((error) => {
        console.error("Error fetching podcast details:", error);
      });
  }, [podcastId]);

  return (
    <div className="podcastDetail-container">
      <div className="podcastDetail-sidebar">
        <div>
          <img
            className="podcastDetail-cover"
            src={podcastInfo.artworkUrl600}
            alt="Podcast Artwork"
          />
        </div>
        <div>
          <p className="collectionName">{podcastInfo.collectionName}</p>
          <p className="artistName">by {podcastInfo.artistName}</p>
        </div>
        <div>
          <p className="description">Description: {podcastInfo.description}</p>
        </div>
      </div>
      <div className="episodes"></div>
    </div>
  );
}
