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
  UncontrolledAlert
} from 'reactstrap';
import Grid from '@material-ui/core/Grid';

import Cameras from '../Cameras/camera';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
class ServerDetails extends Component {
  constructor(props) {
    
    super(props);
    this.deviceTypeList = JSON.parse(localStorage.getItem('deviceTypeList'));
    this.deviceStatusList = JSON.parse(localStorage.getItem('deviceStatusList'));

    // console.log("id "+JSON.stringify(this.props.location.state.detail));
    let server = this.props.location.state.detail
     console.log("id "+JSON.stringify(server));
    this.state = {
      showEditServer:false,
      serverid:"",
      name:"",
      manufacturer:"",
      uuid:"",
      ipaddress:"",
      servertype:"",
      serverstatus:"",
      serverDetails:server,
      serversCameraList:server.cameraList,
      namedetails:server.name,
      manufacturerdetails:server.manufacturer,
      uuiddetails:server.uuid,
      ipaddressdetails:server.ipaddress,
      servertypedetails:server.deviceType.type,
      serverstatusdetails:server.deviceStatus.status,
    }
    
    this.updateState = this.updateState.bind(this);
    this.updatemMnufacturer = this.updatemMnufacturer.bind(this);
    this.updatemUuid = this.updatemUuid.bind(this);
    this.updatemIpaddress = this.updatemIpaddress.bind(this);
    this.updateSerevrType = this.updateSerevrType.bind(this);
    this.updateServerStatus = this.updateServerStatus.bind(this);
    this.startCamlRuntime = this.startCamlRuntime.bind(this);
    this.stopCamlRuntime = this.stopCamlRuntime.bind(this);

 };
 updateState(e) {
  this.setState({name: e.target.value});

}
updatemMnufacturer(e) {
  this.setState({manufacturer: e.target.value});

}
updatemUuid(e) {
  this.setState({uuid: e.target.value});

}

updatemIpaddress(e) {
  this.setState({ipaddress: e.target.value});

}

updateSerevrType(e) {
  this.setState({servertype: e.target.value});

}

updateServerStatus(e) {
  this.setState({serverstatus: e.target.value});

}

startCamlRuntime(e) {
  

  // Send a message to zmq
  Axios.post('/camlruntime/start', {}).then(response=>{ 
    let output_data = response.data;
    console.log("res "+JSON.stringify(output_data.status));
    if(output_data.status == 'SUCCESS'){
      // TODO: handle this
    }else{
      // TODO: handle this
    }
 }).catch(error=>{});

 // Disable the button for 10 seconds

}

stopCamlRuntime(e) {
  // Send a message to zmq
  Axios.post('/camlruntime/stop', {}).then(response=>{ 
    let output_data = response.data;
    console.log("res "+JSON.stringify(output_data.status));
    if(output_data.status == 'SUCCESS'){
      // TODO: handle this
    }else{
      // TODO: handle this
    }
  }).catch(error=>{});

  // Disable the button for 10 seconds
  
}



  renderEditServer() {
    return (
       <Card >
         <CardHeader style={{backgroundColor:"#abb2b9",color:"#fdfefe"}}>
         <Grid container spacing={3}>
  <Grid item xs={10}>
  <h5><b>Edit Server Details</b></h5>
  </Grid>
  <Grid item xs={2}>
    <div style={{marginTop: "-0.5em"}}>
  <span className="fa fa-times-circle" style={{float:"right",cursor:"pointer",fontSize: "2em"}} onClick={e=>this.removeServer(e)}></span>
  </div>
  </Grid>

</Grid>

         </CardHeader>
         <CardBody>
    <Row>
         
        <Col md={3}>
     <TextField  fullWidth id="name" label="Name" name="Name"  value = {this.state.name} onChange = {this.updateState} autoFocus/>
  
    </Col>
  
    <Col md={3}>
    <TextField  fullWidth id="manufacturer" label="Manufacturer" value={this.state.manufacturer} onChange = {this.updatemMnufacturer}  name="manufacturer" autoComplete="Manufacturer" />
    </Col>
    <Col md={3}>
    <TextField  fullWidth id="uuid" label="UUID" name="uuid" value={this.state.uuid} onChange = {this.updatemUuid}  autoComplete="Manufacturer" />
    </Col>
    <Col md={3}>
    <TextField  fullWidth id="ipaddress" label="ipaddress" name="ipaddress" value={this.state.ipaddress} onChange = {this.updatemIpaddress} autoComplete="Manufacturer" />
    </Col>
    </Row>

    <Row>
         
         <Col md={3}>
     <FormControl fullWidth  >
     <InputLabel id="demo-simple-select-label">Server Type</InputLabel>
  <Select

    labelId="demo-simple-select-label"
    id="demo-simple-select"
    fullWidth 
   ipaddress
   value={this.state.servertype}
   onChange = {this.updateSerevrType} 
  >
                  {this.deviceTypeList.map((e, keyIndex) => {
    return (<MenuItem key={keyIndex} value={e.id}>{e.type}</MenuItem>);
 })     
}  
   
  </Select>
  </FormControl>
    </Col>
    <Col md={3}>
     <FormControl fullWidth >
     <InputLabel id="demo-simple-select-label">Server Status</InputLabel>
  <Select

    labelId="demo-simple-select-label"
    id="demo-simple-select"
    fullWidth 
    value={this.state.serverstatus}
    onChange = {this.updateServerStatus} 
  >
      {this.deviceStatusList.map((e, keyIndex) => {
    return (<MenuItem key={keyIndex} value={e.id}>{e.status}</MenuItem>);
 })     
}      
   
  </Select>
  </FormControl>
    </Col>
    </Row>
    
     
         </CardBody>
         <CardFooter>

         <Button color="success" size="sm" onClick={e=>this.updateServer(e)}><i className="fa fa-check" ></i>&nbsp;Update</Button>{' '}
         </CardFooter>
       </Card>
    //  </Col>
    
    )



}
editServer = (e,server) =>{
  // console.log("server Details "+ JSON.stringify(server));
  this.setState({
    serverid:server.id,
    showEditServer: true,
    name:server.name,
    manufacturer:server.manufacturer,
    uuid:server.uuid,
    ipaddress:server.ipaddress,
    servertype:server.deviceType.id,
    serverstatus:server.deviceStatus.id,
    });
// console.log("server Details "+ JSON.stringify(server));


  }
  removeServer = (e) =>{
    this.setState({
      showEditServer: false
      });
  
    }

