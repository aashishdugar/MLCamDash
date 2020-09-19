import React, { Component } from 'react';
// import FA from 'react-fontawesome';
// import { Avatar } from '../../vibe';
import { Row, Button, Col, Card, CardBody, CardHeader, CardFooter, Container } from 'reactstrap';
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


export default class Feed extends Component {
 
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
      ruleListArray:[],
      cardshadow:false,
      showAddServer:false,
      // name:"",
      // manufacturer:"",
      // uuid:"",
      // ipaddress:"",
      // servertype:1,
      // serverstatus:"",
     
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

 getAllDevices = () => {
  Axios.post('/rule/getall', null).then(response=>{ 
  
      let output_data = response.data;
  
   if(output_data.status == "SUCCESS"){
   this.ruleList = output_data.data;
    this.setState({
      ruleListArray: this.ruleList
    });
   }else{
  
   }

 }).catch(error=>{});

 }

 toSpaceDetails = (e,space) =>{
  console.log("space",space);

  
      this.props.history.push('/home')
      }
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
          title="Rule List"
          
          columns={[
            // { title: 'Sr No', field: '0',align:'left'},
        
            { title: "#", render: rowData => rowData.tableData.id + 1 ,width:"10px"},
            { title: 'Name', field: 'name',align:'left'},
            { title: 'Space', field: 'space.name',align:'left'},
            { title: 'Status', field: 'rulestatus.status',align:'left'},
            { title: 'Defination', field: 'definition',align:'left'},
         
            { title: 'Created Date', field: 'createdon',align:'left'},
            // { title: 'Space', field: 'space',align:'left'}
            // { title: 'UUID', field: 'uuid', align:'left' },
            ] }
          data={ this.ruleList }        
          options={{
            sorting: true,
            actionsColumnIndex: -1,
            // align:'left'
            headerStyle:{backgroundColor:'#bcd1e0'},
           
          }}
          style={{
               boder:"1px solid black"
        }}
          actions={[
            {
              icon:() => <AddBox/>,
              tooltip: 'Add Rule',
              isFreeAction: true,
              // onClick: (event) => this.addServerCmp()
            }
          ]}
          onRowClick={(e, rowData) => this.toSpaceDetails(e,rowData)}
        />
</React.Fragment>
    );
  }
}
