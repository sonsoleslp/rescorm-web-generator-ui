import React, { Component } from 'react';

export default class App extends Component {

	render(){
		const options = [
			{ name: "title", value: this.props.title, type: "text", callback: (e) => {this.props.onConfigChange("title", e.target.value)}},
			{ name: "primaryColor", noBreak: true, value: this.props.primaryColor, type: "color", callback: (e) => {this.props.onConfigChange("primaryColor", e.target.value)}},
			{ name: "primaryColorText", value: this.props.primaryColorText, type: "color", callback: (e) => {this.props.onConfigChange("primaryColorText", e.target.value)}},
			{ name: "secondaryColor", noBreak: true,value: this.props.secondaryColor, type: "color", callback: (e) => {this.props.onConfigChange("secondaryColor", e.target.value)}},
			{ name: "secondaryColorText", value: this.props.secondaryColorText, type: "color", callback: (e) => {this.props.onConfigChange("secondaryColorText", e.target.value)}},
			{ name: "backgroundColor", noBreak: true, value: this.props.backgroundColor, type: "color", callback: (e) => {this.props.onConfigChange("backgroundColor", e.target.value)}},
			{ name: "generalTextColor", value: this.props.generalTextColor, type: "color", callback: (e) => {this.props.onConfigChange("generalTextColor", e.target.value)}},
			{ name: "logo", value: this.props.moodleXmlPath, type: "file", callback: (e) => {this.readFile(e.target.files[0], res => this.props.onConfigChange("logo", res),true)}},
			{ name: "moodleXml", friendlyName: "Moodle XML", value: this.props.moodleXmlPath, type: "file", callback: (e) => {this.readFile(e.target.files[0], res => this.props.onConfigChange("moodleXmlPath", res))}},
			{ name: "finish_screen",  noBreak: true, friendlyName: "Finish screen", value: this.props.finish_screen, type: "checkbox", callback: (e) => {this.props.onConfigChange("finish_screen", !this.props.finish_screen)}},
			{ name: "feedback",  noBreak: true, value: this.props.feedback, type: "checkbox", callback: (e) => {this.props.onConfigChange("feedback", !this.props.feedback,)}},
			{ name: "randomQuestions", value: this.props.randomQuestions, type: "checkbox", callback: (e) => {this.props.onConfigChange("randomQuestions", !this.props.randomQuestions)}},
			{ name: "n", noBreak: true, friendlyName: "Number of questions", value: this.props.n, min: 0, type: "number", callback: (e) => {this.props.onConfigChange("n", parseInt(e.target.value))}},
			{ name: "threshold", value: this.props.threshold, type: "number", callback: (e) => {this.props.onConfigChange("threshold", e.target.value)}},
			{ name: "successMessage", value: this.props.successMessage, type: "text", callback: (e) => {this.props.onConfigChange("successMessage", e.target.value)}},
			{ name: "failMessage", value: this.props.failMessage, type: "text", callback: (e) => {this.props.onConfigChange("failMessage", e.target.value)}},
		];
		return <div className="config">
			{options.map(opt=>{
				return [<div className="form-group" >
				<label htmlFor={opt.name}><b>{opt.friendlyName || this.humanize(opt.name)}</b></label>
				<input name={opt.name} type={opt.type} value={opt.type === "file"? undefined: opt.value} min={opt.min} checked={opt.value} onChange={opt.callback}/>
			</div>, opt.noBreak ? null: <br/>]
			})}
			<div className="form-group">
				<label htmlFor="scormVersion"><b>SCORM Version</b></label>
				<label htmlFor="scormVersion">{"SCORM 1.2"}</label>
				<input name="scormVersion" type="radio" value={"1.2"} checked={this.props.scormVersion === "1.2"} onChange={(e) => {this.props.onConfigChange("scormVersion", "1.2")}}/>
				<label htmlFor="scormVersion">{"SCORM 2004"}</label>
				<input name="scormVersion" type="radio" value={"1.2"} checked={this.props.scormVersion === "2004"} onChange={(e) => {this.props.onConfigChange("scormVersion", "2004")}}/>

			</div>
		</div>
	}

	readFile(file, callback, isImage) {
		try {
			const reader = new FileReader()
			reader.onload = event => callback(event.target.result);
			reader.onerror = error => callback("");
			reader.readAsDataURL(file);	
		} catch (e) {
			callback("");
		}

	}

	humanize(str) {
		return str 
		    .replace(/([A-Z])/g, ' $1')
		    .replace(/^./, function(str){ return str.toUpperCase(); })
	}
}