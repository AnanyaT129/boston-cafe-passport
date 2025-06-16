import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Cafe } from '../dataModels/cafe';
import { CafeDialogue } from './CafeDialogue';

export default function CafeCard(props: {cafe: Cafe}) {
  const [open, setOpen] = React.useState(false);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea onClick={() => setOpen(true)}>
        <CardMedia
          component="img"
          height="140"
          image={props.cafe.image}
          alt={props.cafe.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.cafe.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {props.cafe.address.streetAddress}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CafeDialogue open={open} setOpen={setOpen} cafe={props.cafe}></CafeDialogue>
    </Card>
  );
}
