import { Button, Container, Grid, IconButton, InputBase, Link, Paper, Typography } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import Image from 'next/image';
import useSWR, { mutate } from "swr";
import Header from '../components/header.js';
import Short from "../components/short.js";

const fetcher = url => fetch(url).then(r => r.json());
const urlencode = require("urlencode");
let hostname = "";
let url = "";
let shortData;

function Copyright() {
    return (
      <Typography style={{padding: "30px"}} variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://meycup.com">
          MeyCup
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


if (typeof window != "undefined") {
    if (window.location.port != ""){
        hostname = window.location.protocol+"//"+window.location.hostname+":"+window.location.port;
    } else {
        hostname = window.location.protocol+"//"+window.location.hostname;
    }
}

function shortUrl(e) {
    console.log("Form submit")
    e?.preventDefault();
    
    let newUrl = urlencode(url);

    fetch("/api/v1/short/"+newUrl).then(res => res.json()).then(json => mutate("/api/v1/short/", {...shortData, url: json.url, short: json.short}, false))

}

function urlChange(e) {
    console.log("url changed");
    url = e?.target.value
}

export default function index() {

    //const {data,error} = useSWR("/api/v1/short/"+urlencode(url), fetcher);
    //shortData = data;

    return (
        <>
            <Header title="LOW.RED - Simple Url Shortener"/>
            <Container>
            <br/><br/><br/><br/>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="left" spacing={4}>
                            <Grid key="1" item>
                                <Typography variant="h2">
                                    Short links, big results
                                </Typography><br/>
                                <Typography variant="subtitle1">
                                    A URL shortener built with powerful tools to help you grow and protect your brand.
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