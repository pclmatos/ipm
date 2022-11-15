import { Box, Grid, TextField, Typography } from "@mui/material";

export default function SearchRecipesPage() {
    return (
        <Grid container>
            <Grid item xs={3}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }} >
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>Filtros123</Typography>
                </Box>
            </Grid>
            <Grid item xs={9}>

            </Grid>
        </Grid>
    )
}