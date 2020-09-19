import React, { Component,useState } from "react";
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
import { withSwalInstance } from 'sweetalert2-react';
import SweetAlert from "react-bootstrap-sweetalert";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Progress,
  Button,
  Table,
  CardFooter,
  UncontrolledAlert,
} from 'reactstrap';
import ReactPlayer from 'react-player'
// import './cameras.scss';
import Grid from '@material-ui/core/Grid';
import Switch from '@material-ui/core/Switch';
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  }
}));

class Cameras extends Component {
  
    constructor(props) {
        super(props);
        this.serverDetails = this.props.server;
        this.trackingMethodList = JSON.parse(localStorage.getItem('trackingMethod'));
        this.cameraStatusList = JSON.parse(localStorage.getItem('cameraStatusList'));
    this.cameraList = this.serverDetails.cameraList;
    let checkStatus
    // for(let i=0;i<this.cameraList.length;i++){
    //   if(this.cameraList[i].cameraStatus.status == "Active"){
    //     checkStatus = true;
    //   }else{
    //     checkStatus = false;
    //   }
    // }

        this.state = {
          showAddCamer: false,
          showCameraDetails:false,
          showEditCamer:false,
          showLiveCamer:false,
          name:"",
          manufacturer:"",
          specification:"",
          streamUrl:"",
          status:"",
          cameraName:"",
          cameraManufacturer:"",
          cameraSpeciication:"",
          cameraStatus:"",
          cameraStreamUrl:"",
          cameratrackingMethod:"",
          cameraframWidth:"",
          camerahlsStreamUrl:"",
          showSuccessAlert: false,
          showFailAlert: false,
          showstreamurl:false,
          cameraId:"",
          sweetalert:false,
          cameraDetails:'',
          checkeStatus:"",
          trackingMethod:"",
          framWidth:"",
          hlsStreamUrl:""
        };

        this.addName = this.addName.bind(this);
        this.addManufacturer = this.addManufacturer.bind(this);
        this.addSpecification = this.addSpecification.bind(this);
        this.addStreamUrl = this.addStreamUrl.bind(this);
        this.addCameraStatus = this.addCameraStatus.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateTrackingMethod = this.updateTrackingMethod.bind(this);
        this.addFrameWidth = this.addFrameWidth.bind(this);
        this.addHlsStream = this.addHlsStream.bind(this);
      }

      addName(e) {
        this.setState({name: e.target.value});
      
      }
      addManufacturer(e) {
        this.setState({manufacturer: e.target.value});
      
      }
      addSpecification(e) {
        this.setState({specification: e.target.value});
      
      }
      
      addStreamUrl(e) {
        this.setState({streamUrl: e.target.value});
      
      }
      addCameraStatus(e) {
        this.setState({status: e.target.value});
      
      }
      updateTrackingMethod(e) {
        this.setState({trackingMethod: e.target.value});
      
      }
      addFrameWidth(e) {
        this.setState({framWidth: e.target.value});
      
      }
      addHlsStream(e) {
        this.setState({hlsStreamUrl: e.target.value});
      
      }
      
