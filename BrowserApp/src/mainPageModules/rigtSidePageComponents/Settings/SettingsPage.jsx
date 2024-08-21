import CloudStorage from './settingsPages/CloudStorage';
import Appearence from './settingsPages/Appearence';
import AccountSettings from './settingsPages/AccountSettings';
import TermsAndPolicy from './settingsPages/TermsAndPolicy';

const SettingsPage = () => {
  return (
    <div style={{padding:50,color:"white"}} className='Settings'>
        <CloudStorage/>
        <Appearence/>
        <AccountSettings/>
        <TermsAndPolicy/>
   
    </div>
  );
};

export default SettingsPage;

