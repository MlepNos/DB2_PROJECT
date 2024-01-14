import { useState } from "react";

export const SearchEventsByTitleButton = ({
  SP,
  searchTitle,
  setEvents,
  setIsSearchClicked,
}) => {
  const [loading, setLoading] = useState(false);

  const handleButtonClickSearch = async () => {
    setIsSearchClicked(true);
    try {
      setLoading(true);
      console.log("searchTitle", searchTitle);
      const response = await fetch(`/api/execute/searchEvents/${searchTitle}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (response.ok) {
        setEvents(data.data);
        console.log("found", data.data);
      } else {
        console.error("Error fetching events:", data.message);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className="SP-Button"
      onClick={handleButtonClickSearch}
      disabled={loading}
    >
      {loading ? "Executing..." : `Execute SP:   ${SP}`}
    </button>
  );
};
