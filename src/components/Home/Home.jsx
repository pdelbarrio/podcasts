import { useEffect, useState } from "react";
import PodcastList from "../PodcastList/PodcastList";

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
      <PodcastList podcasts={podcasts} />
    </div>
  );
}
