import React, { Component } from 'react';
import { Input } from 'reactstrap';
import './ConfigObject.scss'
import Icon from '@material-ui/core/Icon';
import {Box} from '@material-ui/core';
import '@material-ui/core/styles';
import {
  Row,
  Button,
  Col,
  Card,
  CardHeader,
  CardFooter,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  UncontrolledAlert
} from 'reactstrap';
export class ConfigObject extends Component {
 
    
  constructor(props) {
    super(props);
    this.state = {
        id:this.props.id,
        name:this.props.name,
        command:this.props.command,
        attributes: props.attributes,
        showPropertyBox:false,
        onDragStart: this.props.onDragStart
    };
    
    this.showProperties = this.showProperties.bind(this);
    this.hideProperties = this.hideProperties.bind(this);
  }

 
  showProperties(e) {
    console.log('Show Properties Called:'+this.state.showPropertyBox);
    this.setState(prevState => {
      prevState.showPropertyBox=!prevState.showPropertyBox;
        console.log('Changed Properties :'+this.state.showPropertyBox);
       this.setState(prevState);
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
    console.log("ShowProperties:"+this.state.showPropertyBox);
    let isShow=this.state.showPropertyBox;
    if(isShow == true){
      
      
    let tableStyle = {
      'align':"center",
      'fontSize':"small",
      // 'border':'1px solid'
    };

    let tableheaderStyle = {
      'fontSize':"small",
      // 'fontWeight':"200",
      // 'backgroundColor':"rgb(131, 129, 129)",
      'width':'100%',
      // 'color':'white'
    };
    let tabledataStyle = {
      'fontSize':"smaller",
      'width':'50%',
      'color':'black',
      'border-top':'0.5px solid black',
      'border-bottom':'0.5px solid black'
    };

    let list = this.state.attributes.map(p =>{
      return (
          <tr key={p.name} width='100%'>
            <td style={tabledataStyle} >{p.name}</td>
            <td style={tabledataStyle}>{p.datatype.name}</td>
          </tr>
      );
    });
    let isDraggable=false;
      return(
       
        <div className='mainconfig'>
          <div key={this.state.name} 
                      onDragStart = {this.state.onDragStart}
                      draggable
                      className="configobject"
                  >
              
              <Icon className="fa fa-bandcamp" onClick={this.showProperties} aria-hidden="true"  style={{'marginRight':'-3px','border': '1px solid white', 'color': '#000','borderRadius': '50%','background': 'transparent','border':'1px solid'}}  />
               <div className="configobjectheader" style={{ 'marginLeft': '0px', 'maxWidth':'100px'}}>{this.state.name}</div>
              <Icon className="fa fa-square-o" style={{ 'border': '1px solid white','color': 'black','float':'right','width':'15px','height':'15px','background':'black' }} />
          </div>
          {/* <div className="propertybox"> */}
            <table className="propertybox" id="mytable" style={tableStyle}>
              <thead  style={tableheaderStyle}>
                <tr>
                  <th width='50%' >Name</th>
                  <th width='50%'>Data Type</th>
                </tr>
              </thead>
              <tbody>{list}</tbody>
            </table>
          {/* </div> */}
        </div>
      );
    }else{
      return(
        <React.Fragment>
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader className='cardheader'>
                {/* <Row className='cardheader'> */}
                <Icon className="fa fa-squar" style={{ 'color': 'black','background':'blue','height':'initial' }} />
                    <div style={{ 'color': 'white','background':'black'}}>{this.state.name}</div>
                {/* </Row> */}

                </CardHeader>
                </Card>
                </Col>
                </Row>
                </React.Fragment>
        // <div className='mainconfig'>
        // <div key={this.state.name} 
        //             onDragStart = {this.state.onDragStart}
        //             draggable
        //             className="configobject"
        //         >
        //     <Icon className="fa fa-bandcamp" onClick={this.showProperties} aria-hidden="true"  style={{ 'color': '#000','borderRadius': '50%','background': 'transparent','border':'1px solid'}}  />
        //     <div className="configobjectheader" style={{ 'marginLeft': '0px', 'maxWidth':'100px'}}>{this.state.name}</div>
        //     <Icon className="fa fa-circle" style={{ 'color': 'black','float':'right','width':'15px','height':'15px','background':'black' }} />
        // </div>
        // </div>
      
      );
    }
    
    
  }
}

export default ConfigObject;
