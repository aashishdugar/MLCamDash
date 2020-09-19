import React, { Component } from 'react';
import './Expression.scss'
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
  Icon
} from 'reactstrap';
export class Expression extends Component {
   
  constructor(props) {
    super(props);
    console.log("Expresion:"+JSON.stringify(props));
    if(props.operation == 'create'){
      this.state = {
        name:"new expression",
        value:"",
        operation:props.operation,
        ops:{},
        configObject:{},
        configObjectAttribute:{},
        operations:{},
        operationList:[],
        configObjectList:[],
        mycallback:this.props.mycallback,
        index:this.props.data.index,
        action:''
      };
    }else{
      this.state = {
        id:this.props.data.id,
        name:this.props.data.name,
        value:this.props.data.value,
        operation:props.operation,
        operations:this.props.data.operations,
        ops:{},
        configObject:this.props.data.configObject,
        configObjectAttribute:this.props.data.configObjectAttribute,
        operationList:[],
        configObjectList:[],
        attributeList:[],
        action:'',
        mycallback:this.props.mycallback,
        index:this.props.data.index,
        
      };
      
    }
    ////console.log("Input Expression State:"+JSON.stringify(this.state));
    this.setParameterList();
    this.deleteExpression=this.deleteExpression.bind(this);
    this.addExpression=this.addExpression.bind(this);
  }

  setParameterList(){
    this.state.configObjectList.forEach ((t) => {
      if(t.id == this.state.configObject.id){
        this.setState({attributeList:t.attributeList});
      }
    });
  }
  componentDidMount(ev) {
    let operationList = JSON.parse(localStorage.getItem('operatorsList'));
    let configObjectList = JSON.parse(localStorage.getItem('configObjectList'));

    let attrList=[];
    configObjectList.forEach ((t) => {
      if(this.state.configObject.id == t.id){
        attrList=t.attributeList;
      }
    });
    this.setState({ 
      operationList: operationList ,
      configObjectList:configObjectList,
      attributeList:attrList
    });
  }

  handleConfigParamChange(v){
    ////console.log("->"+JSON.stringify(v));
    this.setState({
      dataobjectparam: {
      label: v.label,
      value: v.value}
      });
  }

  handleOperationChange(e){
     this.state.operationList.forEach ((t) => {
      if(t.id == e.value){
          let name="";
          if(null !== this.state.configObjectAttribute.name ){
            name=this.state.configObjectAttribute.name;
          }
          name+=" "+e.label
          if(null != this.state.value){
            name+=" "+this.state.value;
          }
        const mstate=this.state;
        mstate.operations=t;
        mstate.name=name;
        mstate.ops= {label: e.label,value: e.value};
          
       this.setState(mstate);
      }
    });
  
  }

  handleConfigChange(e){
    this.state.configObjectList.forEach ((t) => {
      if(t.id == e.value){
        const mstate=this.state;
        mstate.configObject=t;
        mstate.attributeList=t.attributeList;
        this.setState(mstate);
      }
    });
  }

  handleParameterChange(e){
    this.state.attributeList.forEach ((t) => {
      if(t.id == e.value){
        let name=t.name;
        if(null !== this.state.ops && null != this.state.ops.label ){
          name+=" "+this.state.ops.label
        }
        if(null != this.state.value){
          name+=" "+this.state.value;
        }
        const mstate=this.state;
        mstate.configObjectAttribute=t;
        mstate.name=name;
        this.setState(mstate);
      }
    });
  }

  handleValueChange(event) {
    let name="";
    if(null !== this.state.configObjectAttribute.name ){
      name=this.state.configObjectAttribute.name;
    }
    if(null !== this.state.ops && null != this.state.ops.label ){
      name+=" "+this.state.ops.label
    }
    name+=" "+event.target.value;
    this.setState({name:name,value: event.target.value})
  }

  addExpression(){
    ////console.log("Add Expression called "+JSON.stringify(this.state));
    let name="";
    if(null !== this.state.configObjectAttribute.name ){
      name=this.state.configObjectAttribute.name;
    }
    if(null !== this.state.ops && null != this.state.ops.label ){
      name+=" "+this.state.ops.label
    }
     name+=" "+this.state.value;
    this.state.name=name;
    this.state.operation='update';
    this.state.action='add';
    this.setState({
      name:name,
      action:'add',
      operation:'update'
      });
    this.state.mycallback(this.state);
  }

