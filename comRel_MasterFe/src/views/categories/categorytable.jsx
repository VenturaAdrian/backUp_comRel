import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TableContainer,
  Button
} from '@mui/material';
import axios from 'axios';
import config from 'config';

export default function CategoryTable() {
  const [requestData, setRequestData] = useState([]);
  const [reqData, setReqData] = useState([])
  const query = new URLSearchParams(useLocation().search);
  const category = query.get('category');
  const decodedCategory = decodeURIComponent(category || '');

  useEffect(() => {
    axios
      .get(`${config.baseApi1}/request/history`)
      .then((res) => {
        const selectedCategory = res.data.filter(
          item => 
            item.comm_Category === decodedCategory && 
            item.is_active === true  &&
            item.request_status === 'accepted'
        );
        
        setRequestData(selectedCategory);
        setReqData(selectedCategory.map(item => item.request_id));
console.log(selectedCategory.map(item => item.request_status));

      })
      .catch((err) => {
        console.error('Error fetching request data:', err);
      });
  }, [decodedCategory]); // ← dependency added to prevent infinite loop


  const HandleView = (request_id) => {
  const params = new URLSearchParams({ id: request_id });
  window.location.replace(`/comrel/view-request?${params.toString()}`);
};

  return (
    <Box sx={{ p: 4, mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Requests under: {decodedCategory || 'No category selected.'}
      </Typography>

      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Date/Time</strong></TableCell>
              <TableCell><strong>Request ID</strong></TableCell>
              <TableCell><strong>Area</strong></TableCell>
              <TableCell><strong>Activity</strong></TableCell>
              <TableCell><strong>Category</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requestData.length > 0 ? (
              requestData.map((row) => (
                <TableRow key={row.request_id}>
                  <TableCell>{row.date_Time}</TableCell>
                  <TableCell>{row.request_id}</TableCell>
                  <TableCell>{row.comm_Area}</TableCell>
                  <TableCell>{row.comm_Act}</TableCell>
                  <TableCell>{row.comm_Category}</TableCell>
                  <TableCell>{row.comm_Desc}</TableCell>
                  <TableCell>
                    <Button onClick={()=>HandleView(row.request_id)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No data found for this category.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
