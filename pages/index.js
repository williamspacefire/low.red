import { Container, Grid, Link, Typography } from "@material-ui/core";
import Image from 'next/image';
import Header from '../components/header.js';
import Short from "../components/short.js";

let hostname = "";

function Copyright() {
    return (
      <Typography style={{padding: "30px"}} variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://spacefire.xyz">
          Spacefire
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


if (typeof window != "undefined") {
    if (window.location.port != ""){
        hostname = window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/";
    } else {
        hostname = window.location.protocol+"//"+window.location.hostname+"/";
    }
}

export default function index() {

    return (
        <>
            <Header title="LOW.RED - Simple Url Shortener"/>
            <Container>
            <br/><br/><br/><br/>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="left" spacing={4}>
                            <Grid key="1" item>
                                <Typography variant="h3">
                                    Short links for you and your brand
                                </Typography><br/>
                                <Typography variant="subtitle1">
                                    A URL shortener built Open Source to help you grow and protect your brand.
                                </Typography>
                            </Grid>
                            <Grid key="2" item>
                                <Image priority={true} src="/home.jpg" width={480} height={381}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                {/* Short Component */} 
                <Short hostname={hostname}/>
                <Copyright/>
            </Container>
        </>
    )
}