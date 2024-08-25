import CloudStorage from "./settingsPages/CloudStorage";
import Appearence from "./settingsPages/Appearence";
import AccountSettings from "./settingsPages/AccountSettings";
import TermsAndPolicy from "./settingsPages/TermsAndPolicy";
import { useState } from "react";

const SettingsPage = () => {
  return (
    <div style={{ padding: 50, color: "white" }} className="Settings">
    
      <CloudStorage />
      <hr className="hr" />
      <Appearence />
      <hr className="hr" />
      <AccountSettings />
      <hr className="hr" />
      <TermsAndPolicy />
    </div>
  );
};

export default SettingsPage;

const AutocompleteInput = ({ suggestions }) => {
  const [inputValue, setInputValue] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState();
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const userInput = e.target.value;
    setInputValue(userInput);

    if (userInput.length > 0) {
      const filtered = suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(userInput.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleClick = (suggestion) => {
    setInputValue(suggestion);
    setFilteredSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
      />
      {showSuggestions && inputValue && (
        <ul
          style={{
            position: "relative",
          }}
        >
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
