import { useEffect, useState } from "react";
import PodcastList from "../PodcastList/PodcastList";
import "./Home.css";
import SearchBox from "../SearchBox/SearchBox";

export default function Home() {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    async function fetchPodcastData() {
      const response = await fetch(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      );
      const data = await response.json();
      setPodcasts(data.feed.entry);
      setFilteredPodcasts(data.feed.entry);
    }
    fetchPodcastData();
  }, []);

  useEffect(() => {
    const newFilteredPodcasts = podcasts.filter((entry) => {
      const title = entry["im:name"].label.toLowerCase();
      const author = entry["im:artist"].label.toLowerCase();
      const search = searchField.toLowerCase();
      return title.includes(search) || author.includes(search);
    });
    setFilteredPodcasts(newFilteredPodcasts);
  }, [podcasts, searchField]);

  const numberOfFilteredPodcasts = filteredPodcasts.length;

  const handleSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  return (
    <div className="home_container">
      <SearchBox
        number={numberOfFilteredPodcasts}
        handleSearchChange={handleSearchChange}
      />
      <PodcastList podcasts={filteredPodcasts} />
    </div>
  );
}
