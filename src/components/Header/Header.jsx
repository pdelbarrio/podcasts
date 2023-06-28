import "./Header.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { PodcastContext } from "../../context/podcast.context";
import Loading from "../Loader/Loader";

export default function Header() {
  const { isLoading } = useContext(PodcastContext);

  return (
    <div className="header-container">
      <Link className="main" to="/">
        Podcaster
      </Link>
      <div className="loading-container">{isLoading && <Loading />}</div>
    </div>
  );
}
