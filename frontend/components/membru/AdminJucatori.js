import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'

import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import SvgIcon from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import { useSpring, animated } from 'react-spring'


export default function AdminJucatori({userData}) {

  const [jucatori, setJucatori]= useState([]);
  const [fjucatori, setFJucatori]= useState([]);
  const [non, setNon]= useState(0);


  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const fetchJucatori = () => {
    fetch('/api/th/get_jucatori_admin_api', {
      method: 'POST',
    }).then((raspuns) => {
      raspuns.json().then((rasp)=> {
        setJucatori(rasp.jucatori);
        setFJucatori(rasp.jucatori);
        setNon(rasp.non);
      })
    });
  }

  useEffect(()=> {
    fetchJucatori();
  }, [])

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
        return;
    }

    setSnackOpen(false);
  };

  const snack = (mesaj) => {
    setSnackMessage(mesaj);
    setSnackOpen(true);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  function MinusSquare(props) {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
      </SvgIcon>
    );
  }
  
  function PlusSquare(props) {
    return (
      <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
        <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
      </SvgIcon>
    );
  }
  
  function CloseSquare(props) {
    return (
      <SvgIcon
        className="close"
        fontSize="inherit"
        style={{ width: 14, height: 14 }}
        {...props}
      >
        <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
      </SvgIcon>
    );
  }
  
  function TransitionComponent(props) {
    const style = useSpring({
      from: {
        opacity: 0,
        transform: 'translate3d(20px,0,0)',
      },
      to: {
        opacity: props.in ? 1 : 0,
        transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
      },
    });
  
    return (
      <animated.div style={style}>
        <Collapse {...props} />
      </animated.div>
    );
  }
  
  TransitionComponent.propTypes = {
    in: PropTypes.bool,
  };
  
  const StyledTreeItem = styled((props) => (
    <TreeItem {...props} TransitionComponent={TransitionComponent} />
  ))(({ theme, s }) => ({
    [`& .${treeItemClasses.iconContainer}`]: {
      color: !s?'gray':s===1?'green':s===2?'orange':'red',
      '& .close': {
        opacity: 0.3,
      },
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: 15,
      paddingLeft: 18,
      borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
  }));

  
  const renderTree = (nodes) => (
    <StyledTreeItem key={nodes.id} nodeId={nodes.id} label={nodes.name} s={nodes.s}>
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </StyledTreeItem>
  );

  const handleSearch = (event) => {
    let value = event.target.value.toLowerCase().trim();
    let result = [];
    const verif = (str) => {
        return str.trim().toLowerCase().search(value) != -1;
    }

    result = jucatori.filter((data) => {
        if(verif(data.name) || verif(data.telefon) || verif(data.creator)){
            return true;
        }else{
            return false;
        }
    });
    setFJucatori(result);
}


  const daSurpriza = () => {
    fetch('/api/th/add_prajitura', {
      method: 'POST',
    }).then((raspuns) => {
      raspuns.json().then((rasp)=> {
        if(rasp.succes){
          snack("Prajitura lui "+ rasp.nume)
        }else{
          snack("Nu sunt persoane valabile pentru prajitura");
        }
        
      })
    });
  }

  return (
    <>
      <h2>Admin jucatori</h2>
      <h5>{jucatori.length} persoane</h5>
      <h5>{non} care nu au completat profilul</h5>
      <br/>
      <TextField id="outlined-basic" label="Cauta jucatori" variant="outlined" onChange={(event) =>handleSearch(event)} autoComplete="off"/>
      <br/>
      <button className='btn btn-primary btn-round' onClick={()=>{fetchJucatori(); snack("Jucatori reincarcati!");}}>
          <i className='now-ui-icons arrows-1_refresh-69'></i>
          Refresh
      </button>
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnack}
        message={snackMessage}
        action={action}
      />


      <div className="row">
      <button className='btn btn-danger btn-round' onClick={()=>{daSurpriza()}}>
          DA O PRAJITUA
      </button>
            {
                fjucatori.map((jucatorData, index) => (
                <div className='card card-body' key={index}>
                  <p>Creator: <b>{jucatorData.creator}</b></p>
                  <p>Telefon: <b>{jucatorData.telefon}</b></p>
                  <TreeView
                    aria-label="jucatori"
                    defaultCollapseIcon={<MinusSquare />}
                    defaultExpandIcon={<PlusSquare />}
                    defaultEndIcon={<CloseSquare />}
                    sx={{ height: 'auto', flexGrow: 1, width: '100%', overflowY: 'auto', margin: 'auto' }}
                  >
                    {renderTree(jucatorData)}
                  </TreeView>
                </div>
                ))
            }
        </div>
        <button className='btn btn-primary btn-round' onClick={()=>{fetchJucatori(); snack("Jucatori reincarcati!");}}>
          <i className='now-ui-icons arrows-1_refresh-69'></i>
          Refresh
      </button>
    </>
  )
}
