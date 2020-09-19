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
import RuleList from './RuleList';

class RuleEdit extends Component {
  constructor(props) {
    super(props);
    //console.log("RuleEdit:"+JSON.stringify(props));
    if(null != props.location.ruledata.actionList){
        props.location.ruledata.actionList.forEach ((t,index) => {
            t.operation='update';
            t.index=index;
        });
    };

    if(null != props.location.ruledata.expressionList){
        props.location.ruledata.expressionList.forEach ((t,index) => {
            t.operation='update';
            t.index=index;
        })
    };
    this.state={
        id: props.location.ruledata.id,
        name: props.location.ruledata.name,
        definition: props.location.ruledata.definition,
        createdon: props.location.ruledata.createdon,
        updatedon: props.location.ruledata.updatedon,
        space:props.location.ruledata.space,
        rulestatus:props.location.ruledata.rulestatus,
        actionList:props.location.ruledata.actionList,
        expressionList:props.location.ruledata.expressionList,
        ruleConfigObjectList:props.location.ruledata.ruleConfigObjectList,
        operation:props.operation,
        deletedExpressions:[],
        deletedActions:[],
        ruleStatusList:[],
        latestExpKey:props.location.ruledata.expressionList.length,
        latestActKey:props.location.ruledata.actionList.length 
      };
     
    //console.log("Input State:"+JSON.stringify(this.state));
    this.editrule=this.editrule.bind(this);
};

// fetchStaticData(){
//   return Axios.post('/static/getall/', null).then(response=>{ 
//     let output_data = response.data;
//     if(output_data.status == "SUCCESS"){
//       this.state.staticdata=output_data.data;
//       //console.log("Rule Get Response:"+JSON.stringify(this.state));
      
//     }else{
//     }
//   }).catch(error=>{
//     //console.log("Error Fetching Static data "+error);
//   });
// }


componentDidMount(ev) {
  
    Axios.post('/space/getall/', null).then(response=>{ 
    let output_data = response.data;
    if(output_data.status == "SUCCESS"){
      this.setState({ 
        spaceList: output_data.data,
      });
    }else{
    }
  }).catch(error=>{
    //console.log("Error Fetching Static data "+error);
  });
  
  let ruleStatusList = JSON.parse(localStorage.getItem('ruleStatusList'));
  this.setState({ 
    ruleStatusList: ruleStatusList
  });
  // Axios.post('/static/getall/', null).then(response=>{ 
  //   let output_data = response.data;
  //   if(output_data.status == "SUCCESS"){
  //     this.setState({ 
  //       ruleStatusList: output_data.data.ruleStatusList ,
  //     });
  //    }else{
  //   }
  // }).catch(error=>{
  //   //console.log("Error Fetching Static data "+error);
  // });

}
cancelAdd(ev){
    //console.log("Cancel Add:");
    this.props.history.push({
      pathname:'/rulelist'
      })
}

handleNameChange(event) {
  this.setState({name: event.target.value})
}

handleSpaceChange(e){
  this.state.spaceList.forEach ((t) => {
    if(t.id == e.value){
      this.setState({space:t, selectedspace:{label: t.name,value: t.id}});
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
  let currentExpList = this.state.expressionList;
  const key=this.state.latestExpKey;
  let myobj={operation:'create','index':key};
  currentExpList.splice( 0, 0, myobj );
  this.setState({expressionList:currentExpList,latestExpKey:(key +1)});
}

addAction(ev){
  const currentActionList = this.state.actionList;
  const key=this.state.latestActKey;
  let myobj={operation:'create','index':key};
  currentActionList.splice( 0, 0, myobj );
  this.setState({actionList:currentActionList,latestActKey:(key+1)});
 }

updateRule(e){
  //console.log("Update Rule ");
  let output={};
  output.id=this.state.id;
  output.name=this.state.name;
  output.createdon=this.state.createdon;
  output.updatedon=Date();
  output.definition="na";
  output.space=this.state.space;
  output.rulestatus=this.state.rulestatus;
  output.actionList=this.state.actionList;
  output.actionList=output.actionList.concat(this.state.deletedActions);
  output.expressionList=this.state.expressionList;
  output.expressionList=output.expressionList.concat(this.state.deletedExpressions);
  for(let i=0;i < output.actionList.length;i++){
    if(null == output.actionList[i].action){
      output.actionList[i].action='update';
    }
  }
  for(let i=0;i < output.expressionList.length;i++){
    if(null == output.expressionList[i].action){
      let expression=output.expressionList[i];
      expression.action='update';
      output.expressionList[i]=expression;
    }
  }
  //console.log("Output Data "+JSON.stringify(output));

  //console.log("State Data "+JSON.stringify(this.state));
  
  Axios.post('/rule/update', output).then(response=>{ 
    let output_data = response.data;
    if(output_data.status == "SUCCESS"){
      //console.log("Rule Updated Successfully"+JSON.stringify(output_data.data));
      this.cancelAdd();
    }else{
      //console.log("Error Update Failed "+JSON.stringify(output_data));
    }
  }).catch(error=>{
    //console.log("Error Fetching Static data "+error);
  });

}


expressionUpdated(e){
  //console.log("Expression Update Called "+JSON.stringify(e));
  // this.state.expressionList.every ((t,index) => {
    
  for(let i=0; i < this.state.expressionList.length;i++ ){
    let index=i;
    let t=this.state.expressionList[i];
    //console.log("Comparing:"+e.index +" With "+t.index);
    if(t.index == e.index){
      //console.log("Index "+t.index);
      if(e.action == 'addCancel'){
        /*Remove Element from Array */
        this.state.expressionList.splice(index,1);
        this.setState({expressionList:this.state.expressionList});
        return false;
      }else if(e.action == 'update'){
        /*Update Element in Array */
        //console.log("Element Updated "+JSON.stringify(e));
        this.state.expressionList[index]=e;
        this.setState({expressionList:this.state.expressionList});
        return false;
      }else if( e.action == 'add'){
        /*Update Element in Array */
        //console.log("Element Added "+JSON.stringify(e));
        this.state.expressionList[index]=e;
        this.setState({expressionList:this.state.expressionList});
        return false;
      }else if( e.action == 'delete'){
        /*Delete Element from Array */
       
        if(null == e.id){
          //console.log("Newly Created Element Deleted "+JSON.stringify(e));
          this.state.expressionList.splice(index,1);
          this.setState({expressionList:this.state.expressionList});
          return false;
        }else{
          let deletedExpressions=this.state.deletedExpressions;
          deletedExpressions.push(e);
          this.state.expressionList.splice(index,1);
          this.setState({expressionList:this.state.expressionList,deletedExpressions:deletedExpressions });
          //console.log("Deleted Expressions "+JSON.stringify(deletedExpressions));
          return false;
        }
      }
    }
  };
}

actionUpdated(e){
  // let newActionList=this.state.actionList;
  for(let i=0; i < this.state.actionList.length;i++ ){
    let index=i;
    let t=this.state.actionList[i];
    if(t.index == e.index){
      if(e.action == 'addCancel'){
        /*Remove Element from Array */
        this.state.actionList.splice(index,1);
        this.setState({actionList:this.state.actionList});
        return false;
      }else if(e.action == 'update'){
        /*Update Element in Array */
        //console.log("Element Updated "+JSON.stringify(e));
        this.state.actionList[index]=e;
        this.setState({actionList:this.state.actionList});
        return false;
      }else if( e.action == 'add'){
        /*Update Element in Array */
        //console.log("Element Added "+JSON.stringify(e));
        this.state.actionList[index]=e;
        this.setState({actionList:this.state.actionList});
        return false;
      }else if( e.action == 'delete'){
        /*Delete Element from Array */
       
        if(null == e.id){
          //console.log("Newly Created Element Deleted "+JSON.stringify(e));
          this.state.actionList.splice(index,1);
          this.setState({actionList:this.state.actionList});
          return false;
        }else{
          let deletedActions=this.state.deletedActions;
          deletedActions.push(e);
          this.state.actionList.splice(index,1);
          this.setState({actionList:this.state.actionList,deletedActions:deletedActions });
          //console.log("Index:"+index);
          //console.log("Deleted Actions "+JSON.stringify(deletedActions));
          return false;
        }
      }
    }
  };
}

  

handleStatusChange(e){
  this.state.ruleStatusList.forEach ((t) => {
    if(t.id == e.value){
      // //console.log("List:"+JSON.stringify(t));
      this.setState({rulestatus:t});
    }
  });
}

render() {
   
    const actionList=[];
    this.state.actionList.forEach ((t) => {
        actionList.push(
          <Action key={t.index} index={t.index} operation={t.operation} data={t} staticdata={this.state.staticdata} mycallback={this.actionUpdated.bind(this)}/>
        );
    });

    const spaceListOptions=[];
    if(null != this.state.spaceList){
        this.state.spaceList.forEach ((t) => {
            spaceListOptions.push(
              {value:t.id,label:t.name}
            );
          });
    }
    
    let selectedspace={};
    if(null != this.state.space){
      selectedspace={value:this.state.space.id,label:this.state.space.name};
    }
    //console.log("Selected Space:"+JSON.stringify(selectedspace));
    const expressionList=[];
    this.state.expressionList.forEach ((t) => {
      expressionList.push(
        <Expression staticdata={this.state.staticdata}  key={t.index} operation={t.operation} data={t} configObjectList={this.state.ruleConfigObjectList} mycallback={this.expressionUpdated.bind(this)}/>
      );
    });
    //console.log("Total Expressions:"+this.state.expressionList.length);
    //console.log("Expressions:"+JSON.stringify(this.state.expressionList));
    let ruleStatuslist=[];
    if(null != this.state.ruleStatusList){
      this.state.ruleStatusList.forEach((t) => {
        ruleStatuslist.push(
          {value:t.id,label:t.status}
        );
      });
    }
    
    let selectedStatus={};
    if(null != this.state.rulestatus){
      selectedStatus={value:this.state.rulestatus.id,label:this.state.rulestatus.status};
    }
    // //console.log(JSON.stringify(this.state.expressionList));
    //console.log("Action List"+JSON.stringify(this.state.actionList));
   
    return (
      <div >
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader style={{backgroundColor:'#abb2b9',color:'#ffff',fontWeight:'bold'}}>
                <Row>
                  <Col md={9}>
                    <h5><b>Edit Rule</b></h5>
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
          <Col md={4}>
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
          <Col md={4}>
            <Row md={12}>
              <Col md={4}>
                <label className='tdleft'>
                    Space
                </label>
                </Col>
              <Col md={8}>
                  <Select className='tdright' options={spaceListOptions}  value={selectedspace} placeholder='Select Space' onChange={this.handleSpaceChange.bind(this)}>
                  </Select>
              </Col>
            </Row>
          </Col>
           <Col md={4}>
            <Row md={12}>
              <Col md={4}>
                <label className='tdleft'>
                    Status
                </label>
                </Col>
              <Col md={8}>
                  <Select className='tdright' options={ruleStatuslist}  value={selectedStatus} placeholder='Select Status' onChange={this.handleStatusChange.bind(this)}>
                  </Select>
              </Col>
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
                        backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={e=>this.addExpression(e)}></i>&nbsp;
                        
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
                        backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={e=>this.addAction(e)}></i>&nbsp;
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
            <Button color="success" size="sm" onClick={this.updateRule.bind(this)}><i className="fa fa-check" ></i>&nbsp;Update</Button>
            </Col>
        </Row>

      </div>
    );
  }
  // render() {

  //   // let server = this.props.location.state.detail;
  //   const configList=[];
  //   this.state.ruleConfigObjectList.forEach ((co) => {
  //       let t=co.configobjectDetails;
  //       configList.push(
  //           <ConfigObject name={t.name} key={t.id}   id={t.id} 
  //               attributes={t.attributeList} />
  //       );
  //   });
  //   return this.viewOperation();
  // }
}

export default RuleEdit;
     

