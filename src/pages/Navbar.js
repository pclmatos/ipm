import { useState } from "react"
import { Box, Grid, Tabs, Tab, Typography } from "@mui/material";
import logoIHMcut from "../images/logoIHMcut.png"
import SearchRecipesPage from "./SearchRecipes";
import ShareRecipe from "./ShareRecipe";
import ConsultPantry from "./ConsultPantry";
import TopRated from "./TopRated";

export default function Navbar() {
    const [selectedLeftTab, setSelectedLeftTab] = useState(0);

    const handleChangeLeft = (event, newValue) => {
        setSelectedLeftTab(newValue);
    };

    return (
        <>
            <Grid item xs={12} container bgcolor="#FFC86E">
                <Grid item xs={5} container alignItems="flex-end" >
                    <Tabs textColor='inherit'
                        TabIndicatorProps={{ sx: { background: "black" } }}
                        value={selectedLeftTab}
                        onChange={handleChangeLeft}
                        variant="scrollable"
                        scrollButtons
                    >
                        <Tab sx={{ bgcolor: "whitesmoke", fontFamily: 'Verdana', fontSize: 10.5 }} label="Search Recipes" />
                        <Tab sx={{ bgcolor: "whitesmoke", fontFamily: 'Verdana', fontSize: 10.5 }} label="Share Recipes" />
                        <Tab sx={{ bgcolor: "whitesmoke", fontFamily: 'Verdana', fontSize: 10.5 }} label="Pantry" />
                        <Tab sx={{ bgcolor: "whitesmoke", fontFamily: 'Verdana', fontSize: 10.5 }} label="Top Rated" />

                    </Tabs>
                </Grid>
                <Grid item xs={2} container alignItems="center" justifyContent="center">
                    <Typography sx={{ fontFamily: 'Verdana', fontSize: 26, color: "black" }}>Interactive Home Meals</Typography>
                </Grid>
                <Grid item xs={5}>
                    <Box component="img" src={logoIHMcut} width="15%" sx={{ ml: "auto", display: "flex" }} />
                </Grid>
            </Grid>
            {selectedLeftTab == 0 && <SearchRecipesPage/>}
            {selectedLeftTab == 1 && <ShareRecipe/> }
            {selectedLeftTab == 2 && <ConsultPantry/>}
            {selectedLeftTab == 3 && <TopRated/>}
        </>
    )
}