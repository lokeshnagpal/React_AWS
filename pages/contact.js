import React, { useState } from 'react';
import { Container, Typography, Box, Grid, Paper, TextField, Button, Alert } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    email: '',
    sub: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [generalError, setGeneralError] = useState('');
  const [loading, setLoading] = useState(false);

 
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!formData.sub) {
      newErrors.sub = 'Subject is required';
      isValid = false;
    }

    if (!formData.message) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      setSuccessMessage('Message sent successfully! We will get back to you soon.');
      setFormData({ email: '', sub: '', message: '' });
      
      // Clear the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error:', error);
      setErrors(prev => ({
        ...prev,
        general: 'Failed to send message. Please try again later.'
      }));
    } finally {
      setLoading(false);
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box sx={{ bgcolor: 'background.default', pt: 20 }}>
      <Container>
        <Box sx={{ textAlign: 'center', mb: 8 }}>         
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="subtitle1" sx={{ color: 'primary.main', mb: 2 }}>
              Our Address
            </Typography>
            <Typography variant="h2" component="h1">
              Don't hesitate to contact us for <br /> any information.
            </Typography>
            {generalError && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {generalError}
              </Alert>
            )}
            {successMessage && (
              <Alert severity="success" sx={{ mt: 2 }}>
                {successMessage}
              </Alert>
            )}
          </Box>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Box sx={{ mb: 3 }}>
                <img src="/assets/images/icon/icon59.svg" alt="Head Office" style={{ width: '48px' }} />
              </Box>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Head Office
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                10-A Ambala Cantt, <br />
                Rajinder Nagar, Mahesh Nagar, <br />
                Ambala Cantt, Haryana - 133001, India.
              </Typography>
            </Paper>
          </Grid>


          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Box sx={{ mb: 3 }}>
                <img src="/assets/images/icon/icon60.svg" alt="Email & Phone" style={{ width: '48px' }} />
              </Box>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Email & Phone
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                <a href="mailto:info@ldonlineitsolutions.com" style={{ color: theme.palette.primary.main }}>
                  info@ldonlineitsolutions.com
                </a><br />
                <a href="tel:+919036634486" style={{ color: theme.palette.primary.main }}>
                  +91 9988092382, +91 9896207776
                </a>
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Box sx={{ mb: 3 }}>
                <img src="/assets/images/icon/icon61.svg" alt="Get In Touch" style={{ width: '48px' }} />
              </Box>
              <Typography variant="h5" sx={{ mb: 3 }}>
                Get In Touch
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                Also find us social media below
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <a href="https://www.linkedin.com/company/ld-online-solutions" target="_blank" rel="noopener noreferrer">
                  <FaLinkedin size={24} color={theme.palette.primary.main} />
                </a>
                {/* <a href="https://www.facebook.com/ldonlineitsolutions" target="_blank" rel="noopener noreferrer">
                  <FaFacebook size={24} color={theme.palette.primary.main} />
                </a>
                <a href="https://www.instagram.com/ldonlineitsolutions" target="_blank" rel="noopener noreferrer">
                  <FaInstagram size={24} color={theme.palette.primary.main} />
                </a>
                <a href="https://twitter.com/ldonlineitsolutions" target="_blank" rel="noopener noreferrer">
                  <FaTwitter size={24} color={theme.palette.primary.main} />
                </a>
                <a href="https://www.youtube.com/channel/UC6LuEb4ccvS_zPLG0dXigZw" target="_blank" rel="noopener noreferrer">
                  <FaYoutube size={24} color={theme.palette.primary.main} />
                </a> */}
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Box>
          <Box sx={{ bgcolor: 'background.default', pt: 8 }}>
            <Container>
              <Grid container spacing={0}>
                <Grid item xs={12} md={8} order={{ md: 2 }}>
                  <Box sx={{ p: 4 }}>
                    <Typography variant="h4" sx={{ mb: 4 }}>
                      Contact Form
                    </Typography>
                    <form onSubmit={handleSubmit}>
                      {successMessage && (
                        <Alert severity="success" sx={{ mb: 3 }}>
                          {successMessage}
                        </Alert>
                      )}
                      <Box sx={{ mb: 3 }}>
                        <TextField
                          fullWidth
                          id="form_email"
                          name="email"
                          label="Email Address"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          error={!!errors.email}
                          helperText={errors.email}
                          required
                          variant="outlined"
                          size="small"
                          sx={{ mb: 3 }}
                        />
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <TextField
                          fullWidth
                          id="form_sub"
                          name="sub"
                          label="Subject"
                          value={formData.sub}
                          onChange={handleChange}
                          error={!!errors.sub}
                          helperText={errors.sub}
                          required
                          variant="outlined"
                          size="small"
                          sx={{ mb: 3 }}
                        />
                      </Box>
                      <Box sx={{ mb: 3 }}>
                        <TextField
                          fullWidth
                          id="form_message"
                          name="message"
                          label="Your Message"
                          value={formData.message}
                          onChange={handleChange}
                          error={!!errors.message}
                          helperText={errors.message}
                          required
                          multiline
                          rows={4}
                          variant="outlined"
                          size="small"
                        />
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={loading}
                          sx={{
                            px: 4,
                            py: 1.5,
                            bgcolor: theme.palette.primary.main,
                            '&:hover': {
                              bgcolor: theme.palette.primary.dark,
                            },
                          }}
                        >
                          {loading ? 'Sending...' : 'Send Message'}
                        </Button>
                      </Box>
                    </form>
                  </Box>
                </Grid>
                {/* <Grid item xs={12} md={6} order={{ md: 1 }}>
                  <Box sx={{ height: '100%', p: 4 }}>
                    <iframe
                      src="https://www.google.com/maps/d/embed?mid=1A5XCtDMGY-uNKytUCDHn4Z77v8s&hl=en"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                    />
                  </Box>
                </Grid> */}
              </Grid>
            </Container>
          </Box>
        </Box>
      </Container>
    </Box>


  );
}

export default Contact;
