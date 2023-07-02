import "./Header.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { PodcastContext } from "../../context/podcast.context";
import Loading from "../Loader/Loader";

export default function Header() {
  const { isNavigationLoading } = useContext(PodcastContext);

  return (
    <div className="header-container">
      <Link className="main" to="/">
        Podcaster
      </Link>
      <div className="loading-container">
        {isNavigationLoading && <Loading />}
      </div>
    </div>
  );
}
