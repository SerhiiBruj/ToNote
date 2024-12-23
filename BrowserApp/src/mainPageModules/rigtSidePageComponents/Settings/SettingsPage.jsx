import CloudStorage from "./settingsPages/CloudStorage";
import Appearence from "./settingsPages/Appearence";
import AccountSettings from "./settingsPages/AccountSettings";
import TermsAndPolicy from "./settingsPages/TermsAndPolicy";
import {  memo, useCallback, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
const SettingsPage = () => {
  const location = useLocation();
  const scrollRef = useRef(null);
  const scrollToSection = useCallback((sectionId) => {
    if (scrollRef.current) {
      const section = document.getElementById(sectionId);
      if (section) {
        // Прокрутка до початку елемента
        section.scrollIntoView({ 
          behavior: 'smooth', // можна змінити на 'auto' для миттєвої прокрутки
          block: 'end'      // встановлює прокрутку так, щоб елемент починався на позиції 0
        });
      }
    }
  },[])
  

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

      <h1 style={{ fontSize: 45 }}>Still in development</h1>
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

export default  SettingsPage;

