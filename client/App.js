import React, {Component} from "react";
import { Link } from "react-router";
import PropTypes from 'prop-types';
import { DragSource,DropTarget,DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Target from './test/Target'
import Source from './test/Source'
class App extends Component {
	static propTypes = {

	};

	static defaultProps = {

	};
	constructor(props) {
		super(props);
		this.state = {
			
		}
	}
	render() {
		return(
				<div>
					<div>
						<Target/>
					</div>
					<div>
						<Source/>
					</div>
				</div>
		)	
	}
}
export default DragDropContext(HTML5Backend)(App);