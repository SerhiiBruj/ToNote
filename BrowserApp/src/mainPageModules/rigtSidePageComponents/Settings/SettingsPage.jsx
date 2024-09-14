import CloudStorage from "./settingsPages/CloudStorage";
import Appearence from "./settingsPages/Appearence";
import AccountSettings from "./settingsPages/AccountSettings";
import TermsAndPolicy from "./settingsPages/TermsAndPolicy";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
const SettingsPage = () => {
  const location = useLocation();
  const scrollRef = useRef(null);

  const scrollToSection = (sectionId) => {
    if (scrollRef.current) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior:'auto' });
      }
    }
  };

  useEffect(() => {
    const path = location.pathname.split('/').pop(); // Останній сегмент шляху
    switch (path) {
      case 'Account_settings':
        scrollToSection('account-settings');
        break;
      case 'Appearance':
        scrollToSection('appearance');
        break;
      case 'Storage':
        scrollToSection('storage');
        break;
      case 'Terms_and_Policy':
        scrollToSection('terms-and-policy');
        break;
      default:
        break;
    }
  }, [location.pathname]);

  return (
    <div
      style={{ padding: 50, color: 'white',  height: '100vh' ,scrillBehavior: 'smooth'}}
      className="Settings"
      ref={scrollRef}
    >
      <section id="account-settings">
        <AccountSettings />
      </section>
      <hr className="hr" />
      <section id="appearance">
        <Appearence />
      </section>
      <hr className="hr" />
      <section id="storage">
        <CloudStorage />
      </section>
      <hr className="hr" />
      <section id="terms-and-policy">
        <TermsAndPolicy />
      </section>
    </div>
  );
};

export default SettingsPage;

// const AutocompleteInput = ({ suggestions }) => {
//   const [inputValue, setInputValue] = useState("");
//   const [filteredSuggestions, setFilteredSuggestions] = useState();
//   const [showSuggestions, setShowSuggestions] = useState(false);

//   const handleChange = (e) => {
//     const userInput = e.target.value;
//     setInputValue(userInput);

//     if (userInput.length > 0) {
//       const filtered = suggestions.filter((suggestion) =>
//         suggestion.toLowerCase().includes(userInput.toLowerCase())
//       );
//       setFilteredSuggestions(filtered);
//       setShowSuggestions(true);
//     } else {
//       setShowSuggestions(false);
//     }
//   };

//   const handleClick = (suggestion) => {
//     setInputValue(suggestion);
//     setFilteredSuggestions([]);
//     setShowSuggestions(false);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={inputValue}
//         onChange={handleChange}
//         onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
//       />
//       {showSuggestions && inputValue && (
//         <ul
//           style={{
//             position: "relative",
//           }}
//         >
//           {filteredSuggestions.map((suggestion, index) => (
//             <li key={index} onClick={() => handleClick(suggestion)}>
//               {suggestion}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };
