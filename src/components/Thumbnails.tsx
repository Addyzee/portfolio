const GitHubThumbnail = () => (
  <a href="https://github.com/Addyzee" target="_blank">
    <div className="thumbnail github-thumbnail">
      <img
        src="https://cdn-icons-png.flaticon.com/512/733/733553.png"
        alt="GitHub"
        className="thumbnail-icon"
      />
    </div>
  </a>
);

const LinkedInThumbnail = () => (
  <a href="https://www.linkedin.com/in/andrew-kimani-k/"  target="_blank">
  <div className="thumbnail linkedin-thumbnail">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/LinkedIn_icon.svg/72px-LinkedIn_icon.svg.png"
      alt="LinkedIn"
      className="thumbnail-icon"
    />
  </div>
  </a>
);

const GMailThumbnail = () => (
  <a href="mailto:andrewkamaukim@gmail.com" target="_blank">
  <div className="thumbnail gmail-thumbnail">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg"
      alt="YouTube"
      className="thumbnail-icon"
    />
  </div>
  </a>
);

export { GitHubThumbnail, LinkedInThumbnail, GMailThumbnail };
