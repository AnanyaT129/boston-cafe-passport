import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react'
import { Link } from 'react-router-dom';

const Item = styled(Container)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));

export default function HomeGrid() {
  return (
    <Container sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid size={6}>
          <Item>
            <img
              src={"./cafeStock.jpeg"}
              alt={'Cafe Stock'}
              loading="lazy"
              width="100%"
            />
          </Item>
        </Grid>
        <Grid size={6}>
          <Item>
            <Card>
              <CardContent>
                <Typography variant="h2" component="div">
                  Where to Go?
                </Typography>
                <Typography variant="body2">
                  Get personalized recommendations on which cafe to visit.
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={"/"}><Button size="small">I'm Ready</Button></Link>
              </CardActions>
            </Card>
          </Item>
        </Grid>
        <Grid size={6}>
          <Item>
            <Card>
              <CardContent>
                <Typography variant="h2" component="div">
                  Scared of AI?
                </Typography>
                <Typography variant="body2">
                  Browse all the Cafes on our list. 
                </Typography>
              </CardContent>
              <CardActions>
                <Link to={"/allCafes"}><Button size="small">I'm Ready</Button></Link>
              </CardActions>
            </Card>
          </Item>
        </Grid>
        <Grid size={6}>
          <Item>
            <img
              src={"./cafeStock.jpeg"}
              alt={'Cafe Stock'}
              loading="lazy"
              width="100%"
            />
          </Item>
        </Grid>
      </Grid>
    </Container>
  );
}