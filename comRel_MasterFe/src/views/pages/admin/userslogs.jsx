import { useEffect, useState } from "react";
import axios from "axios";
import config from "config";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
  Stack,
  Button
} from "@mui/material";
import dayjs from "dayjs";

export default function UserLogs() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await axios.get(`${config.baseApi}/users/logs`);
        setLogs(response.data);
        setFilteredLogs(response.data); // Default full list
      } catch (err) {
        console.error("Error fetching user logs:", err);
      }
    };

    fetchLogs();
  }, []);

  const handleFilter = () => {
    const from = dayjs(startDate);
    const to = dayjs(endDate);

    if (!from.isValid() || !to.isValid()) return;

    const result = logs.filter((log) => {
      const logDate = dayjs(log.time_date);
      return logDate.isAfter(from) && logDate.isBefore(to);
    });

    setFilteredLogs(result);
  };

  return (
    <Box sx={{ padding: 4, mt: 6}}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        User Logs
      </Typography>

      <Stack direction="row" spacing={2} mb={3}>
        <TextField
          type="datetime-local"
          label="Start Date & Time"
          InputLabelProps={{ shrink: true }}
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <TextField
          type="datetime-local"
          label="End Date & Time"
          InputLabelProps={{ shrink: true }}
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <Button variant="contained" onClick={handleFilter}>
          Filter
        </Button>
      </Stack>

      <TableContainer component={Paper} elevation={4}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Updated By</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Changes Made</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLogs.map((log) => (
              <TableRow key={log.log_id}>
                <TableCell>{log.id_master}</TableCell>
                <TableCell>{log.user_id}</TableCell>
                <TableCell>{log.emp_firstname}</TableCell>
                <TableCell>{log.emp_lastname}</TableCell>
                <TableCell>{log.updated_by}</TableCell>
                <TableCell>{new Date(log.time_date).toLocaleString()}</TableCell>
                <TableCell>{log.changes_made}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
