import React from 'react'
import Head from 'next/head'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

export default class Header extends React.Component {
    render() {
        return (
            <>
                <Head>
                    <title>{this.props.title}</title>
                    <link
                        rel='stylesheet'
                        href='https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
                    />
                </Head>
                <AppBar
                    position='fixed'
                    style={{ backgroundColor: 'white', color: 'black' }}
                >
                    <Toolbar>
                        <Typography>LOW.RED</Typography>
                    </Toolbar>
                </AppBar>
                <Toolbar />
            </>
        )
    }
}
