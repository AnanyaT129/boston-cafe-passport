import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';
import { Tag } from '../dataModels/tag';

export type CafeGridProps = {
  tags: Tag
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
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {props.tags.cuisineTags.map((tag, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <Item><Button>{tag}</Button></Item>
          </Grid>
        ))}
      </Grid>
      <Grid container spacing={{ xs: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {props.tags.vibeTags.map((tag, index) => (
          <Grid key={index} size={{ xs: 2, sm: 4, md: 4 }}>
            <Item><Button>{tag}</Button></Item>
          </Grid>
        ))}
      </Grid> 
    </Box>
  );
}
