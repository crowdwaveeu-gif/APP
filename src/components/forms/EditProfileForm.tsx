import PublicInfoSection from "../profile/PublicInfoSection";
import PrivateInfoSection from "../profile/PrivateInfoSection";
import SocialSection from "../profile/SocialSection";

const EditProfileForm = () => {
  return (
    <form>
      <div className="profile-edit-tab-title">
        <h6>Public Information</h6>
      </div>
      <PublicInfoSection />

      <div className="profile-edit-tab-title">
        <h6>Private Information</h6>
      </div>

      <PrivateInfoSection />

      <div className="profile-edit-tab-title">
        <h6>Social Information</h6>
      </div>

      <SocialSection />
    </form>
  );
};
export default EditProfileForm;
