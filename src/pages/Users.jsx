import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import User from "./components/User";
import Pagination from "@mui/material/Pagination";
import { baseUrl } from "..";
import axiosInstance from "../common/helpers/axios.instance";

const limit = 5;

export default function Users() {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const fetchUsers = async () => {
    try {
      const users = await axios.get(
        baseUrl + `/most-liked?page=${page}&limit=${limit}`
      );
      setUsers(users.data.entries);
      setCount(Math.ceil(users.data.count / limit));
    } catch (error) {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (_event, page) => {
    setPage(page);
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleClick = async (url, method) => {
    try {
      await axiosInstance({
        method,
        url,
      });
      fetchUsers();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Grid container rowSpacing={2} paddingTop={2}>
      <Grid item xs={12}>
        <Pagination count={count} page={page} onChange={handleChange} />
      </Grid>
      {users.map((user) => (
        <React.Fragment key={user.id}>
          <Grid item xs={3} />
          <Grid item xs={6}>
            <User {...user} handleClick={handleClick} />
          </Grid>
          <Grid item xs={3} />
        </React.Fragment>
      ))}
    </Grid>
  );
}
