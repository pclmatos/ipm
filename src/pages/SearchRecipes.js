import { Box, Grid, TextField, Typography, Card, CardMedia, CardContent, RadioGroup, FormControlLabel, Radio, ThemeProvider, createTheme } from "@mui/material";
import logoIHMcut from "../images/logoIHMcut.png"
import { useState } from "react"

export default function SearchRecipesPage() {
    const [vegetarian, setVegetarian] = useState("false")
    const [vegan, setVegan] = useState("false")
    const [kosher, setKosher] = useState("false")
    const [glutenFree, setGlutenFree] = useState("false")
    const [lactoseFree, setLactoseFree] = useState("false")
    const [ingredients, setIngredients] = useState("")

    function vegetarianHandler(e) {
        if (vegetarian === "true") {
            setVegetarian("false");
        } else {
            setVegetarian(e.target.value);
        }
    }

    function veganHandler(e) {
        if (vegan === "true") {
            setVegan("false");
        } else {
            setVegan(e.target.value);
        }
    }

    function kosherHandler(e) {
        if (kosher === "true") {
            setKosher("false");
        } else {
            setKosher(e.target.value);
        }
    }

    function glutenFreeHandler(e) {
        if (glutenFree === "true") {
            setGlutenFree("false");
        } else {
            setGlutenFree(e.target.value);
        }
    }

    function lactoseFreeHandler(e) {
        if (lactoseFree === "true") {
            setLactoseFree("false");
        } else {
            setLactoseFree(e.target.value);
        }
    }

    function ingredientsHandler(e) {
        setIngredients(e.target.value);
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
            <Grid item xs={3}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }} >
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 25, color: "black", pt: "6%", pb: "2%" }}>Filtragem de Receitas</Typography>
                    <ThemeProvider theme={theme}>
                        <RadioGroup
                            value={vegetarian}
                            onClick={vegetarianHandler}>
                            <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Vegetarian</Typography>} />
                        </RadioGroup>
                        <RadioGroup
                            value={vegan}
                            onClick={veganHandler}>
                            <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Vegan</Typography>} />
                        </RadioGroup>
                        <RadioGroup
                            value={kosher}
                            onClick={kosherHandler}>
                            <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Kosher</Typography>} />
                        </RadioGroup>
                        <RadioGroup
                            value={glutenFree}
                            onClick={glutenFreeHandler}>
                            <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Gluten Free</Typography>} />
                        </RadioGroup>
                        <RadioGroup
                            value={lactoseFree}
                            onClick={lactoseFreeHandler}>
                            <FormControlLabel value="true" control={<Radio />} label={<Typography sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Lactose Free</Typography>} />
                        </RadioGroup>
                    </ThemeProvider>
                </Box>
            </Grid>
            <Grid container item xs={9} direction="row">
                <Box sx={{ p: 1, width: "33.3%" }}>
                    <Card variant="outlined" sx={{ p: 1 }}>
                        <CardContent >
                            <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Receita 1
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            image={logoIHMcut}
                            height="320"
                            alt="green iguana"
                        />
                    </Card>
                </Box>
                <Box sx={{ p: 1, width: "33.3%" }}>
                    <Card variant="outlined" sx={{ p: 1 }}>
                        <CardContent>
                            <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Receita 2
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            image={logoIHMcut}
                            height="320"
                            alt="green iguana"
                        />
                    </Card>
                </Box>
                <Box sx={{ p: 1, width: "33.3%" }}>
                    <Card variant="outlined" sx={{ p: 1 }}>
                        <CardContent >
                            <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Receita 3
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            image={logoIHMcut}
                            height="320"
                            alt="green iguana"
                        />
                    </Card>
                </Box>
                <Box sx={{ p: 1, width: "33.3%" }}>
                    <Card variant="outlined" sx={{ p: 1 }}>
                        <CardContent>
                            <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Receita 4
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            image={logoIHMcut}
                            height="320"
                            alt="green iguana"
                        />
                    </Card>
                </Box>
                <Box sx={{ p: 1, width: "33.3%" }}>
                    <Card variant="outlined" sx={{ p: 1 }}>
                        <CardContent>
                            <Typography sx={{ fontFamily: 'Verdana', fontSize: 20, color: "black" }}>
                                Receita 5
                            </Typography>
                        </CardContent>
                        <CardMedia
                            component="img"
                            image={logoIHMcut}
                            height="320"
                            alt="green iguana"
                        />
                    </Card>
                </Box>
            </Grid>
        </Grid>
    )
}