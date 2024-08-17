import UnknownUserIcon from '../../assetModules/svgs/unknownUser'
import PenIcon from '../../assetModules/svgs/pen'

const Profile = () => {
  return (
      <div className="profile">
        <div className="profileImgConteiner">
        <div className="profileImg">
          <UnknownUserIcon />
        </div>
        <PenIcon color={"#2e2e2e"} allow={true}  size={0.7}/>
        </div>
        <p className="profileEmail">unknown@zhmil.com</p>
      </div>
  )
}

export default Profile
