import React from "react";
import UserItem from "./UserItem";
import Spinner from "./Spinner";

const Users = ({ users, loading }) => {
  if (loading) return <Spinner />;

  return (
    <div style={styles.users}>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
};

const styles = {
  users: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "1rem",
  },
};

export default Users;
