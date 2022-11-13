import logoIHMcut from "../images/logoIHMcut.png"
import { Box, Grid, Typography, TextField, Button, Link } from "@mui/material";
import "./style.css"
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import restCalls from "../restCalls"

export default function PageRegister() {
    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");

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
        restCalls.register(username, password, passwordConfirmation)
    }

    return (
        <Grid item xs={12} container className="main-container" >
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
                    <TextField
                        margin="normal"
                        required
                        label="Password Confirmation"
                        color="grey"
                        type="password"
                        InputLabelProps={{
                            style: { fontFamily: 'Verdana', fontSize: 18, color: "black" },
                        }}
                        sx={{ width: "40%" }}
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
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 16, color: "black", pb: 5 }}>
                        Already have an account?
                        <Link onClick={() => { navigate("/") }} sx={{ ml: 1, cursor: "pointer" }}>Login now!</Link>
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    )
}