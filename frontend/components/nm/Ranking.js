import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import { CircularProgress } from '@mui/material';

const L1 = withStyles({
  root: {
    color: "#FFD700"
  }
})(Typography);

const L2 = withStyles({
  root: {
    color: "#C0C0C0"
  }
})(Typography);

const L3 = withStyles({
  root: {
    color: "#cd7f32"
  }
})(Typography);

const columns = [
    { field: 'id',
      headerName: 'Rank',
      width: 90,
      renderCell: (params) => {
        if(params.value==1) {
          return (
            <L1 variant="h4" color="warning">
              #{params.value}
            </L1>
          )
          }else if(params.value==2){
            return (
              <L2 variant="h5">
                #{params.value}
              </L2>
            )
        }else if(params.value==3){
          return (
            <L3 variant="h6">
              #{params.value}
            </L3>
          )
        }else{
          return (
            <Typography variant="subtitle2">
              #{params.value}
            </Typography>
          )
        }
      },
    },
    {
      field: 'nume',
      headerName: 'Nume',
      // width: 170,
      editable: false,
    },
    {
      field: 'ir',
      headerName: 'Indicii rezolvate',  
      // width: 150,
      editable: false,
      valueFormatter: (params) => {
        if (params.value == null) {
          return '';
        }
        return `${params.value}%`;
      },
    },
    {
      field: 'v',
      headerName: 'Medie viteza raspuns',
      // width: 150,
      type: 'number',
      editable: false,
      valueFormatter: (params) => {
        if (params.value == null) {
          return '';
        }
        let m = parseInt(params.value / (1000 * 60) % 60);
        let s = parseInt(params.value / (1000) % 60);
        let t = s+" sec";
        if(m>0){
          t = m+" min "+s+" sec";
        }

        return t;
      },
    },
  ];

export default function Ranking({snack}) {

  const [juc, setJuc] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/th/rank_api', {
      method: 'POST',
    }).then((raspuns) => {
      if(raspuns.ok){
          raspuns.json().then((rdat) =>{
              setJuc(rdat);
            })
      }else{
        snack("Eroare la server! Incercati mai tarziu!")
      }
  });
  }, [])

  return (
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        {(juc.length > 0)?<DataGrid
          rows={juc}
          columns={columns}
          pageSize={100}
          rowsPerPageOptions={[100]}
        />:<CircularProgress style={{margin: 'auto'}} color="secondary"/>}
      </div>
    </div>
  )
}
