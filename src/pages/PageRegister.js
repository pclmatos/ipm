import logoIHMcut from "../images/logoIHMcut.png"
import { Box, Grid, Typography, TextField, Button, Link, Snackbar, CircularProgress } from "@mui/material";
import MuiAlert from '@mui/material/Alert';
import "./style.css"
import { useNavigate } from "react-router-dom"
import { useState, forwardRef } from "react"
import restCalls from "../restCalls"

export default function PageRegister() {
    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

    const [loading, setLoading] = useState(false)
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    function usernameHandler(e) {
        setUsername(e.target.value);
    }

    function passwordHandler(e) {
        setPassword(e.target.value);
    }

    function passwordConfirmationHandler(e) {
        setPasswordConfirmation(e.target.value);
    }

    function registerManager(e) {
        e.preventDefault();
        setLoading(true)
        restCalls.register(username, password, passwordConfirmation).then(() => { setLoading(false); setOpen(true) }).catch(() => { setLoading(false); setOpen2(true) })
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleClose2 = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen2(false);
    };

    const Alert = forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

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
                        sx={{ width: "40%", bgcolor: "#EBD9BC", opacity: "0.8" }}
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
                        sx={{ width: "40%", bgcolor: "#EBD9BC", opacity: "0.8" }}
                        onChange={passwordHandler}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Password Confirmation"
                        color="grey"
                        type="password"
                        InputLabelProps={{
                            style: { fontFamily: 'Verdana', fontSize: 18, color: "black" },
                        }}
                        sx={{ width: "40%", bgcolor: "#EBD9BC", opacity: "0.8" }}
                        onChange={passwordConfirmationHandler}
                    />
                    <Button
                        type="submit"
                        variant="outlined"
                        color='inherit'
                        sx={{ mt: 2, mb: 1, height: "40px", width: "40%" }}
                        onClick={(e) => { registerManager(e) }}
                    >
                        <Typography sx={{ fontFamily: 'Verdana', fontSize: 15, color: "black" }}> Register </Typography>
                    </Button>
                    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                        <Alert severity="success" sx={{ width: '100%' }}>
                            <Typography sx={{ fontFamily: 'Verdana', fontSize: 14 }}>Account created successfully!</Typography>
                        </Alert>
                    </Snackbar>

                    <Snackbar open={open2} autoHideDuration={4000} onClose={handleClose2}>
                        <Alert severity="error" sx={{ width: '100%' }}>
                            <Typography sx={{ fontFamily: 'Verdana', fontSize: 14 }}>Account was not created. Please verify the filled in information.</Typography>
                        </Alert>
                    </Snackbar>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 16, color: "black", pb: 5 }}>
                        Already have an account?
                        <Link onClick={() => { navigate("/") }} sx={{ ml: 1, cursor: "pointer" }}>Login now!</Link>
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}