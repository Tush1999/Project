import React, { Component } from "react";
import "./style.css";
import ScrollableFeed from "react-scrollable-feed";

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: 100,
      monster: 100,
      game: false,
      list: [],
      start: false,
    };
    this.initialState = this.state;
  }

  updateState=(num1,num2)=>{
  this.setState(
    (state) => ({
      monster: state.monster - num1,
      player1: state.player1 - num2,
      list: [
        ...state.list,
        { message: `You hit monster by ${num1}`, active: "win" },
        { message: `Moster hit you by ${num2}`, active: "loss" },
      ],
    }),
    this.handleAlert
  );
  }
  handleAlert = () => {
    if (this.state.player1 <= 0 && !this.state.game) {
      setImmediate(() => alert("Awwww....You lose this game. Play again"));
      this.setState({
        player1: 0,
        list: [
          ...this.state.list,
          { message: "Game over", active: "game-over" },
        ],
      });
    } else if (this.state.monster <= 0) {
      alert("You win this game");
    }
  };

  handleAttack = () => {
    let num1 = Math.floor(Math.random() * 10) + 1;
    let num2 = Math.floor(Math.random() * 20) + 1;
    this.updateState(num1,num2);
  };

  handleSpecialAttack = () => {
      let num1 = Math.floor(Math.random() * 11) + 10;
      let num2 = Math.floor(Math.random() * 20) + 1;
      this.updateState(num1,num2)

  };
  handleHeal = () => {
    let num2 = Math.floor(Math.random() * 20) + 1;
    if (this.state.player1 < 90) {
      this.setState(
        (state) => ({
          player1: this.state.player1 + 10 - num2,
          list: [
            ...state.list,
            { message: `You heal yourself by 10`, active: "win" },
            { message: `Monster hit you by ${num2}`, active: "loss" },
          ],
        }),
        this.handleAlert
      );
    }
  };
  handleGive = () => {
    this.setState({
      list: [...this.state.list, { message: "You give up" }],
      game: true,
    });
  };
  PlayAgain = () => {
    this.setState(this.initialState);
  };
  startGame = () => {
    this.setState({ start: true });
  };

  render() {
    return (
      <React.Fragment>
        {this.state.start ? (
          <>
            <div className="heading">
              <h1>YOU</h1>
              <h1>MONSTER</h1>
            </div>
            <div className="display">
              <div className="main-left">
                <div className="left">{this.state.player1}</div>
              </div>
              <div className="main-right">
                <div className="right">{this.state.monster}</div>
              </div>
            </div>
            <div className="button-div">
              {this.state.player1 !== 0 && !this.state.game ? (
                <>
                  <button onClick={this.handleAttack} className="attack">
                    Attack
                  </button>
                  {this.state.player1 > 90 ? (
                    <button
                      onClick={this.handleSpecialAttack}
                      className="special-attack"
                    >
                      Special Attack
                    </button>
                  ) : null}
                  <button className="heal" onClick={this.handleHeal}>
                    Heal
                  </button>
                  <button className="give-up" onClick={this.handleGive}>
                    Give up
                  </button>
                </>
              ) : (
                <button className="restart" onClick={this.PlayAgain}>
                  Play Again
                </button>
              )}
            </div>
            <div className="extra" />

            <div className="result-box">
              <ScrollableFeed forceScroll={true}>
                <div className="inner-div">
                  <ul className="text">
                    {this.state.list.map((val) => (
                      <li className={val.active}>{val.message}</li>
                    ))}
                  </ul>
                </div>
              </ScrollableFeed>
            </div>
          </>
        ) : (
          <button className="start" onClick={this.startGame}>
            START GAME
          </button>
        )}
      </React.Fragment>
    );
  }
}
