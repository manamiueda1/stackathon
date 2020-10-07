import Tesseract from "tesseract.js";
import React, { Component } from "react";
import "./App.css";
import crunches from "./assets/img/crunches.jpg";
import nap from "./assets/img/nap.jpg";
import joke from "./assets/img/joke.jpeg";

class App extends Component {
  state = {
    text: "",
    voice: "",
  };

  handleClick = (e) => {
    let image = e.target.files[0];

    const synth = window.speechSynthesis;
    Tesseract.recognize(image, "eng", {
      logger: (m) => console.log(m),
    })
      .then(({ data: { text } }) => {
        let utterThis = new SpeechSynthesisUtterance(text);
        this.setState({
          text,
          voice: synth.speak(utterThis),
        });
      })
      .catch((e) => {
        console.error(e);
      });
  };

  handlePause = () => {
    const synth = window.speechSynthesis;
    this.setState({
      voice: synth.pause(),
    });
  };

  handleResume = () => {
    const synth = window.speechSynthesis;
    this.setState({
      voice: synth.resume(),
    });
  };

  render() {
    return (
      <div className="section">
        <h1 className="title">Image-to-Voice</h1>
        <br></br>

        <div className="description">
          Download the sample images below and upload them to see what happens!
        </div>
        <br></br>
        <br></br>
        <div className="images">
          <a className="image1" href={crunches} download>
            Image 1
          </a>
          <a className="image2" href={nap} download>
            Image 2
          </a>
          <a className="image3" href={joke} download>
            Image 3
          </a>
        </div>
        <br></br>
        <br></br>

        <div className="field">
          <div className="file is-boxed is-success has-name">
            <label className="file-label">
              <input
                className="file-input"
                type="file"
                accept="image/png, imgae/jpeg, image/gif, image/jpg"
                onChange={this.handleClick}
              />
              <span className="file-cta">
                <span className="file-icon">
                  <i className="fas fa-upload"></i>
                </span>
                <span className="file-label">Choose a photo</span>
              </span>
            </label>
          </div>
        </div>

        <input
          className="pause"
          type="button"
          value="Pause"
          onClick={this.handlePause}
        ></input>

        <input
          className="resume"
          type="button"
          value="Play"
          onClick={this.handleResume}
        ></input>
        <br></br>
        <br></br>
        <div className="the-text">
          <h1>{this.state.text}</h1>
        </div>
      </div>
    );
  }
}

export default App;
