import React, { useContext } from "react";
import UserItem from "./UserItem";
import Spinner from "../shared/Spinner";
import GithubContext from "../../context/github/GithubContext";

const Users = () => {
  const githubContext = useContext(GithubContext);
  const { loading, users } = githubContext;

  if (loading) return <Spinner />;

  return (
    <>
      <div className="users">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
      {users.length === 0 && (
        <div>
          <img src={require("../../assets/images/empty.png")} alt="" />
        </div>
      )}
    </>
  );
};

Users.propTypes = {};

export default Users;
