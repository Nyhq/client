import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const AboutPage = () => {
    // Initialize about data state variable
  const [aboutData, setAboutData] = useState(null); 

  useEffect(() => {
    fetchAboutData();
  }, []);

  // Fetch about data from the server
  const fetchAboutData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/about');
      setAboutData(response.data);
    } catch (error) {
      console.error('Error fetching about data:', error);
    }
  };

  return (
    <Container maxWidth="lg">
      <Typography variant="h2" gutterBottom>
        About Page
      </Typography>
      {aboutData && (
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3}>
              <Typography variant="h5" gutterBottom>
                General Description
              </Typography>
              <Typography variant="body1" paragraph>
                {aboutData.generalDescription}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3}>
              <Typography variant="h5" gutterBottom>
                Technologies
              </Typography>
              <Typography variant="body1" paragraph>
                {aboutData.technologies}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3}>
              <Typography variant="h5" gutterBottom>
                Weaknesses
              </Typography>
              <Typography variant="body1" paragraph>
                {aboutData.weaknesses}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper elevation={3}>
              <Typography variant="h5" gutterBottom>
                Alternatives
              </Typography>
              <Typography variant="body1" paragraph>
                {aboutData.alternatives}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      )}
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/products"
        style={{ marginTop: '20px' }}
      >
        Back to Product List
      </Button>
    </Container>
  );
};

export default AboutPage;
