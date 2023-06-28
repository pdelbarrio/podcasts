/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const PodcastContext = createContext();

const PodcastProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => {
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  return (
    <PodcastContext.Provider value={{ isLoading, startLoading, stopLoading }}>
      {children}
    </PodcastContext.Provider>
  );
};

export { PodcastContext, PodcastProvider };
