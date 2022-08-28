function ListaMembri({deschis}) {
    const [checked, setChecked] = React.useState([1]);

    const [openMembri, setOpenMembri] = React.useState(deschis);

    const handleMembriOpen = () => {
        setOpenMembri(true);
    };

    const handleMembriClose = () => {
        setOpenMembri(false);
    };
  
    const handleToggle = (value) => () => {
      const currentIndex = checked.indexOf(value);
      const newChecked = [...checked];
  
      if (currentIndex === -1) {
        newChecked.push(value);
      } else {
        newChecked.splice(currentIndex, 1);
      }
  
      setChecked(newChecked);
    };
  
    return (
            <Dialog
                open={openMembri}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleMembriClose}
                aria-describedby="alert-dialog-slide-description"
            >
            
            <DialogTitle>{"Lista participanti"}</DialogTitle>
            <DialogContent>
                <List dense sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15 , 16, 17].map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                        <ListItem
                        key={value}
                        secondaryAction={
                            <Checkbox
                            edge="end"
                            onChange={handleToggle(value)}
                            checked={checked.indexOf(value) !== -1}
                            inputProps={{ 'aria-labelledby': labelId }}
                            />
                        }
                        disablePadding
                        >
                        <ListItemButton>
                            <ListItemAvatar>
                            <Avatar
                                alt={`Avatar n°${value + 1}`}
                                src={`https://mui.com/static/images/avatar/1.jpg`}
                            />
                            </ListItemAvatar>
                            <ListItemText id={labelId} primary={`${value + 1}`} />
                        </ListItemButton>
                        </ListItem>
                    );
                    })}
                </List>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleMembriClose} color="error">Inchide</Button>
            </DialogActions>
        </Dialog>
    );
  }

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });