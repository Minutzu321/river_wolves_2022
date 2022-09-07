import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextField, Typography } from '@mui/material';
import { withStyles } from '@mui/styles';
import { CircularProgress } from '@mui/material';
import { useEffectOnce } from 'usehooks-ts';

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

const formCol = (rand, c) => {
  if(rand.id==1) {
    return (
      <L1 variant="h4">
        {c}
      </L1>
    )
    }else if(rand.id==2){
      return (
        <L2 variant="h5">
          {c}
        </L2>
      )
  }else if(rand.id==3){
    return (
      <L3 variant="h6">
        {c}
      </L3>
    )
  }else{
    return (
      <Typography variant="subtitle2">
        {c}
      </Typography>
    )
  }
}

const formTimp = (val) => {
  let m = parseInt(val / (1000 * 60) % 60);
  let s = parseInt(val / (1000) % 60);
  let t = s+" sec";
  if(m>0){
    t = m+" min "+s+" sec";
  }

  return t;
}

// const columns = [
//     { field: 'id',
//       headerName: 'Rank',
//       width: 90,
//       renderCell: (params) => {
        
//       },
//     },
//     {
//       field: 'nume',
//       headerName: 'Nume',
//       // width: 170,
//       editable: false,
//     },
//     {
//       field: 'ir',
//       headerName: 'Indicii rezolvate',  
//       // width: 150,
//       editable: false,
//       valueFormatter: (params) => {
//         if (params.value == null) {
//           return '';
//         }
//         return `${params.value}%`;
//       },
//     },
//     {
//       field: 'v',
//       headerName: 'Medie viteza raspuns',
//       // width: 150,
//       type: 'number',
//       editable: false,
//       valueFormatter: (params) => {
        
//       },
//     },
//   ];

export default function Ranking({snack}) {

  const [juc, setJuc] = React.useState([]);
  const [fjuc, setFJuc] = React.useState([]);

  const fetchJuc = () => {
    fetch('/api/th/rank_api', {
      method: 'POST',
    }).then((raspuns) => {
      if(raspuns.ok){
          raspuns.json().then((rdat) =>{
              setJuc(rdat);
              setFJuc(rdat);
            })
      }else{
        snack("Eroare la server! Incercati mai tarziu!")
      }
  });
  }

  useEffectOnce(() => {
    fetchJuc();
  })


  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase().trim();
    let result = [];
    const verif = (str) => {
        return str.trim().toLowerCase().search(value) != -1;
    }

    result = juc.filter((data) => {
        if(verif(data.nume) || verif(""+data.id)){
            return true;
        }else{
            return false;
        }
    });
    setFJuc(result);
}

  return (
    <>
    <br/>
      <TextField id="outlined-basic" label="Cauta jucatori" variant="outlined" onChange={(event) =>handleSearch(event)} autoComplete="off"/>
    <br/>
    <button className='btn btn-primary btn-round' onClick={()=>{fetchJuc(); snack("Jucatori reincarcati!");}}>
          <i className='now-ui-icons arrows-1_refresh-69'></i>
          Refresh
    </button>
    <br/>
    <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        {(juc.length > 0)?<>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="Ranking jucatori">
            <TableHead>
              <TableRow>
                <TableCell>Rank</TableCell>
                <TableCell align="left">Nume</TableCell>
                <TableCell align="left">Indicii rezolvate</TableCell>
                <TableCell align="left">Viteza medie de rezolvare</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fjuc.map((rand) => (
                <TableRow
                  key={rand.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {formCol(rand, "#"+rand.id)}
                  </TableCell>
                  <TableCell align="left">{rand.nume}</TableCell>
                  <TableCell align="left">{rand.ir}%</TableCell>
                  <TableCell align="left">{formTimp(rand.v)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </>:<CircularProgress style={{margin: 'auto'}} color="secondary"/>}
      </div>
    </div>
    </>
  )
}
