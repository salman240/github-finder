import React, { useReducer } from "react";
import {
  SET_LOADING,
  SEARCH_USERS,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from "../types";
import Axios from "axios";
import GithubContext from "./GithubContext";
import githubReducer from "./githubReducer";

let githubClientId;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(githubReducer, initialState);

  // Search Users
  const searchUsers = (text) => {
    setLoading();

    Axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    )
      .then((data) => {
        console.log(data);
        dispatch({ type: SEARCH_USERS, payload: data.data.items });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getUser = (username) => {
    setLoading();

    Axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`
    )
      .then((data) => {
        console.log(data);
        dispatch({ type: GET_USER, payload: data.data });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getUserRepos = (username) => {
    setLoading();

    Axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`
    )
      .then((data) => {
        console.log(data);
        dispatch({ type: GET_REPOS, payload: data.data });
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  const setLoading = () => dispatch({ type: SET_LOADING });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
