import React from "react";
import UserItem from "./UserItem";
import Spinner from "../shared/Spinner";
import PropTypes from "prop-types";

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

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
};

const styles = {
  users: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridGap: "1rem",
  },
};

export default Users;
