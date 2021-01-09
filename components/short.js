import { Button, Grid, IconButton, Input, InputBase, Paper, Popover, Typography } from '@material-ui/core';
import { Search } from '@material-ui/icons';
import { Alert, Skeleton } from '@material-ui/lab';
import React from 'react';

const urlencode = require("urlencode");
const validUrl = require('url-validation');
const parse = require("url-parse")
const shortenerProviders = require('../components/shortenerproviders');

export default class Short extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            url: "",
            anchorEl: null,
            shortData: {},
            loading: false
        }
    }

    shortUrl(e) {
        e?.preventDefault();

        const urlParsed = parse(this.state.url, true)

        this.setState({loading: false, shortData: {}})
        
        if (validUrl(this.state.url) && !shortenerProviders.includes(urlParsed.host)) {
            this.setState({loading: true})
            const newUrl = urlencode(this.state.url);
    
            fetch("/api/v1/short/"+newUrl)
                .then(res => res.json())
                .then(json => this.setState({
                    shortData: json,
                    loading: false
                }));
        } else if (shortenerProviders.includes(urlParsed.host)) {
            this.setState({shortData: {
                error: true,
                message: <>This is already a <b>{urlParsed.host}</b> shortened url.</>,
                code: 346
            }})
        } else {
            this.setState({shortData: {
                error: true,
                message: "Invalid url, please try again with a valid url.",
                code: 345
            }})
        }
    }

    urlChange(e) {
        this.setState({url: e?.target.value})
    }

    copy(e) {
        if (process.browser) {
            const short = document.getElementById("shortened");
            short.select();
            short.setSelectionRange(0, 99999);

            document.execCommand("copy");

            this.setState({anchorEl: e?.currentTarget});
        }
    }

    copyClose(){
        this.setState({anchorEl: null});
    }
    
    render() {
        const open = Boolean(this.state.anchorEl);
        const popoverId = open ? 'simple-popover' : undefined;

        return (
            <>
                {this.state.shortData.error ? (
                    <Alert severity="error">{this.state.shortData.message} <b>Code: {this.state.shortData.code}</b></Alert>
                ) : ("")}
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
                                        {this.state.shortData?.short ? (
                                            <Input id="shortened" value={this.props.hostname+this.state.shortData?.short}/>
                                        ) : (
                                            <Skeleton width={150}/>
                                        )}
                                    </Grid>
                                    <Grid item>
                                        {this.state.shortData?.short ? (
                                            <>
                                                <Button 
                                                aria-describedby={popoverId}
                                                onClick={(e) => this.copy(e)} 
                                                color="primary">Copy</Button>
                                                <Popover
                                                    id={popoverId}
                                                    open={open}
                                                    anchorEl={this.state.anchorEl}
                                                    onClose={(e) => this.copyClose(e)}
                                                    anchorOrigin={{vertical: "top", horizontal: "center"}}>
                                                    <Typography style={{padding: "10px"}}>Shortened url copied!</Typography>
                                                </Popover>
                                            </>
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