      handleChange = (e) => {
        this.stausByUser = e.target.checked
        console.log("toggle "+this.stausByUser);
        this.setState({ 
          checkeStatus: e.target.value,
          sweetalertstatus: true,
          deleteType:"status",
          deleteMsg:"You Want To Change The Status"
        })

    }
    statusUpadte(){

      let status = ""
      console.log("status "+this.stausByUser )
      if(this.stausByUser  == true){
        status = 1;
      }else{
        status = 2;
      }
   let InputObject = {
    "id": this.state.cameraid,
    "cameraStatus": {
      "id": status
    }
  }
      Axios.post('/camera/updatestatus', InputObject).then(response=>{ 
        let output_data = response.data;
        console.log("res "+JSON.stringify(output_data.status));
       if(output_data.status == 'SUCCESS'){
        let checkeStatus
        if(output_data.data.cameraStatus.status == "Active"){
          console.log("output_data.spaceStatus.status "+output_data.data.cameraStatus.status);
           checkeStatus = true;
        }else{
           checkeStatus = false;
        }
        this.successmsg = output_data.msg;
        this.setState({
          showSuccessAlert: true,
          sweetalertstatus: false,
          cameraStatus:output_data.data.cameraStatus.status,
          checkStatus:checkeStatus
        });
        
        setTimeout(() => {
          this.setState({
            showSuccessAlert: false
          });
        }, 2000);
       }else{
        this.errorMsg = output_data.errormsg;
        this.setState({
          showFailAlert: true,
          sweetalertstatus: false,
        });
        
        setTimeout(() => {
          this.setState({
            showFailAlert: false
          });
        }, 4000);
       }
    
     }).catch(error=>{});

    }
      renderRowData() {
 
        return this.cameraList.map((camera, index) => {
          const { uuid, name} = camera 
        
           return (
            
            <tr  onClick={e=>this.cameraDetails(camera)} style={{cursor:"pointer"}}>
            <td>{index+1}</td>
           <td>{camera.name}</td>
        </tr>
           
           )
        })
     }
    renderAddCamera() {
     
     
          return (
             <Card >
               <CardHeader style={{backgroundColor:"#abb2b9",color:"#fdfefe"}}>
               <Grid container spacing={3}>
        <Grid item xs={10}>
        <h5><b>Add Camera</b></h5>
        </Grid>
        <Grid item xs={2}>
          <div style={{marginTop: "-0.5em"}}>
        <span className="fa fa-times-circle" style={{float:"right",cursor:"pointer",fontSize: "2em"}} onClick={e=>this.removeCamera(e)}></span>
        </div>
        </Grid>

      </Grid>
    
               </CardHeader>
               <CardBody>
            <Row>
               
               <Col md={3}>
           <TextField  fullWidth id="name" value={this.state.name} onChange = {this.addName} label="Name" name="name" autoComplete="Name" autoFocus/>
        
          </Col>
        
          <Col md={3}>
          <TextField  fullWidth id="manufacturer" value={this.state.manufacturer} onChange = {this.addManufacturer}  label="Manufacturer" name="manufacturer" autoComplete="Manufacturer" />
          </Col>
          <Col md={3}>
          <TextField  fullWidth id="Specification" value={this.state.specification} onChange = {this.addSpecification}  label="Specification" name="specification" autoComplete="Manufacturer" />
          </Col>
          <Col md={3}>
          <TextField  fullWidth id="StreamUrl" value={this.state.streamUrl} onChange = {this.addStreamUrl}  label="Input Stream URL" name="streamUrl" autoComplete="Manufacturer" />
          </Col>
          </Row>

          <Row>
          <Col md={3}>
          <FormControl fullWidth  >
            <InputLabel id="demo-simple-select-label">Tracking Method</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth 
              ipaddress
              value={this.state.trackingMethod}
              onChange = {this.updateTrackingMethod} 
              >
              {this.trackingMethodList.map((e, keyIndex) => {
                  return (<MenuItem key={keyIndex} value={e.id}>{e.name}</MenuItem>);
              })     
              }
            </Select>
          </FormControl>
        
          </Col>
        
          <Col md={3}>
          <TextField  fullWidth id="framwidth" value={this.state.framWidth} onChange = {this.addFrameWidth}  label="Frame Width" name="manufacturer" autoComplete="Manufacturer" />
          </Col>
          <Col md={3}>
          <TextField  fullWidth id="Specification" value={this.state.hlsStreamUrl} onChange = {this.addHlsStream}  label="HLS Stream URL" name="specification" autoComplete="Manufacturer" />
          </Col>
          </Row>
          
                
               </CardBody>
               <CardFooter>

               <Button color="success" size="sm" onClick={e=>this.addCameradb(e)}><i className="fa fa-check" ></i>&nbsp;Add</Button>{' '}
               </CardFooter>
             </Card>
          
          )
      
    }
    addCameradb = (e) =>{
      console.log("output_data ");
        const postObject={
          "name": this.state.name,
          "manufacturer": this.state.manufacturer,
          "specification": this.state.specification,
          "streamurl": this.state.streamUrl,
          "image": null,
          "space": null,
          "framewidth":this.state.framWidth,
          "hlsstreamurl":this.state.hlsStreamUrl,
          "device": {
            "id": this.serverDetails.id,
          },
          "trackingMethod": {
            "id": this.state.trackingMethod
          }
        }
        console.log("postobh "+JSON.stringify(postObject));
        Axios.post('/camera/create', postObject).then(response=>{ 
        
        // console.log("response",response.data);
        let output_data = response.data;
        let res = output_data.data
        if(output_data.status == "SUCCESS"){
          this.successmsg = output_data.msg;
          console.log("output_data ",output_data );
          this.cameraList.push(res);
   
        if(res.streamurl == null || res.streamurl == undefined){
          this.setState({
            showCameraDetails: true,
            showAddCamer: false,
            showEditCamer:false,
            showLiveCamer:false,
            cameraName:res.name,
            cameraManufacturer:res.manufacturer,
            cameraSpeciication:res.specification,
            cameraStatus:res.cameraStatus.status,
            cameraStreamUrl:res.streamurl,
            cameraid:res.id,
            showstreamurl:false,
            emptyshowstreamurl:true,
            cameratrackingMethod:res.trackingMethod.name,
            cameraframWidth:res.framewidth,
            camerahlsStreamUrl:res.hlsstreamurl,
            showSuccessAlert: true,
            showSuccessLoader: false,
            deviceListArray: this.deviceList,
            showCameraDetails: true,
            showSuccessAlert: true,
            showSuccessLoader: false,
            deviceListArray: this.deviceList,
            cameraDetails:res
            });
        }else{
          this.setState({
            showCameraDetails: true,
            showAddCamer: false,
            showEditCamer:false,
            showLiveCamer:false,
            cameraName:res.name,
            cameraManufacturer:res.manufacturer,
            cameraSpeciication:res.specification,
            cameraStatus:res.cameraStatus.status,
            cameraStreamUrl:res.streamurl,
            cameraid:res.id,
            cameratrackingMethod:res.trackingMethod.name,
            cameraframWidth:res.framewidth,
            camerahlsStreamUrl:res.hlsstreamurl,
            showstreamurl:true,
            emptyshowstreamurl:false,
            showSuccessAlert: true,
            showSuccessLoader: false,
            deviceListArray: this.deviceList,
            showCameraDetails: true,
            cameraDetails:res
            });
        }
        setTimeout(() => {
          this.setState({
            showSuccessAlert: false
          });
        }, 2000);
    
        
        
        }else{
        
        this.errorMsg = output_data.errormsg;
        this.setState({
          showFailAlert: true,
          showAddCamer: true,
        });
        
        setTimeout(() => {
          this.setState({
            showFailAlert: false
          });
        }, 4000);
        
        }
        
        }).catch(error=>{});
        

      }


