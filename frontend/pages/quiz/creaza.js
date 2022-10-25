import * as React from 'react';
import { styled, useTheme, ThemeProvider} from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import SpeedDial from '@mui/material/SpeedDial';
import EditIcon from '@mui/icons-material/Edit';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BuildIcon from '@mui/icons-material/Build';
import AddIcon from '@mui/icons-material/Add';

import { Button, FormControl, FormGroup, InputAdornment, InputLabel, MenuItem, OutlinedInput, Paper, Select } from '@mui/material';

import { rwThemeDark } from '../../components/tema/temaPrincipala';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);
  
const Holder = styled(Box)(({theme}) => ({
  width: "100%",
  height: "100%",
  height: 'auto',
  background: '#29262D',
  boxShadow: '0 3px 5px 2px rgba(55, 51, 59, .3)',
  borderRadius: "10px",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  padding: 30,
}));


export default function MiniDrawer() {
  const [open, setOpen] = React.useState(false);

  const [titlu, setTitlu] = React.useState("");
  const [desc, setDesc] = React.useState("");
  const [tip, setTip] = React.useState(undefined);

  const [intrebare, setIntrebare] = React.useState("");

  const [sel, setSel] = React.useState(-1);

  const [intrebari, setIntrebari] = React.useState([])

  const theme = rwThemeDark;

  const handleTitlu = (event) =>{
    setTitlu(event.target.value);
  }

  const handleDesc = (event) =>{
    setDesc(event.target.value);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleNew = () =>{
    setIntrebari([
      ...intrebari,
      { intrebare: "", }
    ]);
  }


  const handleIntrebare = (event) =>{
    setIntrebare(event.target.value);
  }

  const handleTip = (event) => {
    setTip(event.target.value);
  };

  const actionsQuiz = [
    { icon: <SaveIcon />, name: 'Salveaza', callback: handleNew},
    { icon: <AddIcon />, name: 'Adauga', callback: handleNew},
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
                <SpeedDial
                    ariaLabel="Genereaza un quiz"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<EditIcon />}
                >
                    {actionsQuiz.map((action) => (
                    <SpeedDialAction
                        key={action.name}
                        icon={action.icon}
                        tooltipTitle={action.name}
                        onClick={action.callback}
                    />
                    ))}
                </SpeedDial>
                <AppBar position="fixed" open={open}  sx={{ bgcolor: "purple" }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="deschide optiunile"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Fa un quiz!
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Button variant="contained" color="success" endIcon={<CheckCircleIcon />}>
                            Publica
                        </Button>
                    </Toolbar>
                    
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <IconButton aria-label="delete" onClick={()=>{setSel(-1)}}>
                      <BuildIcon />
                    </IconButton>
                    <Divider />
                    <List>
                    {intrebari.map((_, index) => (
                        <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            sx={{
                            minHeight: 48,
                            px: 1,
                            }}
                            onClick={()=>setSel(index)}
                        >
                            <ListItemText primary={<>#{index+1}</>}/>
                        </ListItemButton>
                        </ListItem>
                    ))}
                    </List>
                </Drawer>
                {sel<0?<Box component="main" sx={{ flexGrow: 1, p: 3, width:'100%', height:'100%' }}>
                    <DrawerHeader />
                    <Typography variant="h5">
                        Optiuni pentru quiz
                    </Typography>
                    <Holder>
                      <FormGroup>
                        <FormControl>
                          <InputLabel htmlFor="titid">Titlu</InputLabel>
                          <OutlinedInput value={titlu} onChange={handleTitlu} label={"Titlu"} autoComplete='off' id="titid" color={"primary"}/>
                        </FormControl>
                        <br/>
                        <FormControl>
                          <InputLabel htmlFor="descid">Descriere</InputLabel>
                          <OutlinedInput value={desc} onChange={handleDesc} label={"Descriere"} autoComplete='off' id="descid" color={"primary"}/>
                        </FormControl>
                      </FormGroup>
                    </Holder>
                </Box>:<Box component="main" sx={{ flexGrow: 1, p: 3, width:'100%', height:'100%' }}>
                    <DrawerHeader />
                    <Typography variant="h5">
                        Quiz #{sel+1}
                    </Typography>
                    <Holder>
                      <FormGroup>
                        <FormControl>
                          <InputLabel htmlFor="titid">Intrebare</InputLabel>
                          <OutlinedInput value={intrebare} onChange={handleIntrebare} label={"Intrebare"} autoComplete='off' id="titid" color={"primary"}/>
                        </FormControl>
                        <br/>
                        <FormControl fullWidth>
                          <InputLabel id="tip-quiz">Tip de quiz</InputLabel>
                          <Select
                            color="primary"
                            labelId="tip-intreb"
                            id="tip-intreb-sel"
                            value={tip}
                            label="Tipul intrebarii"
                            onChange={handleTip}
                          >
                            <MenuItem value={undefined}>Selecteaza</MenuItem>
                            <MenuItem value={0}>4 variante</MenuItem>
                            <MenuItem value={1}>2 variante</MenuItem>
                            <MenuItem value={2}>raspuns text</MenuItem>
                            <MenuItem value={3}>brainstorm</MenuItem>
                          </Select>
                        </FormControl>
                        <br/>
                        <FormControl>
                          <InputLabel htmlFor="descid">Descriere</InputLabel>
                          <OutlinedInput value={desc} onChange={handleDesc} label={"Descriere"} autoComplete='off' id="descid" color={"primary"}/>
                        </FormControl>
                      </FormGroup>
                    </Holder>
                </Box>
                }
            </Box>
    </ThemeProvider>
  );
}
