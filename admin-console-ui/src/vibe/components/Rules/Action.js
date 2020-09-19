import React, { Component } from 'react';
import './Action.scss'
import Icon from '@material-ui/core/Icon';
import Select from 'react-select';
import Axios from 'axios';

import {
  Row,
  Input,
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
  UncontrolledAlert,
  
} from 'reactstrap';
export class Action extends Component {
 
  
  constructor(props) {
    super(props);
    this.state = {
      id:this.props.data.id,
      name:this.props.data.name|| '',
      command:this.props.data.command|| '',
      eventType:this.props.data.eventType,
      operation:this.props.operation,
      eventList:[],
      mycallback:this.props.mycallback,
      index:this.props.data.index,
      action:''
    };
    //console.log("Action Data:"+JSON.stringify(this.state));
    this.handleNameChange=this.handleNameChange.bind(this);
    this.handleCommandChange=this.handleCommandChange.bind(this);
    this.handleEventTypeChange=this.handleEventTypeChange.bind(this);
  }

  
componentDidMount(ev) {
  let eventTypeList = JSON.parse(localStorage.getItem('eventTypeList'));
  this.setState({ 
    eventList: eventTypeList
  });
}
 
handleNameChange(ev){
  this.setState({name: ev.target.value})
}

handleCommandChange(ev){
  this.setState({command: ev.target.value})
}
 
editAction(e){
  //console.log("Edit Action Called");
  this.setState({operation:'edit'});
}

cancelEdit(e){
  //console.log("Cancel Edit Called");
  this.setState({operation:'update'});
}


handleEventTypeChange(ev){
  //console.log("onConfigChange"+JSON.stringify(ev));
  this.state.eventList.forEach ((t) => {
    if(t.id == ev.value){
      // const mstate=this.state;
      // mstate.eventType=t;
      this.setState({eventType:t});
    }
  });
}


addAction(){
    this.state.operation='update';
    this.state.action='add';
    this.setState({
      action:'add',
      operation:'update'
      });
    this.state.mycallback(this.state);
  }

  updateAction(){
    console.log("Update Action called "+JSON.stringify(this.state));
    this.state.operation='update';
    this.state.action='update';
    this.setState({
      action:'update',
      operation:'update'
    });
    this.state.mycallback(this.state);
  }

  deleteAction(e){
    console.log("Delete Action Called");
    this.state.operation='view';
    this.state.action='delete';
    this.state.mycallback(this.state);
      this.setState({
        action:'delete',
        operation:'view'
      });
    // this.state.mycallback(this.state);
  }

  addCancel(e){
    console.log("Add Cancel called");
    this.state.operation='view';
    this.state.action='addCancel';
    this.setState({
      action:'addCancel',
      operation:'view'
    });
    this.state.mycallback(this.state);
    
  }


