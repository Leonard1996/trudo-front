import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem("user", null);
    navigate("/authenticate");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar
          variant="dense"
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div onClick={() => navigate("/users")} style={{ color: "white" }}>
            LOGO
          </div>
          <div>
            <span
              onClick={() => navigate("/authenticate")}
              style={{ color: "white", marginRight: "10px", cursor: "pointer" }}
            >
              Authenticate
            </span>
            <span
              onClick={() => navigate("/users")}
              style={{ color: "white", marginRight: "10px", cursor: "pointer" }}
            >
              Most-liked
            </span>
            <span
              onClick={() => navigate("/profile")}
              style={{ color: "white", marginRight: "10px", cursor: "pointer" }}
            >
              Profile
            </span>
            <span
              onClick={handleClick}
              style={{ color: "white", marginRight: "10px", cursor: "pointer" }}
            >
              Logout
            </span>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
