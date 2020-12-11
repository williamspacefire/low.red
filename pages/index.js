import { Button, Container, Grid, IconButton, InputBase, Paper, Typography } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import Image from 'next/image';
import Header from '../components/header.js';
import { useRouter } from 'next/router';

let hostname = "";
let url = "";

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
    

    let newUrl = url;
    
    while(newUrl.includes("/")) newUrl = newUrl.replace("/", "%2f")

    fetch("/api/v1/short/"+newUrl).then(res => res.json()).then(json => console.log(json))

}

function urlChange(e) {
    console.log("url changed");
    url = e?.target.value
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
                
                {/*Shortener bar*/}
                <Paper action="/short" onSubmit={shortUrl} component="form" style={{padding:"5px",marginTop:"10px",display:"flex"}}>
                    <InputBase
                        onChange={urlChange} 
                        name="short"
                        style={{padding:"4px",flex:1,}} 
                        placeholder="Shorten your link"/>
                        <IconButton>
                            <Search/>
                        </IconButton>
                </Paper>
                 
                 {/*List of shortened urls*/}
                <Paper style={{padding:"20px", display:"flex",marginTop:10}} elevation={2}>
                    <Grid container>                    
                        <Grid item justify="flex-start">
                            <Typography style={{flex:1}} variant="body1">
                                https://blog.meycup.com/asdpasd0afasf-asfasf-asfas-fasf
                            </Typography>
                        </Grid>
                        
                        <Grid container justify="flex-end" alignItems="baseline" spacing={3}>
                            <Grid item><Typography variant="body1">{hostname}/O9od</Typography></Grid>
                            <Grid item><Button color="primary">Copy</Button></Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </>
    )
}