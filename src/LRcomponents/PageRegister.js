import logoIHMcut from "../images/logoIHMcut.png"
import { Box, Grid, Typography, TextField, Button, Link } from "@mui/material";
import "./style.css"
import { useNavigate } from "react-router-dom"

export default function PageRegister() {
    let navigate = useNavigate();

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

                    />
                    <TextField
                        margin="normal"
                        required
                        label="Password"
                        color="grey"
                        InputLabelProps={{
                            style: { fontFamily: 'Verdana', fontSize: 18, color: "black" },
                        }}
                        sx={{ width: "40%" }}
                    />
                    <TextField
                        margin="normal"
                        required
                        label="Password Confirmation"
                        color="grey"
                        InputLabelProps={{
                            style: { fontFamily: 'Verdana', fontSize: 18, color: "black" },
                        }}
                        sx={{ width: "40%" }}
                    />
                    <Button
                        type="submit"
                        variant="outlined"
                        color='inherit'
                        sx={{ mt: 2, mb: 1, height: "40px", width: "40%" }}
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