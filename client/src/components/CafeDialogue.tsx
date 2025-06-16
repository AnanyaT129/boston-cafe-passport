import * as React from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Cafe } from '../dataModels/cafe';
import TagsGrid from './TagsGrid';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface CafeDialogueProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  cafe: Cafe
}

export function CafeDialogue(props: CafeDialogueProps) {
  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {props.cafe.name}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            <p>{props.cafe.address.streetAddress}</p>
            <a href={props.cafe.website} target="_blank">Website</a>
          </Typography>
          <Typography gutterBottom>
            <ul>
              <li>{props.cafe.attributes.hasInternet ? "Free" : "No"} WiFi</li>
              <li>Outlets {props.cafe.attributes.hasOutlets ? "available" : "unavailable"}</li>
              <li>12 oz latte price: {props.cafe.attributes.price}</li>
              <li>Rating: {props.cafe.attributes.rating}/5</li>
            </ul>
          </Typography>
          <Typography gutterBottom>
            <h3>Tags</h3>
            <TagsGrid tags={props.cafe.attributes.tags}></TagsGrid>
          </Typography>
        </DialogContent>
      </BootstrapDialog>
    </div>
  );
}