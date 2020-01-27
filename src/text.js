import Tesseract from "tesseract.js";
import React from "react";

class text extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      image: ""
    };
  }
  componentDidMount() {
    // Tesseract.recognize(
    //   // "https://i.pinimg.com/originals/a7/ca/6a/a7ca6a9e50ef52beb97c765d690fc1c8.png",
    //   "https://upload.wikimedia.org/wikipedia/commons/1/17/Text_entropy.png",
    //   // "https://tesseract.projectnaptha.com/img/eng_bw.png",
    //   "eng",
    //   { logger: m => console.log(m) }
    // ).then(({ data: { text } }) => {
    //   console.log(text);
    //   this.setState({
    //     text: text
    //   });
    // });
  }

  handleImageChange = e => {
    let image = e.target.files[0];
    console.log("image ---------------->", image);
    Tesseract.recognize(image.name, "eng", {
      logger: m => console.log(m)
    }).then(({ data: { text } }) => {
      console.log(text);
      this.setState({
        text: text
      });
    });
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
                  onChange={this.handleImageChange}
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
      </div>
    );
  }
}

export default text;
