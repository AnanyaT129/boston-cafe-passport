import Container from '@mui/material/Container'
import React from 'react'
import Stack from '@mui/material/Stack'
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

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

export function Profiles() {
  return (
    <Container sx={{ width: '100%', marginTop: "1%", marginBottom: "1%"}}>
        <Stack direction="row" spacing={2}>
          <Item>
            <Card>
              <CardContent>
                <Avatar
                  alt="Remy Sharp"
                  src="./profileStock.jpeg"
                  sx={{ width: 100, height: 100, alignSelf: "center"}}
                />
                <Typography variant="h5" component="div">
                  Aidan Domondon
                </Typography>
                <Typography variant="body2">
                  Founder, Software Developer
                </Typography>
              </CardContent>
            </Card>
          </Item>
          <Item>
            <Card>
              <CardContent>
                <Avatar
                  alt="Remy Sharp"
                  src="./profileStock.jpeg"
                  sx={{ width: 100, height: 100, alignSelf: "center"}}
                />
                <Typography variant="h5" component="div">
                  Ananya Tadigadapa
                </Typography>
                <Typography variant="body2">
                  Founder, Software Developer
                </Typography>
              </CardContent>
            </Card>
          </Item>
        </Stack>
    </Container>
  )
}