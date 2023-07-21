import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const JobDescription = ({job}) => {
  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Grid container direction="column" style={{height: '100%'}}>
          <Grid item xs={6} style={{ width: '100%', height: '60%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={job.image} alt="직업 이미지" style={{ width: '100%', height: '250px' }} />
          </Grid>
          <Grid item xs={4} style={{ width: '100%', height: '40%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h4" style={{ fontWeight: 'bold', textAlign: 'center' }}>
              {job.jobName}
            </Typography>
            <Typography variant="body1" style={{ textAlign: 'center' }}>
              {job.jobDescription}
            </Typography>
          </Grid>
      </Grid>
    </Box>
  );
};

export default JobDescription;
