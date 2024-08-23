import CloudStorage from './settingsPages/CloudStorage';
import Appearence from './settingsPages/Appearence';
import AccountSettings from './settingsPages/AccountSettings';
import TermsAndPolicy from './settingsPages/TermsAndPolicy';

const SettingsPage = () => {
  return (
    <div style={{padding:50,color:"white"}} className='Settings'>
        <CloudStorage/>
      <hr className="hr" />
        <Appearence/>
      <hr className="hr" />
      <AccountSettings/>
      <hr className="hr" />
      <TermsAndPolicy/>
   
    </div>
  );
};

export default SettingsPage;

