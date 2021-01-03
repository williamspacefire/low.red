import { Container, Grid, Typography } from "@material-ui/core";
import Image from 'next/image';
import Header from '../components/header.js';
import Short from "../components/short.js";
import Copyright from '../components/copyright';

function getHostname() {
    if (process.browser) {
        if (window.location.port !== ""){
            return window.location.protocol+"//"+window.location.hostname+":"+window.location.port+"/";
        } else {
            return window.location.protocol+"//"+window.location.hostname+"/";
        }
    }
}

export default function index() {

    const hostname = getHostname()

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