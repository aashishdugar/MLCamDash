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
  Icon
} from 'reactstrap';
import './Rule.scss';
import ConfigObject from './ConfigObject';
import Expression from './Expression';
import Action from './Action';
import Axios from 'axios';
import Moment from 'moment';
import SweetAlert from "react-bootstrap-sweetalert";
import Switch from '@material-ui/core/Switch';


class RuleDetails extends Component {
  constructor(props) {
    super(props);
    
    let ruleStatusChage=false;

    if(props.location && props.location.ruledata && props.location.ruledata.id){
      
      if(null != props.location.ruledata.rulestatus && props.location.ruledata.rulestatus.status == 'Active'){
        ruleStatusChage=true;
      }
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
        ruleDeleteAlert:false,
        statusUpdateAlert:false,
        statusChangeMsg:"You Want to change Rule Status",
        deleteMsg:"Once Deleted Rule Cannot be Recovered",
        ruleStatusChage:ruleStatusChage,
        ruleStatusList:[]
      }
    }else if (props.ruledata && props.ruledata.id){
      if(null != props.ruledata.rulestatus && props.ruledata.rulestatus.status == 'Active'){
        ruleStatusChage=true;
      }
      this.state={
        id: props.ruledata.id,
        name: props.ruledata.name,
        definition: props.ruledata.definition,
        createdon: props.ruledata.createdon,
        updatedon: props.ruledata.updatedon,
        space:props.ruledata.space,
        rulestatus:props.ruledata.rulestatus,
        actionList:props.ruledata.actionList,
        expressionList:props.ruledata.expressionList,
        ruleConfigObjectList:props.ruledata.ruleConfigObjectList,
        operation:props.operation,
        ruleDeleteAlert:false,
        statusUpdateAlert:false,
        statusChangeMsg:"You Want to change Rule Status",
        deleteMsg:"Once Deleted Rule Cannot be Recovered",
        ruleStatusChage:ruleStatusChage,
        ruleStatusList:[]
      }
    }else{
      this.state={
        id: '',
        name: '',
        definition: '',
        createdon: '',
        updatedon: '',
        space:{},
        rulestatus:{},
        actionList:[],
        expressionList:[],
        ruleConfigObjectList:[],
        ruleDeleteAlert:false,
        statusUpdateAlert:false,
        statusChangeMsg:"You Want to change Rule Status",
        deleteMsg:"Once Deleted Rule Cannot be Recovered",
        ruleStatusChage:ruleStatusChage,
        ruleStatusList:[]
      }
    }

    //console.log("State:"+JSON.stringify(this.state));
    this.editrule=this.editrule.bind(this);
    
};

componentDidMount(ev) {
  console.log("Fetching Static data ");
  Axios.post('/static/getall/', null).then(response=>{ 
    let output_data = response.data;
    if(output_data.status == "SUCCESS"){
      this.setState({ 
        ruleStatusList: output_data.data.ruleStatusList ,
      });
     }else{
    }
  }).catch(error=>{
    console.log("Error Fetching Static data "+error);
  });
}

deleteRuleFromBackend(){
  // let output={id:this.id};
  console.log("Deleting rule "+this.state.id)
  return Axios.post('/rule/delete/'+this.state.id, null).then(response=>{ 
    let output_data = response.data;
    if(output_data.status == "SUCCESS"){
      this.state.staticdata=output_data.data;
      console.log("Rule Deleted Successfully:"+JSON.stringify(this.state));
      this.setState({ruleDeleteAlert:false});
      this.props.history.push({
        pathname:'/rule',
        ruledata:this.state
      })
    }else{
    }
  }).catch(error=>{
    this.setState({ruleDeleteAlert:false});
    //console.log("Error Fetching Static data "+error);
  });
}

getRuleData = (id) => {
  if(null == id){
    return;
  }
  Axios.post('/rule/get/'+id, null).then(response=>{ 
    let output_data = response.data;
    if(output_data.status == "SUCCESS"){
      //console.log("Rule Get Response:"+JSON.stringify(output_data.data));
    }else{
    }
  }).catch(error=>{});
}

editrule(){
  this.props.history.push({
    pathname:'/ruleedit',
    ruledata:this.state
  })
}

deleterule(){
  console.log("Rule Delete Called")
  this.setState({ruleDeleteAlert:true});
}
hideAlert(){
  this.setState({ruleDeleteAlert:false});
}
createOperation(){
  const actionList=[];
  this.state.actionList.forEach ((t) => {
      actionList.push(
        <Action operation='create' data={t}/>
      );
  });

}


changeRuleStatus(){
  console.log("Rule Status Change Called")
  this.setState({statusUpdateAlert:true});
}

