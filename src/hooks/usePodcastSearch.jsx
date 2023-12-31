import { useEffect, useState } from "react";

function usePodcastSearch() {
  const [podcasts, setPodcasts] = useState([]);
  const [filteredPodcasts, setFilteredPodcasts] = useState([]);
  const [searchField, setSearchField] = useState("");

  useEffect(() => {
    const lastFetchDate = localStorage.getItem("lastFetchDate");
    const currentDate = new Date().getTime();
    const oneDay = 24 * 60 * 60 * 1000; // 24

    async function fetchPodcastData() {
      const response = await fetch(
        "https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json"
      );
      const data = await response.json();
      setPodcasts(data.feed.entry);
      localStorage.setItem("podcasts", JSON.stringify(data.feed.entry));
      localStorage.setItem("lastFetchDate", currentDate.toString());
    }

    const storedPodcasts = localStorage.getItem("podcasts");

    if (!lastFetchDate || currentDate - parseInt(lastFetchDate, 10) > oneDay) {
      console.log("Se realiza el fetch de la URL");
      fetchPodcastData();
    } else if (storedPodcasts) {
      console.log("Se obtienen los datos de localStorage");
      setPodcasts(JSON.parse(storedPodcasts));
      setFilteredPodcasts(JSON.parse(storedPodcasts));
    }
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

  return {
    podcasts: filteredPodcasts,
    numberOfPodcasts: numberOfFilteredPodcasts,
    handleSearchChange,
  };
}

export default usePodcastSearch;
