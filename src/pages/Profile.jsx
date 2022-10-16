import { Grid, TextField, Typography, Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../common/helpers/axios.instance";

export default function Profile() {
  const [me, setMe] = useState({});

  const [inputs, setInputs] = useState({
    password: "",
    oldPassword: "",
    confirmPassword: "",
  });

  const fetchMe = async () => {
    try {
      const me = await axiosInstance.get("/me");
      setMe(me.data.me);
    } catch (error) {
      console.log({ error });
      alert(error);
    }
  };
  useEffect(() => {
    fetchMe();
  }, []);

  const handleSubmit = async (e) => {
    console.log(inputs);
    e.preventDefault();
    try {
      await axiosInstance.patch("/me/update-password", inputs);
      alert("Updated successfully");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Grid container marginTop={2} rowSpacing={2}>
      <Grid item xs={4} />
      <Grid item xs={2}>
        Username:
      </Grid>
      <Grid item xs={2}>
        {me.username}
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={4} />
      <Grid item xs={2}>
        Registered on:
      </Grid>
      <Grid item xs={2}>
        {me.tsCreated}
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={12}>
        <Typography variant="h6" align="center">
          Edit your profile password below
        </Typography>
      </Grid>
      <Grid item xs={4} />
      <Grid item xs={4}>
        <form onSubmit={handleSubmit}>
          <Box margin={1}>
            <TextField
              type="password"
              label="Old password"
              name="oldPassword"
              value={inputs.oldPassword}
              fullWidth
              onChange={(e) =>
                setInputs((i) => ({ ...i, [e.target.name]: e.target.value }))
              }
            ></TextField>
          </Box>
          <Box margin={1}>
            <TextField
              type="password"
              label="New password"
              name="password"
              value={inputs.password}
              fullWidth
              onChange={(e) =>
                setInputs((i) => ({ ...i, [e.target.name]: e.target.value }))
              }
            ></TextField>
          </Box>
          <Box margin={1}>
            <TextField
              type="password"
              label="Confirm new password"
              name="confirmPassword"
              value={inputs.confirmPassword}
              fullWidth
              onChange={(e) =>
                setInputs((i) => ({ ...i, [e.target.name]: e.target.value }))
              }
            ></TextField>
          </Box>
          <Box margin={1}>
            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </Box>
        </form>
      </Grid>
      <Grid item xs={4} />
    </Grid>
  );
}
