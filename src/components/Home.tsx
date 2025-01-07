import reposInfo from "../resources/reposInfo.json";

const Home = () => {
  
  return (
    <div>Home
       <div>
        {reposInfo.length}
        {reposInfo.map((repo, index) => (
          <div key={index}>
            <p>{repo.project_name} : {repo.keywords} </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home;