import React from 'react';
import { Container, Grid, Typography, Box, Card, CardContent } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Services = () => {
  const theme = useTheme();
  const services = [
    {
      title: 'Web Development',
      description: 'Modern, responsive websites that engage your audience',
    },
    {
      title: 'Mobile Apps',
      description: 'Native and cross-platform mobile applications',
    },
    {
      title: 'Digital Marketing',
      description: 'Strategies to grow your online presence',
    },
    {
      title: 'Cloud Solutions',
      description: 'Scalable cloud infrastructure for your business',
    },
  ];

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        pt: 20,
        pb:10
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h3"
          component="h2"
          sx={{
            textAlign: 'center',
            mb: 6,
            fontWeight: 700,
          }}
        >
          Our Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  bgcolor: theme.palette.background.paper,
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h5"
                    component="h3"
                    sx={{
                      fontWeight: 600,
                      mb: 2,
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Services;
