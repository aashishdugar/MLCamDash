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

// import {Cameras} from '../../vibe/components/Cameras/camera';
// import { Cameras } from '../../vibe';
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
import { forwardRef } from 'react';
import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Icon from '@material-ui/core/Icon';
import MaterialTable from 'material-table';
import Axios from 'axios';
export default class ServerList extends Component {
  constructor(props) {
    super(props);
    //this.deviceTypeList = JSON.parse(localStorage.getItem('deviceTypeList'));
    this.deviceTypeList = [
      {
        "id": "1",
        "type": "caml"
      }
    ];

    this.tableIcons = {
      Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
      Visibility: forwardRef((props, ref) => <VisibilityIcon {...props} ref={ref} />),
      Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
      Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
      DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
      Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
      Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
      FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
      LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
      NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
      PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
      ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
      Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
      SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
      ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
      ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
    };
    this. getAllDevices();
    this.state = {
      facebook: true,
      twitter: false,
      deviceListArray:[],
      cardshadow:false,
      showAddServer:false,
      name:"",
      manufacturer:"",
      uuid:"",
      ipaddress:"",
      servertype:1,
      serverstatus:""
    };

    this.updateState = this.updateState.bind(this);
    this.updatemMnufacturer = this.updatemMnufacturer.bind(this);
    this.updatemUuid = this.updatemUuid.bind(this);
    this.updatemIpaddress = this.updatemIpaddress.bind(this);
    this.updateSerevrType = this.updateSerevrType.bind(this);
    this.updateServerStatus = this.updateServerStatus.bind(this);
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
  getAllDevices = () => {
    Axios.post('/device/getall', null).then(response=>{ 
    
        let output_data = response.data;
    
     if(output_data.status == "SUCCESS"){
     this.deviceList = output_data.data;
      this.setState({
        deviceListArray: this.deviceList
      });
     }else{
    
     }
 
   }).catch(error=>{});
 
   }

   toServerDetails = (e,device) =>{
    this.props.history.push({
      pathname: '/serverdetail',
      state: { detail: device }
    })
    }
    removeServer = (e) =>{
      this.setState({
        showAddServer: false
        });
    
      }
      addServer = (e) =>{
        const postObject={
          "name": this.state.name,
          "manufacturer": this.state.manufacturer,
          "icon": null,
          "ipaddress": this.state.ipaddress,
          "uuid": this.state.uuid,
          "image": null,
          "deviceType": {
            "id":this.state.servertype
          },
        }

        Axios.post('/device/create', postObject).then(response=>{ 
        
     
        let output_data = response.data;
        let res = output_data.data
        if(output_data.status == "SUCCESS"){
   
        this.getAllDevices();
        this.setState({
          showSuccessAlert: true,
          showSuccessLoader: false,
          deviceListArray: this.deviceList
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
    renderAddServer() {
      return (
         <Card >
           <CardHeader style={{backgroundColor:"#abb2b9",color:"#fdfefe"}}>
           <Grid container spacing={3}>
    <Grid item xs={10}>
    <h5><b>Add Server</b></h5>
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
      <TextField  fullWidth id="ipaddress" label="IP Address" name="ipaddress" value={this.state.ipaddress} onChange = {this.updatemIpaddress} autoComplete="Manufacturer" />
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
      </Row>
      
       
           </CardBody>
           <CardFooter>
  
           <Button color="success" size="sm" onClick={e=>this.addServer(e)}><i className="fa fa-check" ></i>&nbsp;Add</Button>{' '}
           </CardFooter>
         </Card>
      //  </Col>
      
      )
  
  
  
  }
   renderRowData() {
 
    return this.state.deviceListArray.map((device, index) => {
      const { uuid, name} = device 
       return (
        
        <Col md={3} xs={12}>
          <Card className="devicecard"  onClick={e=>this.toServerDetails(e,device)} style={{cursor:"pointer"}}>
            <CardHeader>
            <Grid container spacing={3}>
        <Grid item xs={10}>
        {device.name}
        </Grid>
        <Grid item xs={2}>
        <span className="fa fa-microchip"></span>&nbsp;
        </Grid>
      </Grid>
            </CardHeader>
            <CardBody>
              <h6 className="m-b-20 inline-block">
                <span><b>UUID:</b>&nbsp;{device.uuid}</span>
              </h6>{' '}
        
             
            </CardBody>
          </Card>
        </Col>
       
       )
    })
 }

 addServerCmp = (e) =>{

  this.setState({
    showAddServer: true
    });
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
        {'Caml Server Created Successfully'}
                </UncontrolledAlert>}
                { this.state.showFailAlert && <UncontrolledAlert color="danger" style={{zIndex: "2"}}>
             {this.errorMsg }
                </UncontrolledAlert>}
        </Grid>
      </Grid>
     </div>
      <Row>
      <Col md={12}>
{ this.state.showAddServer && this.renderAddServer()}
</Col>
</Row>
        <MaterialTable
        icons={this.tableIcons}
          title="CAML Servers"
          
          columns={[
        
            { title: "#", render: rowData => rowData.tableData.id + 1,width:'5%' },
            { title: 'Name', field: 'name',align:'left',width:'20%' },
            { title: 'Manufacturer', field: 'manufacturer',align:'left',width:'20%' },
            { title: 'UUID', field: 'uuid',align:'left',type:'datetime',width:'15%'},
            { title: 'Status', field: 'deviceStatus.status',align:'left',width:'10%'},
            ] }
          data={ this.deviceList  }        
          options={{
            sorting: true,
            actionsColumnIndex: -1,
            headerStyle:{backgroundColor:'#bcd1e0',fontWeight:'bold'},
           
          }}
          style={{
               boder:"1px solid black"
        }}
          actions={[
         
            {
              icon:() => <AddBox/>,
              tooltip: 'Add Server',
              isFreeAction: true,
              onClick: (event) => this.addServerCmp()
            }
          ]}
          onRowClick={(e, rowData) => this.toServerDetails(e,rowData)}
        />
</React.Fragment>

    );
  }
}