      updateCamera = (e,id) =>{
        // console.log("id "+id);
        const postObject={
          "id":id,
          "name": this.state.name,
          "manufacturer": this.state.manufacturer,
          "specification": this.state.specification,
          "streamurl": this.state.streamUrl,
          "image": null,
          "space": null,
          "device": {
            "id": this.serverDetails.id,
            "name": "aa"
          }
        }
        // console.log("postobh "+postObject);
        Axios.post('/camera/update', postObject).then(response=>{ 
        
        // console.log("response",response.data);
        let output_data = response.data;
        let res = output_data.data
        if(output_data.status == "SUCCESS"){
          // console.log("res ",res );
          this.successmsg = output_data.msg;
          for (let i=0;i<this.cameraList.length;i++){
            if(this.cameraList[i].id === res.id) {

              this.cameraList[i].name = res.name;
              this.cameraList[i].manufacturer = res.manufacturer;
              this.cameraList[i].specification = res.specification;
              this.cameraList[i].streamurl = res.streamurl;
              this.cameraList[i].cameraStatus.status = res.cameraStatus.status;
            }
        }
                 
  
        if(res.streamurl == null || res.streamurl == undefined){
          this.setState({
            showCameraDetails: true,
            showAddCamer: false,
            showEditCamer:false,
            showLiveCamer:false,
            cameraName:res.name,
            cameraManufacturer:res.manufacturer,
            cameraSpeciication:res.specification,
            cameraStatus:res.cameraStatus.status,
            cameraStreamUrl:res.streamurl,
            cameraid:res.id,
            showstreamurl:false,
            emptyshowstreamurl:true,
            showSuccessAlert: true,
            showSuccessLoader: false,
            deviceListArray: this.deviceList,
            showCameraDetails: true,
            showEditCamer:false,
            });
        }else{
          this.setState({
            showCameraDetails: true,
            showAddCamer: false,
            showEditCamer:false,
            showLiveCamer:false,
            cameraName:res.name,
            cameraManufacturer:res.manufacturer,
            cameraSpeciication:res.specification,
            cameraStatus:res.cameraStatus.status,
            cameraStreamUrl:res.streamurl,
            cameraid:res.id,
            showstreamurl:true,
            emptyshowstreamurl:false,
            showSuccessAlert: true,
            showSuccessLoader: false,
            deviceListArray: this.deviceList,
            showCameraDetails: true,
            showEditCamer:false,
            });
        }
        this.setState({
         
        });
        
        setTimeout(() => {
          this.setState({
            showSuccessAlert: false,
          
          });
        }, 2000);
        
        
        }else{
        
        this.errorMsg = output_data.errormsg;
        this.setState({
          showFailAlert: true,
          showCameraDetails: false,
          showEditCamer:true,
        });
        
        setTimeout(() => {
          this.setState({
            showFailAlert: false
          });
        }, 4000);
        
        }
        
        }).catch(error=>{});
        

      }


