import React, { Component } from 'react';
import { Input } from 'reactstrap';
import './DataObject.scss'
import Icon from '@material-ui/core/Icon';
import {Box} from '@material-ui/core';
import '@material-ui/core/styles';
import Draggable from 'react-draggable';

export class DataObject extends Component {
 
    
  constructor(props) {
    super(props);
    this.state = {
        id:"",
        name:"",
        showPropertyBox:false,
        position: {x:0,y:0},
        activeDrags: 0,
        parentobj:props.parentobj,
        deltaPosition: {
          x: 0, y: 0
        },
        controlledPosition: {
          x: -400, y: 200
        }
    };
    // this.myref = React.createRef();
    this.showProperties = this.showProperties.bind(this);
    this.hideProperties = this.hideProperties.bind(this);
    this.myRef = React.createRef();
    console.log("Position:"+this.state.parentobj.getBoundingClientRect());
  }

  // getMyPosition(){
  //   return this.myref.getBoundingClientRect();
  // }
  handleDrag = (e, ui) => {
    const {x, y} = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  };

  onStart = () => {
    this.setState({activeDrags: ++this.state.activeDrags});
    console.log("onStart:"+JSON.stringify(this.state.deltaPosition));
  };

  onStop = () => {
    this.setState({activeDrags: --this.state.activeDrags});
    console.log("onStop:"+JSON.stringify(this.state.deltaPosition));
  };

  // For controlled component
  adjustXPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {x, y} = this.state.controlledPosition;
    this.setState({controlledPosition: {x: x - 10, y}});
    console.log("adjustXPos:"+JSON.stringify(this.state.controlledPosition));
  };

  adjustYPos = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const {controlledPosition} = this.state;
    const {x, y} = controlledPosition;
    this.setState({controlledPosition: {x, y: y - 10}});
    console.log("adjustYPos:"+JSON.stringify(this.state.controlledPosition));
  };

  onControlledDrag = (e, position) => {
    const {x, y} = position;
    this.setState({controlledPosition: {x, y}});
    console.log("onControlledDrag:"+JSON.stringify(this.state.controlledPosition));
  };

  onControlledDragStop = (e, position) => {
    this.onControlledDrag(e, position);
    this.onStop();
    console.log("onControlledDragStop:"+JSON.stringify(this.state.controlledPosition));
  };
 

  showProperties(e) {
    console.log('Show Properties Called:'+this.state.showPropertyBox);
    this.setState(prevState => {
        this.state.showPropertyBox=!prevState.showPropertyBox;
    });
  }

  hideProperties(e) {
    console.log('Hide Properties Called:'+this.state.showPropertyBox);
    // this.setState(prevState => {
        this.state.showPropertyBox=false;
    // });
  }
  
  render() {
    // const dragHandlers = {onStart: this.onStart, onStop: this.onStop,onControlledDrag:this.onControlledDrag,onControlledDragStop:this.onControlledDragStop};
    // console.log("ShowProperties:"+this.state.showPropertyBox);
    if(this.state.showPropertyBox){
      return(
        <Draggable onDrag={this.handleDrag} handle="span"  onStart={this.onStart} onStop={ this.onStop} onControlledDrag={this.onControlledDrag} onControlledDragStop={this.onControlledDragStop}>
            <Box className='ruleaction'>
            {/* <Icon className="fa fa-setting" onClick='this.hideProperties' style={{ 'marginLeft': '-15px','color': 'black','float':'left','width':'15px','height':'15px','background':'black' }} /> */}
              <span style={{ 'marginLeft': '5px', 'maxWidth':'100px'}}>{this.state.name}</span>
              <Icon className="fa fa-circle" style={{ 'marginRight': '-15px','color': 'black','float':'left','width':'15px','height':'15px','background':'black' }} />
            </Box>
        </Draggable>
      );
    }else{
      return(
        // <Draggable bounds="parent" className="box no-cursor" handle="strong" onDrag={this.handleDrag} onStart={this.onStart} onStop={ this.onStop} onControlledDrag={this.onControlledDrag} onControlledDragStop={this.onControlledDragStop}>
        <div>
        <Draggable   bounds={this.state.parentobj} handle="span" onDrag={this.handleDrag} onStart={this.onStart} onStop={ this.onStop} onControlledDrag={this.onControlledDrag} onControlledDragStop={this.onControlledDragStop}>
            <Box className='ruleaction'>
            <Icon className="fa fa-setting" onClick={this.showProperties} style={{ 'marginLeft': '-15px','color': 'black','float':'left','width':'15px','height':'15px','background':'black' }} />
            <span className="dragablecursor" style={{ 'marginLeft': '5px', 'maxWidth':'100px'}}><strong >{this.state.name}</strong></span>
              <Icon className="fa fa-circle" style={{ 'marginRight': '-15px','color': 'black','float':'left','width':'15px','height':'15px','background':'black' }} />
            </Box>
        </Draggable>
        </div>
      );
    }
    
    
  }
}

export default DataObject;
