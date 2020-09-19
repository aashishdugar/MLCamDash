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
class Spacecreate extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      showEditServer:false,
      serverid:"",
      name:"",
      manufacturer:"",
      uuid:"",
      ipaddress:"",
      servertype:"",
      serverstatus:"",

    }
 };
 
  render() {

    return (
        <Card >
        <CardHeader style={{backgroundColor:"#abb2b9",color:"#fdfefe"}}>
        <Grid container spacing={3}>
 <Grid item xs={10}>
 <h5><b>Add Space</b></h5>
 </Grid>
 <Grid item xs={2}>
   <div style={{marginTop: "-0.5em"}}>
 
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
    );
  }
}

export default Spacecreate;
     

