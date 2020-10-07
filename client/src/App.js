import React, { Component } from "react";
import axios from "axios";
import "./App.css";

class App extends Component {
  state = {
    posts: [],
  };
  async componentDidMount() {
    // const { data: posts } = await axios.get(
    //   "http://localhost:8000/api/categories"
    // );
    const promise = await axios.get("api/categories");
    //console.log(promise.data);
    this.setState({ posts: promise.data });
  }

  handleAdd = async () => {
    const postObj = {
      categoryName: "Education",
      categoryDesc: "Education",
      active: true,
    };
    const { data: post } = await axios.post("api/categories", postObj);
    //add post at the begening of an array
    const posts = [post, ...this.state.posts];
    this.setState({ posts });
  };

  handleDelete = async (post) => {
    console.log("Delete", post);
    await axios.delete("api/categories" + "/" + post._id);
    const posts = this.state.posts.filter((p) => p._id !== post._id);
    this.setState({ posts });
  };

  render() {
    return (
      <React.Fragment>
        <button className="btn btn-primary" onClick={this.handleAdd}>
          Add
        </button>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>

              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.posts.map((post) => (
              <tr key={post._id}>
                <td>{post.categoryName}</td>
                <td>{post.categoryDesc}</td>

                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(post)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default App;
