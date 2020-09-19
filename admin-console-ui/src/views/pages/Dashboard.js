import React, { useEffect, useReducer } from 'react';
//import Plot from '../../vibe/components/Charts/Plot';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import { Card, CardBody, CardHeader, UncontrolledAlert } from 'reactstrap';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import MuiTreeView from 'material-ui-treeview';
import Toolbar from '@material-ui/core/Toolbar';
import createPlotlyComponent from 'react-plotlyjs';
import Plotly from 'plotly.js/dist/plotly-cartesian';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import moment from 'moment';
import Canvas from '../../vibe/components/CanvasOverlay/CanvasOverlay';
import Iframe from 'react-iframe';
import Button from '@material-ui/core/Button';

function Dashboard(props) {
  const [showSuccessAlert, setShowSuccessAlert] = React.useState(false);
  const [showFailAlert, setShowFailAlert] = React.useState(false);
  const [getData, setData] = React.useState(0);
  const [childSpaces, setChildSpaces] = React.useState([]);
  const [spaceId, setSpace] = React.useState(0);
  const [spaceName, setSpaceName] = React.useState('')
  const [density, setCurrentDensity] = React.useState(0);
  const [violationCount, setViolations] = React.useState(0);
  const [trees, setTree] = React.useState([]);
  const [spaceCount, setSpacesCount] = React.useState(0);
  // const [camera, setCamera] = React.useState(0);
  const [cameraList, setCameraList] = React.useState([]);
  const [ht, setHeight] = React.useState(900);
  const [X, setX] = React.useState([0]);
  const [Y, setY] = React.useState([0]);
  const [X1, setX1] = React.useState([0]);
  const [Y1, setY1] = React.useState([0]);
  const [toDate, setToDate] = React.useState(moment.now());
  const [fromDate, setFromDate] = React.useState(new Date().setHours(0, 0, 0, 0));
  const [deviceIP, setDeviceIP] = React.useState('')

  //const [selectedFromDate, setSelectedFromDate] = React.useState(moment().startOf('day'));

  //const [selectedDate, setSelectedDate] = React.useState(moment().format());

  function Plot(props) {
    const PlotlyComponent = createPlotlyComponent(Plotly);
    // console.log('X ', X);
    // console.log('Y ', Y);
    let data = [
      {
        type: 'bar', // all "bar" chart attributes: #bar
        x: X, //['2020-09-05T09:40:54.108Z', '2020-09-05T09:57:26.513Z'], // more about "x": #bar-x
        y: Y, //[15, 19],//[6, 2, 3], // #bar-y
        // x: ['2020-09-07T06:00:00.000Z', '2020-09-07T07:00:00.000Z','2020-09-07T08:00:00.000Z','2020-09-07T09:00:00.000Z','2020-09-07T10:00:00.000Z','2020-09-07T11:00:00.000Z'],
        // y: [10, 15, 23, 34, 22, 10],
        name: 'Number of violations', // #bar-name
        marker: {
          color: '#F1C40F',
        },
      },
    ];

    let layout = {
      // all "layout" attributes: #layout
      title: props.title, // more about "layout.title": #layout-title
      xaxis: {
        // all "layout.xaxis" attributes: #layout-xaxis
        title: 'time', // more about "layout.xaxis.title": #layout-xaxis-title
      },
      annotations: [],
    };
    let config = {
      showLink: false,
      displayModeBar: true,
    };

    return (
      <Box p={1} style={{ borderWidth: 1, borderBlockStyle: 'solid' }}>
        <PlotlyComponent data={data} layout={layout} config={config} />
      </Box>
    );
  }

  function Plots(props) {
    const PlotlyComponent = createPlotlyComponent(Plotly);
    // console.log('X ', X);
    // console.log('Y ', Y);
    let data = [
      {
        type: 'bar', // all "bar" chart attributes: #bar
        x: X1, //['2020-09-05T09:40:54.108Z', '2020-09-05T09:57:26.513Z'], // more about "x": #bar-x
        y: Y1, //[15, 19],//[6, 2, 3], // #bar-y
        // x: ['2020-09-07T06:00:00.000Z', '2020-09-07T07:00:00.000Z','2020-09-07T08:00:00.000Z','2020-09-07T09:00:00.000Z','2020-09-07T10:00:00.000Z','2020-09-07T11:00:00.000Z'],
        // y: [10, 15, 23, 34, 22, 10],
        name: 'Number of violations', // #bar-name
        marker: {
          color: '#F1C40F',
        },
      },
    ];

    let layout = {
      // all "layout" attributes: #layout
      title: props.title, // more about "layout.title": #layout-title
      xaxis: {
        // all "layout.xaxis" attributes: #layout-xaxis
        title: 'time', // more about "layout.xaxis.title": #layout-xaxis-title
      },
      annotations: [],
    };
    let config = {
      showLink: false,
      displayModeBar: true,
    };

    return (
      <Box p={1} style={{ borderWidth: 1, borderBlockStyle: 'solid' }}>
        <PlotlyComponent data={data} layout={layout} config={config} />
      </Box>
    );
  }

  const getDensity = async () => {
    //let space1 = name.toString().replace(/[^0-9]/g, ''); //match(/\d+/)[0];
    //console.log('Value12', '/dashboard/spacecurrentdensity/' + spaceId);
    //setSpace(space1);

    const json = {
      spaceId: spaceId,
    };

    await Axios.post('/dashboard/currentDensity', json)
      .then(response => {
        response.data.data.map(currentDensity => setCurrentDensity(currentDensity.current_density));
      })
      .catch(error => {});
  };

  const getSocialDistanceViolation = async space => {
    setSpace(space);
    const json = {
      spaceId: space,
      from: new Date(fromDate).toISOString(),
      to: new Date(toDate).toISOString(),
    };

    console.log('getSocialDistanceViolation ', json);
    await Axios.post('/dashboard/socialDistanceViolationEvents', json)
      .then(response => {
        console.log('SET VIOLATIONS ', response.data.data.length);
        setViolations(response.data.data.length);
      })
      .catch(error => {});
  };

  function getCameras(space_id) {
    Axios.post('/space/getdetails/' + space_id, null)
      .then(response => {
        //console.log('CAMERA ', response.data.data.assignCameraList);
        // setCamera(response.data.data.assignCameraList.length);
        setCameraList(response.data.data.assignCameraList);
        setHeight(ht + 620);
      })
      .catch(error => {});
  }

  const getViolations = async space => {
    setX([]);
    setY([]);

    console.log('space in 1st chart', space);
    //let space1 = violations.toString().replace(/[^0-9]/g, ''); //match(/\d+/)[0];
    setSpace(space);

    const json = {
      spaceId: space,
      from: new Date(fromDate).toISOString(),
      to: new Date(toDate).toISOString(),
      groupBy: 'h',
    };

    console.log('JSON ', json);
    await Axios.post('/dashboard/densityViolationCountsByTime', json)
      .then(response => {
        //response.data.data.map(currentDensity => setCurrentDensity(currentDensity.current_density));
        ////console.log('Plot graph ', response.data.data);

        console.log('DENSITY RESP ', response.data.data.length);
        response.data.data.map(date => {
          setX(X => [...X, date.time]);
          setY(Y => [...Y, date.count]);
        });

        //setViolations(response.data.data.length);
      })
      .catch(error => {
        console.log('error in dashboard/spacedistanceviolationbytime');
        console.log(error);
      });
  };

  const getDensityViolations = async space => {
    setX1([]);
    setY1([]);

    console.log('SPACE in 2nd chart ', space);

    const json = {
      spaceId: space,
      from: new Date(fromDate).toISOString(),
      to: new Date(toDate).toISOString(),
      groupBy: 'h',
    };

    console.log('JSON12345 ', json);
    await Axios.post('/dashboard/socialDistanceViolationCountsByTime', json)
      .then(response => {
        //response.data.data.map(currentDensity => setCurrentDensity(currentDensity.current_density));
        console.log('Plot graph ', response.data.data.length);

        console.log('DISTANCE VIOLATION ', response.data.data.length);
        response.data.data.map(date => {
          setX1(X1 => [...X1, date.time]);
          setY1(Y1 => [...Y1, date.count]);
        });

        //setDensityViolations(response.data.data.length);
      })
      .catch(error => {
        console.log('error in dashboard/socialDistanceViolationCountsByTime');
        console.log(error);
      });
  };

  const handleDateChange = date => {
    const sd = new Date(date).toISOString();
    // console.log('startDate: ', sd);
    setToDate(sd);
  };

  const handleFromDateChange = date1 => {
    //console.log("Date From ",date1)
    // setSelectedFromDate(date1);

    const fd = new Date(date1).toISOString();
    //console.log('fromDate :', fd);
    setFromDate(fd);

    // console.log('Date12 ', fromDate);
  };

  const handleDateApply = () => {
    getDensity();
    getViolations(spaceId);
    getSocialDistanceViolation(spaceId);
    getDensityViolations(spaceId);
  };

  useEffect(() => {
    // POST request using fetch inside useEffect React hook
    //console.log('Props ', props.getData);
    if (getData === 0) {
      //getAllStaticData();
      Axios.post('/space/gethierarchy', null)
        .then(response => {
          setChildSpaces(response.data.data);
          console.log('SPACE123', response.data.data);
          //setSpace(response.data.data[0].id);
          setSpace(response.data.data[0].id);
          setSpaceName(response.data.data[0].name);
          getDensity();
          getSocialDistanceViolation(response.data.data[0].id);
          getViolations(response.data.data[0].id);
          getDensityViolations(response.data.data[0].id);
          response.data.data.length === 0 ? setSpacesCount(0) : setSpacesCount(1);
          //getSocialDistanceViolation(response.data.data[0].id);
          //getViolations(response.data.data[0].id);
          // setTree([]);
          response.data.data.map(resp => {
            if (resp.childSpaceList.length === 0) {
              setTree(trees => [...trees, { value: resp.name, id: resp.id, nodes: [] }]);
            } else {
              let childList =[];
              resp.childSpaceList.map(child => {
                childList.push({value: child.name, id: child.id, nodes: []})
              });
              console.log("LIST ",childList);
              setTree(trees => [
                ...trees,
                {
                  value: resp.name,
                  id: resp.id,
                  nodes: childList
                  //[{value: resp.childSpaceList[0].name, id: resp.childSpaceList[0].id, nodes:[]}]
                  // nodes: function childVal() {
                  //   resp.childSpaceList.map(child => {
                  //     setTreeData(treeData => [
                  //       ...treeData,
                  //       {
                  //         value: child.name,
                  //         id: child.id,
                  //         nodes: [],
                  //       },
                  //     ]);
                  //   });
                  //   console.log("CHILD TREE ", treeData)
                  //   return treeData;
                  // },
                  //nodes: [{ value: child.name, id: child.id, nodes: [] }],
                },
              ]);

              //setTree(...trees,treeData);
            }
          });
        })
        .catch(error => {});

        // Get caml server details
        Axios.post('/device/getall', null)
        .then(response => {
          if (response.data.data.length > 0){
            setDeviceIP(response.data.data[0].ipaddress);
            console.log("DEVICE IP ADDRESS:",response.data.data[0].ipaddress);
          }

        })
        .catch(error => {});

      setData(1);
    }

    const violationCards = setInterval(async () => {
      if(spaceId  != 0){
        console.log('Updating violation cards');
        getDensity();
        getSocialDistanceViolation(spaceId);
      }
    }, 10000);

    const violationCharts = setInterval(async () => {
      if(spaceId  != 0){
        console.log('Updating violation charts');
        getViolations(spaceId);
        getDensityViolations(spaceId);
      }
    }, 3600000);

    return () => {
      clearInterval(violationCards, violationCharts);
    };
  }, [spaceId, fromDate, toDate, props]);

  const handleTreeChange = parent => {
    setSpaceName(parent.value);
    //console.log('SpaceId ', spaceId);
    let space = parent.id;
    console.log('Test Node ', space);
    setHeight(ht > 900 ? ht - 620 : ht);
    setSpace(space);
    getDensity();
    getSocialDistanceViolation(space);
    getCameras(spaceId);
    getViolations(space);
    getDensityViolations(space);
  };

  return (
    <div>
      <div>
        <Box>
          <Toolbar
            style={{
              backgroundColor: 'inherit',
              color: 'black',
              marginLeft: -10,
            }}
          >
            <Typography variant="h6">Spacial Analytics Dashboard  - {spaceName}</Typography>
          </Toolbar>
        </Box>
        <Grid container spacing={3} style={{ position: 'absolute' }}>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}></Grid>
          <Grid item xs={4}>
            {showSuccessAlert && (
              <UncontrolledAlert color="success" style={{ zIndex: '2' }}>
                User Verified!
              </UncontrolledAlert>
            )}
            {showFailAlert && <UncontrolledAlert color="danger">User Not Found</UncontrolledAlert>}
          </Grid>
        </Grid>
      </div>
      <Grid container spacing={3}>
        <Grid item xs={6} sm={2}>
          <Box
            style={{
              boxShadow: 4,
            }}
          >
            <Card style={{ height: ht }}>
              <CardHeader style={{ fontSize: 20 }}>Spaces </CardHeader>
              <CardBody>
                <MuiTreeView
                  // style={{ textTransform: 'uppercase' }}
                  tree={trees}
                  onParentClick={handleTreeChange}
                  onLeafClick={handleTreeChange}
                />
              </CardBody>
            </Card>
          </Box>
        </Grid>
        {spaceCount === 0 ? (
          <Grid item xs={6} sm={10}>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={12}>
                <Grid container spacing={3}>
                  <Grid item xs={6} sm={12}>
                    <Card>
                      <CardHeader>No spaces found! </CardHeader>
                      <CardBody>Please create a space to view the dashboard</CardBody>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ) : (
          <Grid item xs={6} sm={10}>
            <Grid container spacing={1}>
              <Grid item xs={6} sm={12}>
                <Grid container spacing={0}>
                  <Grid item xs={6} sm={5}>
                    <Card>
                      <CardHeader>Start date & time </CardHeader>
                      <CardBody>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container justify="space-around">
                            <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-dialog"
                              //label="Start Date"
                              format="dd/MM/yyyy"
                              value={fromDate}
                              onChange={handleFromDateChange}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                            <KeyboardTimePicker
                              margin="normal"
                              id="time-picker"
                              //label="Start Time"
                              value={fromDate}
                              onChange={handleFromDateChange}
                              KeyboardButtonProps={{
                                'aria-label': 'change time',
                              }}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </CardBody>
                    </Card>
                  </Grid>
                  <Grid item xs={6} sm={5}>
                    <Card>
                      <CardHeader>End date & time</CardHeader>
                      <CardBody>
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                          <Grid container justify="space-around">
                            <KeyboardDatePicker
                              margin="normal"
                              id="date-picker-dialog"
                              //label="Start Date"
                              format="dd/MM/yyyy"
                              value={toDate}
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                            />
                            <KeyboardTimePicker
                              margin="normal"
                              id="time-picker"
                              //label="Start Time"
                              value={toDate}
                              onChange={handleDateChange}
                              KeyboardButtonProps={{
                                'aria-label': 'change time',
                              }}
                            />
                          </Grid>
                        </MuiPickersUtilsProvider>
                      </CardBody>
                    </Card>
                  </Grid>
                  <Grid item xs={6} sm={2}>
                    <Card>
                      <CardHeader></CardHeader>
                      <CardBody>
                        <Button
                          variant="contained"
                          style={{
                            backgroundColor: '#F1C40F',
                            color: '#FFFFFF',
                            marginTop: 98,
                          }}
                          onClick={handleDateApply}
                        >
                          APPLY
                        </Button>
                      </CardBody>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={3} sm={3}>
                <Card>
                  <CardHeader>Current density</CardHeader>
                  <CardBody>
                    <h1 className="text-center">{density}</h1>
                  </CardBody>
                </Card>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Card>
                  <CardHeader>Number of people entered</CardHeader>
                  <CardBody>
                    <h1 className="text-center">-</h1>
                  </CardBody>
                </Card>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Card>
                  <CardHeader>Number of people exited</CardHeader>
                  <CardBody>
                    <h1 className="text-center">-</h1>
                  </CardBody>
                </Card>
              </Grid>
              <Grid item xs={3} sm={3}>
                <Card>
                  <CardHeader>Social distance violations</CardHeader>
                  <CardBody>
                    <h1 className="text-center">{violationCount}</h1>
                  </CardBody>
                </Card>
              </Grid>
            </Grid>

            <Grid container spacing={3}>
              <Grid item xs={6} sm={6}>
                <Card>
                  <CardBody>
                    <Plot title="Density Violations"></Plot>
                  </CardBody>
                </Card>
              </Grid>

              <Grid item xs={6} sm={6}>
                <Card>
                  <CardBody>
                    <Plots title="Social Distance Violations"></Plots>
                  </CardBody>
                </Card>
              </Grid>
            </Grid>


            {Array.apply(null, cameraList).map(camera => (
              <Grid container>
                <Grid item xs={12} sm={12}>
                  <Card style={{ height: 630 }}>
                    <CardHeader>Live View - {camera.name}</CardHeader>
                    <CardBody>
                      {/* <ReactPlayer
                        url="https://bitdash-a.akamaihd.net/content/sintel/hls/playlist.m3u8"
                        className="react-player"
                        width="100%"
                        height="100%"
                        playing
                        controls={true}
                      ></ReactPlayer>
                      <Canvas></Canvas> */}

                      <Iframe
                        url={"http://" + deviceIP + ":" + (9000 + camera.id)}
                        width="920px"
                        height="553px"
                        id="myId"
                        className=""
                        display="initial"
                        position="relative"
                      />
                    </CardBody>
                  </Card>
                </Grid>
              </Grid>
            ))}
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default Dashboard;
