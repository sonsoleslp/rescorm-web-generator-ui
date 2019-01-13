import React, { Component } from 'react';
import Config from './Config';
import InfoModal from './InfoModal';
import './App.css';
import {generatePackage} from './generatePackage';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Quiz",
      primaryColor: "#e84100",
      primaryColorText: "#ffffff",
      secondaryColor: "#333333",
      secondaryColorText: "#ffffff",
      backgroundColor: "#ffffff",
      generalTextColor: "#000000",
      logo: undefined,
      moodleXmlPath: undefined,
      finish_screen: true,
      feedback: true,
      randomQuestions: true,
      n: 5,
      scormVersion: "1.2",
      showInfoModal: false,
      threshold: 50,
      successMessage: "Congratulations! You have passed",
      failMessage: "Keep trying..."
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          <button className="info" onClick={()=>{this.setState({showInfoModal: true})}}>
            <i className="material-icons">info</i>
          </button>
          <h1><i className="material-icons">school</i> 
          RESCORM Quiz generator
          </h1>
          </header>
        <div className="content"> 
          <div className="content-col left">
            <h2>Configuration</h2>
            <Config {...this.state} onConfigChange={(prop,value)=>{this.setState({[prop]:value})}}/>
            <div className="buttons">
              <button onClick={this.preview.bind(this)}>
                <i className="material-icons">remove_red_eye</i>Preview
              </button>
              <button onClick={this.download.bind(this)}>
                <i className="material-icons">cloud_download</i>Dowload
              </button>
            </div>
          </div>
          <div className="content-col right">
            {/*<h2>Preview</h2>*/}
            <iframe   id="visor"  title="app"     />
          </div>
        </div>
        <InfoModal show={this.state.showInfoModal} hide={()=>{this.setState({showInfoModal: false})}}/>
      </div>    
    );
  }
  preview(){
    fetch("scorm12/index.html").then(res=>res.text()).then(response=>{
        this.onloadend(response);
    })

  }

  onloadend(res) {
    let content = res.replace('<div id="root"></div>',`
      <div id='root'></div>
      <script>
        window._babelPolyfill = false; 
        window.config=JSON.parse('${JSON.stringify({...this.state, dev: true})}');
      </script>`)
    content = content.replace("bundle.js","scorm12/bundle.js")
    let el = document.getElementById('visor')
    el.contentWindow.document.open();
    el.contentWindow.document.write(content);
    el.contentWindow.document.close();
  }
  download() {
    generatePackage(this.state);
  }
  componentDidMount(){
    this.preview();
  }

}

export default App;
