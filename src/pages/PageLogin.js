import logoIHMcut from "../images/logoIHMcut.png"
import { Box, Grid, Typography, TextField, Button, Link } from "@mui/material";
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import restCalls from "../restCalls"
import "./style.css"

export default function PageLogin() {
    let navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function usernameHandler(e) {
        setUsername(e.target.value);
    }

    function passwordHandler(e) {
        setPassword(e.target.value);
    }

    function loginManager(e) {
        e.preventDefault();
        restCalls.login(username, password).then(() => {
            restCalls.allRecipes().then(() => { restCalls.getPantry(); restCalls.allIngredients(); restCalls.topRatedRecipes(); navigate("/loggedin") })
        })
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
                    <Button
                        type="submit"
                        variant="outlined"
                        color='inherit'
                        sx={{ mt: 2, mb: 1, height: "40px", width: "40%" }}
                        onClick={(e) => { loginManager(e) }}
                    >
                        <Typography sx={{ fontFamily: 'Verdana', fontSize: 15, color: "black" }}> Login </Typography>
                    </Button>
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