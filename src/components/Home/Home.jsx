import PodcastList from "../PodcastList/PodcastList";
import "./Home.css";
import SearchBox from "../SearchBox/SearchBox";
import usePodcastSearch from "../../hooks/usePodcastSearch";

export default function Home() {
  const { podcasts, numberOfPodcasts, handleSearchChange } = usePodcastSearch();

  return (
    <div className="home_container">
      <SearchBox
        number={numberOfPodcasts}
        handleSearchChange={handleSearchChange}
      />
      <PodcastList podcasts={podcasts} />
    </div>
  );
}
