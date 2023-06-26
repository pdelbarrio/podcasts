import { useEffect, useState } from "react";

export default function Home() {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    async function fetchPodcastData() {
      const response = await fetch(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      );
      const data = await response.json();
      console.log("data", data);
      setPodcasts(data);
    }
    fetchPodcastData();
  }, []);

  const entries = podcasts.feed?.entry;

  if (!entries) {
    return <div>No data available</div>;
  }

  return (
    <div>
      {entries.map((entry) => {
        const name = entry["im:name"]?.label;
        const image = entry["im:image"]?.[2]?.label;
        const artist = entry["im:artist"]?.label;

        return (
          <div key={name}>
            <img src={image} alt={name} />
            <p>{name}</p>
            <p>{artist}</p>
          </div>
        );
      })}
    </div>
  );
}
