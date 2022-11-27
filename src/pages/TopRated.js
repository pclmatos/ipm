import { Grid, Typography, Box, Card, CardContent, CardMedia, Button, Rating } from "@mui/material"
import { useState, useEffect } from "react"
import logoIHMcut from "../images/logoIHMcut.png"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import restCalls from "../restCalls"

export default function TopRated() {

    const [showRecipe, setShowRecipe] = useState(false)
    const [currentRecipe, setCurrentRecipe] = useState(null)
    const [readOnly, setReadOnly] = useState(false)
    const [rating, setRating] = useState()
    const [rate, setRate] = useState(false)

    var topRatedRecipes = JSON.parse(localStorage.getItem('topRatedRecipes'));

    useEffect(() => {
        if (currentRecipe != null && rate) {
            ratingManager()
        }
    }, [rate])

    function showRecipeHandler(e) {
        if (!showRecipe) {
            setShowRecipe(true);
        } else {
            setShowRecipe(false);
        }
    }

    function updateCurrRecipe(recipe) {
        setCurrentRecipe(recipe);
        setRating(Math.round(recipe.rating))
    }

    function ratingManager() {
        restCalls.rateRecipe(rating, currentRecipe.name).then(() => restCalls.topRatedRecipes())
    }

    return (
        <Grid container>
            {!showRecipe ? topRatedRecipes.map((recipe) =>
                <>
                    <Box sx={{ p: 0.5, width: "33.3%" }}>
                        <Card variant="outlined" sx={{ p: 1 }}>
                            <CardContent >
                                <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black", textAlign: "center" }}>
                                    {recipe.name} (Shared by: {recipe.author})
                                </Typography>
                            </CardContent>
                            <CardMedia
                                component="img"
                                image={recipe.photo == "undefined" ? logoIHMcut : recipe.photo}
                                height="375"
                                onClick={() => { showRecipeHandler(); updateCurrRecipe(recipe) }}
                                alt="green iguana"
                                sx={{ cursor: "pointer" }}
                            />
                            <CardContent >
                                <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black" }}>
                                    Category:<Typography sx={{ fontFamily: 'Verdana', fontSize: 18, color: "#BA852D" }}> - {recipe.category}</Typography>
                                </Typography>
                                <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black" }}>
                                    Calories:<Typography sx={{ fontFamily: 'Verdana', fontSize: 18, color: "#BA852D" }}> - {recipe.calories}</Typography>
                                </Typography>
                                <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black" }}>
                                    Difficulty:<Typography sx={{ fontFamily: 'Verdana', fontSize: 18, color: "#BA852D" }}> - {recipe.difficulty}</Typography>
                                </Typography>
                                
                                <Rating
                                    sx = {{"mt":2, "ml":"80%"}}
                                    name="simple-controlled"
                                    value={recipe.rating}
                                    readOnly={true}
                                    precision={0.5}
                                />

                            </CardContent>
                        </Card>
                    </Box>
                </>

            ) :
                <>
                    <Grid container item xs={3}>
                        <Button color="inherit" onClick={() => { showRecipeHandler(); setRate(false); setReadOnly(false) }}>
                            <KeyboardBackspaceIcon />
                        </Button>
                    </Grid>
                    <Box sx={{ p: 0.5, width: "45%" }}>
                        <Card variant="outlined" sx={{ p: 1 }}>
                            <CardContent >
                                <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black", textAlign: "center" }}>
                                    {currentRecipe.name} (Shared by: {currentRecipe.author})
                                </Typography>
                            </CardContent>
                            <CardMedia
                                component="img"
                                image={currentRecipe.photo == "undefined" ? logoIHMcut : currentRecipe.photo}
                                height="350"
                                alt="green iguana"
                            />
                            <CardContent>
                                <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black" }}>
                                    Ingredients (specification):<Typography sx={{ fontFamily: 'Verdana', fontSize: 18, color: "#BA852D" }}> - {currentRecipe.ingredientsDescription}</Typography>
                                </Typography>
                                <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black" }}>
                                    Description:<Typography sx={{ fontFamily: 'Verdana', fontSize: 18, color: "#BA852D" }}> - {currentRecipe.description}</Typography>
                                </Typography>
                                <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black" }}>
                                    Category:<Typography sx={{ fontFamily: 'Verdana', fontSize: 18, color: "#BA852D" }}> - {currentRecipe.category}</Typography>
                                </Typography>
                                <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black" }}>
                                    Calories:<Typography sx={{ fontFamily: 'Verdana', fontSize: 18, color: "#BA852D" }}> - {currentRecipe.calories}</Typography>
                                </Typography>
                                <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black" }}>
                                    Difficulty (1-5):<Typography sx={{ fontFamily: 'Verdana', fontSize: 18, color: "#BA852D" }}> - {currentRecipe.difficulty}</Typography>
                                </Typography>
                                <Rating
                                    sx = {{"mt":2, "ml":"80%"}}
                                    size="large"
                                    name="simple-controlled"
                                    value={rating}
                                    readOnly={readOnly}
                                    precision={0.5}
                                    onChange={(event, newValue) => {
                                        setRate(true)
                                        setRating(newValue)
                                        setReadOnly(true)
                                    }}
                                />

                            </CardContent>
                        </Card>
                    </Box>
                </>
            }
        </Grid>
    )
}