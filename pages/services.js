import React from 'react';
import { Container, Grid, Typography, Box, Card, CardContent, Button, ButtonGroup, Alert, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Services = () => {
  const theme = useTheme();
  const [services, setServices] = React.useState([]);
  const [approach, setApproach] = React.useState('rest'); // 'rest' | 'graphql'
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState('');

  const fetchServicesRest = async () => {
    const res = await fetch('/api/services');
    if (!res.ok) throw new Error('Failed to fetch REST services');
    const data = await res.json();
    return data.services || [];
  };

  const fetchServicesGraphql = async () => {
    const fetchService = '{services { title } }'
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: fetchService }),
    });
    if (!res.ok) throw new Error('Failed to fetch GraphQL services');
    const data = await res.json();
    console.log('GraphQL query data', data);
    return (data && data.data && data.data.services) ? data.data.services : [];
  };

  const addServiceGraphql = async (title, description) => {
    const mutation = `mutation { addService(title: "${title}", description: "${description}") { title description } }`;
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-demo-auth': 'true' },
      body: JSON.stringify({ query: mutation }),
    });
    if (!res.ok) throw new Error('Failed to add service via GraphQL');
    const data = await res.json();
    console.log('GraphQL mutation data', data);
    const created = data?.data?.addService;
    if (created) {
      // Optimistically update list; subscription will also push
      setServices((prev) => [created, ...prev]);
    }
    return created;
  };

  const load = React.useCallback(async (mode) => {
    setLoading(true);
    setError('');
    try {
      const result = mode === 'graphql' ? await fetchServicesGraphql() : await fetchServicesRest();
      setServices(result);
    } catch (e) {
      setError(e?.message || 'Unknown error');
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load(approach);
  }, [approach, load]);

  // Subscribe to SSE when using GraphQL approach
  React.useEffect(() => {
    if (approach !== 'graphql') return;
    const subscriptionQuery = 'subscription { serviceAdded { title description } }';
    const es = new EventSource('/api/graphql?query=' + encodeURIComponent(subscriptionQuery));
    es.onmessage = (evt) => {
      try {
        const payload = JSON.parse(evt.data);
        const added = payload?.data?.serviceAdded;
        if (added) {
          setServices((prev) => [added, ...prev]);
        }
      } catch (err) {
        console.warn('Failed to parse SSE message', err);
      }
    };
    es.onerror = () => {
      // Let it auto-reconnect by default; if closed, it will retry
    };
    return () => {
      try { es.close(); } catch {}
    };
  }, [approach]);

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
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, gap: 2 }}>
          <ButtonGroup variant="outlined" color="primary">
            <Button
              onClick={() => setApproach('rest')}
              variant={approach === 'rest' ? 'contained' : 'outlined'}
            >
              REST API
            </Button>
            <Button
              onClick={() => setApproach('graphql')}
              variant={approach === 'graphql' ? 'contained' : 'outlined'}
            >
              GraphQL
            </Button>
          </ButtonGroup>
          <Button onClick={() => load(approach)} disabled={loading}>
            Refresh
          </Button>
          {approach === 'graphql' && (
            <Button
              onClick={() => addServiceGraphql('New Service ' + new Date().toLocaleTimeString(), 'Auto-added from mutation example')}
              disabled={loading}
            >
              Add Demo Service (Mutation)
            </Button>
          )}
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 6 }}>
            <CircularProgress />
          </Box>
        ) : null}
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
