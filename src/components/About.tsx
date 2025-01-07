import ProfilePhoto from "../assets/profile-photo.jpg";
import {
  GitHubThumbnail,
  LinkedInThumbnail,
  GMailThumbnail,
} from "./Thumbnails";
const About = () => {
  return (
    <div className="h-[90%]">
      About
      <div className="flex items-center h-[90%] ml-20 mr-20">
        <div className="flex">
          <div className="min-w-[40%]">
            <img
              src={ProfilePhoto}
              alt=""
              width="600px"
              height="600px"
              className="rounded-full "
            />
          </div>
          <div className="flex min-h-[40%] min-w-[40%] items-center pl-8">
            <div className="flex-col gap-4">
              <p>
                Hi. My name is Andrew. I’m using this site to showcase some cool
                projects I’ve done. Reach out on the links below.
              </p>
              <div className="flex gap-3">
                <GitHubThumbnail></GitHubThumbnail>
                <LinkedInThumbnail></LinkedInThumbnail>
                <GMailThumbnail></GMailThumbnail>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
