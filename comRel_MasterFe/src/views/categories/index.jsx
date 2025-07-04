import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  useTheme
} from '@mui/material';

import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EngineeringIcon from '@mui/icons-material/Engineering';
import PeopleIcon from '@mui/icons-material/People';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LanguageIcon from '@mui/icons-material/Language';
import ScienceIcon from '@mui/icons-material/Science';
import ApartmentIcon from '@mui/icons-material/Apartment';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import FavoriteIcon from '@mui/icons-material/Favorite';

const categoryIcons = {
  'Human Resource Development & Institutional Building (HRDIB)': PeopleIcon,
  'Enterprise Development & Networking': BusinessIcon,
  'Assistance to Infrastructure Development & Support Services': EngineeringIcon,
  'Access to Education & Educational Support Programs': SchoolIcon,
  'Access to Health Services, Health Facilities & Health Professionals': LocalHospitalIcon,
  'Protection & Respect of Socio-Cultural Values': VolunteerActivismIcon,
  'Information Education & Communication (IEC)': LanguageIcon,
  'Development of Mining & GeoSciences & Technology': ScienceIcon,
  'Concessionaires': ApartmentIcon,
  'Company Facilities': LocationCityIcon,
  'Corporate Social Responsibility -Donations': FavoriteIcon
};

const sdmpCategories = [
  'Human Resource Development & Institutional Building (HRDIB)',
  'Enterprise Development & Networking',
  'Assistance to Infrastructure Development & Support Services',
  'Access to Education & Educational Support Programs',
  'Access to Health Services, Health Facilities & Health Professionals',
  'Protection & Respect of Socio-Cultural Values',
  'Information Education & Communication (IEC)',
  'Development of Mining & GeoSciences & Technology'
];

const otherCategories = [
  'Concessionaires',
  'Company Facilities',
  'Corporate Social Responsibility -Donations'
];

export default function Category() {
  const theme = useTheme();

  const renderCategoryCards = (categories) => (
    <Grid container spacing={3}>
      {categories.map((category, index) => {
        const IconComponent = categoryIcons[category];

        return (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              elevation={3}
              sx={{
                borderRadius: 3,
                height: '100%',
                minHeight: 140,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: `0 4px 20px ${theme.palette.primary.light}`
                }
              }}
            >
              <CardActionArea
                onClick={() => {
                  const encodedCategory = encodeURIComponent(category);
                  window.location.replace(`/comrel/category-table?category=${encodedCategory}`);
                }}
                sx={{ height: '100%' }}
              >
                <CardContent
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      textAlign: 'left'
                    }}
                  >
                    {IconComponent && <IconComponent color="primary" />}
                    <Typography variant="subtitle1" fontWeight={600}>
                      {category}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );

  return (
    <Box sx={{ p: 3 ,mt:6}}>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h5" gutterBottom>
          SDMP Credited Activities
        </Typography>
        {renderCategoryCards(sdmpCategories)}
      </Box>

      <Box>
        <Typography variant="h5" gutterBottom>
          Other Activities
        </Typography>
        {renderCategoryCards(otherCategories)}
      </Box>
    </Box>
  );
}
