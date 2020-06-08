import Tesseract from "tesseract.js";
import React from "react";

class text extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      voice: "",
      image: "",
    };
  }
  componentDidMount() {}

  handleClick = (e) => {
    let image = e.target.files[0];

    const synth = window.speechSynthesis;
    Tesseract.recognize(image, "eng", { logger: (m) => console.log(m) }).then(
      ({ data: { text } }) => {
        console.log(text);
        let utterThis = new SpeechSynthesisUtterance(text);
        this.setState({
          text: text,
          voice: synth.speak(utterThis),
        });
      }
    );
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
        <div className="description">
          Upload an image with text on it and see what happens!
        </div>
        <div>
          <div className="field">
            <div className="file is-boxed is-success has-name">
              <label className="file-label">
                <input
                  className="file-input"
                  type="file"
                  accept="image/png, imgae/jpeg, image/gif"
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
        </div>

        <div className="pause">
          <button type="button" onClick={this.handlePause}>
            Pause
          </button>
        </div>

        <div className="resume">
          <button type="button" onClick={this.handleResume}>
            Play
          </button>
        </div>

        <div className="the-text">
          <h1>{this.state.text}</h1>
        </div>
      </div>
    );
  }
}

export default text;
