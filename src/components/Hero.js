import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Grid, Paper, useTheme } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';

// Add CSS animations
// const styles = {
//   '@keyframes animationFramesOne': {
//     '0%': { transform: 'translate(6.90132px, -0.0945386px) rotate(3.40339deg)' },
//     '50%': { transform: 'translate(-6.90132px, 0.0945386px) rotate(-3.40339deg)' },
//     '100%': { transform: 'translate(6.90132px, -0.0945386px) rotate(3.40339deg)' }
//   },
//   '@keyframes animationFramesTwo': {
//     '0%': { transform: 'translate(12.345px, 1.234px) rotate(5.678deg)' },
//     '50%': { transform: 'translate(-12.345px, -1.234px) rotate(-5.678deg)' },
//     '100%': { transform: 'translate(12.345px, 1.234px) rotate(5.678deg)' }
//   },
//   '@keyframes animationFramesThree': {
//     '0%': { transform: 'translate(8.765px, -2.345px) rotate(4.567deg)' },
//     '50%': { transform: 'translate(-8.765px, 2.345px) rotate(-4.567deg)' },
//     '100%': { transform: 'translate(8.765px, -2.345px) rotate(4.567deg)' }
//   }
// };

const Hero = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Helper functions for training gallery
  const getTrainingTitle = (id) => {
    const titles = {
      302: 'Citrix XenApp & XenDesktop 7.6 Administrator Server Training',
      301: 'Go Programming Language (GoLang) Training',
      300: 'Talend ETL Testing Training',
      299: 'CompTIA IT Fundamentals (ITF+) Certification Training',
      298: 'CompTIA PenTest+ Certification Training',
      297: 'CompTIA Network+ Certification Training',
      296: 'CompTIA Linux+ Certification Training',
      295: 'CompTIA A+ Core 2 Certification Training',
      294: 'CompTIA A+ Core 1 Certification Training',
      293: 'CompTIA Cloud Essentials+ Certification Training',
    };
    return titles[id] || `Training ${id}`;
  };

  const getTrainingSlug = (id) => {
    const slugs = {
      302: 'citrix-xenapp-xendesktop-76-administrator-server-training',
      301: 'go-programming-language-golang-training',
      300: 'talend-etl-testing-training',
      299: 'comptia-it-fundamentals-itf-certification-training',
      298: 'comptia-pentest-certification-training',
      297: 'comptia-network-certification-training',
      296: 'comptia-linux-certification-training',
      295: 'comptia-a-core-2-certification-training',
      294: 'comptia-a-core-1-certification-training',
      293: 'comptia-cloud-essentials-certification-training',
    };
    return slugs[id] || `training-${id}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused) {
        setActiveStep((prevActiveStep) => (prevActiveStep + 1) % 3);
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [isPaused]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % 3);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1000);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep - 1 + 3) % 3);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 1000);
  };

  return (
    <Box>
      {/* Carousel */}
      <Box sx={{
        position: 'relative',
        mb: 8,
        margin: '0 auto',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 2,
        pt:10
      }}>
        <Box sx={{
          position: 'relative',
          overflow: 'hidden',
          height: '500px'
        }}>
          <Box
            sx={{
              display: 'flex',
              transition: 'transform 0.6s ease-in-out',
              transform: `translateX(-${activeStep * 100}%)`,
              height: '100%'
            }}
          >
            <Box sx={{ minWidth: '100%', position: 'relative' }}>
              <Image
                src="/assets/images/banners/31.png"
                alt="First slide"
                width={1200}
                height={600}
                priority
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
            <Box sx={{ minWidth: '100%', position: 'relative' }}>
              <Image
                src="/assets/images/banners/25.jpeg"
                alt="Second slide"
                width={1200}
                height={600}
                priority
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
            <Box sx={{ minWidth: '100%', position: 'relative' }}>
              <Image
                src="/assets/images/banners/23.jpg"
                alt="Third slide"
                width={1200}
                height={600}
                priority
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
          </Box>
        </Box>
        <Box sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 20, zIndex: 10 }}>
          <Button
            onClick={handleBack}
            variant="text"
            sx={{
              p: 2
            }}
          >
            <Typography variant="h4" color="white">&lt;</Typography>
          </Button>
        </Box>
        <Box sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: 20, zIndex: 10 }}>
          <Button
            onClick={handleNext}
            variant="text"
            sx={{
              p: 2
            }}
          >
            <Typography variant="h4" color="white">&gt;</Typography>
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          bgcolor: 'background.default',
          py: 8,
          minHeight: '80vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Container maxWidth="lg">
          {/* Background Shapes */}

          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Section Title */}
            <Box sx={{ textAlign: 'center', mb: 8 }}>
              <Typography
                variant="h6"
                color="primary"
                sx={{ textTransform: 'uppercase', mb: 2 }}
              >
                What We Do
              </Typography>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 4,
                  color: theme.palette.text.primary,
                }}
              >
                The things motivates me is common <br /> form of motivation.
              </Typography>
            </Box>

            {/* Services Grid */}
            <Grid container spacing={4}>
              {/* Project Support */}
              <Grid item xs={12} md={6} lg={4}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    borderRadius: 2,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    {/* <Image
                    src="/assets/images/shape/shape-2.svg"
                    alt=""
                    width={100}
                    height={100}
                    style={{ position: 'absolute', top: -20, left: -20 }}
                  /> */}
                    <Image
                      src="/assets/images/icon/icon1.svg"
                      alt=""
                      width={64}
                      height={64}
                    />
                  </Box>
                  <Typography variant="h5" component="h5" gutterBottom>
                    Project Support
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    We offer a wide range of end-to-end IT solutions including IT Infrastructure Management and IT Support Services. Our focus is to deliver exceptional customer service and high performing business IT solutions through latest technology. At LD Online IT Solutions, We committed to deliver innovative solutions that fully meet our clients' business objectives, technology and cost effective needs.
                  </Typography>
                </Paper>
              </Grid>

              {/* Design & Development */}
              <Grid item xs={12} md={6} lg={4}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    borderRadius: 2,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    {/* <Image
                    src="/assets/images/shape/shape-2.svg"
                    alt=""
                    width={100}
                    height={100}
                    style={{ position: 'absolute', top: -20, left: -20 }}
                  /> */}
                    <Image
                      src="/assets/images/icon/icon2.svg"
                      alt=""
                      width={64}
                      height={64}
                    />
                  </Box>
                  <Typography variant="h5" component="h5" gutterBottom>
                    Design & Development
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    LD Online IT Solutions able to help to clients for solving any kind of business challenges and delivers the best quality, accuracy, cost benefits in the most competitive ways of business.
                  </Typography>
                </Paper>
              </Grid>

              {/* IT Training */}
              <Grid item xs={12} md={12} lg={4}>
                <Paper
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    borderRadius: 2,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    },
                  }}
                >
                  <Box sx={{ mb: 3 }}>
                    {/* <Image
                    src="/assets/images/shape/shape-2.svg"
                    alt=""
                    width={100}
                    height={100}
                    style={{ position: 'absolute', top: -20, left: -20 }}
                  /> */}
                    <Image
                      src="/assets/images/icon/icon3.svg"
                      alt=""
                      width={64}
                      height={64}
                    />
                  </Box>
                  <Typography variant="h5" component="h5" gutterBottom>
                    IT Training
                  </Typography>
                  <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                    We are the most reliable and a rapidly growing in the field of outsourcing services with highest level of clients satisfaction. LD Online IT Solutions works on its unique mission and methodology to deliver accurate and quality IT Services. We are having domain expertise and operational excellence to understand our clients business values and served several clients with its competitive, cost beneficial and quick services in Information Technology.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Training Gallery Section */}
      <Box
        sx={{
          bgcolor: 'background.default',
          py: 8,
          position: 'relative',
        }}
        id="trainings_listing"
      >
        {/* Background Shapes with Animation */}
        {/* <Box sx={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 0 }}>
          <Image
            src="/assets/images/shape/shape-62.svg"
            alt=""
            width={500}
            height={500}
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 45,
              animation: 'animationFramesOne 25s infinite linear'
            }}
          />
          <Image
            src="/assets/images/shape/shape-55.svg"
            alt=""
            width={500}
            height={500}
            style={{ 
              position: 'absolute', 
              top: 25,
              right: 45,
              animation: 'animationFramesTwo 25s infinite linear'
            }}
          />
          <Image
            src="/assets/images/shape/shape-61.svg"
            alt=""
            width={500}
            height={500}
            style={{ 
              position: 'absolute', 
              bottom: 25,
              left: 45,
              animation: 'animationFramesThree 25s infinite linear'
            }}
          />
        </Box> */}

        <Container maxWidth="xl">
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            {/* Section Title */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="h2"
                component="h2"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: theme.palette.text.primary,
                }}
              >
                Check some of our <br /> Recent trainings.
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: 'text.secondary',
                  mb: 4,
                }}
              >
                Click the view all button to check all of our trainings.
              </Typography>
            </Box>

            {/* Gallery Wrapper */}
            <Box sx={{ mb: 4 }}>
              <Link href="/online-it-training">
                <Button
                  variant="outlined"
                  sx={{
                    mb: 4,
                    '&:hover': {
                      bgcolor: 'primary.light',
                    },
                  }}
                >
                  View All
                </Button>
              </Link>

              {/* Training Carousel */}
              <Box
                sx={{
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: 2,
                  boxShadow: 2,
                }}
              >
                {/* Carousel Inner */}
                <Box
                  sx={{
                    display: 'flex',
                    transition: 'transform 0.6s ease-in-out',
                    transform: `translateX(-${activeStep * 337}px)`,
                  }}
                >
                  {/* Training Items */}
                  {[302, 301, 300, 299, 298, 297, 296, 295, 294, 293].map((id) => (
                    <Box
                      key={id}
                      sx={{
                        minWidth: '25%',
                        position: 'relative',
                        borderRadius: 1,
                        overflow: 'hidden',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                        },
                      }}
                    >
                      <Image
                        src={`/assets/images/trainings/${id}.jpg`}
                        alt={getTrainingTitle(id)}
                        width={337}
                        height={200}
                        priority={id === 302 || id === 301} // Only prioritize first two images
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          '&:hover': {
                            opacity: 1,
                          },
                        }}
                      >
                        <Link href={`/online/${getTrainingSlug(id)}`}>
                          <Button
                            variant="text"
                            sx={{
                              color: 'white',
                              '&:hover': {
                                bgcolor: 'transparent',
                              },
                            }}
                          >
                            <Typography variant="h4">
                              <i className="fa fa-arrow-right" aria-hidden="true" />
                            </Typography>
                          </Button>
                        </Link>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {/* Navigation Buttons */}
                <Box sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: 20, zIndex: 10 }}>
                  <Button
                    onClick={() => {
                      setActiveStep((prevActiveStep) => (prevActiveStep - 1 + 10) % 10);
                      setIsPaused(true);
                      setTimeout(() => setIsPaused(false), 1000);
                    }}
                    variant="text"
                    sx={{
                      p: 2,

                    }}
                  >
                    <Typography variant="h4" color="white">&lt;</Typography>
                  </Button>
                </Box>
                <Box sx={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', right: 20, zIndex: 10 }}>
                  <Button
                    onClick={() => {
                      setActiveStep((prevActiveStep) => (prevActiveStep + 1) % 10);
                      setIsPaused(true);
                      setTimeout(() => setIsPaused(false), 1000);
                    }}
                    variant="text"
                    sx={{
                      p: 2,
                    }}
                  >
                    <Typography variant="h4" color="white">&gt;</Typography>
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Bottom Banner */}
      <Box
        sx={{
          bgcolor: 'background.default',
          py: 8,
          position: 'relative',
          zIndex: 1,
          border:"1px solid #e6e6e6",
          borderRadius:"5px", 
          boxShadow:"0px 0px 10px 0px rgba(0,0,0,0.1)",
          margin:"50px 100px 50px",
          padding:"45px 60px 28px 60px"
        }}
        className="bottom-banner"
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ flex: 1, mr: 4 }}>
              <Typography
                variant="h3"
                component="h3"
                sx={{
                  fontWeight: 700,
                  mb: 2,
                  color: theme.palette.text.primary,
                }}
              >
                Have any question about us?
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                }}
              >
                Don't hesitate to contact us.
              </Typography>
            </Box>
            <Link href="/contact">
              <Button
                variant="contained"
                sx={{
                  px: 4,
                  py: 2,
                  borderRadius: 2,
                  textTransform: 'capitalize',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }}
              >
                Contact us
              </Button>
            </Link>
          </Box>
        </Container>
      </Box>

    </Box>
  );
};

export default Hero;
