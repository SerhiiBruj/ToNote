import UnknownUserIcon from '../../assetModules/svgs/unknownUser';
import PenIcon from '../../assetModules/svgs/pen';
import bg from '../../assetModules/noSvg/bg.jpg'; // Переконайтесь, що шлях до зображення правильний

const Profile = () => {
  return (
    <div className="profile">
      <div className="profileImgConteiner">
        <div
          className="profileImg"
          style={{
            // backgroundImage: `url(${bg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {!!bg&&<UnknownUserIcon />}
        </div>
        <PenIcon color="#2e2e2e" allow={true} size={0.7} />
      </div>
      <p className="profileEmail">unknown@zhmil.com</p>
    </div>
  );
};

export default Profile;