  renderLiveCamera() {
    // console.log("2");
 
      return (
       
      //  <Col md={12} xs={12}>
         <Card >
           <CardHeader style={{backgroundColor:"#abb2b9",color:"#fdfefe"}}>
           <Grid container spacing={3}>
    <Grid item xs={10}>
    <h5><b>Camera Live View</b></h5>
    </Grid>
    <Grid item xs={2}>
      <div style={{marginTop: "-0.5em"}}>
    <span className="fa fa-times-circle" style={{float:"right",cursor:"pointer",fontSize: "2em"}} onClick={e=>this.removeCamera(e)}></span>
    </div>
    </Grid>

  </Grid>

           </CardHeader>
           <CardBody>
           {/* <ReactPlayer url={this.state.cameraStreamUrl} />  */}
           <ReactPlayer url={this.state.cameraStreamUrl}  playing='true' loop='true'/> 
           </CardBody>
    
         </Card>
     
      
      )
  
}
    removeCamera = (e) =>{
        this.setState({
            showAddCamer: false,
            showEditCamer:false,
            showLiveCamer:false
          });
        }
    addCamera = (e) =>{
        this.setState({
            showAddCamer: true,
            showCameraDetails: false,
            showEditCamer:false,
            showLiveCamer:false
          });
        }
        liveCamera = (e) =>{
          this.setState({
              showAddCamer: false,
              // showCameraDetails: false,
              showEditCamer:false,
              showLiveCamer:true
            });
          }
        editCamera = (camera) =>{
      
          this.setState({
              showAddCamer: false,
              showCameraDetails: false,
              showEditCamer:true,
              showLiveCamer:false,
              name:camera.name,
              manufacturer:camera.manufacturer,
              specification:camera.specification,
              streamUrl:camera.streamurl,
              status:camera.cameraStatus.id
            });
          }
          deleteCamera = (camera) =>{
            this.cameraId = camera.id;
   
         
           this.setState({ sweetalert: true,
            cameraId:this.cameraId
          })
         
    
            }
          
        cameraDetails = (camera) =>{

         console.log("cameras "+JSON.stringify(camera));
         let checkStatus = ""
         if(camera.cameraStatus.status == "Active"){
          checkStatus=true
         }else{
          checkStatus=false
         }
          this.camera = camera
          if(camera.streamurl == null || camera.streamurl == undefined){
            this.setState({
              showCameraDetails: true,
              showAddCamer: false,
              showEditCamer:false,
              showLiveCamer:false,
              cameraDetails:camera,
              cameraName:camera.name,
              cameraManufacturer:camera.manufacturer,
              cameraSpeciication:camera.specification,
              cameraStatus:camera.cameraStatus.status,
              cameraStreamUrl:camera.streamurl,
              cameratrackingMethod:camera.trackingMethod.name,
              cameraframWidth:camera.framewidth,
              camerahlsStreamUrl:camera.hlsstreamurl,
              cameraid:camera.id,
              showstreamurl:false,
              emptyshowstreamurl:true,
              checkStatus:checkStatus
              });
          }else{
            this.setState({
              showCameraDetails: true,
              showAddCamer: false,
              showEditCamer:false,
              showLiveCamer:false,
              cameraDetails:camera,
              cameraName:camera.name,
              cameraManufacturer:camera.manufacturer,
              cameraSpeciication:camera.specification,
              cameraStatus:camera.cameraStatus.status,
              cameraStreamUrl:camera.streamurl,
              cameratrackingMethod:camera.trackingMethod.name,
              cameraframWidth:camera.framewidth,
              camerahlsStreamUrl:camera.hlsstreamurl,
              cameraid:camera.id,
              showstreamurl:true,
              emptyshowstreamurl:false,
              checkStatus:checkStatus
              });
          }

          }
          closeCamera = (e) =>{
            this.setState({
              showCameraDetails: false
              });
            }

