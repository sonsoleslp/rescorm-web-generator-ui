import React, { Component } from 'react';

export default class InfoModal extends Component {

	render(){
		return <div className={this.props.show ? "modal" : "modal hidden"}>
			<div className="overlay"/>
			<div className="modal-body">
				<button className="modal-close" onClick={this.props.hide}>
				  <i className="material-icons">close</i>
				</button>
				<h3>About</h3>
				<br style={{clear: 'both'}}/>
				<div className="modal-content">
				This website allows you to customize your very own quiz application and generate a SCORM package so you can upload it to your preferred LMS.
				<h4>Exercises</h4>
				<hr/>
				In order to use your own exercises on the quiz, you need to submit a Moodle XML file.
				If you do not have one you can convert from an <a href="https://docs.moodle.org/all/es/Formato_Aiken" rel="noopener noreferrer" target="_blank">Aiken</a> file using this <a rel="noopener noreferrer" target="_blank" href="http://sonsoleslp.github.io/quiz-converter/" >Quiz converter</a>.
				<h4>Publish</h4>
				<hr/>
				You don't have an LMS? Don't worry! You can upload your SCORM Package to <a href="http://vishub.org" rel="noopener noreferrer" target="_blank">ViSH</a>, and everyone will be able to get access with no need to sign up.
				<h4>Author</h4>
				<hr/>
				This project was developed by <a href="http://github.com/sonsoleslp" rel="noopener noreferrer" target="_blank">@sonsoleslp</a> using <a rel="noopener noreferrer" target="_blank" href="https://github.com/agordillo/RESCORM">RESCORM</a>.
				</div>
			</div>
		</div>
	}

}
