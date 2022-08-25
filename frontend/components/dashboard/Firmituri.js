import * as React from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';

export default function Firmituri({pag, icon}) {
  return (
    <div>
      
        {!!pag ? 
        <Breadcrumbs aria-label="breadcrumb">
        <Link
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/acasa"
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          RW
        </Link>
        <Link
          sx={{ display: 'flex', alignItems: 'center' }}
          color="inherit"
          href="/dashboard"
        >
          <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Dashboard
        </Link>
        <Typography
          sx={{ display: 'flex', alignItems: 'center' }}
          color="text.primary"
        >
          {icon}
          {pag}
        </Typography>
      </Breadcrumbs>
        :
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            sx={{ display: 'flex', alignItems: 'center' }}
            color="inherit"
            href="/acasa"
          >
            <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            RW
          </Link>
          <Typography
            sx={{ display: 'flex', alignItems: 'center' }}
            color="text.primary"
          >
            <DashboardIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Dashboard
          </Typography>
          
        </Breadcrumbs>
        }
        
      
    </div>
  );
}