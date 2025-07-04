import axios from "axios";
import config from "config";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography
} from "@mui/material";

export default function RequestLogs() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${config.baseApi1}/request/request-logs`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch logs:", err);
      });
  }, []);

  return (
    <div>
      <TableContainer component={Paper} sx={{mt:6}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Request ID</strong></TableCell>
              <TableCell><strong>Status</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Area</strong></TableCell>
              <TableCell><strong>Activity</strong></TableCell>
              <TableCell><strong>Date/Time</strong></TableCell>
              <TableCell><strong>Changes Made</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((log, index) => (
              <TableRow key={index}>
                <TableCell>{log.request_id}</TableCell>
                <TableCell>{log.request_status}</TableCell>
                <TableCell>{log.comm_Category}</TableCell>
                <TableCell>{log.comm_Area}</TableCell>
                <TableCell>{log.comm_Act}</TableCell>
                <TableCell>{log.time_date}</TableCell>
                <TableCell>{log.changes_made}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
