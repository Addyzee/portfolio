import ProfilePhoto from "../assets/profile-photo.jpg";
import {
  GitHubThumbnail,
  LinkedInThumbnail,
  GMailThumbnail,
} from "./Thumbnails";
const About = () => {
  return (
      <div className="flex justify-center items-center h-[90%]">
        <div className="md:flex md:justify-center">
          <div className="min-w-[40%] flex justify-center pb-5">
            <img
              src={ProfilePhoto}
              alt=""
              width="600px"
              height="600px"
              className="rounded-full "
            />
          </div>
          <div className="flex min-h-[40%] min-w-[40%] items-center">
            <div className="flex-col gap-4">
              <p className="text-center md:text-base lg:text-lg"> 
                Hi. My name is Andrew. I’m using this site to showcase some cool
                projects I’ve done. Reach out on the links below.
              </p>
              <div className="flex gap-3 border-y-2 justify-center">
                <GitHubThumbnail></GitHubThumbnail>
                <LinkedInThumbnail></LinkedInThumbnail>
                <GMailThumbnail></GMailThumbnail>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default About;
