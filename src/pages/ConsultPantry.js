import { Grid,Box, Typography, Card, CardContent, CardMedia, createTheme, ThemeProvider, FormControlLabel,RadioGroup, Radio } from "@mui/material";
import leite from "../images/leite.jpg"
import { useState } from "react"
import restCalls from "../restCalls"
import "./style.css"


export default function ConsultPantry() {
    const [vegetables, setVegetables] = useState("false")
    const [meat, setMeat] = useState("false")
    const [fish, setFish] = useState("false")
    const [fruits, setFruits] = useState("false")
    const [dairy, setDairy] = useState("false")
    const [driedFruits, setDriedFruits] = useState("false")
    const [sauces, setSauce] = useState("false")
    const [pastas, setPastas] = useState("false")
    const [fatsOils, setfatsOils] = useState("false")
    const [herbs, setherbs] = useState("false")
    const [rice, setRice] = useState("false")

    function vegetablesHandler(e) {
        if (vegetables === "true") {
            setVegetables("false");
        } else {
            setVegetables(e.target.value);
        }
    }
    function meatHandler(e) {
        if (meat === "true") {
            setMeat("false");
        } else {
            setMeat(e.target.value);
        }
    }
    function fishHandler(e) {
        if (fish === "true") {
            setFish("false");
        } else {
            setFish(e.target.value);
        }
    }
    function fruitsHandler(e) {
        if (fruits === "true") {
            setFruits("false");
        } else {
            setFruits(e.target.value);
        }
    }
    function dairyHandler(e) {
        if (dairy === "true") {
            setDairy("false");
        } else {
            setDairy(e.target.value);
        }
    }
    function driedFruitsHandler(e) {
        if (driedFruits === "true") {
            setDriedFruits("false");
        } else {
            setDriedFruits(e.target.value);
        }
    }
    function saucesHandler(e) {
        if (sauces === "true") {
            setSauce("false");
        } else {
            setSauce(e.target.value);
        }
    }
    function pastasHandler(e) {
        if (pastas === "true") {
            setPastas("false");
        } else {
            setPastas(e.target.value);
        }
    }
    function fatsOilsHandler(e) {
        if (fatsOils === "true") {
            setfatsOils("false");
        } else {
            setfatsOils(e.target.value);
        }
    }
    function herbsHandler(e) {
        if (herbs === "true") {
            setherbs("false");
        } else {
            setherbs(e.target.value);
        }
    }
    function riceHandler(e) {
        if (rice === "true") {
            setRice("false");
        } else {
            setRice(e.target.value);
        }
    }
    function searchRecipeManager(e) {
        e.preventDefault();
        restCalls.ConsultPantry();
    }

    const theme = createTheme({
        palette: {
            primary: {
                main: "#000000",
            },
        },
    });

    return (
        <Grid container> 
        <Grid item xs = {2.95}>
            <Box sx = {{
                display : 'flex',
                flexDirection : 'column',
                alignItems: 'center'
            }}>
               <Typography sx={{ fontFamily: 'Verdana', fontSize: 25, color: "black", pt: "6%", pb: "1%" }}>Diet Filtering</Typography>
                <Box sx = {{pl: '6%'}}>
                    <ThemeProvider theme = {theme}>
                        <RadioGroup
                            value = {vegetables}
                            onClick = {vegetablesHandler}>
                            <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Vegetarian</Typography>} />
                        </RadioGroup>
                    </ThemeProvider>
                </Box>

            </Box>
            
            </Grid>       
        <Grid container item xs = {9} direction= 'row'>
            <Box sx = {{ p:1, width : '20%'}}>
                    <Card variant='outlined' sx = {{p:1}}>
                    <CardContent>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Leite
                            </Typography>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Quantidade:
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
            <Box sx = {{ p:1, width : '20%'}}>
                    <Card variant='outlined' sx = {{p:1}}>
                    <CardContent>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Ovos
                            </Typography>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Quantidade:
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
            <Box sx = {{ p:1, width : '20%'}}>
                    <Card variant='outlined' sx = {{p:1}}>
                    <CardContent>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Milho
                            </Typography>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Quantidade:
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
            <Box sx = {{ p:1, width : '20%'}}>
                    <Card variant='outlined' sx = {{p:1}}>
                    <CardContent>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Batatas
                            </Typography>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Quantidade:
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
            <Box sx = {{ p:1, width : '20%'}}>
                    <Card variant='outlined' sx = {{p:1}}>
                    <CardContent>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                               Pão
                            </Typography>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Quantidade:
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
            <Box sx = {{ p:1, width : '20%'}}>
                    <Card variant='outlined' sx = {{p:1}}>
                    <CardContent>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                               Açúcar
                            </Typography>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Quantidade:
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
            <Box sx = {{ p:1, width : '20%'}}>
                    <Card variant='outlined' sx = {{p:1}}>
                    <CardContent>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Carapaus
                            </Typography>
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Quantidade:
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
        
       
    )
}