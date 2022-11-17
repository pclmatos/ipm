import { Box, Grid, TextField, Typography, InputLabel, MenuItem, FormControl, Select } from "@mui/material";
import { useState } from "react"
import restCalls from "../restCalls"
import "./style.css"

export default function ShareRecipe() {

    const [author, setAuthor] = useState("");
    const [recipeName, setRecipeName] = useState("");
    const [category, setCategory] = useState("");
    const [calories, setCalories] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [description, setDescription] = useState("");

    function authorHandler(e) {
        setAuthor(e.target.value);
    }

    function recipeNameHandler(e) {
        setRecipeName(e.target.value);
    }

    function categoryHandler(e) {
        setCategory(e.target.value);
    }

    function caloriesHandler(e) {
        setCalories(e.target.value);
    }

    function difficultyHandler(e) {
        setDifficulty(e.target.value);
    }

    function ingredientsHandler(e) {
        setIngredients(e.target.value);
    }

    function descriptionHandler(e) {
        setDescription(e.target.value);
    }

    function shareRecipeManager(e) {
        e.preventDefault();
        restCalls.shareRecipe(author, recipeName, description, ingredients, difficulty, category, calories)
    }

    return (
        <Grid item xs={12} container className="container2">
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
                        sx={{ width: "70%", mt: "15%" }}
                        onChange={recipeNameHandler} />
                    {/*
                    <TextField
                        margin="normal"
                        required
                        label="Category"
                        color="grey"
                        InputLabelProps={{
                            style: { fontFamily: 'Verdana', fontSize: 18 },
                        }}
                        sx={{ width: "70%" }}
                        onChange={categoryHandler} />
                    */}
                    <FormControl required margin="normal" sx={{ width: "70%" }}>
                        <InputLabel id="demo-simple-select-label" color="grey" sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Category</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={category}
                            label="Age"
                            color="grey"
                            onChange={categoryHandler}
                        >
                            <MenuItem value="" label="">Breakfast</MenuItem>
                            <MenuItem value="" label="">Lunch</MenuItem>
                            <MenuItem value="" label="">Dinner</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        margin="normal"
                        required
                        label="Calories"
                        color="grey"
                        InputLabelProps={{
                            style: { fontFamily: 'Verdana', fontSize: 18 },
                        }}
                        sx={{ width: "70%" }}
                        onChange={caloriesHandler} />
                    {/*
                    <TextField
                        margin="normal"
                        required
                        label="Execution Difficulty (0-5)"
                        color="grey"
                        InputLabelProps={{
                            style: { fontFamily: 'Verdana', fontSize: 18 },
                        }}
                        sx={{ width: "70%" }}
                        onChange={difficultyHandler} />
                    */}
                    <FormControl required margin="normal" sx={{ width: "70%" }}>
                        <InputLabel id="demo-simple-select-label" color="grey" sx={{ fontFamily: 'Verdana', fontSize: 18 }}>Execution Difficulty (0-5)</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={difficulty}
                            label="Age"
                            color="grey"
                            onChange={difficultyHandler}
                        >
                            <MenuItem value="" label="">1</MenuItem>
                            <MenuItem value="" label="">2</MenuItem>
                            <MenuItem value="" label="">3</MenuItem>
                            <MenuItem value="" label="">4</MenuItem>
                            <MenuItem value="" label="">5</MenuItem>
                        </Select>
                    </FormControl>
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
                        rows={11}
                        onChange={descriptionHandler} />
                </Box>
            </Grid>
        </Grid>
    )
}