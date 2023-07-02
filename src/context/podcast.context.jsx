/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

const PodcastContext = createContext();

const PodcastProvider = ({ children }) => {
  const [isNavigationLoading, setisNavigationLoading] = useState(false);

  const startNavigationLoading = () => {
    setisNavigationLoading(true);
  };

  const stopNavigationLoading = () => {
    setisNavigationLoading(false);
  };

  return (
    <PodcastContext.Provider
      value={{
        isNavigationLoading,
        startNavigationLoading,
        stopNavigationLoading,
      }}
    >
      {children}
    </PodcastContext.Provider>
  );
};

export { PodcastContext, PodcastProvider };
