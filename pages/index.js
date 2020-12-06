import { Button, Container, Grid, IconButton, InputBase, Paper, Typography } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import Image from 'next/image';
import Header from '../components/header.js';



export default function index() {
    return (
        <>
            <Header title="LOW.RED - Simple Url Shortener"/>
            <Container>
            <br/><br/><br/><br/><br/><br/>
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
                <Paper component="form" style={{padding:"5px",marginTop:"10px",display:"flex"}}>
                    <InputBase 
                        name="short"
                        style={{padding:"4px",flex:1,}} 
                        placeholder="Short a url"/>
                        <IconButton>
                            <Search/>
                        </IconButton>
                </Paper>
                <Paper style={{padding:"20px", display:"flex",marginTop:10}} elevation={2}>
                    <Typography style={{flex:1}} variant="body1">https://blog.meycup.com/asdpasd0afasf-asfasf-asfas-fasf</Typography>
                    <Typography variant="body1">https://low.red/O9od</Typography>
                    <Button color="primary">
                        Copy
                    </Button>
                </Paper>
            </Container>
        </>
    )
}