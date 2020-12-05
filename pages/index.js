import { AppBar, Container, Grid, Paper, Toolbar, Typography } from "@material-ui/core";
import Image from 'next/image';

export default function index() {
    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography>LOW.RED</Typography>
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <Container>
            <br/><br/><br/><br/><br/><br/>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid container justify="left" spacing={10}>
                            <Grid key="1" item>
                                <Typography variant="h2">
                                    Short links, big results
                                </Typography><br/>
                                <Typography variant="subtitle1">
                                    A URL shortener built with powerful tools to help you grow and protect your brand.
                                </Typography>
                            </Grid>
                            <Grid key="2" item>
                                <Image src="/home.jpg" width={480} height={381}/>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </>
    )
}