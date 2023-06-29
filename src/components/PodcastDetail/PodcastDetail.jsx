import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { PodcastContext } from "../../context/podcast.context";
import "./PodcastDetail.css";

export default function PodcastDetail() {
  const [podcastInfo, setPodcastInfo] = useState({});
  const [podcastDescription, setPodcastDescription] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const { stopLoading } = useContext(PodcastContext);
  const { podcastId } = useParams();

  useEffect(() => {
    stopLoading();
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
        console.log(podcastData.feedUrl);

        const updatedPodcastInfo = {
          artworkUrl600: podcastData.artworkUrl600,
          collectionName: podcastData.collectionName,
          artistName: podcastData.artistName,
        };

        setPodcastInfo(updatedPodcastInfo);

        const corsAnywhereUrl = "https://cors-anywhere.herokuapp.com/";
        const urlXML = `${corsAnywhereUrl}${podcastData.feedUrl}`;

        fetch(urlXML)
          .then((response) => {
            if (response.ok) return response.text();
            throw new Error("Network response was not ok.");
          })
          .then((xmlContent) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlContent, "text/xml");

            const description = xmlDoc.querySelector("description").textContent;

            setPodcastDescription(description);
            console.log(xmlContent);

            const episodesList = Array.from(
              xmlDoc.querySelectorAll("item")
            ).map((item) => {
              const titleElement = item.querySelector("title");
              const pubDateElement = item.querySelector("pubDate");
              const durationElement = item.querySelector("itunes\\:duration");

              return {
                title: titleElement ? titleElement.textContent : "",
                pubDate: pubDateElement ? pubDateElement.textContent : "",
                duration: durationElement ? durationElement.textContent : "",
              };
            });
            setEpisodes(episodesList);
          })
          .catch((error) => {
            console.error("Error fetching XML content:", error);
          });
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
          <p className="descriptionTitle">Description: </p>
          <p className="description">{podcastDescription}</p>
        </div>
      </div>
      <div className="episodes">
        <div className="episodes">
          <h2>Number of Episodes: {episodes.length}</h2>
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              {episodes.map((episode) => (
                <tr key={episode.episode}>
                  <td>{episode.title}</td>
                  <td>{episode.pubDate}</td>
                  <td>{episode.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
