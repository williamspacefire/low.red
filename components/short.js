import { Button, Grid, IconButton, InputBase, Paper, Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';
import React from 'react';

const urlencode = require("urlencode");

export default class Short extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            url: "",
            shortData: {},
            loading: false
        }
    }

    shortUrl(e) {
        this.setState({loading: true, shortData: {}})
        console.log("Form submit")
        e?.preventDefault();
        
        let newUrl = urlencode(this.state.url);
    
        fetch("/api/v1/short/"+newUrl).then(res => res.json()).then(json => this.setState({shortData: json, loading: false}));
    }

    urlChange(e) {
        console.log("url changed");
        this.setState(state => ({
            url: e?.target.value
        }))
    }
    
    render() {

        return (
            <>
                {/*Shortener bar*/}
                <Paper onSubmit={(e) => this.shortUrl(e)} component="form" style={{padding:"5px",marginTop:"10px",display:"flex"}}>
                    <InputBase
                        onChange={(e) => this.urlChange(e)} 
                        name="short"
                        style={{padding:"4px",flex:1,}} 
                        placeholder="Shorten your link"/>
                        <IconButton type="submit">
                            <Search/>
                        </IconButton>
                </Paper>

                {/*List of shortened urls*/}
                {this.state.loading || this.state.shortData?.short ? (
                    <>
                        <Paper style={{padding:"20px", display:"flex",marginTop:10}} elevation={2}>
                            <Grid container>                    
                                <Grid item justify="flex-start">
                                    <Typography style={{flex:1}} variant="body1">
                                        {this.state.shortData?.url ? (
                                            this.state.shortData?.url
                                        ) : (
                                            <Skeleton width={300}/>
                                        )}
                                    </Typography>
                                </Grid>
                                
                                <Grid container justify="flex-end" alignItems="baseline" spacing={3}>
                                    <Grid item>
                                        <Typography variant="body1">
                                            {this.state.shortData?.short ? (
                                                this.props.hostname+this.state.shortData?.short
                                            ) : (
                                                <Skeleton width={150}/>
                                            )}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        {this.state.shortData?.short ? (
                                            <Button color="primary">Copy</Button>
                                        ) : ("")}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Paper>
                    </>
                ) : ("") }
            </>
        )
    }
}