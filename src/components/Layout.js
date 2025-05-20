// src/components/Layout.js

import React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import BarChartIcon from "@mui/icons-material/BarChart";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate, Routes, Route } from "react-router-dom";

// pages (lowercase folder)
import Dashboard from "../pages/Dashboard";
import Tasks     from "../pages/Tasks";
import Analytics from "../pages/Analytics";
import Settings  from "../pages/Settings";

const drawerWidth = 240;

export default function Layout({ window }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => setMobileOpen(open => !open);

  const menuItems = [
    { text: "Dashboard", icon: <DashboardIcon />, path: "/dashboard" },
    { text: "Tasks",     icon: <ListAltIcon />,  path: "/tasks"    },
    { text: "Analytics", icon: <BarChartIcon />, path: "/analytics"},
    { text: "Settings",  icon: <SettingsIcon />, path: "/settings" }
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {menuItems.map(({ text, icon, path }) => (
          <ListItem button key={text} onClick={() => navigate(path)}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Button variant="outlined" onClick={() => {/* TODO: logout */}}>
          Logout
        </Button>
      </Box>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml:    { sm: `${drawerWidth}px` }
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            My Student Organizer
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="main navigation"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
          }}
        >
          {drawer}
        </Drawer>

        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth }
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar /> {/* spacer for fixed AppBar */}
        <Routes>
          <Route path="/"          element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tasks"     element={<Tasks />}     />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings"  element={<Settings />}  />
        </Routes>
      </Box>
    </Box>
  );
}

Layout.propTypes = {
  window: PropTypes.func
};
