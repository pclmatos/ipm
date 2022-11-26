import { Grid, Typography, Box, Card, CardContent, CardMedia } from "@mui/material"
import logoIHMcut from "../images/logoIHMcut.png"

export default function TopRated() {

    var topRatedRecipes = JSON.parse(localStorage.getItem('topRatedRecipes'));

    return (
        <Grid container>
            {topRatedRecipes.map((recipe) =>
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
                                alt="green iguana"
                            />
                            <CardContent >
                                <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black" }}>
                                    Ingredients (specification):<Typography sx={{ fontFamily: 'Verdana', fontSize: 18, color: "#BA852D" }}> - {recipe.ingredientsDescription}</Typography>
                                </Typography>
                                <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black" }}>
                                    Description:<Typography sx={{ fontFamily: 'Verdana', fontSize: 18, color: "#BA852D" }}> - {recipe.description}</Typography>
                                </Typography>
                                <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black" }}>
                                    Category:<Typography sx={{ fontFamily: 'Verdana', fontSize: 18, color: "#BA852D" }}> - {recipe.category}</Typography>
                                </Typography>
                                <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black" }}>
                                    Calories:<Typography sx={{ fontFamily: 'Verdana', fontSize: 18, color: "#BA852D" }}> - {recipe.calories}</Typography>
                                </Typography>
                                <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black" }}>
                                    Difficulty:<Typography sx={{ fontFamily: 'Verdana', fontSize: 18, color: "#BA852D" }}> - {recipe.difficulty}</Typography>
                                </Typography>
                                <Typography sx={{ fontFamily: 'Verdana', fontSize: 19, color: "black" }}>
                                    Rating:<Typography sx={{ fontFamily: 'Verdana', fontSize: 18, color: "#BA852D" }}> - {recipe.rating}</Typography>
                                </Typography>

                            </CardContent>
                        </Card>
                    </Box>
                </>

            )}
        </Grid>
    )
}