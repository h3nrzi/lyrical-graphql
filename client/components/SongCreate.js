import React from "react";
import { graphql } from "react-apollo";
import { Link, hashHistory } from "react-router";
import { withState } from "recompose";
import query from "../api/queries/fetchSongs";
import createSong from "../api/mutations/createSong";

const SongCreate = ({ mutate, state, setState }) => {
  function createSongHandler(e) {
    e.preventDefault();

    mutate({
      variables: { title: state.title },
      refetchQueries: [{ query }],
    }).then(() => hashHistory.push("/"));
  }

  return (
    <div className="">
      <Link onlyActiveOnIndex to="/">
        Back
      </Link>
      <h3>Create a New Song</h3>
      <form onSubmit={createSongHandler}>
        <label htmlFor="song-title">Song Title:</label>
        <input id="song-title" value={state.title} onChange={e => setState({ title: e.target.value })} />
        <button type="submit" className="btn">
          Create Song <i className="material-icons right">send</i>
        </button>
      </form>
    </div>
  );
};

const enhance = withState("state", "setState", { title: "" });
const EnhancedSongCreate = enhance(SongCreate);

export default graphql(createSong)(EnhancedSongCreate);