hideStatusChangeAlert(){
  this.setState({statusUpdateAlert:false});
}
changeBackendRuleStatus(){
  let newStatus=!this.state.ruleStatusChage;
  let status='Active';
  if(!newStatus){
    status='In-Active';
  }
  console.log('Change Status To'+newStatus);

  for(let i=0;i < this.state.ruleStatusList.length;i ++ ) {
   if(this.state.ruleStatusList[i].status == status){
    /*Call Service to change Status*/
    let data={};
    data.id=this.state.id;
    data.rulestatus=this.state.ruleStatusList[i];
    Axios.post('/rule/updatestatus/', data).then(response=>{ 
      let output_data = response.data;
      if(output_data.status == "SUCCESS"){
        console.log("Rule Status Change Response:"+JSON.stringify(output_data.data));
        this.setState({ruleDeleteAlert:false});
        this.setState({rulestatus:output_data.data.rulestatus,ruleStatusChage:newStatus,statusUpdateAlert:false});
      }else{
        console.log("Error:"+JSON.stringify(output_data.data));
        this.setState({statusUpdateAlert:false});
      }
    }).catch(error=>{
      this.setState({statusUpdateAlert:false});
    });
    }
  };
  
}


render() {
    const actionList=[];
    this.state.actionList.forEach ((t) => {
        actionList.push(
          <Action key={t.id} operation='view' data={t}/>
        );
    });
   
    const expressionList=[];
    this.state.expressionList.forEach ((t) => {
      expressionList.push(
          <Expression staticdata={this.state.staticdata} key={t.id} operation='view' data={t} configObjectList={this.state.ruleConfigObjectList}/>
                 
        );
    });

    let spaceName="";
    if(null != this.state.space && null != this.state.space.name){
      spaceName=this.state.space.name;
    }
    return (

      <div >
        {this.state.ruleDeleteAlert && (
          <SweetAlert
            warning
            showCancel
            confirmBtnText="Delete"
            cancelBtnText="Cancel"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="success"
            title="Are You Sure?"
            onConfirm={() => this.deleteRuleFromBackend()}
            onCancel={() => this.hideAlert()}
          >
           {this.state.deleteMsg}
          </SweetAlert>
        )}

        {this.state.statusUpdateAlert && (
          <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes"
            cancelBtnText="No"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="success"
            title="Are You Sure?"
            onConfirm={() => this.changeBackendRuleStatus()}
            onCancel={() => this.hideStatusChangeAlert()}
          >
           {this.state.statusChangeMsg}
          </SweetAlert>
        )}
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader style={{backgroundColor:'#abb2b9',color:'#ffff',fontWeight:'bold'}}>
                <Row>
                  <Col md={9}>
                    <h5><b>Rule Details</b></h5>
                    <h5><b>{ this.cameras }</b></h5>
                  </Col>
                  <Col md={3}>
                    <div style={{float:'right',marginTop: "-0.5em"}}>
                             <i className="fa fa-pencil" title="Edit Rule" style={{cursor:"pointer",display: "inline-block",borderRadius: "60px",
                        boxShadow: "0px 0px 2px #888",
                        padding: "0.5em 0.6em",
                      backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={this.editrule}></i>&nbsp;
                          <i className="fa fa-trash" title="Delete Rule" style={{cursor:"pointer",display: "inline-block",borderRadius: "60px",
                        boxShadow: "0px 0px 2px #888",
                        padding: "0.5em 0.6em",
                      backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={this.deleterule.bind(this)}></i>&nbsp;
                          
                    </div>
                  </Col>
                </Row>
              </CardHeader>
            </Card>
          </Col>
        </Row>
              
        <Row md={12}> 
          <Col md={3}>
            
              <div >
                <label className='tdleft'>
                    Name
                </label>
                <label className='tdright'>
                  {this.state.name}
                </label>
              </div>
            
          </Col>
          
          <Col md={3}>
            
              <div >
                <label className='tdleft'>
                    Space
                </label>
                <label className='tdright'>
                {spaceName}
                </label>
              </div>
            
          </Col>
          <Col md={2}>
            
              <div >
                <label className='tdleft'>
                    Status
                </label>
                <label className='tdright'>
                {/* {this.state.rulestatus.status} */}
                <Switch
                            checked={this.state.ruleStatusChage}
                            onChange={this.changeRuleStatus.bind(this)}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                </label>
              </div>
            
          </Col>
          <Col md={4}>
            
              <div >
                <label className='tdleft'>
                    Created On
                </label>
                <label className='tdright'>
                  {null != this.state.createdon ? Moment(this.state.createdon).format('DD MMM YYYY, h:mm:ss a'):''}
                </label>
              </div>
            
          </Col>
          
        </Row>
        <Row md={12}> 
          
          <Col md={4}>
              <div >
                <label className='tdleft'>
                    Updated On
                </label>
                <label className='tdright'>
                  {null != this.state.updatedon ? Moment(this.state.updatedon).format('DD MMM YYYY, h:mm:ss a'):''}
                </label>
              </div>
            
          </Col>
          
        </Row>
        
          <Row style={{'paddingTop':'1em'}}>
            
              <Col md={6}>

                <Card>
                  <CardHeader style={{backgroundColor:'#abb2b9',color:'#ffff',fontWeight:'bold'}}>
                    <span >Expression</span>
                  </CardHeader>
                  <CardBody>
                  {expressionList}
                  </CardBody>    
                </Card>
                </Col>
              <Col md={6}>
                <Card>
                  <CardHeader style={{backgroundColor:'#abb2b9',color:'#ffff',fontWeight:'bold'}}>
                    <span >Action</span>
                  </CardHeader>
                  <CardBody>
                  {actionList}
                  </CardBody>    
                </Card>
                </Col>
            </Row>

      </div>
    );
  }
   
  
}

export default RuleDetails;
     

