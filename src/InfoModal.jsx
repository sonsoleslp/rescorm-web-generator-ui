import React, { Component } from 'react';

export default class InfoModal extends Component {

	render(){
		return <div className={this.props.show ? "modal":"modal hidden"}>
			<div className="overlay"/>
			<div className="modal-body">
				<button className="modal-close" onClick={this.props.hide}>
				  <i className="material-icons">close</i>
				</button>
				<h3>About</h3>
				<br style={{clear: 'both'}}/>
				<div className="modal-content">
				RESCORM, ViSH, Ediphy, MoodleXML, AikenConverter, about the author
				</div>
			</div>
		</div>
	}

}
