import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import { Cafe } from '../dataModels/cafe';
import CafeCard from './CafeCard';

export type CafeGridProps = {
  listOfCafes: Cafe[]
}

const Item = styled(Container)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function CafeGrid(props: CafeGridProps) {
  return (
    <Box sx={{ flexGrow: 1, padding: 5 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {props.listOfCafes.map((cafe, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <Item><CafeCard cafe={cafe}></CafeCard></Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
