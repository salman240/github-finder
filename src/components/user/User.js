import React, { useEffect, useContext } from "react";
import Spinner from "../shared/Spinner";
import { Link } from "react-router-dom";
import Repos from "../repos/Repos";
import GithubContext from "../../context/github/GithubContext";

const User = (props) => {
  const githubContext = useContext(GithubContext);
  const { getUser, getUserRepos, user, repos, loading } = githubContext;

  useEffect(() => {
    getUser(props.match.params.login);
    getUserRepos(props.match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    avatar_url,
    bio,
    location,
    blog,
    login,
    company,
    followers,
    following,
    hireable,
    html_url,
    name,
    public_gists,
    public_repos,
  } = user;

  if (loading) return <Spinner />;
  return (
    <>
      <Link className="btn btn-light" to="/">
        Back to Search
      </Link>
      Hireable:{" "}
      {hireable ? (
        <i className="fa fa-check text-success"></i>
      ) : (
        <i className="fa fa-times-circle text-danger"></i>
      )}
      <div className="card grid-2">
        <div className="all-center">
          <img
            src={avatar_url}
            alt=""
            className="round-img"
            style={{ width: 150 }}
          />
          <h1>{name}</h1>
          <p>Location: {location}</p>
        </div>
        <div>
          {bio && (
            <>
              <h3>Bio</h3>
              <p>{bio}</p>
            </>
          )}
          <a href={html_url} className="btn btn-dark my-1">
            Visit Github Profile
          </a>
          <ul>
            <li>
              {login && (
                <>
                  <strong>Username: </strong>
                  {name}
                </>
              )}
            </li>
            <li>
              {company && (
                <>
                  <strong>Company: </strong>
                  {company}
                </>
              )}
            </li>
            <li>
              {blog && (
                <>
                  <strong>Website: </strong>
                  {blog}
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center">
        <div className="badge badge-light">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-danger">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </>
  );
};

User.propTypes = {};

export default User;
