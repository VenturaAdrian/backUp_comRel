import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  InputLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Autocomplete,
  Snackbar,
  Alert
} from '@mui/material';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import config from 'config';

const barangayOptions = [
  'Balili', 'Bedbed', 'Bulalacao', 'Cabiten', 'Colalo', 'Guinaoang',
  'Paco', 'Palasaan', 'Poblacion', 'Sapid', 'Tabio', 'Taneg'
];

const activityOptions = [
  'Medical Mission', 'Reach Out', 'Feeding Program',
  'Rescue', 'Rehabilitation', 'Ayuda'
];

// const categoryOptions = [
//   '1 - No Poverty', '2 - Zero Hunger', '3 - Good Health and Well-being',
//   '4 - Quality Education', '5 - Gender Equality', '6 - Clean Water and Sanitation',
//   '7 - Affordable and Clean Energy', '8 - Decent Work and Economic Growth',
//   '9 - Industry, Innovation and Infrastructure', '10 - Reduced Inequality',
//   '11 - Sustainable Cities and Communities', '12 - Responsible Consumption and Production',
//   '13 - Climate Action', '14 - Life Below Water', '15 - Life on Land',
//   '16 - Peace, Justice and Strong Institutions', '17 - Partnerships for the Goals'
// ];
const categoryOptions = [
  'Human Resource Development & Institutional Building (HRDIB)',
  'Enterprise Development & Networking',
  'Assistance to Infrastructure Development & Support Services',
  'Access to Education & Educational Support Programs',
  'Access to Health Services - Health Facilities & Health Professionals',
  'Protection & Respect of Socio-Cultural Values',
  'Information - Education & Communication (IEC)',
  'Development of Mining & GeoSciences & Technology',
  'Concessionaires',
  'Company Facilities',
  'Corporate Social Responsibility -Donations'
]

// SDMP Credited Activities:
// 1.	Human Resource Development & Institutional Building (HRDIB)
// 2.	Enterprise Development & Networking
// 3.	Assistance to Infrastructure Development & Support Services
// 4.	Access to Education & Educational Support Programs
// 5.	Access to Health Services, Health Facilities & Health Professionals
// 6.	Protection & Respect of Socio-Cultural Values
// 7.	Information, Education & Communication (IEC)
// 8.	Development of Mining & GeoSciences & Technology

// Others:
// 1.	Concessionaires
// 2.	Company Facilities
// 3.	Corporate Social Responsibility -Donations


