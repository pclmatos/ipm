import { Box, Grid, TextField, Typography } from "@mui/material";

export default function ShareRecipe() {
    return (
        <Grid container>
            <Grid item xs={4}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }} >
                    <TextField
                        margin="normal"
                        required
                        label="Name"
                        color="grey"
                        InputLabelProps={{
                            style: { fontFamily: 'Verdana', fontSize: 18 },
                        }}
                        sx={{ width: "70%", mt: "15%" }} />
                    <TextField
                        margin="normal"
                        required
                        label="Category"
                        color="grey"
                        InputLabelProps={{
                            style: { fontFamily: 'Verdana', fontSize: 18 },
                        }}
                        sx={{ width: "70%" }} />
                    <TextField
                        margin="normal"
                        required
                        label="Calories"
                        color="grey"
                        InputLabelProps={{
                            style: { fontFamily: 'Verdana', fontSize: 18 },
                        }}
                        sx={{ width: "70%" }} />
                    <TextField
                        margin="normal"
                        required
                        label="Execution Difficulty (0-5)"
                        color="grey"
                        InputLabelProps={{
                            style: { fontFamily: 'Verdana', fontSize: 18 },
                        }}
                        sx={{ width: "70%" }} />
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }} >
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 17, color: "black", pt: "5%", mb: "3.5%" }}>
                        Share your recipe by filling in the boxes with the respective information!
                    </Typography>
                    <TextField
                        margin="normal"
                        required
                        label="Ingredients List"
                        color="grey"
                        InputLabelProps={{
                            style: { fontFamily: 'Verdana', fontSize: 18 },
                        }}
                        sx={{ width: "70%" }}
                        multiline
                        //value={message}
                        rows={11} />
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }} >
                    <TextField
                        margin="normal"
                        required
                        label="Preparation (Process Description)"
                        color="grey"
                        InputLabelProps={{
                            style: { fontFamily: 'Verdana', fontSize: 18 },
                        }}
                        sx={{ width: "70%", mt: "14.5%" }}
                        multiline
                        //value={message}
                        rows={11} />
                </Box>
            </Grid>
        </Grid>
    )
}