import { useState } from "react";

const socials = [
  {
    id: 1,
    icon: "fa-brands fa-facebook-f",
    url: "https://www.facebook.com/",
    placeholder: "Facebook",
  },
  {
    id: 2,
    icon: "fa-brands fa-twitter",
    url: "https://twitter.com/",
    placeholder: "Twitter",
  },
  {
    id: 3,
    icon: "fa-brands fa-linkedin-in",
    url: "https://www.linkedin.com/",
    placeholder: "Facebook",
  },
  {
    id: 4,
    icon: "fa-brands fa-instagram",
    url: "https://www.instagram.com/",
    placeholder: "Instagram",
  },
  {
    id: 5,
    icon: "fa-brands fa-youtube",
    url: "https://www.youtube.com/",
    placeholder: "Youtube",
  },
  {
    id: 6,
    icon: "fa-brands fa-pinterest-p",
    url: "https://www.pinterest.com/",
    placeholder: "Pinterest",
  },
];
const SocialSection = () => {
  const [updatedUrls, setUpdatedUrls] = useState<string[]>(
    socials.map((item) => item.url)
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setUpdatedUrls((prevUrls) => {
      const updated = [...prevUrls];
      updated[index] = event.target.value;
      return updated;
    });
  };

  return (
    <div className="social-information">
      <div className="row g-3">
        {socials.map((item, index) => (
          <div className="col-lg-6 col-md-12 col-sm-6" key={item.id}>
            <div className="input-group">
              <span className="input-group-text">
                <i className={item.icon}></i>
              </span>
              <input
                type="url"
                className="form-control"
                placeholder={item.placeholder}
                value={updatedUrls[index]}
                onChange={(event) => handleChange(event, index)}
              />
            </div>
          </div>
        ))}
        <div className="col-12">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialSection;
