import Dashboard from './pages/Dashboard';
// import Buttons from './elements/Buttons';
// import Alerts from './elements/Alerts';
// import Grid from './elements/Grid';
// import Typography from './elements/Typography';

// import Tabs from './elements/Tabs';
// import Tables from './elements/Tables';

// import Forms from './elements/Forms';
// import Loaders from './elements/Loaders';
// import Avatars from './elements/Avatars';
// import Invoice from './pages/Invoice';

// import CmsPage from './pages/Cms';
// import Widgets from './pages/Widgets';
// import BlankPage from './pages/BlankPage';
// import SubNav from './pages/SubNav';

// import Modals from './elements/Modals';
// import ProgressBars from './elements/ProgressBars';
// import PaginationPage from './elements/Pagination';

import ErrorPage from './pages/404';

import Login from './pages/login';
import RuleDetails from '../vibe/components/Rules/RuleDetails';
import CreateSpace from './elements/Spacecreate';
import SpaceList from '../vibe/components/Space/SpaceList';
import SpaceDetails from '../vibe/components/Space/SpaceDetails';
import Rule from '../vibe/components/Rules/RuleList';
import ServerList from '../vibe/components/Servers/ServerList';
import ServerDetails from '../vibe/components/Servers/ServerDetails';
import RuleCreate from  '../vibe/components/Rules/RuleCreate';
import RuleList from  '../vibe/components/Rules/RuleList';
import RuleEdit from  '../vibe/components/Rules/RuleEdit';
// See React Router documentation for details: https://reacttraining.com/react-router/web/api/Route
const pageList = [
  {
    name: 'Login',
    path: '/login',
    component: Login,
  },
  {
    name: 'Dashboard',
    path: '/home',
    component: Dashboard,
  },
  {
    name: 'SpaceList',
    path: '/elements/space',
    component: SpaceList,
  },  
  {
    name: 'SpaceDetails',
    path: '/space/spacedetail',
    component: SpaceDetails,
  },
  {
    name: 'CreateSpace',
    path: '/space/createspace',
    component: CreateSpace,
  },
  {
    name: 'Analytics',
    path: '/devices',
    component: ServerList,
  },
  {
    name: 'Cards',
    path: '/serverdetail',
    component: ServerDetails,
  },
  {
    name: 'Rule',
    path: '/rule',
    component:Rule ,
  },
  {
    name: 'Rule Details',
    path: '/ruledetails',
    component: RuleDetails,
  },
  {
    name: 'Rule Edit',
    path: '/ruleedit',
    component: RuleEdit,
  },
  {
    name: 'Rule Create',
    path: '/rulecreate',
    component: RuleCreate,
  },

  {
    name: 'Rule List',
    path: '/rulelist',
    component: RuleList,
  },

  // {
  //   name: 'Invoice',
  //   path: '/invoice',
  //   component: Invoice

  // },
  // {
  //   name: 'Buttons',
  //   path: '/elements/buttons',
  //   component: Buttons,
  // },
  // {
  //   name: 'Alerts',
  //   path: '/elements/alerts',
  //   component: Alerts,
  // },
  // {
  //   name: 'Grid',
  //   path: '/elements/grid',
  //   component: Grid,
  // },
  // {
  //   name: 'Typography',
  //   path: '/elements/typography',
  //   component: Typography,
  // },
  // {
  //   name: 'Tabs',
  //   path: '/elements/tabs',
  //   component: Tabs,
  // },
  // {
  //   name: 'Tables',
  //   path: '/elements/tables',
  //   component: Tables,
  // },
  // {
  //   name: 'Progress Bars',
  //   path: '/elements/progressbars',
  //   component: ProgressBars,
  // },
  // {
  //   name: 'Pagination',
  //   path: '/elements/pagination',
  //   component: PaginationPage,
  // },
  // {
  //   name: 'Modals',
  //   path: '/elements/modals',
  //   component: Modals,
  // },

  // {
  //   name: 'Loaders',
  //   path: '/elements/loaders',
  //   component: Loaders,
  // },
  // {
  //   name: 'Avatars',
  //   path: '/elements/avatars',
  //   component: Avatars,
  // },
  // {
  //   name: 'Blank',
  //   path: '/pages/blank',
  //   component: BlankPage,
  // },
  // {
  //   name: 'Sub Navigation',
  //   path: '/pages/subnav',
  //   component: SubNav,
  // },
  // {
  //   name: '404',
  //   path: '/pages/404',
  //   component: ErrorPage,
  // },
  

  // {
  //   name: 'CMS',
  //   path: '/apps/cms',
  //   component: CmsPage,
  // },
  // {
  //   name: 'Widgets',
  //   path: '/widgets',
  //   component: Widgets,
  // },
];

export default pageList;
