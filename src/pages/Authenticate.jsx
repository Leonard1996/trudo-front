import {
  TextField,
  Grid,
  Card,
  CardContent,
  Button,
  Typography,
} from "@mui/material";
import { useState } from "react";
import axios from "axios";
import { useNavigate, Navigate } from "react-router-dom";
import parseJson from "../common/helpers/parseJson";
import { baseUrl } from "..";

export default function Authenticate() {
  const [isSignUp, setIsSignUp] = useState(false);

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const token = parseJson(localStorage.getItem("user"));
  if (Boolean(token)) {
    return <Navigate to="/profile" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (isSignUp) {
        await axios.post(baseUrl + "/signUp", inputs);
        alert("Signed up successfully");
      } else {
        delete inputs.confirmPassword;
        const user = await axios.post(baseUrl + "/login", inputs);
        localStorage.setItem("user", JSON.stringify(user.data.user));

        navigate("/profile");
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Grid container padding={2}>
      <Grid item xs={4} />
      <Grid item xs={4}>
        <Card sx={{ minWidth: 360 }}>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <Grid container rowSpacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="username"
                    name="username"
                    fullWidth
                    label="username"
                    value={inputs.username}
                    onChange={(e) =>
                      setInputs((i) => ({
                        ...i,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    name="password"
                    fullWidth
                    label="passowrd"
                    value={inputs.password}
                    onChange={(e) =>
                      setInputs((i) => ({
                        ...i,
                        [e.target.name]: e.target.value,
                      }))
                    }
                  />
                </Grid>
                {isSignUp && (
                  <Grid item xs={12}>
                    <TextField
                      type="password"
                      name="confirmPassword"
                      fullWidth
                      label="Confirm passowrd"
                      value={inputs.confirmPassword}
                      onChange={(e) =>
                        setInputs((i) => ({
                          ...i,
                          [e.target.name]: e.target.value,
                        }))
                      }
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <Button variant="outlined" type="submit">
                    {isSignUp ? "SignUp" : "LogIn"}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    variant="caption"
                    sx={{ cursor: "pointer" }}
                    onClick={() => setIsSignUp((prev) => !prev)}
                  >
                    {isSignUp
                      ? "Already have an account? Click here to log in"
                      : "Don't have an account? Clikc here to sign up"}
                  </Typography>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );
}
