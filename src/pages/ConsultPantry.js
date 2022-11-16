import { Grid,Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import leite from "../images/leite.jpg"

export default function ConsultPantry() {
    return (
        <>
        <Grid container> 
        <Grid item xs = {3}>
            <Box sx = {{
                display : 'flex',
                flexDirection : 'column',
                alignItems: 'left'
            }}>
                <Typography sx = {{
                    fontFamily: 'Verdana', fontSize: 20, color: "black" }}>Filtros </Typography>
            </Box>
            
            </Grid>       
        <Grid container item xs = {9} direction= 'row'>
            <Box sx = {{ p:1, width : '20%'}}>
                    <Card variant='elevation' sx = {{p:2}}>
                    <CardContent>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Leite
                            </Typography>
                    </CardContent>
                    <CardMedia
                        component ='img'
                        image = {leite}
                        height = "320"
                        alt="green iguana"
                    />
                    </Card>
            </Box>

        </Grid>

        </Grid>
        
        </> 
    )
}