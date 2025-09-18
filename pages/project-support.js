import React from 'react';
import { Container, Typography, Box, Grid, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { FaCheck } from 'react-icons/fa';
import Link from 'next/link';

const ProjectSupport = () => {
  return (
    <Box sx={{ bgcolor: 'background.default', pt: 20, pb: 10 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 4}}>
          <Typography variant="h2" component="h2" sx={{ mb: 3 }}>
            Project Support
          </Typography>
         
        </Box>

        <Box sx={{ textAlign: 'center', mb: 4, ml:33, width:'50%' }}>
            <Typography variant="body1" sx={{ color: 'text.secondary', fontSize:24}}>
                We providing services are Technical or Job Support, Proxy Support and Online Trainings for all the IT technologies. We already proved in the industry by providing Technical Support to the various consultants and companies.
            </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Goal
              </Typography>
              <List>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <FaCheck color="#1976d2" />
                  </ListItemIcon>
                  <ListItemText primary="All support persons are real time on the technology and having experience 6yrs and above." />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <FaCheck color="#1976d2" />
                  </ListItemIcon>
                  <ListItemText primary="All support persons are attended initial screening and then mapped to the resource." />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <FaCheck color="#1976d2" />
                  </ListItemIcon>
                  <ListItemText primary="Support persons should be expertise and having strong knowledge." />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <FaCheck color="#1976d2" />
                  </ListItemIcon>
                  <ListItemText primary="For any inconvenience with support people, we will be responsible and provided back up within 2 days." />
                </ListItem>
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 4 }}>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Challenge
              </Typography>
              <List>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <FaCheck color="#1976d2" />
                  </ListItemIcon>
                  <ListItemText primary="All trainers are real time and expertise on the technology." />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <FaCheck color="#1976d2" />
                  </ListItemIcon>
                  <ListItemText primary="Having training experience." />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <FaCheck color="#1976d2" />
                  </ListItemIcon>
                  <ListItemText primary="Will be providing back up for the trainer if he is not meeting your expectation." />
                </ListItem>
                <ListItem disablePadding>
                  <ListItemIcon>
                    <FaCheck color="#1976d2" />
                  </ListItemIcon>
                  <ListItemText primary="We will provide one on one training for all the technologies." />
                </ListItem>
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ProjectSupport;
