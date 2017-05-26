/**
 * Created by peach on 16-3-14.
 */
import React, { PropTypes, Component } from 'react';
import { DropTarget } from 'react-dnd';
const style = {
    height: '12rem',
    width: '12rem',
    float: 'left'
};

const tustbinSpec = {
    drop(props, monitor, component) {
        const item = monitor.getItem();
        console.log(item.id);
        return { name: 'Dustbin' };
    }
};

function dustbinCollect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    };
}


class Target extends Component {

    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired
    };
    render() {
        const { canDrop, isOver, connectDropTarget } = this.props;
        const isActive = canDrop && isOver;

        let backgroundColor = '#222';
        if (isActive) {
            backgroundColor = 'darkgreen';
        } else if (canDrop) {
            backgroundColor = 'darkkhaki';
        }
        return connectDropTarget(
            <div　style={{ ...style,backgroundColor}}>
              
            </div>
        );
    }
}
export default DropTarget('box',tustbinSpec,dustbinCollect)(Target);
