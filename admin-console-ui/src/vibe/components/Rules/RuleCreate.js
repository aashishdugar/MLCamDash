import React, { Component } from 'react';
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
  UncontrolledAlert,
  Icon,
  Input
} from 'reactstrap';
import Select from 'react-select';

import './Rule.scss';
import ConfigObject from './ConfigObject';
import Expression from './Expression';
import Action from './Action';
import Axios from 'axios';
// import Calendar from 'react-calendar';
import RuleList from './RuleList';

class RuleCreate extends Component {
  constructor(props) {
    super(props);
      this.state={
        id: '',
        name: '',
        definition: '',
        createdon: new Date(),
        updatedon: '',
        space:{},
        rulestatus:{},
        actionList:[],
        expressionList:[],
        ruleConfigObjectList:[],
        spaceList:[],
        selectedspace:{},
        loadAddRuleList:0,
        latestExpKey:0,
        latestActKey:0
      }
    //console.log("State:"+JSON.stringify(this.state));
    this.editrule=this.editrule.bind(this);
    // this.cancelAdd=this.cancelAdd(this);
    this.actionAdded=this.actionAdded.bind(this);
    this.expressionAdded=this.expressionAdded.bind(this);
};

fetchStaticData(){
  return Axios.post('/static/getall/', null).then(response=>{ 
    let output_data = response.data;
    if(output_data.status == "SUCCESS"){
      this.state.staticdata=output_data.data;
      //console.log("Rule Get Response:"+JSON.stringify(this.state));
    }else{
    }
  }).catch(error=>{
    //console.log("Error Fetching Static data "+error);
  });
}


componentDidMount(ev) {
    Axios.post('/space/getall/', null).then(response=>{ 
      let output_data = response.data;
      console.log("Static Response:"+JSON.stringify(output_data));
      if(output_data.status == "SUCCESS"){
        this.setState({ 
          spaceList: output_data.data
        });
          console.log("Static getall Response:"+JSON.stringify(this.state));
        
      }else{
      }
    }).catch(error=>{
      console.log("Error Fetching Static data "+error);
    });
}
cancelAdd(ev){
    console.log("Cancel Add:");
    this.props.history.push({
      pathname:'/rulelist'
    });
}

handleNameChange(event) {
  this.setState({name: event.target.value})
}
handleSpaceChange(e){
  this.state.spaceList.forEach ((t) => {
    console.log("1:"+t.id+",2:"+e.value);
    if(t.id == e.value){
      console.log("List:"+JSON.stringify(t));
      const mstate=this.state;
      mstate.space=t;
      mstate.selectedspace= {label: t.name,value: t.id};
      this.setState(mstate);
    }
  });
}
handleCreateDateChange= date => this.setState({createdon: date });
editrule(){
  this.setState(prevState => {
     prevState.operation='update';
  });
 
}

addExpression(ev){
  // let currentExpList=this.state.expressionList;
  const currentExpList = this.state.expressionList;
  const key=this.state.latestExpKey;
  let myobj={operation:'create','index':key};
  currentExpList.splice( 0, 0, myobj );
  // currentExpList.push({operation:'create'});
  this.setState({expressionList:currentExpList,latestExpKey:(key +1)});
}

addAction(ev){
  // let currentExpList=this.state.expressionList;
  const currentActionList = this.state.actionList;
  const key=this.state.latestActKey;
  let myobj={operation:'create','index':key};
  currentActionList.splice( 0, 0, myobj );
  // currentExpList.push({operation:'create'});
  this.setState({actionList:currentActionList,latestActKey:(key+1)});
}

addRule(e){
  console.log("Create Rule ");
  

  let output={};
  output.name=this.state.name;
  output.createdon=this.state.createdon;
  output.definition="na";
  output.space=this.state.space;
  output.rulestatus={'id':1,'status':'Active'};
  output.actionList=this.state.actionList;
  output.expressionList=this.state.expressionList;
  
  console.log("All Data "+JSON.stringify(output));
  
  Axios.post('/rule/create', output).then(response=>{ 
    let output_data = response.data;
    if(output_data.status == "SUCCESS"){
      console.log("Rule Created Successfully"+JSON.stringify(output_data.data));
      this.cancelAdd();
    }else{
      console.log("Error Fetching Static data "+JSON.stringify(output_data));
    }
  }).catch(error=>{
    console.log("Error Fetching Static data "+error);
  });

}

expressionAdded(e){
  console.log("Expression Update Called "+JSON.stringify(e));
  console.log("Expression List "+JSON.stringify(this.state.expressionList));
  for(let i=0; i < this.state.expressionList.length;i++ ){
    let index=i;
    let t=this.state.expressionList[i];
   console.log("Comparing:"+e.index +" With "+t.index);
    if(t.index == e.index){
      if(e.action == 'addCancel'){
        /*Remove Element from Array */
        this.state.expressionList.splice(index,1);
        this.setState({expressionList:this.state.expressionList});
        return false;
      }else if(e.action == 'update'){
        /*Update Element in Array */
        console.log("Element Updated "+JSON.stringify(e));
        this.state.expressionList[index]=e;
        this.setState({expressionList:this.state.expressionList});
        return false;
      }else if( e.action == 'add'){
        /*Update Element in Array */
        console.log("Element Added "+JSON.stringify(e));
        this.state.expressionList[index]=e;
        this.setState({expressionList:this.state.expressionList});
        return false;
      }else if( e.action == 'delete'){
        /*Delete Element from Array */
         console.log("Newly Created Element Deleted "+JSON.stringify(e));
          let newList=this.state.expressionList;
          newList.splice(index,1);
          this.setState({expressionList:newList});
          return false;
      }
    }
  };
 }


