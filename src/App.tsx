import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Badge, Box, ThemeProvider, createTheme, CssBaseline, IconButton } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/RestaurantMenu';
import HistoryIcon from '@mui/icons-material/History';
import { useAppSelector } from './store/hooks';

// Pages
import Menu from './pages/Menu';
import Cart from './pages/Cart';
import History from './pages/History';

// Create a warm MUI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#e65100', // Deep Orange
      light: '#ff833a',
      dark: '#ac1900',
    },
    secondary: {
      main: '#ffb300', // Amber
      light: '#ffe54c',
      dark: '#c68400',
    },
    background: {
      default: '#fff8f0', // Very light warm background
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Nunito", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 800,
    },
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

function App() {
  const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
          <AppBar position="sticky" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider', bgcolor: 'background.paper', color: 'text.primary' }}>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Typography variant="h5" component={Link} to="/" sx={{ fontWeight: 800, color: 'primary.main', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 1 }}>
                🍔 Foodie
              </Typography>

              <Box sx={{ display: 'flex', gap: { xs: 0, sm: 2 } }}>
                <Button
                  color="inherit"
                  component={Link}
                  to="/"
                  startIcon={<MenuIcon />}
                  sx={{ display: { xs: 'none', sm: 'flex' } }}
                >
                  Menu
                </Button>
                <IconButton
                  color="inherit"
                  component={Link}
                  to="/"
                  sx={{ display: { xs: 'flex', sm: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>

                <Button
                  color="inherit"
                  component={Link}
                  to="/history"
                  startIcon={<HistoryIcon />}
                  sx={{ display: { xs: 'none', sm: 'flex' } }}
                >
                  History
                </Button>
                <IconButton
                  color="inherit"
                  component={Link}
                  to="/history"
                  sx={{ display: { xs: 'flex', sm: 'none' } }}
                >
                  <HistoryIcon />
                </IconButton>

                <Button
                  color="primary"
                  variant="contained"
                  component={Link}
                  to="/cart"
                  startIcon={
                    <Badge badgeContent={totalQuantity} color="secondary">
                      <ShoppingCartIcon />
                    </Badge>
                  }
                  sx={{ display: { xs: 'none', sm: 'flex' }, borderRadius: 20, px: 3 }}
                >
                  Cart
                </Button>
                <IconButton
                  color="primary"
                  component={Link}
                  to="/cart"
                  sx={{ display: { xs: 'flex', sm: 'none' }, bgcolor: 'primary.light', color: 'white', '&:hover': { bgcolor: 'primary.main' } }}
                >
                  <Badge badgeContent={totalQuantity} color="secondary">
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>

          <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: { xs: 2, sm: 4, md: 5 } }}>
            <Routes>
              <Route path="/" element={<Menu />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </Container>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
