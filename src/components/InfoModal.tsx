import { Box, Button, Modal, Typography } from '@mui/material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import React from 'react'

type Props = {}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

const InfoModal = (props: Props) => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  


  return (
    <>
    <HelpOutlineIcon onClick={handleOpen} style={{marginTop: '35px', marginLeft: '20px', cursor: 'pointer'}}/>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          About This Project
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        This flight tracker is built using TypeScript, OpenSky Network API, MUI, React-Map-GL and Mapbox. 
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Clicking on an aircraft will give you details such as the callsign, speed, altitude and country of origin.
        </Typography>
      </Box>
    </Modal>
    </>
  )
}

export default InfoModal