            hideAlert() {
              this.setState({
                sweetalert: false,
                sweetalertstatus:false
              });
            }
            submit(){

           
              let cameraDeleteUrl = '/camera/delete/'
              Axios.post(cameraDeleteUrl+this.state.cameraid,null).then(response=>{ 
        
              
                let output_data = response.data;
                let res = output_data.data
                if(output_data.status == "SUCCESS"){
                  // console.log("output_data ",output_data );
                  var i = 0;
                  for (i=0;i<this.cameraList.length;i++){
                      if(this.cameraList[i].id === this.state.cameraid) {
                          this.cameraList.splice(i, 1);
                      }
                  }
                this.setState({
                  sweetalert: false,
                  showCameraDetails: false,
                });
                }else{
                this.errorMsg = output_data.errormsg;
                this.setState({
                  sweetalert: true,
                  showCameraDetails: true,
                });
                 }
                
                }).catch(error=>{});
   
            }
    renderEditCamera() {
     
   
        return (
           <Card >
             <CardHeader style={{backgroundColor:"#abb2b9",color:"#fdfefe"}}>
             <Grid container spacing={3}>
      <Grid item xs={10}>
      <h5><b>Edit Camera Details</b></h5>
      </Grid>
      <Grid item xs={2}>
        <div style={{marginTop: "-0.5em"}}>
      <span className="fa fa-times-circle" style={{float:"right",cursor:"pointer",fontSize: "2em"}} onClick={e=>this.removeCamera(e)}></span>
      </div>
      </Grid>

    </Grid>
             </CardHeader>
             <CardBody>
          <Row>
             
             <Col md={3}>
         <TextField  fullWidth id="name" value={this.state.name} onChange = {this.addName} label="Name" name="Name" autoComplete="Name" autoFocus/>
      
        </Col>
      
        <Col md={3}>
        <TextField  fullWidth  value={this.state.manufacturer} onChange = {this.addManufacturer} label="Manufacturer" name="manufacturer" autoComplete="manufacturer" />
        </Col>
        <Col md={3}>
        <TextField  fullWidth value={this.state.specification} onChange = {this.addSpecification} label="Specification" name="specification" autoComplete="specification" />
        </Col>
        <Col md={3}>
        <TextField  fullWidth value={this.state.streamUrl} onChange = {this.addStreamUrl} label="Stream URL" name="Stream URL" autoComplete="Stream UR" />
        </Col>
        </Row>

        <Row>
             
             <Col md={3}>
         <FormControl fullWidth >
         <InputLabel id="demo-simple-select-label">Camera Status</InputLabel>
      <Select

        labelId="demo-simple-select-label"
        id="demo-simple-select"
        fullWidth 
        value={this.state.status} 
        onChange = {this.addCameraStatus}
      >
              {/* {this.cameraStatusList.map((e, keyIndex) => {
                  return (<MenuItem key={keyIndex} value={e.id}>{e.status}</MenuItem>);
              })     
              } */}  
        <MenuItem value={1}>Active</MenuItem>
        <MenuItem value={2}>Inactive</MenuItem>
      </Select>
      </FormControl>
        </Col>
        <Col md={3}>
          <FormControl fullWidth  >
            <InputLabel id="demo-simple-select-label">Tracking Method</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              fullWidth 
              ipaddress
              value={this.state.trackingMethod}
              onChange = {this.updateTrackingMethod} 
              >
              {/* {this.trackingMethodList.map((e, keyIndex) => {
                  return (<MenuItem key={keyIndex} value={e.id}>{e.method}</MenuItem>);
              })     
              } */}
            </Select>
          </FormControl>
        
          </Col>
        
          <Col md={3}>
          <TextField  fullWidth id="framwidth" value={this.state.framWidth} onChange = {this.addFrameWidth}  label="Frame Width" name="manufacturer" autoComplete="Manufacturer" />
          </Col>
          <Col md={3}>
          <TextField  fullWidth id="Specification" value={this.state.hlsStreamUrl} onChange = {this.addHlsStream}  label="HLS Stream URL" name="specification" autoComplete="Manufacturer" />
          </Col>
        </Row>
    
              
             </CardBody>
             <CardFooter>

             <Button color="success" size="sm" onClick={e=>this.updateCamera(e,this.state.cameraid)}><i className="fa fa-check" ></i>&nbsp;Update</Button>{' '}
             </CardFooter>
           </Card>
        //  </Col>
        
        )
    
  }
  render() {

    return (

        <React.Fragment>
           <div>
      <Grid container spacing={3} style={{position: "absolute"}}>
        <Grid item xs={4}>
    
        </Grid>
        <Grid item xs={4}>
   
        </Grid>
        <Grid item xs={4}>
        { this.state.showSuccessAlert && <UncontrolledAlert color="success" style={{zIndex: "2"}}>
                {this.successmsg}
                </UncontrolledAlert>}
                { this.state.showFailAlert && <UncontrolledAlert color="danger">
               {this.errorMsg}
                </UncontrolledAlert>}
        </Grid>
      </Grid>
    </div>
 {this.state.sweetalert && (
          <SweetAlert
            warning
            showCancel
            confirmBtnText="Delete"
            cancelBtnText="Cancel"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="success"
            title="Are You Sure?"
            onConfirm={() => this.submit()}
            onCancel={() => this.hideAlert()}
          >
            You will not able to recover this camera
          </SweetAlert>
        )}

{this.state.sweetalertstatus && (
          <SweetAlert
            warning
            showCancel
            confirmBtnText="Yes"
            cancelBtnText="Cancel"
            confirmBtnBsStyle="danger"
            cancelBtnBsStyle="success"
            title="Are You Sure?"
            onConfirm={() => this.statusUpadte()}
            onCancel={() => this.hideAlert()}
          >
           {this.state.deleteMsg}
          </SweetAlert>
        )}
        <Grid container spacing={3}>
        <Grid item xs={10}>
        <h4>Caml Cameras</h4>
        </Grid>
        <Grid item xs={2}>
        
        </Grid>

      </Grid>
   
      <Row>
               <Col md={4}>
        <Card>
        <CardHeader style={{backgroundColor:"#abb2b9",color:"#fdfefe"}}>
        <Row>
            <Col md={6}>
        <h5><b>Cameras</b></h5>
</Col>
<Col md={6}>
        <span className="fa fa-plus" style={{marginTop: "-0.5em",float:"right",cursor:"pointer",display: "inline-block",borderRadius: "60px",
      boxShadow: "0px 0px 2px #888",
      padding: "0.5em 0.6em",
    backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={e=>this.addCamera(e)}>&nbsp;</span>
    </Col>
    </Row>
          </CardHeader>
            <CardBody>
      
              
                <Table hover>
                    <tbody>
                    {this.renderRowData()}
                    </tbody>
                </Table>
            </CardBody>
        </Card>
        </Col>
        
           <Col md={8}>
           { this.state.showCameraDetails && <Card>

            <CardHeader style={{backgroundColor:"#abb2b9",color:"#fdfefe"}}>
            <Row>
            <Col md={9}>
        <h5><b>Camera Details</b></h5>
           <h5><b>{ this.cameras }</b></h5>
        </Col>
        <Col md={3}>
          <div style={{float:'right',marginTop: "-0.5em"}}>
        <i className="fa fa-pencil" style={{cursor:"pointer",display: "inline-block",borderRadius: "60px",
      boxShadow: "0px 0px 2px #888",
      padding: "0.5em 0.6em",
    backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={e=>this.editCamera(this.state.cameraDetails )}></i>&nbsp;
        <i className="fa fa-trash" style={{cursor:"pointer",display: "inline-block",borderRadius: "60px",
      boxShadow: "0px 0px 2px #888",
      padding: "0.5em 0.6em",
    backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={e=>this.deleteCamera(this.state.cameraDetails )}></i>&nbsp;
         <i className="fa fa-times-circle" style={{cursor:"pointer",display: "inline-block",borderRadius: "60px",
      boxShadow: "0px 0px 2px #888",
      padding: "0.5em 0.6em",
    backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={e=>this.closeCamera(e)}></i>&nbsp;
    </div>
        </Col>
      </Row>
          </CardHeader>
            <CardBody>
           
            <Col md={12}>
            <Row>
            <Col md={12}>
          <Row>
            <Col md={4}>
            <label>Camera</label>
            </Col>
           <Col md={8}>{this.state.cameraName}</Col>
            </Row>
            <Row>
            <Col md={4}>
            <label>Manufacturer</label>
            </Col>
            <Col md={8}>{this.state.cameraManufacturer}</Col>
            </Row>
            <Row>
            <Col md={4}>
            <label>Stream URL</label>
            </Col>
           <Col md={8}>
           <span>
           { this.state.showstreamurl &&   <span className="fa fa-eye" style={{color:'#3498db',cursor:'pointer'}} onClick={e=>this.liveCamera(e,this.state.cameraStreamUrl)}>&nbsp;{this.state.cameraStreamUrl}</span>}
           { this.state.emptyshowstreamurl &&   <span>-</span>}
           </span>
           </Col>
            </Row>
            <Row>
            <Col md={4}>
            <label>Specifiaction</label>
            </Col>
            <Col md={8}>{this.state.cameraSpeciication}</Col>
            </Row>
            <Row>
            <Col md={4}>
            <label>Status</label>
            </Col>
            <Col md={8}>{this.state.cameraStatus}</Col>
            </Row>
            <Row>
            <Col md={4}>
            <label>Change Status</label>
            </Col>
            <Col md={4}>
            <Switch
                            checked={this.state.checkStatus}
                            onChange={this.handleChange}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
            </Col>
            </Row>
          <Row>
            <Col md={4}>
            <label>Tracking Method</label>
            </Col>
           <Col md={8}>{this.state.cameratrackingMethod}</Col>
            </Row>
            <Row>
            <Col md={4}>
            <label>Frame Width(In Feet) </label>
            </Col>
            <Col md={8}>{this.state.cameraframWidth}</Col>
            </Row>
            <Row>
            <Col md={4}>
            <label>HLS Stream URL</label>
            </Col>
           <Col md={8}>
           <span>
  <span style={{color:'#3498db',cursor:'pointer'}}>&nbsp;{this.state.camerahlsStreamUrl}</span>
     
           </span>
           </Col>
            </Row>
            
            </Col>

            {/* <Col md={6}>
           
            </Col> */}
            </Row>
              </Col>
</CardBody>
</Card>}
{ this.state.showAddCamer && this.renderAddCamera()}
{ this.state.showEditCamer && this.renderEditCamera()}
{ this.state.showLiveCamer && this.renderLiveCamera()}
        </Col>
        {/* </Col> */}
        </Row>

       
        </React.Fragment>
    )
  }
}

export default Cameras;