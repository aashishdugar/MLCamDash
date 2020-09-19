import React, { Component } from "react";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Axios from 'axios';
import { withSwalInstance } from 'sweetalert2-react';
import swal from 'sweetalert2';
import SweetAlert from "react-bootstrap-sweetalert";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Divider from '@material-ui/core/Divider';
import ReactPlayer from 'react-player'
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
  UncontrolledAlert,} from 'reactstrap';
import Grid from '@material-ui/core/Grid';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import TreeItem from '@material-ui/lab/TreeItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Draggable, Droppable } from 'react-drag-and-drop'
import RuleDetails from "../Rules/RuleDetails";
import Switch from '@material-ui/core/Switch';
 class SpaceDetails extends Component {
  
    constructor(props) {
        super(props);
        this.space = this.props.location.state.data;
        console.log("space "+JSON.stringify(this.space));
        this.spaceTypeList = JSON.parse(localStorage.getItem('spaceTypeList'));
        this.countryStateList = JSON.parse(localStorage.getItem('countrystateList'));
        // if(this.space.spaceStatus != null){
        if(this.space.spaceStatus.status == "Active"){
          this.checkedB = true;
        }else{
          this.checkedB = false;
        }
      // }
        this.state = {
          showAddCamer: false,
          showCameraDetails:false,
          showEditCamer:false,
          showLiveCamer:false,
          spaceDetails:this.space,
          showspacedetail:true,
          showssubpacedetail:false,
          availableCameraList:[],
          assignCameraList:[],
          sweetalert:false,
          ruleDeatilList:[],
          showAddSpace:false,
          name:"",
          spacetype:"",
          spaceStatus:"",
          country:"",
          state:"",
          city:"",
          pin:"",
          line:"",
          space:"",
          spaceList:this.space.childSpaceList,
          parentSpaceId:this.space.id,
          showSuccessAlert:false,
          showFailAlert: false,
          spacename:"",
          showEditSpace:false,
          stateList:[],
          deleteMsg:"",
          deleteType:"",
          checkedB: this.checkedB,
          changeStatus:this.space.spaceStatus.status
        };
        this. getSpaceDetails(this.space.id);
        this.updateSpaceType = this.updateSpaceType.bind(this);
        this.updateSpaceStatus = this.updateSpaceStatus.bind(this);
        this.selectSpace = this.selectSpace.bind(this);
        this.updateName = this.updateName.bind(this);
        this.updateCountry = this.updateCountry.bind(this);
        this.updateState = this.updateState.bind(this);
        this.updatecity = this.updatecity.bind(this);
        this.updatePin = this.updatePin.bind(this);
        this.updateLine = this.updateLine.bind(this);
        this.handleChange = this.handleChange.bind(this);
      }

      updateSpaceType(e) {
        this.setState({spacetype: e.target.value});
      
      }
      updateSpaceStatus(e) {
        this.setState({spaceStatus: e.target.value});
      
      }
      selectSpace(e) {
        this.setState({space: e.target.value});
      
      }
      updateName(e) {
        this.setState({name: e.target.value});
      
      }
      updateCountry(e) {
        this.setState({country: e.target.value});
        for(let i=0;i<this.countryStateList.length;i++){
          if(this.countryStateList[i].id == e.target.value){
            this.stateList = this.countryStateList[i].stateList;
          }
        }
        this.setState({stateList:this.stateList});
      }
      updateState(e) {
        this.setState({state: e.target.value});
      
      }
      updatecity(e) {
        this.setState({city: e.target.value});
      
      }
      updatePin(e) {
        this.setState({pin: e.target.value});
      
      }
      updateLine(e) {
        this.setState({line: e.target.value});
      
      }
      getSpaceDetails = (id) => {
        let getDetailsUrl = '/space/getdetails/'
        this.spaceID = id;
        Axios.post(getDetailsUrl+id, null).then(response=>{ 
          let output_data = response.data;
         if(output_data.status == "SUCCESS"){
         this.assignCameraList = output_data.data.assignCameraList;
         this.availableCameraList = output_data.data.availableCameraList;
         this.ruleDeatilList = output_data.data.ruleList;
          this.setState({
            availableCameraList:output_data.data.availableCameraList,
            assignCameraList:output_data.data.assignCameraList,
            ruleDeatilList:output_data.data.ruleList
          });
         }else{
        
         }
      
       }).catch(error=>{});
      
       }

       detailSpace = (e,space) => {
         console.log("space "+JSON.stringify(space));
        if(space.spaceStatus != null){
          if(space.spaceStatus.status == "Active"){
            this.checkedB = true;
          }else{
            this.checkedB = false;
          }
        }
        this.setState({
          spaceDetails: space,
          showspacedetail:false,
          showssubpacedetail:true,
          spacename:space.name,
          checkedB:this.checkedB,
          changeStatus:space.spaceStatus.status,
        });
        this. getSpaceDetails(space.id);
  
       }
       onDragStart = (ev, id) => {
        ev.dataTransfer.setData("id", id);
        for (let i=0;i<this.state.availableCameraList.length;i++){
          if(this.state.availableCameraList[i].id === id) {
            this.state.availableCameraList.splice(i, 1);
          }
      }

    }
        onDragOver = (ev) => {
          ev.preventDefault();
      
      }
      handleChange = (e) => {
        this.stausByUser = e.target.checked
        console.log("toggle "+this.stausByUser);
        this.setState({ 
          checkedB: e.target.value,
          sweetalertstatus: true,
          deleteType:"status",
          deleteMsg:"You Want To Change The Status"
        })

    }
        onDrop(data) {
         let spceobj =  {
            "id": data.camera,
            "space": {
              "id": this.spaceID
            }
          }
          Axios.post('/camera/assigncamera', spceobj).then(response=>{ 
              let output_data = response.data;
           if(output_data.status == "SUCCESS"){
           this.assignCameraList = output_data.data.assignCameraList;
           this.availableCameraList = output_data.data.availableCameraList;
            this.setState({
              availableCameraList:output_data.data.availableCameraList,
              assignCameraList:output_data.data.assignCameraList,
             
            });
           }else{
          
           }
        
         }).catch(error=>{});
      }
      deleteCamera = (cameraID,deleteType) =>{
        this.deleteid = cameraID;
       this.setState({ sweetalert: true,
        deleteId: this.deleteid,
        deleteType:deleteType,
        deleteMsg:"You will not able to recover this camera"
      })
     

        }

        deleteSpace = (e,space,deleteType) =>{
          this.deleteid = space.id;
         this.setState({ sweetalert: true,
          deleteId: this.deleteid,
          deleteType:deleteType,
          deleteMsg:"You will not able to recover this Space"
        })
       
  
          }
        hideAlert() {
          this.setState({
            sweetalert: false,
            sweetalertstatus:false
          });
        }
        statusUpadte(){
          this.setState({ 
            sweetalertstatus: false,
           
          })
          let status = ""
          console.log("status "+this.stausByUser )
          if(this.stausByUser  == true){
            status = 1;
          }else{
            status = 2;
          }
       let InputObject = {
        "id": this.state.spaceDetails.id,
        "spaceStatus": {
          "id": status
        }
      }
          Axios.post('/space/updatestatus', InputObject).then(response=>{ 
            let output_data = response.data;
            console.log("res "+JSON.stringify(output_data.status));
           if(output_data.status == 'SUCCESS'){
            this.successmsg = output_data.msg;
            if(output_data.data.spaceStatus.status == "Active"){
              console.log("output_data.spaceStatus.status "+output_data.data.spaceStatus.status);
              this.checkedB = true;
            }else{
              this.checkedB = false;
            }
            this.successmsg = output_data.msg;
            this.setState({
              showSuccessAlert: true,
              sweetalertstatus: false,
              changeStatus:output_data.data.spaceStatus.status,
              checkedB:this.checkedB
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
        submit(type){
          if(type == "camera"){
            let spceobj =  {
              "id":this.state.deleteId,
              "space": {
                "id": this.spaceID
              }
            }

            Axios.post('/camera/removecamera',spceobj).then(response=>{ 
              let output_data = response.data;
              let res = output_data.data
              if(output_data.status == "SUCCESS"){
                this.assignCameraList = output_data.data.assignCameraList;
                this.availableCameraList = output_data.data.availableCameraList;
                this.setState({
                  availableCameraList:output_data.data.availableCameraList,
                  assignCameraList:output_data.data.assignCameraList,
                  sweetalert: false
                });
              }else{
              this.errorMsg = output_data.errormsg;
              this.setState({
                sweetalert: true
              });
              }
            }).catch(error=>{});
          }else if(type == "space"){
            let deleteSpace = '/space/delete/'
            Axios.post(deleteSpace+this.state.deleteId,null).then(response=>{ 
              let output_data = response.data;
              let res = output_data.data
              console.log(output_data);
              if(output_data.status == "SUCCESS"){
                this.props.history.push('/elements/space'); 
              }else{
              this.errorMsg = output_data.errormsg;
              this.setState({
                sweetalert: false,
                showFailAlert: true
              });
              }
            }).catch(error=>{});
          }

        }
        addSpaceCmp = (e,space) =>{
          this.setState({
            showAddSpace: true,
            parentSpaceId:space.id,
            spacename:space.name
            });
        }
        editSpaceCmp = (e,space) =>{
          let spaceStatus =null;
          if( space.spaceStatus != null){
            spaceStatus = space.spaceStatus.id
          }
          if(space.address.state != null){
            for(let i=0;i<this.countryStateList.length;i++){
              if(this.countryStateList[i].id == space.address.state.country.id){
                this.stateList = this.countryStateList[i].stateList;
              }
            }
        
            this.setState({
              spaceDetails:space,
              showEditSpace: true,
              parentSpaceId:space.id,
              spacename:space.name,
              name:space.name,
              spacetype:space.spaceType.id,
             
              country:space.address.state.country.id,
              stateList:this.stateList,
              state:space.address.state.id,
              city:space.address.city,
              pin:"",
              line:space.address.line,
              spaceStatus:spaceStatus
              });
          }else{
            this.setState({
              showEditSpace: true,
              parentSpaceId:space.id,
              spacename:space.name,
              name:space.name,
              spacetype:space.spaceType.id,
              spaceStatus:spaceStatus,
              country:"",
              state:"",
              city:"",
              pin:"",
              line:"",
              
              });
          }
  
        }
        removeSpace = (e) =>{
          this.setState({
            showAddSpace: false,
            showEditSpace: false
            });
        }
        addSpace = (e) =>{
          this.setState({
            showSuccessAlert: true,
            showSuccessLoader: false,
        
          });
          
          const postObject={
            "name": this.state.name,
            "spaceType": {
              "id": this.state.spacetype
             
            },
            "parentspace": {
              "id":this.state.parentSpaceId
            }
          }
          Axios.post('/space/create', postObject).then(response=>{ 
          let output_data = response.data;
          let res = output_data.data
       
          if(output_data.status == "SUCCESS"){
            this.successmsg = output_data.msg;
          this.setState({
            showSuccessAlert: true,
            showSuccessLoader: false,
            showAddSpace: false,
          });
          
          setTimeout(() => {
            this.setState({
              showSuccessAlert: false
            });
          }, 2000);
          
          
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

          editSpace= (e,spacedata) =>{
            let postObject ={}
            if(spacedata.parentspace == null){
             postObject={
                "id":spacedata.id,
                "name": this.state.name,
                "spaceType": {
                  "id": this.state.spacetype
                 
                },
                "spaceStatus": {
                  "id":this.state.spaceStatus ,
                },
                "parentspace":null,
                "icon": null,
                "dimension": spacedata.dimension,
                "address": {
                  "id":spacedata.address.id,
                  "line": this.state.line,
                  "city": this.state.city,
                  "zipcode": this.state.pin,
                  "state": {
                    "id": this.state.state,
                    "country": {
                      "id": this.state.country
                    }
                  }
                }
              }
            }else{
               postObject={
                "id":spacedata.id,
                "name": this.state.name,
                "spaceType": {
                  "id": this.state.spacetype
                 
                },
                "spaceStatus": {
                  "id":this.state.spaceStatus ,
                },
                "dimension": spacedata.dimension,
                "parentspace":{
                  "id":spacedata.parentspace.id
                },
                "address":spacedata.address
              }
            }
            Axios.post('/space/update', postObject).then(response=>{ 
            let output_data = response.data;
            let res = output_data.data
            if(output_data.status == "SUCCESS"){
              this.successmsg = output_data.msg;
            this.setState({
              showSuccessAlert: true,
              showSuccessLoader: false,
              showAddSpace: false,
            });
            
            setTimeout(() => {
              this.setState({
                showSuccessAlert: false
              });
            }, 2000);
            
            
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

        renderAddSpace() {

          return (
             <Card >
               <CardHeader style={{backgroundColor:"#abb2b9",color:"#fdfefe"}}>
               <Grid container spacing={3}>
        <Grid item xs={10}>
        <h5><b>Add Space</b></h5>
        </Grid>
        <Grid item xs={2}>
          <div style={{marginTop: "-0.5em"}}>
        <span className="fa fa-times-circle" style={{float:"right",cursor:"pointer",fontSize: "2em"}} onClick={e=>this.removeSpace(e)}></span>
        </div>
        </Grid>
        
        </Grid>
         </CardHeader>
               <CardBody>
          <Col md={12}>
            <Row>
          <Col md={6}>
          <Row>
          <Col md={6}>
          <TextField  fullWidth id="name" label="Name" name="Name"  value = {this.state.name} onChange = {this.updateName} autoFocus/>
            </Col>
            <Col md={6}>
            <FormControl fullWidth  >
            <InputLabel id="demo-simple-select-label">Space Type</InputLabel>
            <Select
          
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          fullWidth 
         ipaddress
         value={this.state.spacetype}
         onChange = {this.updateSpaceType} 
        >
        {this.spaceTypeList.map((e, keyIndex) => {
            return (<MenuItem key={keyIndex} value={e.id}>{e.type}</MenuItem>);
         })     
        }
        </Select>
        </FormControl>
            </Col>
            </Row>
   
          </Col>
          <Col md={6}>
        <Row>
        
            <Col md={6}>
            <TextField  fullWidth defaultValue="Disabled" id="name" label="Space" name="Name"  value = {this.state.spacename} onChange = {this.selectSpace} />
      
            </Col>
        </Row>
          </Col>
          </Row>
          </Col>
           
               </CardBody>
               <CardFooter>
        
               <Button color="success" size="sm" onClick={e=>this.addSpace(e)}><i className="fa fa-check" ></i>&nbsp;Add</Button>{' '}
               </CardFooter>
             </Card>
          
          )
        }
    
        renderEditSpace() {

          return (
             <Card >
               <CardHeader style={{backgroundColor:"#abb2b9",color:"#fdfefe"}}>
               <Grid container spacing={3}>
        <Grid item xs={10}>
        <h5><b>Edit Space</b></h5>
        </Grid>
        <Grid item xs={2}>
          <div style={{marginTop: "-0.5em"}}>
        <span className="fa fa-times-circle" style={{float:"right",cursor:"pointer",fontSize: "2em"}} onClick={e=>this.removeSpace(e)}></span>
        </div>
        </Grid>
        
        </Grid>
         </CardHeader>
               <CardBody>
          <Col md={12}>
            <Row>
          <Col md={6}>
          <Row>
          <Col md={6}>
          <TextField  fullWidth id="name" label="Name" name="Name"  value = {this.state.name} onChange = {this.updateName} autoFocus/>
            </Col>
            <Col md={6}>
            <FormControl fullWidth  >
            <InputLabel id="demo-simple-select-label">Space Type</InputLabel>
            <Select
          
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          fullWidth 
         ipaddress
         value={this.state.spacetype}
         onChange = {this.updateSpaceType} 
        >
        {this.spaceTypeList.map((e, keyIndex) => {
            return (<MenuItem key={keyIndex} value={e.id}>{e.type}</MenuItem>);
         })     
        }
        </Select>
        </FormControl>
            </Col>
            </Row>
            <Row>
            <Col md={6}>
            <FormControl fullWidth  >
            <InputLabel id="demo-simple-select-label">Space Status</InputLabel>
            <Select
          
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          fullWidth 
         ipaddress
         value={this.state.spaceStatus}
         onChange = {this.updateSpaceStatus} 
        >
        <MenuItem value='1'>Active</MenuItem>
        <MenuItem value='2'>Inactive</MenuItem>
        {/* {this.spaceTypeList.map((e, keyIndex) => {
            return (<MenuItem key={keyIndex} value={e.id}>{e.type}</MenuItem>);
         })     
        } */}
        </Select>
        </FormControl>
            </Col>
            </Row>
          </Col>
          <Col md={6}>
            <div>
          {this.state.spaceDetails.address.state != null && 
            <React.Fragment>
          <Row>
              <Col md={12}>
              <TextField  fullWidth id="name" label="Line" name="Name"  value = {this.state.line} onChange = {this.updateLine} autoFocus/>
              </Col>
            </Row>
        <Row>
        
            <Col md={6}>
            <FormControl fullWidth  >
            <InputLabel id="demo-simple-select-label">Country</InputLabel>
             <Select
        
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        fullWidth 
        ipaddress
        value={this.state.country}
        onChange = {this.updateCountry} 
        >
        {this.countryStateList.map((e, keyIndex) => {
            return (<MenuItem key={keyIndex} value={e.id}>{e.countryName}</MenuItem>);
         })
        }
        </Select>
        </FormControl>
            </Col>
            <Col md={6}>
            <FormControl fullWidth  >
            <InputLabel id="demo-simple-select-label">State</InputLabel>
            <Select
        
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        fullWidth 
        ipaddress
        value={this.state.state}
        onChange = {this.updateState} 
        >
        {this.state.stateList.map((e, key) => {
              return <option key={key} value={e.id}>{e.name}</option>;
          })}
        </Select> 
        </FormControl>
            </Col>
        </Row>
        <Row>
          <Col md={6}>
          <TextField  fullWidth id="city" label="City" name="City"  value = {this.state.city} onChange = {this.updatecity} />
          </Col>
          <Col md={6}>
          <TextField  fullWidth id="pin" label="Pincode" name="Name"  value = {this.state.pincode} onChange = {this.updatePin}/>
            </Col>
        </Row>
        </React.Fragment>
         }
         </div>
          </Col>
         
          </Row>
          </Col>
           
               </CardBody>
               <CardFooter>
        
               <Button color="success" size="sm" onClick={e=>this.editSpace(e,this.state.spaceDetails)}><i className="fa fa-check" ></i>&nbsp;Update</Button>{' '}
               </CardFooter>
             </Card>
          
          )
        
        
        
        }
       renderCameraList() {
 
        return this.state.availableCameraList.map((camera, index) => {
          const {name} = camera 
           return (
           
         <Draggable type="camera" data={camera.id} onDragStart = {(e) => this.onDragStart(e, camera.id) } style={{width: '100%'}}>
            <List style={{width: '100%',padding: '0px', cursor: 'move'}}  >
              <ListItemText primary={camera.name}  style={{ width: '90%',border: '1px solid',padding: '7px'}}/>
          </List>
       </Draggable>
           )
        })
     }
    
    renderAssignCameraList() {
      return this.state.assignCameraList.map((camera, index) => {
        const {name} = camera 
        return (
          <Col md={6} xs={12}>
            <Card className="devicecard">
              <CardHeader>
                <Row>
                  <Col md={9}>
                    <h5><b>{camera.name}</b></h5>
                  </Col>
                  <Col md={3}>
                    <div style={{float:'right',marginTop: "-0.5em"}}>
                      <i className="fa fa-trash" style={{cursor:"pointer",display: "inline-block",borderRadius: "60px",
                          boxShadow: "0px 0px 2px #888",
                          padding: "0.5em 0.6em",
                          backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={e=>this.deleteCamera(camera.id,"camera" )}></i>&nbsp;
                    </div>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div >
                  <Col md={6}>
                    <ReactPlayer url={camera.streamurl} width='220%' height='220%' playing='true' loop='true'/> 
                  </Col>
                </div>
              </CardBody>
            </Card>
          </Col>
        )
      })
    }

  render() {

    const ruleDetails=[];
    this.state.ruleDeatilList.forEach ((t) => {
      ruleDetails.push(
        <RuleDetails key={t.id} ruledata={t}></RuleDetails>
       );
    });
    const renderTree = (nodes) => (
      <TreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} onClick={e=>this.detailSpace(e,nodes)}>
        {Array.isArray(nodes.childSpaceList) ? nodes.childSpaceList.map((node) => renderTree(node)) : null}
      </TreeItem>
    );


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
                { this.state.showFailAlert && <UncontrolledAlert color="danger" style={{zIndex: "2"}}>
             {this.errorMsg }
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
            onConfirm={() => this.submit(this.state.deleteType)}
            onCancel={() => this.hideAlert()}
          >
           {this.state.deleteMsg}
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
           
<Row>
      <Col md={12}>
{ this.state.showAddSpace && this.renderAddSpace()}
{ this.state.showEditSpace && this.renderEditSpace()}
</Col>
</Row>
        <Row>
          <Col md={12}>
            <Card>
              <CardHeader style={{backgroundColor:'#abb2b9',color:'#ffff',fontWeight:'bold'}}>
                <Row>
                  <Col md={9}>
                    <h5><b>Space details</b></h5>
                    <h5><b>{ this.cameras }</b></h5>
                  </Col>
                  <Col md={3}>
                    <div style={{float:'right',marginTop: "-0.5em"}}>
                      <i className="fa fa-plus" title="Add Subspace" style={{cursor:"pointer",display: "inline-block",borderRadius: "60px",
                          boxShadow: "0px 0px 2px #888",
                          padding: "0.5em 0.6em",
                          backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={e=>this.addSpaceCmp(e,this.state.spaceDetails)}></i>&nbsp;
                      <i className="fa fa-pencil" title="Edit Space"Edit Space style={{cursor:"pointer",display: "inline-block",borderRadius: "60px",
                          boxShadow: "0px 0px 2px #888",
                          padding: "0.5em 0.6em",
                          backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={e=>this.editSpaceCmp(e,this.state.spaceDetails )}></i>&nbsp;
                      <i className="fa fa-trash" title="Delete Space" style={{cursor:"pointer",display: "inline-block",borderRadius: "60px",
                          boxShadow: "0px 0px 2px #888",
                          padding: "0.5em 0.6em",
                          backgroundColor: "#fff",color:'#abb2b9',fontSize: "0.9em"}} onClick={e=>this.deleteSpace(e,this.state.spaceDetails,"space" )}></i>&nbsp;
                    </div>
                  </Col>
                </Row>
              </CardHeader>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={3}>
            <Card>
              <CardHeader>
                <h5><b>Space Tree</b></h5>
              </CardHeader>
              <CardBody style={{height:'auto'}}>
                <Row style={{marginLeft: '1em',color: '#808b96'}}>
                  <TreeView
                    defaultCollapseIcon={<ExpandMoreIcon />}
                    defaultExpanded={['root']}
                    defaultExpandIcon={<ChevronRightIcon />}
                    >
                    {renderTree(this.space)}
                  </TreeView>
                </Row>
                <Row style={{marginTop: '9em'}}>
                  <CardHeader>
                    <h5><b>Available Cameras</b></h5>
                  </CardHeader>
                  <Row style={{marginLeft: '1em',color: '#808b96'}} >
                    {this.renderCameraList()}
                  </Row>
                </Row>
              </CardBody>
            </Card>
          </Col>
          <Col md={9}>
            {this.state.showspacedetail && 
            <Card>
              <CardHeader >
                <Row>
                  <Col md={6}>
                    <h5><b>Space Details</b></h5>
                  </Col>
                  <Col md={6}>
                  {this.state.spaceDetails.address.state != null &&<h5><b>Address</b></h5>}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Col md={12}>
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col md={5}>
                          <label>Space</label>
                        </Col>
                        <Col md={7}>{this.space.name}</Col>
                      </Row>
                      <Row>
                        <Col md={5}>
                          <label>Space Type</label>
                        </Col>
                        <Col md={7}>{this.space.spaceType.type}</Col>
                      </Row>
                      <Row>
                        <Col md={5}>
                          <label>Space Status</label>
                        </Col>
                        <Col md={7}>
                        {this.state.spaceDetails.spaceStatus != null && <span>{this.state.changeStatus}</span>}
                          </Col>
                      </Row>
                      <Row>
                        <Col md={5}>
                          <label>Change Status</label>
                        </Col>
                        <Col md={7}>
                          <Switch
                            checked={this.state.checkedB}
                            onChange={this.handleChange}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                          </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Col md={6}>
                          {this.space.address.line}
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          {this.space.address.city} 
                        </Col>
                      </Row>
                      <Row>
                     
                        <Col md={6}> 
                        {/* <span>{this.space.address.state.name + "," +this.space.address.state.country.name} </span> */}
                        {this.state.spaceDetails.address.state != null && <span>{this.state.spaceDetails.address.state.name + "," +this.state.spaceDetails.address.state.country.name} </span> }
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </CardBody>
            </Card>
            }
            {this.state.showssubpacedetail && 
            <Card>
              <CardHeader>
                <Row>
                  <Col md={6}>
                    <h5><b>Space Details</b></h5>
                  </Col>
                  <Col md={6}>
                    {/* <h5><b>Address</b></h5> */}
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <Col md={12}>
                  <Row>
                    <Col md={6}>
                      <Row>
                        <Col md={5}>
                          <label>Space</label>
                        </Col>
                        <Col md={7}>{this.state.spaceDetails.name}</Col>
                      </Row>
                      <Row>
                        <Col md={5}>
                          <label>Space Type</label>
                        </Col>
                        <Col md={7}>{this.state.spaceDetails.spaceType.type}</Col>
                      </Row>

                      <Row>
                        <Col md={5}>
                          <label>Space Status</label>
                        </Col>
                        <Col md={7}>
                        {this.state.spaceDetails.spaceStatus != null && <span>{this.state.changeStatus}</span> }
                          </Col>
                      </Row>
                      <Row>
                        <Col md={5}>
                          <label>Change Status</label>
                        </Col>
                        <Col md={7}>
                          <Switch
                            checked={this.state.checkedB}
                            onChange={this.handleChange}
                            color="primary"
                            name="checkedB"
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                          />
                          </Col>
                      </Row>
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Col md={6}>
                          {this.state.spaceDetails.address.line}
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          {this.state.spaceDetails.address.city} 
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}> 
                          {this.state.spaceDetails.address.state != null && <span>{this.state.spaceDetails.address.state.name + "," +this.state.spaceDetails.address.state.country.name} </span> }
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </CardBody>
            </Card>
            }
            <Card>
              <CardHeader>
                <Row>
                  <Col md={6}>
                    <h5><b>Cameras Assigned To This Space</b></h5>
                  </Col>
                </Row>
              </CardHeader>
              <Droppable  types={['camera']}  onDrop={this.onDrop.bind(this)} >
                <CardBody >
                  <Row>
                    {this.renderAssignCameraList()}
                  </Row>
                </CardBody>
              </Droppable>
            </Card>

            <Card>
              <CardHeader>
                <Row>
                  <Col md={6}>
                    <h5><b>Rules Assigned To This Space</b></h5>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody >
                {ruleDetails}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default SpaceDetails;
