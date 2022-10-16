import * as React from "react";
import { Grid, Typography, CardContent, Card, Button } from "@mui/material";

export default function User({ username, likes, id, handleClick }) {
  return (
    <Card sx={{ minWidth: 360 }}>
      <CardContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography
              sx={{ fontSize: 14 }}
              color="text.secondary"
              gutterBottom
            >
              {username}
            </Typography>
          </Grid>
          <Grid item xs={2}>
            {likes}
          </Grid>
          <Grid item xs={2} sx={{ cursor: "pointer" }}>
            <Button
              color="success"
              variant="outlined"
              onClick={() => handleClick(`/users/${id}/like`, "post")}
              disabled={!Boolean(localStorage.getItem("user"))}
            >
              Like
            </Button>
          </Grid>
          <Grid item xs={2} sx={{ cursor: "pointer" }}>
            <Button
              color="error"
              variant="outlined"
              onClick={() => handleClick(`/users/${id}/unlike`, "delete")}
              disabled={!Boolean(localStorage.getItem("user"))}
            >
              Dislike
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
