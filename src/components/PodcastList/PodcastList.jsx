/* eslint-disable react/prop-types */
import "./PodcastList.css";

export default function PodcastList({ podcasts }) {
  const entries = podcasts.feed?.entry;

  if (!entries) {
    return <div>No data available</div>;
  }
  return (
    <div className="container">
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
