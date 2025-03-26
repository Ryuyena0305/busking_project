import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function AppBar2( props ){

    const navigate = useNavigate();
    
    const onLogout =  async ( ) => {

        // axios 로그아웃 요청 
        const response =  await axios.get('http://localhost:8080/busking/admin/logout', {withCredentials: true} )
        if( response ){
            // navigate('/');
            sessionStorage.removeItem("isAdmin");
            location.href = '/'
        }
    }
    
    return(<>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    <Link to={"/home"} >BUSKING</Link>
                </Typography>
                    <Button color="inherit"> <button type='button' onClick={ onLogout } className='logoutBtn'>로그아웃</button> </Button>
                </Toolbar>
            </AppBar>
        </Box>
    </>)
}