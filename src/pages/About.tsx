import React from 'react'
import Header from '../components/Header';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { theme } from '../theme';
import { InfoGrid, InfoType } from '../components/InfoGrid';
import Typography from '@mui/material/Typography';
import { Profiles } from '../components/Profiles';

function About() {
  const aboutGridInfo: InfoType[] = [
    {
      type: "Img",
      src: "./cafeStock.jpeg",
      alt: "Cafe Stock"
    },
    {
      type: "Card",
      title: "Our Mission",
      description: `After 6 semesters of travelling around Boston finding cafes to study at, founders and Northeastern students 
      Ananya and Aidan developed a list of what places had good drinks, cheap student deals, outlets and internet for work, and 
      most importantly good studying vibes. This website is a compilation of their findings, growing as they visit more cafes and try
      new drinks. The hope is to bring together a community of young cafe lovers to support small businesses around the Greater
      Boston Area while getting their work done amongst the Brownstones or finding a cozy spot to escape the winter weather.`,
      actions: []
    },
  ]
  
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header></Header>
        <InfoGrid info={aboutGridInfo}></InfoGrid>
        <Typography variant="h2" component="div">The Team</Typography>
        <Profiles></Profiles>
        <Typography variant="h2" component="div">Join Us</Typography>
        <p style={{marginLeft: "10%", marginRight: "10%"}}>We are currently looking for article writers, photographers, and software developers who currently live in the 
          Greater Boston Area and are interested in the coffee scene. If interested, email your portfolio to
          bostonBeanScene@gmail.com and we will be in touch. 
        </p>
      </ThemeProvider>
    </div>
  )
}

export default About