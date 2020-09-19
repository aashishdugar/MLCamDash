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
import shadows from '@material-ui/core/styles/shadows';
export default class SpaceList extends Component {

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
    this.spaceTypeList = JSON.parse(localStorage.getItem('spaceTypeList'));
    

    this.countryStateList = JSON.parse(localStorage.getItem('countrystateList'));
    

    this. getAllspaces();
    this.state = {
      facebook: true,
      twitter: false,
     spaceListArray:[],
      cardshadow:false,
      showAddSpace:false,
      name:"",
      spacetype:"",
      country:"",
      state:"",
      city:"",
      pin:"",
      line:"",
      serverstatus:"",
      childSpaceList:[],
      spaceTypeListArr:this.spaceTypeList,
      stateList:[]
    };

    this.updateSpaceType = this.updateSpaceType.bind(this);
    this.updateCountry = this.updateCountry.bind(this);
    this.updateState = this.updateState.bind(this);
    this.updateName = this.updateName.bind(this);
    this.updatecity = this.updatecity.bind(this);
    this.updatePin = this.updatePin.bind(this);
    this.updateLine = this.updateLine.bind(this);
 };
 updateSpaceType(e) {
  this.setState({spacetype: e.target.value});

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
updateName(e) {
  this.setState({name: e.target.value});

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
 getAllspaces = () => {
  Axios.post('/space/gethierarchy', null).then(response=>{ 
      let output_data = response.data;
   if(output_data.status == "SUCCESS"){
   this.spaceList = output_data.data;
    this.setState({
      spaceListArray: this.spaceList
    });
   }else{
  
   }

 }).catch(error=>{});

 }
 toSpaceDetails = (e,space) =>{
  let obj = JSON.parse(JSON.stringify(space));
  this.props.history.push({
    pathname: '/space/spacedetail',
    state: { data: obj }
  })

      }

addSpaceCmp = (e) =>{
  this.setState({
    showAddSpace: true
    });
}
removeSpace = (e) =>{
  this.setState({
    showAddSpace: false
    });
}

addOptions = (e) =>{
  return this.spaceTypeList.map((space, index) => {
    const { id, type} = space 
     return (
      <MenuItem value={space.id}>{space.type}</MenuItem>
     
     )
  })
}

addSpace = (e) =>{
  const postObject={
    "name": this.state.name,
    "spaceType": {
      "id": this.state.spacetype
     
    },
    "parentspace": null,
    "icon": null,
    "dimension": null,
    "address": {
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
  Axios.post('/space/create', postObject).then(response=>{ 
  let output_data = response.data;
  let res = output_data.data
  if(output_data.status == "SUCCESS"){
    this.successmsg = output_data.msg;
    this.getAllspaces();
  this.setState({
    showSuccessAlert: true,
    showSuccessLoader: false,
    spaceListArray: this.spaceList
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
  <TextField  fullWidth id="city" label="City" name="City"  value = {this.state.city} onChange = {this.updatecity} autoFocus/>
  </Col>
  <Col md={6}>
  <TextField  fullWidth id="pin" label="Pincode" name="Name"  value = {this.state.pincode} onChange = {this.updatePin} autoFocus/>
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
 ChildTable(childSpaceList,padding) {

this.padding = parseInt(padding)+3;
    return (
      <>
      <MaterialTable
       
        icons={this.tableIcons}
        style={{boxShadow:"none",
              paddingLeft:this.padding+"em",
              borderBottom:"none"
            }}
        columns={[
          { title: 'Space', field: 'name' },
          { title: 'Type', field: 'spaceType.type' },
          { title: 'Address', field: 'address.city' },
        ]}
        data={childSpaceList}  
        options={{
          search: false,
          actionsColumnIndex: -1,
          paging: false,
          header:false,
          toolbar: false,

     }}

        detailPanel={[
          {
            tooltip: 'Show Name',
            render: rowData => {
              return (
                <div
                  style={{}}
                >


  {this.ChildTable(rowData.childSpaceList,"0")}
  
                </div>
              )
            },
          }
  
        ]}
        onRowClick={(e, rowData) =>  this.toSpaceDetails(e,rowData)}
      />
         </>
      )



 }
  render() {
    return (
    <>
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
          <Row>
      <Col md={12}>
{ this.state.showAddSpace && this.renderAddSpace()}
</Col>
</Row>
    <MaterialTable
      title="Space List"
      icons={this.tableIcons}
      columns={[
        { title: 'Space', field: 'name' },
        { title: 'Type', field: 'spaceType.type' },
        { title: 'Address', field: 'address.city' },
      ]}
      data={ this.spaceList }  
      options={{
        actionsColumnIndex: -1,
        headerStyle:{backgroundColor:'#bcd1e0',fontWeight:"bold"}
      }}
      detailPanel={[
        {
          tooltip: 'Show Name',
          render: rowData => {
            return (
              <div
                style={{
                
              
                }}
              >
           {this.ChildTable(rowData.childSpaceList,"0")}
            </div>
            )
          },
        }

      ]}
      actions={[
        {
          icon:() => <AddBox/>,
          tooltip: 'Add User',
          isFreeAction: true,
          onClick: (event) => this.addSpaceCmp()
        }
      ]}
      onRowClick={(e, rowData) => this.toSpaceDetails(e,rowData)}
    />
      
      </>
    )
  }
}