 actionAdded(e){
  console.log("action Update Called "+JSON.stringify(e));
  console.log("action List "+JSON.stringify(this.state.actionList));
  for(let i=0; i < this.state.actionList.length;i++ ){
    let index=i;
    let t=this.state.actionList[i];
    console.log("Comparing:"+e.index +" With "+t.index);
    if(t.index == e.index){
      if(e.action == 'addCancel'){
        /*Remove Element from Array */
        this.state.actionList.splice(index,1);
        this.setState({actionList:this.state.actionList});
        return false;
      }else if(e.action == 'update'){
        /*Update Element in Array */
        console.log("Element Updated "+JSON.stringify(e));
        this.state.actionList[index]=e;
        this.setState({actionList:this.state.actionList});
        return false;
      }else if( e.action == 'add'){
        /*Update Element in Array */
        console.log("Element Added "+JSON.stringify(e));
        this.state.actionList[index]=e;
        this.setState({actionList:this.state.actionList});
        return false;
      }else if( e.action == 'delete'){
        /*Delete Element from Array */
         console.log("Newly Created Element Deleted "+JSON.stringify(e));
          let newList=this.state.actionList;
          newList.splice(index,1);
          this.setState({actionList:newList});
          return false;
      }
    }
  };
 }

render() {  

    if(this.state.loadAddRuleList == 1){
      return <RuleList/>;
    }
    const actionList=[];
    this.state.actionList.forEach ((t,index) => {
        actionList.push(
          <Action key={t.index} operation={t.operation} data={t} staticdata={this.state.staticdata} mycallback={this.actionAdded}/>
        );
    });

    const expressionList=[];
    this.state.expressionList.forEach ((t,index) => {
      expressionList.push(
        <Expression  key={t.index} operation={t.operation} data={t} mycallback={this.expressionAdded}/>
        );
    });
    console.log("Expression List:"+JSON.stringify(this.state.expressionList));
    const spaceListOptions=[];
    this.state.spaceList.forEach ((t) => {
      spaceListOptions.push(
        {value:t.id,label:t.name}
      );
    });

   
    return (

      <div >
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader style={{backgroundColor:'#abb2b9',color:'#ffff',fontWeight:'bold'}}>
                <Row>
                  <Col md={9}>
                    <h5><b>Add New Rule</b></h5>
                  </Col>
                  <Col md={3}>
                    <div style={{float:'right',marginTop: "-0.5em"}}>
                           <i className="fa fa-remove" title="Cancel Add" style={{cursor:"pointer",display: "inline-block",borderRadius: "60px",
                        boxShadow: "0px 0px 2px #888",
                        padding: "0.5em 0.6em",
                      backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={this.cancelAdd.bind(this)}></i>&nbsp;
                           
                    </div>
                  </Col>
                </Row>
              </CardHeader>
            </Card>
          </Col>
        </Row>
              
        <Row md={12}> 
          <Col md={6}>
            <Row md={12}>
                <Col md={4}><label className='tdleft'>
                      Name
                  </label></Col>
                <Col md={8}>
                <Input className='tdright' type='text' name='expval' value={this.state.name} onChange={this.handleNameChange.bind(this)} >
                      </Input>
                      </Col>
            </Row>
             
            
          </Col>
            <Col md={6}>
            <Row md={12}>
              <Col md={4}><label className='tdleft'>
                    Space
                </label></Col>
              <Col md={8}><Select className='tdright' options={spaceListOptions}   placeholder='Select Space' onChange={this.handleSpaceChange.bind(this)}>
                     </Select></Col>
            </Row>
             
            
          </Col>
        </Row>
        
          <Row style={{'paddingTop':'1em'}}>
            
              <Col md={6}>

                <Card>
                  <CardHeader style={{backgroundColor:'#abb2b9',color:'#ffff',fontWeight:'bold'}}>
                    <Row md={12}>
                      <Col md={6}>
                        <h5><b>Expression</b></h5>
                      </Col>
                      <Col md={6}>
                        <div style={{float:'right',marginTop: "-0.5em"}}>
                             <i className="fa fa-plus" title="Add Expression" style={{cursor:"pointer",display: "inline-block",borderRadius: "60px",
                            boxShadow: "0px 0px 2px #888",
                            padding: "0.5em 0.6em",
                          backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={this.addExpression.bind(this)}></i>&nbsp;
                               
                        </div>
                      </Col>
                    </Row> 
                  </CardHeader>
                  <CardBody>
                  {expressionList}
                  </CardBody>    
                </Card>
                </Col>
              <Col md={6}>
                <Card>
                  <CardHeader style={{backgroundColor:'#abb2b9',color:'#ffff',fontWeight:'bold'}}>
                  <Row md={12}>
                      <Col md={6}>
                        <h5><b>Action</b></h5>
                      </Col>
                      <Col md={6}>
                        <div style={{float:'right',marginTop: "-0.5em"}}>
                              <i className="fa fa-plus" title="Add Action" style={{cursor:"pointer",display: "inline-block",borderRadius: "60px",
                            boxShadow: "0px 0px 2px #888",
                            padding: "0.5em 0.6em",
                          backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={this.addAction.bind(this)}></i>&nbsp;
                                 
                        </div>
                      </Col>
                    </Row> 
                  </CardHeader>
                  <CardBody>
                  {actionList}
                  </CardBody>    
                </Card>
                </Col>
            </Row>
            <Row style={{'paddingTop':'1em'}}>
              <Col md={12}>
              <Button color="success" size="sm" onClick={this.addRule.bind(this)}><i className="fa fa-check" ></i>&nbsp;Add</Button>
              </Col>
            </Row>

      </div>
    );
  }
}

export default RuleCreate;
     

