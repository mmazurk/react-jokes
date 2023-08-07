
import { Component, useState, useEffect } from "react";
import axios from "axios";
import Joke from "./Joke";
import "./JokeList.css";

class JokeList extends Component {

  static defaultProps = {
    numJokesToGet: 10
  };

  constructor(props) {
    super(props);    
    this.state = {jokes: []}

    // here the correct syntax to bind methods
    // You are saying the class method

    this.getJokes = this.getJokes.bind(this)
    this.generateNewJokes = this.generateNewJokes.bind(this)
    this.vote = this.vote.bind(this)
  }


  componentDidMount() {
    if (this.state.jokes.length === 0) this.getJokes();
  }
 
  async getJokes() {
      let j = [...this.state.jokes];
      let seenJokes = new Set();
      try {
        while (j.length < this.props.numJokesToGet) {
          let res = await axios.get("https://icanhazdadjoke.com", {
            headers: { Accept: "application/json" }
          });
          let { status, ...jokeObj } = res.data;
  
          if (!seenJokes.has(jokeObj.id)) {
            seenJokes.add(jokeObj.id);
            j.push({ ...jokeObj, votes: 0 });
          } else {
            console.error("duplicate found!");
          }
        }
        this.setState({jokes: j});
      } catch (e) {
        console.log(e);
      }
    }

  /* empty joke list and then call getJokes */

  generateNewJokes() {
    this.setState({jokes: []});
    this.getJokes();
  }

  //  In the class-based component, you can't access allJokes like you did in the functional component. 
  // You need to use the previous state to update it.  
  vote(id, delta) {
    this.setState(prevState => ({
      jokes: prevState.jokes.map(j => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    }));
  }

    // You can directly sort jokes in the render method and use them.
    render() {
      let sortedJokes = [...this.state.jokes].sort((a, b) => b.votes - a.votes);
      if (sortedJokes.length) {
        return (
      <div className="JokeList">
        <button className="JokeList-getmore" onClick={this.generateNewJokes}>
          Get New Jokes
        </button>
  
        {sortedJokes.map(j => (
          <Joke text={j.joke} key={j.id} id={j.id} votes={j.votes} vote={this.vote} />
        ))}
      </div> )}
      else { return null }
    };
  
}

export default JokeList;
