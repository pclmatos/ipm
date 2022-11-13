import logoIHMcut from "../images/logoIHMcut.png"
import { Box, Grid, Typography, TextField, Button, Link } from "@mui/material";
import "./style.css"
export default function PageRegister() {
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
                    <Button
                        type="submit"
                        variant="outlined"
                        color='inherit'
                        sx={{ mt: 2, mb: 1, height: "40px", width: "40%" }}
                    >
                        <Typography sx={{ fontFamily: 'Verdana', fontSize: 15, color: "black" }}> Register </Typography>
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}