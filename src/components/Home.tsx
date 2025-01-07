import reposInfo from "../resources/reposInfo.json";

const Home = () => {
  return (
    <div>Home
       <div>
        {reposInfo.length}
        {reposInfo.map((repo, index) => (
          <div key={index}>
            <h2>{repo.project_name}</h2>
            <p>{repo.keywords}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home;