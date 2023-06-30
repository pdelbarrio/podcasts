import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import PodcastDetail from "./components/PodcastDetail/PodcastDetail";

import Header from "./components/Header/Header";
import { PodcastProvider } from "./context/podcast.context";
import EpisodeDetail from "./components/EpisodeDetail/EpisodeDetail";

function App() {
  return (
    <div>
      <PodcastProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
            <Route
              path="/podcast/:podcastId/episode/:episodeId"
              element={<EpisodeDetail />}
            />
          </Routes>
        </BrowserRouter>
      </PodcastProvider>
    </div>
  );
}

export default App;
