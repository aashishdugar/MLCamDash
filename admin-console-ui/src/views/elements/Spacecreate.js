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
import { Cameras } from '../../vibe';
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
import Spacecreate from '../../vibe/components/Space/SpaceCreate';
class CreateSpace extends Component {
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
 
<Spacecreate></Spacecreate> 
   
    );
  }
}

export default CreateSpace;
     

