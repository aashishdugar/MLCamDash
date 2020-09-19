import React, { Component,useState } from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import routes from '../index';
import { Redirect, Route } from "react-router";
import { NavLink } from 'react-router-dom';
import Axios from 'axios';
import  Loaders  from '../elements/Loaders';
import { makeStyles } from '@material-ui/core/styles';
// import Alert from '@material-ui/lab/Alert';

import {
    Breadcrumb,
    BreadcrumbItem,
    Card,
    CardBody,
    CardHeader,
    UncontrolledAlert,
  } from 'reactstrap';

import DashboardLayout from "../../layouts/DashboardLayout";
const loader = Loaders();
export default class Login extends Component {
  // const { history } = this.props;

  constructor(props) {
    super(props);

let errorMsg = '';
  
    this.state = {
      email: '',
      password: '',
      showSuccessAlert: false,
      showFailAlert: false,
     
    };
   
  }

  mySubmitHandler = (event,props) => {

    event.preventDefault();
    this.setState({
      showSuccessLoader: true
    });
    let user = "admin"
    let pass = "admin"
    let nam = event.target.name;
    let val = event.target.value;
   
    let loginuser = document.getElementById('email').value;
    let loginpass = document.getElementById('password').value;
    //alert("You are submitting " + loginuser +" "+loginpass);
    const postObject={
    
        "name": loginuser,
        "password": loginpass
    
   }
   console.log(postObject)
   Axios.post('/users/login', postObject).then(response=>{ 

    console.log("response",response.data);
    let output_data = response.data;
    if(output_data.status == "SUCCESS"){
      this.setState({
        showSuccessAlert: true,
        showSuccessLoader: false
      });

      setTimeout(() => {
        this.setState({
          showSuccessAlert: false
        });
      }, 2000);
      this.props.history.push('/home');  
     

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
       
            <div>
               <div>
      <Grid container spacing={3} style={{position: "absolute"}}>
        <Grid item xs={4}>
    
        </Grid>
        <Grid item xs={4}>
   
        </Grid>
        <Grid item xs={4}>
        { this.state.showSuccessAlert && <UncontrolledAlert color="success">
                 User Verified!
                </UncontrolledAlert>}
                { this.state.showFailAlert && <UncontrolledAlert color="danger">
             {this.errorMsg }
                </UncontrolledAlert>}
        </Grid>
      </Grid>
    </div>
           
            <Card className="log">
            <CardHeader className="loginHeader"><h1>caml</h1><p>A Realtime Video Analytics Platform</p></CardHeader>
                <CardBody>
                   
            <form onSubmit={this.mySubmitHandler}> 
      
            {/* <Avatar className="LockOutlinedIcon">
          {/* <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5" className="Typography">
          Sign in
        </Typography>
        <TextField id="email" label="User"  fullWidth/>

  <TextField type="password" id="password" label="Password"  fullWidth/>

                    <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
        
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
            </form>
            </CardBody>
            </Card>
            </div>
           
        );
    }
}