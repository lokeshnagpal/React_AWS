import React from 'react';
import { Container, Typography, Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Link from 'next/link';
const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: theme.palette.primary.main,
        color: 'white',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={5}>
            <Typography variant="h6" gutterBottom>
              LD Online IT Solutions
            </Typography>
            <Typography variant="body2">
              We help businesses transform and grow in the digital age
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Typography variant="body2" component={Link} href="/" sx={{ display: 'block', mb: 1 }}>
              Home
            </Typography>
            <Typography variant="body2" component={Link} href="/services" sx={{ display: 'block', mb: 1 }}>
              Services
            </Typography>
            <Typography variant="body2" component={Link} href="/project-support" sx={{ display: 'block', mb: 1 }}>
              Project Support
            </Typography>
            <Typography variant="body2" component={Link} href="/about" sx={{ display: 'block', mb: 1 }}>
              About
            </Typography>
            <Typography variant="body2" component={Link} href="/contact" sx={{ display: 'block' }}>
              Contact
            </Typography>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography variant="h6" gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" sx={{ display: 'block', mb: 1 }}>
              Email: info@ldonlineitsolutions.com
            </Typography>
            <Typography variant="body2" sx={{ display: 'block', mb: 1 }}>
              Phone: +91 9988092382, +91 9896207776
            </Typography>
            <Typography variant="body2" sx={{ display: 'block' }}>
              Address: 10-A Rajinder Nagar, Mahesh Nagar, Ambala Cantt, Haryana
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4, pt: 4, borderTop: 1, borderColor: 'rgba(255,255,255,0.1)' }}>
          <Typography variant="body2" align="center">
            © {new Date().getFullYear()} LD Online IT Solutions. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
