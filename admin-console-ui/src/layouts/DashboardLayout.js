import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Button, Badge, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, UncontrolledAlert } from 'reactstrap';
import { Header, SidebarNav, Footer, PageContent, Avatar, Chat, PageAlert, Page } from '../vibe';
import Logo from '../assets/images/caml-logo.svg';
import avatar1 from '../assets/images/avatar1.png';
// import BreadcrumbsPage from '../views/elements/Breadcrumbs';
import nav from '../_nav';
import routes from '../views';
import ContextProviders from '../vibe/components/utilities/ContextProviders';
import handleKeyAccessibility, { handleClickAccessibility } from '../vibe/helpers/handleTabAccessibility';
import { NavLink } from 'react-router-dom';
import Loaders from '../views/elements/Loaders'
import SweetAlert from 'sweetalert2-react';
import Axios from 'axios';
const MOBILE_SIZE = 992;


export default class DashboardLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarCollapsed: false,
      isMobile: window.innerWidth <= MOBILE_SIZE,
      showChat1: true,
      showSuccessAlert: false,
      showFailAlert: false,
      showSuccessLoader:false
    };
    this.getAllStaticData();
  }
  getAllStaticData = () => {

    Axios.post('/static/getall', null).then(response=>{ 
     let output_data = response.data;
     if(output_data.status == "SUCCESS"){
       console.log("Static Service Response"+JSON.stringify(output_data.data));
       localStorage.setItem("spaceTypeList",JSON.stringify(output_data.data.spaceTypeList));
       localStorage.setItem("countrystateList",JSON.stringify(output_data.data.countrystateList));
       localStorage.setItem("deviceStatusList",JSON.stringify(output_data.data.deviceStatusList));
       localStorage.setItem("deviceTypeList",JSON.stringify(output_data.data.deviceTypeList));
       localStorage.setItem("eventTypeList",JSON.stringify(output_data.data.eventTypeList));
       localStorage.setItem("operatorsList",JSON.stringify(output_data.data.operatorsList));
       localStorage.setItem("ruleStatusList",JSON.stringify(output_data.data.ruleStatusList));
       localStorage.setItem("configObjectList",JSON.stringify(output_data.data.configObjectList));
       localStorage.setItem("cameraStatusList",JSON.stringify(output_data.data.cameraStatusList));
       localStorage.setItem("trackingMethod",JSON.stringify(output_data.data.trackingMethodList));
     }else{
       alert("User Not Found");
     }
   }).catch(error=>{});
 
   }

  handleResize = () => {
    if (window.innerWidth <= MOBILE_SIZE) {
      this.setState({ sidebarCollapsed: false, isMobile: true });
    } else {
      this.setState({ isMobile: false });
    }
  };

  componentDidUpdate(prev) {
    if (this.state.isMobile && prev.location.pathname !== this.props.location.pathname) {
      this.toggleSideCollapse();
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    document.addEventListener('keydown', handleKeyAccessibility);
    document.addEventListener('click', handleClickAccessibility);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  toggleSideCollapse = () => {
    this.setState(prevState => ({ sidebarCollapsed: !prevState.sidebarCollapsed }));
  };

  closeChat = () => {
    this.setState({ showChat1: false });
  };

  handleSpanClick = () =>{
  localStorage.clear();
  this.props.history.push('/login');
  }
  logoutHandler = (e) =>{
    localStorage.clear();
    this.props.history.push('/login');
    }
  render() {
 
    const { sidebarCollapsed } = this.state;
    const sidebarCollapsedClass = sidebarCollapsed ? 'side-menu-collapsed' : '';
    return (
      <ContextProviders>
        <div className={`app ${sidebarCollapsedClass}`}>
          <PageAlert />
          <div className="app-body">
            <SidebarNav
              nav={nav}
              logo={Logo}
              logoText="caml"
              isSidebarCollapsed={sidebarCollapsed}
              toggleSidebar={this.toggleSideCollapse}
              {...this.props}
            />
            <Page>
              
              <Header
                toggleSidebar={this.toggleSideCollapse}
                isSidebarCollapsed={sidebarCollapsed}
                routes={routes}
                {...this.props}

              >
                    <span ><i className="fa fa-sign-out"/>
          
          </span>
          <React.Fragment>
      <NavItem>
      </NavItem>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          {/* New */}
        <i className="fa fa-home" />
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem>Project</DropdownItem>
          <DropdownItem>User</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>
            Message <Badge color="primary">10</Badge>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav>
          {/* <Avatar size="small" color="blue" initials="JS" /> */}
          <span onClick={e=>this.logoutHandler(e)}><i className="fa fa-sign-out"/></span>
          
       
        </DropdownToggle>
      </UncontrolledDropdown>
    </React.Fragment>
              </Header>
              
              <PageContent>

              { this.state.showSuccessLoader && <Loaders></Loaders>}
        
              {/* <Loaders></Loaders> */}
                <Switch>

                  {routes.map((page, key) => (
                    <Route path={page.path} component={page.component} key={key} />
                  ))}
                  <Redirect to="/login" />
                  
                </Switch>
              </PageContent>
            </Page>
          </div>
          <Footer>
            {/* <span>Copyright © 2019 Nice Dash. All rights reserved.</span>
            <span>
              <a href="#!">Terms</a> | <a href="#!">Privacy Policy</a>
            </span>
            <span className="ml-auto hidden-xs">
              Made with{' '}
              <span role="img" aria-label="taco">
                🌮
              </span>
            </span> */}
          </Footer>
          {/* <Chat.Container>
            {this.state.showChat1 && (
              <Chat.ChatBox name="Messages" status="online" image={avatar1} close={this.closeChat} />
            )}
          </Chat.Container> */}
        </div>
      </ContextProviders>
    );
  }
}

// function HeaderNav() {

//   return (

//     <React.Fragment>
//       <NavItem>
//       </NavItem>
//       <UncontrolledDropdown nav inNavbar>
//         <DropdownToggle nav caret>
//           {/* New */}
//         <i className="fa fa-home" />
//         </DropdownToggle>
//         <DropdownMenu right>
//           <DropdownItem>Project</DropdownItem>
//           <DropdownItem>User</DropdownItem>
//           <DropdownItem divider />
//           <DropdownItem>
//             Message <Badge color="primary">10</Badge>
//           </DropdownItem>
//         </DropdownMenu>
//       </UncontrolledDropdown>
//       <UncontrolledDropdown nav inNavbar>
//         <DropdownToggle nav>
//           {/* <Avatar size="small" color="blue" initials="JS" /> */}
//           <span ><i className="fa fa-sign-out"/>
          
//           </span>
//         </DropdownToggle>
//       </UncontrolledDropdown>
//     </React.Fragment>
//   );
// }
