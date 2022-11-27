import logoIHMcut from "../images/logoIHMcut.png"
import { Box, Grid, Typography, TextField, Button, Link, Snackbar, CircularProgress } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom"
import { useState, forwardRef } from "react"
import restCalls from "../restCalls"
import "./style.css"

export default function PageLogin() {
    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    function usernameHandler(e) {
        setUsername(e.target.value);
    }

    function passwordHandler(e) {
        setPassword(e.target.value);
    }

    function loginManager(e) {
        e.preventDefault();
        setLoading(true)
        restCalls.login(username, password).then(() => {
            setLoading(false);restCalls.allRecipes().then(() => { restCalls.getPantry(); restCalls.allIngredients(); restCalls.topRatedRecipes(); navigate("/loggedin") })
        }).catch(() => { setOpen(true); setLoading(false) })
    }

    return (
        <Grid item xs={12} container className="main-container" >
            {loading && <CircularProgress size='3rem' color="inherit" sx={{ position: "absolute", top: "50%", left: "50%", overflow: "auto" }} />}
            <Grid item xs={3.5} />
            <Grid item xs={5} align="center">
                <Box component="img" pt="35%" src={logoIHMcut} width="30%" />
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }} >
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 18, marginBottom: 3 }}>
                        Helping young adults by making their lives easier in the kitchen!
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        label="Username"
                        color="grey"
                        InputLabelProps={{
                            style: { fontFamily: 'Verdana', fontSize: 18, color: "black" },
                        }}
                        sx={{ width: "40%" }}
                        onChange={usernameHandler}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Password"
                        color="grey"
                        type="password"
                        InputLabelProps={{
                            style: { fontFamily: 'Verdana', fontSize: 18, color: "black" },
                        }}
                        sx={{ width: "40%" }}
                        onChange={passwordHandler}
                    />
                    <Button
                        type="submit"
                        variant="outlined"
                        color='inherit'
                        sx={{ mt: 2, mb: 1, height: "40px", width: "40%" }}
                        onClick={(e) => { loginManager(e) }}
                    >
                        <Typography sx={{ fontFamily: 'Verdana', fontSize: 15, color: "black" }}> Login </Typography>
                    </Button>
                    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                        <Alert severity="error" sx={{ width: '100%' }}>
                            <Typography sx={{ fontFamily: 'Verdana', fontSize: 14 }}>Login failed. Wrong username or password.</Typography>
                        </Alert>
                    </Snackbar>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 16, color: "black", mb: 3 }}>
                        Don't have an account?
                        <Link onClick={() => { navigate("/register") }} sx={{ ml: 1, cursor: "pointer" }}>Register now!</Link>
                    </Typography>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Search for various recipes and upload your own!</Typography>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 18, pb: 5 }}>Efficiently manage your pantry!</Typography>
                </Box>
            </Grid>
            <Grid item xs={3.5} />
        </Grid>
    )
}