import React from 'react';
import { Button } from 'reactstrap';
import FA from 'react-fontawesome';


export default function SidebarToggleButton({ isSidebarCollapsed, toggleSidebar }) {
  const chevronClassName = isSidebarCollapsed ? 'is-collapsed' : 'is-not-collapsed';
  const screenReaderLabel = isSidebarCollapsed ? 'Expand Sidebar Navigation' : 'Collapse Sidebar Navigation';
  return (
    <span onClick={toggleSidebar} className={`m-r sidebar-toggle ${chevronClassName}`} aria-label={screenReaderLabel}>
     <img src="https://img.icons8.com/material-sharp/24/000000/menu.png"/>
      {/* <FA name={'fa fa-navicon'} /> */}
    </span>
  );
}