  render() {
   
    const eventTypes = [];
    if(null != this.state.eventList ){
      this.state.eventList.forEach ((t) => {
        eventTypes.push(
          {value:t.id,label:t.type}
        );
      });
    };

    let eventTypeName='';
    if(null !=this.state.eventType && null != this.state.eventType.name){
      eventTypeName=this.state.eventType.name;
    }
    let selectedEvent={};
    if(null != this.state.eventType ){
      selectedEvent={value:this.state.eventType.id, label:this.state.eventType.type};
    };
     if(this.state.operation === 'create'){
      return(
          
        <div className='newaction'>
        <Row>
          <Col md={12}>
            <Card >
              <CardHeader style={{backgroundColor:'#abb2b9',color:'#ffff'}}>
                <Row >
                  <Col md={9}>
                    <h5>{this.state.name}</h5>
                  </Col>
                  <Col md={3}>
                    <div style={{float:'right',marginTop: "-0.5em"}}>
                    <i className="fa fa-remove" title="Cancel Add Action" style={{cursor:"pointer",display: "inline-block",borderRadius: "60px",
                        boxShadow: "0px 0px 2px #888",
                        padding: "0.5em 0.6em",
                      backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={this.addCancel.bind(this)}></i>&nbsp;
                           
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
              < Row md={12} style={{'fontSize':'small','marginBottom':'0.5em'}}> 
                  <Col md={4}>
                    <label className='tdleft'>
                        Name
                    </label>
                   </Col>
                   <Col md={8}>
                   <Input type='text' name='name' value={this.state.name} onChange={this.handleNameChange.bind(this)} >
                      </Input>
                   </Col>
                </Row>
                < Row md={12} style={{'fontSize':'small','marginBottom':'0.5em'}}> 
                  <Col md={4}>
                    <label className='tdleft'>
                        Command
                    </label>
                   </Col>
                   <Col md={8}>
                   <Input type='text' name='command' value={this.state.command} onChange={this.handleCommandChange.bind(this)} >
                      </Input>
                   </Col>
                </Row>
                < Row md={12} style={{'fontSize':'small','marginBottom':'0.5em'}}> 
                  <Col md={4}>
                    <label className='tdleft'>
                        Event
                    </label>
                   </Col>
                   <Col md={8}>
                   <Select options={eventTypes} value={selectedEvent} placeholder='Select Event' onChange={this.handleEventTypeChange.bind(this)} >
                     </Select>
                  </Col>
                </Row>
                <Row md={12} style={{'fontSize':'small','marginBottom':'0.5em'}}> 
                  <Col md={12}>
                  
                  <Button color="success" size="sm" onClick={this.addAction.bind(this)}><i className="fa fa-check" ></i>&nbsp;Add</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
          
      );
    }else if (this.state.operation === 'edit'){
      return(
          
        <div className='newaction'>
        <Row>
          <Col md={12}>
            <Card >
              <CardHeader style={{backgroundColor:'#abb2b9',color:'#ffff'}}>
                <Row >
                  <Col md={9}>
                    <h5>{this.state.name}</h5>
                  </Col>
                  <Col md={3}>
                    <div style={{float:'right',marginTop: "-0.5em"}}>
                          <i className="fa fa-remove" title="Edit Action" style={{cursor:"pointer",display: "inline-block",borderRadius: "60px",
                        boxShadow: "0px 0px 2px #888",
                        padding: "0.5em 0.6em",
                      backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={this.cancelEdit.bind(this)}></i>&nbsp;
                          <i className="fa fa-trash" title="Delete Action" style={{cursor:"pointer",display: "inline-block",borderRadius: "60px",
                        boxShadow: "0px 0px 2px #888",
                        padding: "0.5em 0.6em",
                      backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={this.deleteAction.bind(this)}></i>&nbsp;
                          
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
              < Row md={12} style={{'fontSize':'small','marginBottom':'0.5em'}}> 
                  <Col md={4}>
                    <label className='tdleft'>
                        Name
                    </label>
                   </Col>
                   <Col md={8}>
                   <Input type='text' name='name' value={this.state.name} onChange={this.handleNameChange.bind(this)} >
                      </Input>
                   </Col>
                </Row>
                < Row md={12} style={{'fontSize':'small','marginBottom':'0.5em'}}> 
                  <Col md={4}>
                    <label className='tdleft'>
                        Command
                    </label>
                   </Col>
                   <Col md={8}>
                   <Input type='text' name='command' value={this.state.command} onChange={this.handleCommandChange.bind(this)} >
                      </Input>
                   </Col>
                </Row>
                < Row md={12} style={{'fontSize':'small','marginBottom':'0.5em'}}> 
                  <Col md={4}>
                    <label className='tdleft'>
                        Event
                    </label>
                   </Col>
                   <Col md={8}>
                   <Select options={eventTypes} value={selectedEvent} placeholder='Select Event' onChange={this.handleEventTypeChange.bind(this)} >
                     </Select>
                  </Col>
                </Row>
                <Row md={12} style={{'fontSize':'small','marginBottom':'0.5em'}}> 
                  <Col md={12}>
                  
                  <Button color="success" size="sm" onClick={this.updateAction.bind(this)}><i className="fa fa-check" ></i>&nbsp;Update</Button>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
          
      );

    }else if (this.state.operation === 'update'){
      return(
          
        <div className='newaction'>
        <Row>
          <Col md={12}>
            {/* <Card > */}
              <CardHeader style={{backgroundColor:'#abb2b9',color:'#ffff'}}>
                <Row >
                  <Col md={9}>
                    <h5>{this.state.name}</h5>
                  </Col>
                  <Col md={3}>
                    <div style={{float:'right',marginTop: "-0.5em"}}>
                            <i className="fa fa-pencil" title="Add Subspace" style={{cursor:"pointer",display: "inline-block",borderRadius: "60px",
                        boxShadow: "0px 0px 2px #888",
                        padding: "0.5em 0.6em",
                      backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={this.editAction.bind(this)}></i>&nbsp;
                       
                    </div>
                  </Col>
                </Row>
              </CardHeader>
            
            {/* </Card> */}
          </Col>
        </Row>
      </div>
          
      );
    }else{
      return(
        <div className='newaction'>
        <Row>
          <Col md={12}>
            <Card >
              <CardHeader style={{backgroundColor:'#abb2b9',color:'#ffff'}}>
                <Row>
                  <Col md={9}>
                    <h5>{this.state.name}</h5>
                  </Col>
                  <Col md={3}>
                    <div style={{float:'right',marginTop: "-0.5em"}}>
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
              < Row md={12}> 
                  <Col md={4}>
                    <label className='tdleft'>
                        Command
                    </label>
                   </Col>
                   <Col md={8}>
                      <label className='tdright'>
                        {this.state.command}
                      </label>
                   </Col>
                </Row>
                < Row md={12}> 
                  <Col md={4}>
                    <label className='tdleft'>
                        Event
                    </label>
                   </Col>
                   <Col md={8}>
                     <label className='tdright'>
                      {eventTypeName}
                      </label>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
      );
    }
  }
}

export default Action;
