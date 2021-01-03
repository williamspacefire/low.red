import {Link, Typography} from "@material-ui/core";

export default function Copyright() {
    return (
        <Typography style={{padding: "30px"}} variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://spacefire.xyz">Spacefire</Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}