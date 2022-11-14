import { useState } from "react"
import { Box, Grid, Tabs, Tab, Typography } from "@mui/material";
import logoIHMcut from "../images/logoIHMcut.png"

export default function Navbar() {
    const [selectedLeftTab, setSelectedLeftTab] = useState(0);

    const handleChangeLeft = (event, newValue) => {
        setSelectedLeftTab(newValue);
    };

    return (
        <Grid item xs={12} container bgcolor="#FFC86E">

            <Grid item xs={5} container alignItems="flex-end" >
                <Tabs textColor='inherit'
                    TabIndicatorProps={{ sx: { background: "black" } }}
                    value={selectedLeftTab}
                    onChange={handleChangeLeft}
                    variant="scrollable"
                    scrollButtons
                >
                    <Tab sx={{ bgcolor: "whitesmoke", fontFamily: 'Verdana' }} label="Despensa" />
                    <Tab sx={{ bgcolor: "whitesmoke", fontFamily: 'Verdana' }} label="Receitas" />
                    <Tab sx={{ bgcolor: "whitesmoke", fontFamily: 'Verdana' }} label="Ingredientes" />
                    <Tab sx={{ bgcolor: "whitesmoke", fontFamily: 'Verdana' }} label="Top Rated" />
                    <Tab sx={{ bgcolor: "whitesmoke", fontFamily: 'Verdana' }} label="Sobre Nós" />

                </Tabs>
            </Grid>
            <Grid item xs={2} container alignItems="center" justifyContent="center">
                <Typography sx={{ fontFamily: 'Verdana', fontSize: 26, color: "black" }}>Interactive Home Meals</Typography>
            </Grid>
            <Grid item xs={5}>
                <Box component="img" src={logoIHMcut} width="15%" sx={{ ml: "auto", display: "flex" }} />
            </Grid>
        </Grid>
    )
}