export default function AddForm() {
  const [commArea, setCommArea] = useState([]);
  const [commAct, setCommAct] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [commVenue, setCommVenue] = useState('');
  const [commGuest, setCommGuest] = useState([]);
  const [commDocs, setCommDocs] = useState([]);
  const [commEmps, setCommEmps] = useState([]);
  const [commBenef, setCommBenef] = useState([]);
  const [commDesc, setCommDesc] = useState('');
  const [commCategory, setCommCategory] = useState('');
  const [createdby, setCreatedBy] = useState('');
  const [errors, setErrors] = useState({});

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMsg, setSnackbarMsg] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const fileInputRef = useRef(null);

  useEffect(() => {
    const empInfo = JSON.parse(localStorage.getItem('user'));

    

    if (empInfo?.user_name) {
      setCreatedBy(empInfo.user_name);

      
    }
  }, []);

  const validateFields = () => {
    const newErrors = {};
    if (commArea.length === 0) newErrors.commArea = 'Community area is required';
    if (!commAct) newErrors.commAct = 'Activity is required';
    if (!dateTime) newErrors.dateTime = 'Date and time is required';
    if (!commVenue) newErrors.commVenue = 'Venue is required';
    if (!commDesc) newErrors.commDesc = 'Description is required';
    if (!commCategory) newErrors.commCategory = 'Category is required';
    if (commGuest.length === 0) newErrors.commGuest = 'Guest list is required';
    if (commEmps.length === 0) newErrors.commEmps = 'Employee list is required';
    if (commBenef.length === 0) newErrors.commBenef = 'Beneficiaries list is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateFields();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    const formData = new FormData();
    formData.append('comm_Area', commArea.join(', '));
    formData.append('comm_Act', commAct);
    formData.append('date_Time', dateTime);
    formData.append('comm_Venue', commVenue);
    formData.append('comm_Guest', commGuest.join(', '));
    formData.append('comm_Emps', commEmps.join(', '));
    formData.append('comm_Benef', commBenef.join(', '));
    formData.append('comm_Desc', commDesc);
    formData.append('comm_Category', commCategory);
    formData.append('created_by', createdby);

    for (let i = 0; i < commDocs.length; i++) {
      formData.append('comm_Docs', commDocs[i]);
    }

    try {
      await axios.post(`${config.baseApi1}/request/add-request-form`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSnackbarMsg('Form submitted successfully!');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);

      setCommArea([]);
      setCommAct('');
      setDateTime('');
      setCommVenue('');
      setCommGuest([]);
      setCommDocs([]);
      setCommEmps([]);
      setCommBenef([]);
      setCommDesc('');
      setCommCategory('');
    } catch (err) {
      setSnackbarMsg('Failed to submit.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const clearError = (field) => {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  return (
    <Box sx={{ mt: 4, p: 2, background: 'linear-gradient(to bottom, #93c47d, #6aa84f, #2F5D0B)', minHeight: '100vh' }}>
      <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', mt: 2, mb: 2 }}>
        <Typography variant="h5" mb={2} textAlign="center">Add Community Request Form</Typography>

        <Box component="form" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Autocomplete
                multiple
                freeSolo
                options={barangayOptions}
                value={commArea}
                onChange={(e, newValue) => {
                  setCommArea(newValue);
                  clearError('commArea');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Community Area / Barangay"
                    required
                    error={!!errors.commArea}
                    helperText={errors.commArea}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                freeSolo
                options={activityOptions}
                value={commAct}
                onChange={(e, newValue) => {
                  setCommAct(newValue || '');
                  clearError('commAct');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Type of Community Activity"
                    required
                    error={!!errors.commAct}
                    helperText={errors.commAct}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                options={categoryOptions}
                value={commCategory}
                onChange={(e, newValue) => {
                  setCommCategory(newValue || '');
                  clearError('commCategory');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="SDG Category"
                    required
                    error={!!errors.commCategory}
                    helperText={errors.commCategory}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Date and Time"
                type="datetime-local"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={dateTime}
                onChange={(e) => {
                  setDateTime(e.target.value);
                  clearError('dateTime');
                }}
                required
                error={!!errors.dateTime}
                helperText={errors.dateTime}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Venue / Place"
                fullWidth
                value={commVenue}
                onChange={(e) => {
                  setCommVenue(e.target.value);
                  clearError('commVenue');
                }}
                required
                error={!!errors.commVenue}
                helperText={errors.commVenue}
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={commGuest}
                onChange={(e, newValue) => {
                  setCommGuest(newValue);
                  clearError('commGuest');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Guests and People Involved"
                    required
                    error={!!errors.commGuest}
                    helperText={errors.commGuest}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <InputLabel shrink>Supporting Documents</InputLabel>
              <Button variant="contained" component="label">
                Upload Files
                <input
                  type="file"
                  hidden
                  multiple
                  ref={fileInputRef}
                  onChange={(e) => {
                    setCommDocs(Array.from(e.target.files));
                    e.target.value = null;
                  }}
                />
              </Button>

              {commDocs.length > 0 && (
                <List dense>
                  {commDocs.map((file, index) => (
                    <ListItem
                      key={index}
                      secondaryAction={
                        <Button
                          color="error"
                          size="small"
                          onClick={() => {
                            const updatedDocs = [...commDocs];
                            updatedDocs.splice(index, 1);
                            setCommDocs(updatedDocs);
                          }}
                        >
                          Remove
                        </Button>
                      }
                    >
                      <ListItemIcon>
                        <InsertDriveFileIcon />
                      </ListItemIcon>
                      <ListItemText primary={file.name} />
                    </ListItem>
                  ))}
                </List>
              )}
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={commEmps}
                onChange={(e, newValue) => {
                  setCommEmps(newValue);
                  clearError('commEmps');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="COMREL Employees Involved"
                    required
                    error={!!errors.commEmps}
                    helperText={errors.commEmps}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12}>
              <Autocomplete
                multiple
                freeSolo
                options={[]}
                value={commBenef}
                onChange={(e, newValue) => {
                  setCommBenef(newValue);
                  clearError('commBenef');
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Beneficiaries"
                    required
                    error={!!errors.commBenef}
                    helperText={errors.commBenef}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Community Activity Description"
                multiline
                minRows={3}
                fullWidth
                value={commDesc}
                onChange={(e) => {
                  setCommDesc(e.target.value);
                  clearError('commDesc');
                }}
                required
                error={!!errors.commDesc}
                helperText={errors.commDesc}
              />
            </Grid>

            <Grid item xs={12} textAlign="center">
              <Button type="submit" variant="contained" sx={{ mr: 2 }}>
                Submit
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
          variant="filled"
        >
          {snackbarMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
