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
import laptopImage from '../../assets/images/laptop.jpeg';
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
import Axios from 'axios';
import AppleLogo from '../../assets/images/apple.png';
import MSLogo from '../../assets/images/microsoft.png';
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


export default class Invoice extends Component {

  constructor(props) {
    super(props);
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
      serverstatus:"",
     
    };


 };
 addServerCmp = () =>{

  this.setState({
    showAddServer: true
    });
}
removeServer = (e) =>{
  this.setState({
    showAddServer: false
    });

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
          
  <MenuItem value={1}>CAML</MenuItem>
  <MenuItem value={2}>DVR</MenuItem>
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


c
  render() {
   
    return (
   
      <React.Fragment>
      <Row>
      <Col md={12}>
{ this.state.showAddServer && this.renderAddServer()}
</Col>
</Row>
        <MaterialTable
        icons={this.tableIcons}
          title="Caml Servers"
          
          columns={[
            // { title: 'Sr.No', field: "i" },
            { title: 'Name', field: 'name'  },
            { title: 'Manufacturer', field: 'manufacturer' },
            { title: 'UUID', field: 'uuid', align:'left' },
          ]}
          data={ this.deviceList }        
          options={{
            sorting: true,
            actionsColumnIndex: -1,
            align:'justify'
          }}
          actions={[
            {
              icon: () => <VisibilityIcon />,
              tooltip: 'Server Details',
              onClick: (e, rowData) => {
                // Do save operation
                this.toServerDetails(e,rowData)
              }
            },
            {
              icon:() => <AddBox/>,
              tooltip: 'Add User',
              isFreeAction: true,
              onClick: (event) => this.addServerCmp()
            }
          ]}
   
        />
</React.Fragment>
    );
  }
}
