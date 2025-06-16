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

export type InfoType = ImgType | CardType
export type ImgType = {
  src: string,
  alt: string,
  type: "Img"
}

export type CardType = {
  title: string,
  description: string,
  actions:
    {
      link: string,
      text: string
    }[],
  type: "Card"
}

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

export function InfoGrid(props: {info: InfoType[]}) {
  return (
    <Container sx={{ width: '100%', marginTop: "1%", marginBottom: "1%"}}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        {props.info.map((item, index) => (
          <Grid size={6}>
            {item.type === "Img" ? 
            <Item>
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                width="100%"
              />
            </Item> : 
            <Item>
              <Card>
                <CardContent>
                  <Typography variant="h2" component="div">
                    {item.title}
                  </Typography>
                  <Typography variant="body2">
                    {item.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  {item.actions.map((action, _) => (
                    <Link to={action.link}><Button size="small">{action.text}</Button></Link>
                  ))}
                </CardActions>
              </Card>
            </Item>}
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}