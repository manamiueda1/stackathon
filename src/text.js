import Tesseract from "tesseract.js";
import React from "react";
import { createWorker } from "tesseract.js";

class text extends React.Component {
  constructor() {
    super();
    this.state = {
      text: "",
      voice: "",
      image: ""
    };
  }
  componentDidMount() {
    const synth = window.speechSynthesis;

    Tesseract.recognize(
      "https://image.isu.pub/180423042818-89de4b2a581e1b4e59942571f4cae075/jpg/page_1.jpg",
      // "http://i.imgur.com/8iahD0M.png",
      // "https://upload.wikimedia.org/wikipedia/commons/1/17/Text_entropy.png",
      // "https://tesseract.projectnaptha.com/img/eng_bw.png",
      "eng",
      { logger: m => console.log(m) }
    ).then(({ data: { text } }) => {
      console.log(text);
      var utterThis = new SpeechSynthesisUtterance(text);
      this.setState({
        text: text,
        voice: synth.speak(utterThis)
      });
    });

    // const worker = createWorker({
    //   logger: m => console.log(m)
    // });

    // (async () => {
    //   await worker.load();
    //   await worker.loadLanguage("eng");
    //   await worker.initialize("eng");
    //   const {
    //     data: { text }
    //   } = await worker.recognize(
    //     "https://tesseract.projectnaptha.com/img/eng_bw.png"
    //   );
    //   console.log(text);
    //   this.setState({
    //     text: text
    //   });
    //   await worker.terminate();
    // })();
  }

  // handleImageChange = e => {
  //   let image = e.target.files[0];
  //   console.log("image ---------------->", image);
  //   Tesseract.recognize(image.name, "eng", {
  //     logger: m => console.log(m)
  //   }).then(({ data: { text } }) => {
  //     console.log(text);
  //     this.setState({
  //       text: text
  //     });
  //   });
  // };

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
                  // onChange={this.handleImageChange}
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
