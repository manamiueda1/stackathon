import Tesseract from "tesseract.js";
import React from "react";

class text extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      voice: "",
      image: ""
    };
  }
  componentDidMount() {}

  handleClick = e => {
    let image = e.target.files[0];
    console.log("image ---------------->", image);

    const synth = window.speechSynthesis;
    Tesseract.recognize(image, "eng", { logger: m => console.log(m) }).then(
      ({ data: { text } }) => {
        console.log(text);
        var utterThis = new SpeechSynthesisUtterance(text);
        this.setState({
          text: text,
          voice: synth.speak(utterThis)
        });
      }
    );
  };

  render() {
    return (
      <div className="section">
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
        <h1>{this.state.text}</h1>

        <button onClick={this.handleClick}>Read To Me</button>
      </div>
    );
  }
}

export default text;
