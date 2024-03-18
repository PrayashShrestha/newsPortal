import Image from 'next/image';
import { Box, Container, Paper, TextField, Button, Checkbox, FormControlLabel, Typography, Link } from '@mui/material';
import loginPic from '../public/assets/loginPic.png'

export default function LoginPage() {
  return (
    <Container component="main" sx={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ position: 'relative', width: '100%', maxWidth: '900px' }}>
        <Box sx={{
          position: 'absolute',
          top: '43px',
          left: '-250px',
          height: '100%',
          width: '80%',
          overflow: 'hidden',
          zIndex: 2,
        }}>
          <Image
            src={loginPic}
            alt="Login"
            layout="fill"
            objectFit="scale-down"
          />
        </Box>
        <Paper elevation={4} sx={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'flex-end',
          height: 'auto',
          minHeight: '400px',
          width: '100%',
          zIndex: 1,
          bgcolor: 'background.paper',
          padding: { xs: 3, md: 6 },
          boxSizing: 'border-box',
        }}>
          <Box sx={{ width: { xs: '100%', md: '50%' } }}>
            <Typography component="h1" variant="h5" textAlign="center">
              LOGIN
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Box display="flex" justifyContent={'center'}>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}