    updateServer = (e) =>{



const postObject={
  "id":this.state.serverid,
  "name": this.state.name,
  "manufacturer": this.state.manufacturer,
  "icon": null,
  "ipaddress": this.state.ipaddress,
  "uuid": this.state.uuid,
  "image": null,
  "deviceType": {
    "id":this.state.servertype
  },
  "deviceStatus": {
    "id":this.state.serverstatus
  }
}

Axios.post('/device/update', postObject).then(response=>{ 


let output_data = response.data;
let res = output_data.data
if(output_data.status == "SUCCESS"){
  

  this.state.namedetails = res.name;
  this.state.manufacturerdetails = res.manufacturer;
  this.state.uuiddetails = res.uuid;
  this.state.ipaddressdetails = res.ipaddress;
  this.state.servertypedetails = res.deviceType.type;
  this.state.serverstatusdetails = res.deviceStatus.status;
this.setState({
  showSuccessAlert: true,
  showSuccessLoader: false,

});

setTimeout(() => {
  this.setState({
    showSuccessAlert: false
  });
}, 2000);
// this.props.history.push('/home');  


}else{

this.errorMsg = output_data.errormsg;
this.setState({
  showFailAlert: true
});

setTimeout(() => {
  this.setState({
    showFailAlert: false
  });
}, 4000);

}

}).catch(error=>{});

  
    }
  render() {

    return (
      <React.Fragment>
        <Grid container spacing={3}>
          <Grid item xs={9}>
            <h4>Caml Server Details</h4>
          </Grid>
        </Grid>
        <div>
          <Grid container spacing={3} style={{position: "absolute"}}>
            <Grid item xs={4}>
              { this.state.showSuccessAlert && <UncontrolledAlert color="success" style={{zIndex: "2"}}>
              {"Caml Server Updated Successfully"}
                      </UncontrolledAlert>}
                      { this.state.showFailAlert && <UncontrolledAlert color="danger" style={{zIndex: "2"}}>
                  {this.errorMsg }
                      </UncontrolledAlert>}
            </Grid>
          </Grid>
        </div>
        <Row>
          <Col md={12}>
            { this.state.showEditServer && this.renderEditServer()}
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Card style={{boxShadow:" 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}>
              <CardHeader style={{backgroundColor: '#abb2b9'}}>
                <Row>
                  <Col md={9}>
                    <h5 style={{color: "#fff"}}><b>{this.state.namedetails}</b></h5>
                  </Col>
                  <Col md={3}>
                    <div  style={{float:"right",marginTop: "-0.5em"}}>
                            <i className="fa fa-pencil" style={{cursor:"pointer",display: "inline-block",borderRadius: "60px",
                          boxShadow: "0px 0px 2px #888",
                          padding: "0.5em 0.6em",
                          backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={e=>this.editServer(e,this.state.serverDetails)}></i>&nbsp;
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Row>
                      <Col md={3}>
                        <label>Manufacturer:</label>
                      </Col>
                      <Col md={3}>
                        <span>{this.state.manufacturerdetails}</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <label>IP Address:</label>
                      </Col>
                      <Col md={3}>
                        <span>{this.state.ipaddressdetails}</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <label>Server Type:</label>
                      </Col>
                      <Col md={3}>
                        <span>{this.state.servertypedetails}</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <label>Server Status:</label>
                      </Col>
                      <Col md={3}>
                         <span>{this.state.serverstatusdetails}</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                        <label>UUID:</label>
                      </Col>
                      <Col md={3}>
                        <span>{this.state.uuiddetails}</span>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={3}>
                      <Button color="success" size="sm" onClick={e=>this.startCamlRuntime(e)}><i className="fa fa-check" ></i>&nbsp;Start CAML Runtime</Button>{' '}
                      </Col>
                      <Col md={3}>
                      <Button color="danger" size="sm" onClick={e=>this.stopCamlRuntime(e)}><i className="fa fa-remove" ></i>&nbsp;Stop CAML Runtime</Button>{' '}
                      </Col>
                    </Row>

                    
                  </Grid>
                  <Grid item xs={6}>
                    <Grid container spacing={3}>
                      <Grid item xs={2}>
                        <span><b>Image:</b></span><br></br>
                      </Grid>
                      <Grid item xs={4}>
                        <i className="fa fa-microchip" style={{fontSize:"7em"}}></i>&nbsp;
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Cameras server={this.state.serverDetails} ></Cameras>
      </React.Fragment>
    );
  }
}

export default ServerDetails;
     