  updateExpression(e){
    this.state.operation='update';
    this.state.action='update';
    this.setState({
      action:'update',
      operation:'update'
    });
    this.state.mycallback(this.state);
    
    
  }
  deleteExpression(e){
    this.state.operation='view';
    this.state.action='delete';
    this.setState({
      action:'delete',
      operation:'view'
    });
    this.state.mycallback(this.state);
    
  }

  editExpression(e){
    this.setState({operation:'edit'});
  }
  cancelEditExpression(e){
    this.setState({operation:'update'});
  }

  addCancel(e){
    this.state.operation='view';
    this.state.action='addCancel';
    this.state.mycallback(this.state);
    this.setState({
      action:'addCancel',
      operation:'view'
    });
    this.state.mycallback(this.state);
  }
  

  render() {
    const options = [];
    this.state.operationList.forEach ((t) => {
      options.push(
        {value:t.id,label:t.label}
      );
    });

    const confobjects = [];
    this.state.configObjectList.forEach ((t) => {
      confobjects.push(
        {value:t.id,label:t.description}
      );
    });

    let selectedConfigObj={};
    if(null != this.state.configObject ){
      selectedConfigObj={value:this.state.configObject.id, label:this.state.configObject.name};
    };
    

    let selectedOperation={};
    if(null != this.state.operations ){
      selectedOperation={value:this.state.operations.id, label:this.state.operations.lable};
    };
    const confobjectAttributes = [];
    if(null != this.state.configObject && null != this.state.configObject.attributeList && this.state.configObject.attributeList.length > 0){
      this.state.configObject.attributeList.forEach ((t) => {
        confobjectAttributes.push(
          {value:t.id,label:t.description}
        );
      });
    }else if(null != this.state.attributeList && this.state.attributeList.length > 0){
      this.state.attributeList.forEach ((t) => {
        confobjectAttributes.push(
          {value:t.id,label:t.description}
        );
      });
    }

    let selectedConfigObjAttribute={};
    if(null != this.state.configObjectAttribute ){
      selectedConfigObjAttribute={value:this.state.configObjectAttribute.id, label:this.state.configObjectAttribute.description};
    };
    if(this.state.operation === 'create'){
      return(
        <div className='newexpression'>
            <CardHeader style={{backgroundColor:'#abb2b9',color:'#ffff'}}>
                <Row>
                  <Col md={9}>
                    <h5>{this.state.name}</h5>
                  </Col>
                  <Col md={3}>
                    <div style={{float:'right',marginTop: "-0.5em"}}>
                         <i className="fa fa-remove" title="Delete Expression" style={{cursor:"pointer",display: "inline-block",borderRadius: "60px",
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
                        Config Object
                    </label>
                   </Col>
                   <Col md={8} >
                     <Select options={confobjects}  defaultValue={{selectedConfigObj}} placeholder='Select Config Object' onChange={this.handleConfigChange.bind(this)}>
                     </Select>
                   </Col>
                </Row>
                < Row md={12} style={{'fontSize':'small','marginBottom':'0.5em'}}> 
                  <Col md={4}>
                    <label className='tdleft'>
                        Parameter
                    </label>
                   </Col>
                   <Col md={8}>
                   <Select options={confobjectAttributes} placeholder='Select Parameter' onChange={this.handleParameterChange.bind(this)}>
                     </Select>
                  </Col>
                </Row>
                < Row md={12} style={{'fontSize':'small','marginBottom':'0.5em'}}> 
                  <Col md={4}>
                    <label className='tdleft'>
                        Operation
                    </label>
                   </Col>
                   <Col md={8}>
                   <Select options={options} placeholder='Select Operation' onChange={this.handleOperationChange.bind(this)} >
                     </Select>
                  </Col>
                </Row>
                < Row md={12} style={{'fontSize':'small','marginBottom':'0.5em'}}> 
                  <Col md={4}>
                    <label className='tdleft'>
                        Value
                    </label>
                   </Col>
                   <Col md={8}>
                     <Input type='text' name='expval' value={this.state.value} onChange={this.handleValueChange.bind(this)} >
                      </Input>
                  </Col>
                </Row>
                <Row md={12} style={{'fontSize':'small','marginBottom':'0.5em'}}> 
                  <Col md={12}>
                    <Button color="success" size="sm" onClick={this.addExpression}><i className="fa fa-check" ></i>&nbsp;Add</Button>
                  </Col>
                </Row>
              </CardBody>
      </div>
          
      );
    }else if (this.state.operation === 'edit'){
      return(
      <div className='newexpression'>
            <CardHeader style={{backgroundColor:'#abb2b9',color:'#ffff'}}>
                <Row>
                  <Col md={9}>
                    <h5>{this.state.name}</h5>
                  </Col>
                  <Col md={3}>
                    <div style={{float:'right',marginTop: "-0.5em"}}>
                         <i className="fa fa-remove" title="Cancel Update" style={{cursor:"pointer",display: "inline-block",borderRadius: "60px",
                        boxShadow: "0px 0px 2px #888",
                        padding: "0.5em 0.6em",
                      backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={this.cancelEditExpression.bind(this)}></i>&nbsp;
                            <i className="fa fa-trash" title="Delete Expression" style={{cursor:"pointer",display: "inline-block",borderRadius: "60px",
                        boxShadow: "0px 0px 2px #888",
                        padding: "0.5em 0.6em",
                      backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={this.deleteExpression.bind(this)}></i>&nbsp;
                           
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
              < Row md={12} style={{'fontSize':'small','marginBottom':'0.5em'}}> 
                  <Col md={4}>
                    <label className='tdleft'>
                        Config Object
                    </label>
                   </Col>
                   <Col md={8} >
                     <Select options={confobjects}  value={selectedConfigObj} placeholder='Select Config Object' onChange={this.handleConfigChange.bind(this)}>
                     </Select>
                   </Col>
                </Row>
                < Row md={12} style={{'fontSize':'small','marginBottom':'0.5em'}}> 
                  <Col md={4}>
                    <label className='tdleft'>
                        Parameter
                    </label>
                   </Col>
                   <Col md={8}>
                   <Select options={confobjectAttributes} value={selectedConfigObjAttribute} placeholder='Select Parameter' onChange={this.handleParameterChange.bind(this)}>
                     </Select>
                  </Col>
                </Row>
                < Row md={12} style={{'fontSize':'small','marginBottom':'0.5em'}}> 
                  <Col md={4}>
                    <label className='tdleft'>
                        Operation
                    </label>
                   </Col>
                   <Col md={8}>
                   <Select options={options} value={selectedOperation} placeholder='Select Operation' onChange={this.handleOperationChange.bind(this)} >
                     </Select>
                  </Col>
                </Row>
                < Row md={12} style={{'fontSize':'small','marginBottom':'0.5em'}}> 
                  <Col md={4}>
                    <label className='tdleft'>
                        Value
                    </label>
                   </Col>
                   <Col md={8}>
                     <Input type='text' name='expval' value={this.state.value} onChange={this.handleValueChange.bind(this)} >
                      </Input>
                  </Col>
                </Row>
                <Row md={12} style={{'fontSize':'small','marginBottom':'0.5em'}}> 
                  <Col md={12}>
                    <Button color="success" size="sm" onClick={this.updateExpression.bind(this)}><i className="fa fa-check" ></i>&nbsp;Update</Button>
                  </Col>
                </Row>
              </CardBody>
      </div>
      );
    }else if (this.state.operation === 'update'){
      return(
        <div className='newexpression'>
             <CardHeader style={{backgroundColor:'#abb2b9',color:'#ffff'}}>
                <Row>
                  <Col md={9}>
                    <h5>{this.state.name}</h5>
                  </Col>
                  <Col md={3}>
                    <div style={{float:'right',marginTop: "-0.5em"}}>
                            <i className="fa fa-pencil" title="Edit Expression" style={{cursor:"pointer",display: "inline-block",borderRadius: "60px",
                        boxShadow: "0px 0px 2px #888",
                        padding: "0.5em 0.6em",
                      backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={this.editExpression.bind(this)}></i>&nbsp;
                    </div>
                  </Col>
                </Row>
            </CardHeader>
        </div>
      );
    }else{
      return(
       
        <div className='newexpression'>
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
      </div>

      );
    }
  }
}

export default Expression;
