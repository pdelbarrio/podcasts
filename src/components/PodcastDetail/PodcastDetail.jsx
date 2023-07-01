import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { PodcastContext } from "../../context/podcast.context";
import { formatDate } from "../../utils/utils";
import "./PodcastDetail.css";
import PodcastSidebar from "../PodcastSidebar/PodcastSidebar";

export default function PodcastDetail() {
  const [podcastInfo, setPodcastInfo] = useState({});
  const [podcastDescription, setPodcastDescription] = useState("");
  const [podcastArtwork, setPodcastArtwork] = useState("");
  const [podcastTitle, setPodcastTitle] = useState("");
  const [podcastAutor, setPodcastAutor] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const { stopLoading } = useContext(PodcastContext);
  const { podcastId } = useParams();

  useEffect(() => {
    stopLoading();
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(
      `https://itunes.apple.com/lookup?id=${podcastId}`
    )}`;

    const lastFetchDate = localStorage.getItem(`lastFetchDate_${podcastId}`);
    const storedPodcastInfo = localStorage.getItem(`podcastInfo_${podcastId}`);
    const storedPodcastDescription = localStorage.getItem(
      `podcastDescription_${podcastId}`
    );
    const storedEpisodesList = localStorage.getItem(
      `episodesList_${podcastId}`
    );

    const currentDate = new Date().getTime();
    const oneDay = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

    async function fetchPodcastData() {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        const parsedData = JSON.parse(data.contents);
        const podcastData = parsedData.results[0];

        const updatedPodcastInfo = {
          cover: podcastData.artworkUrl600,
          collectionName: podcastData.collectionName,
          artistName: podcastData.artistName,
        };

        setPodcastInfo(updatedPodcastInfo);
        setPodcastArtwork(updatedPodcastInfo.cover);
        setPodcastTitle(updatedPodcastInfo.collectionName);
        setPodcastAutor(updatedPodcastInfo.artistName);

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

            const episodesList = Array.from(
              xmlDoc.querySelectorAll("item")
            ).map((item) => {
              const titleElement = item.querySelector("title");
              const pubDateElement = item.querySelector("pubDate");
              const durationElement = item.querySelector("itunes\\:duration");
              const descriptionElement = item.querySelector("description");
              const enclosureElement = item.querySelector("enclosure");

              const enclosureUrl = enclosureElement.getAttribute("url");

              return {
                title: titleElement ? titleElement.textContent : "",
                pubDate: pubDateElement ? pubDateElement.textContent : "",
                duration: durationElement ? durationElement.textContent : "",
                description: descriptionElement
                  ? descriptionElement.textContent
                  : "",
                enclosureUrl: enclosureUrl ? enclosureUrl : "",
              };
            });

            // Establecer los estados correspondientes
            setEpisodes(episodesList);

            // Almacenar los datos en localStorage
            localStorage.setItem(
              `podcastInfo_${podcastId}`,
              JSON.stringify(updatedPodcastInfo)
            );
            localStorage.setItem(
              `podcastDescription_${podcastId}`,
              description
            );
            localStorage.setItem(
              `episodesList_${podcastId}`,
              JSON.stringify(episodesList)
            );
            localStorage.setItem(
              `lastFetchDate_${podcastId}`,
              currentDate.toString()
            );
          })
          .catch((error) => {
            console.error("Error fetching XML content:", error);
          });
      } else {
        throw new Error("Network response was not ok.");
      }
    }

    if (
      !lastFetchDate ||
      currentDate - parseInt(lastFetchDate, 10) > oneDay ||
      !storedPodcastInfo ||
      !storedPodcastDescription ||
      !storedEpisodesList
    ) {
      console.log("Se realiza el fetch");
      fetchPodcastData();
    } else {
      console.log("Se obtienen los datos de localStorage");
      setPodcastInfo(JSON.parse(storedPodcastInfo));
      setPodcastDescription(storedPodcastDescription);
      setEpisodes(JSON.parse(storedEpisodesList));
      setPodcastArtwork(podcastInfo.cover);
      console.log("podcastInfo", podcastInfo);
    }
  }, [podcastId]);

  return (
    <div className="podcastDetail-container">
      <PodcastSidebar
        artwork={podcastArtwork}
        collectionName={podcastTitle}
        artistName={podcastAutor}
        podcastDescription={podcastDescription}
        podcastId={podcastId}
      />

      <div className="episodes-container">
        <div className="episodes">
          <div className="episodes-header">
            <h2>Episodes: {episodes.length}</h2>
          </div>
          <div className="episodes-list">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Duration</th>
                </tr>
              </thead>
              <tbody>
                {episodes.map((episode, index) => (
                  <tr key={episode.episode}>
                    <Link
                      to={`/podcast/${podcastId}/episode/${index + 1}`}
                      state={{
                        episode,
                        podcastArtwork,
                        podcastTitle,
                        podcastAutor,
                        podcastDescription,
                        podcastId,
                      }}
                      // onClick={handleStartNavigating}
                    >
                      <td>{episode.title}</td>
                    </Link>
                    <td>{formatDate(episode.pubDate)}</td>
                    <td>{episode.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
