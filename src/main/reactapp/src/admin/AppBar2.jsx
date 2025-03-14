import { Link } from 'react-router-dom'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function AppBar2( props ){
    return(<>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to={"/"}>로고/이미지</Link>
                </Typography>
                    <Button color="inherit"><Link>로그아웃</Link></Button>
                </Toolbar>
            </AppBar>
        </Box>
    </>)
}