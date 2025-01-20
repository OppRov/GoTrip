import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import ModeOfTravelIcon from "@mui/icons-material/ModeOfTravel";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";

import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../hooks/useUserContext";

const pages = ["My Trips"];
const settings = ["Logout"];
const logging = ["Login", "Register"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const nav = useNavigate();

  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (user?.role === "admin") pages.push("admin panel");
  }, [user]);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
    console.log("open", event.currentTarget.id);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (e) => {
    const id = e.currentTarget.id;
    console.log(id);
    if (id === "My Trips") nav("/trips");
    else if (id === "admin panel") nav("/adminPanel");

    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (e) => {
    const id = e.currentTarget.id;

    if (id === "Login") nav("/login");
    else if (id === "Register") nav("/signup");
    else if (id === "Logout") {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("token");
      nav("/");
      setUser(null);
    }
    setAnchorElUser(null);
  };

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* For small screens */}
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} id={page} onClick={handleCloseNavMenu}>
                    <Typography sx={{ textAlign: "center" }}>{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <ModeOfTravelIcon
              sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}
            />
            <Typography
              onClick={() => nav("/")}
              variant="h5"
              noWrap
              component="a"
              href="#app-bar-with-responsive-menu"
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GOTRIP
            </Typography>
            {/* For medium and large screens */}
            <ModeOfTravelIcon
              sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
            />
            <Typography
              onClick={() => nav("/")}
              variant="h6"
              noWrap
              component="a"
              // href="#app-bar-with-responsive-menu"
              sx={{
                "&:hover": {
                  cursor: "pointer",
                },
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              GOTRIP
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => {
                return (
                  <Button
                    key={page}
                    id={page}
                    onClick={handleCloseNavMenu}
                    variant="text"
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      "&:hover": {
                        backgroundColor: "primary.light",
                        // transform: "scale(1.1)",
                        translate: "0px -2px",
                        transition: "all 0.15s ease-in-out",
                      },
                    }}
                  >
                    {page}
                  </Button>
                );
              })}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              {user ? (
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={`${user.firstName} ${user.lastName}`}
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip title="User">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar src="/static/images/avatar/2.jpg" />
                  </IconButton>
                </Tooltip>
              )}
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {user
                  ? settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        id={setting}
                        onClick={handleCloseUserMenu}
                      >
                        <Typography sx={{ textAlign: "center" }}>
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))
                  : logging.map((log) => (
                      <MenuItem
                        key={log}
                        id={log}
                        onClick={handleCloseUserMenu}
                        sx={{ ":hover": { backgroundColor: "lightgray" } }}
                      >
                        <Typography sx={{ textAlign: "center" }}>
                          {log}
                        </Typography>
                      </MenuItem>
                    ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Outlet />
    </>
  );
}
export default ResponsiveAppBar;
