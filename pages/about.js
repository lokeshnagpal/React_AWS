import React from 'react';
import { Container, Typography, Box, Grid, Paper, Button } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa';
// import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
// import { Pagination } from 'swiper/modules';
import Link from 'next/link';

const About = () => {
  // const theme = useTheme();

  // const testimonials = [
  //   {
  //     quote: "Agile training is very useful to me, I came to know the clear methodology as a team, how we have to take the work, how to plan and how to implement the things and complete it in a given timelines. This type of training will help us to improve ourselves.",
  //     name: "Zubayer hasan",
  //     role: "Product Designer"
  //   },
  //   {
  //     quote: "Training is really good. I consider the training as one of the best training I've ever attended. The faculty Mr. Ram is really awesome. The loads of knowledge and experience he carries and the way he presented is exemplary. The best part of the training is the way he applied the concepts to real time scenarios. Thanks once again.",
  //     name: "David Praneeth",
  //     role: "Sr.Software Developer"
  //   },
  //   {
  //     quote: "This training has given me a broader perspective and will definitely help in enhancing my career. Entire 'LD Online IT Solutions' team helps in resolving career oriented students' most critical interrogation 'WHAT NEXT?'. They always boost morale and ensure that students hit their bull's-eye. Appreciate the support shown by 'LD Online IT Solutions' Team.",
  //     name: "Rashed kabir",
  //     role: "Developer"
  //   }
  // ];

  return (
    <Box sx={{ bgcolor: 'background.default', pt: 20 }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: 1100, mx: 'auto' }}>
          <Grid container spacing={8}>
            <Grid item xs={12} md={6} order={{ md: 2 }}>
              <Paper sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                  Our History
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  The test of our progress is not whether we add more to the abundance of those who have much it is whether we provide enough for those who have little.
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 3 }}>
                  Martin Luther King, Jr.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} order={{ md: 1 }}>
              <Box sx={{ p: 4 }}>
                <img src="/assets/images/about-us/goals.jpg" alt="Goals" style={{ width: '100%' }} />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={8} sx={{ mt: 8 }}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 4 }}>
                <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
                  Our Goal
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  Human progress is neither automatic nor inevitable... Every step toward the goal of justice requires sacrifice, suffering, and struggle; the tireless exertions and passionate concern of dedicated individuals.
                </Typography>
                <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 3 }}>
                  Martin Luther King, Jr.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 4 }}>
                <img src="/assets/images/about-us/history.jpg" alt="History" style={{ width: '100%' }} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* Counter Section */}
      <Box sx={{ bgcolor: 'background.paper', py: 8 }}>
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h2" sx={{ mb: 1 }}>
                  8052+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Students
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h2" sx={{ mb: 1 }}>
                  500+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Courses
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h2" sx={{ mb: 1 }}>
                  1000+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Experts Instructors
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h2" sx={{ mb: 1 }}>
                  860+
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Classes Complete
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      {/* <Box sx={{ py: 8 }}>
        <Container>
          <Typography variant="h3" sx={{ textAlign: 'center', mb: 6 }}>
            What's Our Customer Saying
          </Typography>
          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <Paper sx={{ p: 6, textAlign: 'center' }}>
                  <Box sx={{ mb: 4 }}>
                    <FaQuoteLeft size={48} color={theme.palette.primary.main} />
                  </Box>
                  <Typography variant="body1" sx={{ mb: 4 }}>
                    {testimonial.quote}
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 1 }}>
                    {testimonial.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    {testimonial.role}
                  </Typography>
                </Paper>
              </SwiperSlide>
            ))}
          </Swiper>
        </Container>
      </Box> */}

      {/* Contact Banner */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={9}>
              <Typography variant="h3" sx={{ mb: 2 }}>
                Do you have any queries?
              </Typography>
              <Typography variant="h3">
                Contact us.
              </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                variant="contained"
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.200',
                  },
                }}
                component={Link}
                href="/contact"
              >
                Contact Us
              </Button>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default About;
