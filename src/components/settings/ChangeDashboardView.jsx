import {Divider, FormControl, Grid, InputLabel, MenuItem, Select} from "@mui/material";
import {useEffect, useState} from "react";
import {useUserStore} from "../../stores/UserStore";
import {useChangeUser} from "../../hooks/useChangeUser";

export const ChangeDashboardView = () => {
    const [dashboardItem, setDashboardItem] = useState("");
    const [open, setOpen] = useState(false);
    const {settings, isLoadingSettings} = useUserStore();

    const {changeDashboardView} = useChangeUser();

    useEffect(() => {
        setDashboardItem(settings["dashboardTwo"]);
    }, [settings["dashboardTwo"], isLoadingSettings])

    const handleChange = async (event) => {
        if (event.target.value !== dashboardItem) {
            await changeDashboardView(event.target.value);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <Grid container rowSpacing={1}>
                <Grid item xs={12} style={{
                    display: "flex",
                    justifyContent: "flex-start",
                }}>
                    <div className="infoText rowHeading">
                        Dashboard View
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <Divider/>
                </Grid>
                <Grid container item xs={12}
                      rowSpacing={1}
                      className="infoContainer"
                >
                    <Grid container item xs={12} rowSpacing={1.25} alignItems="left">
                        <Grid item xs={12}>
                            <FormControl sx={{width: "100%" }}>
                                <InputLabel id="demo-controlled-open-select-label">Item</InputLabel>
                                <Select
                                    labelId="demo-controlled-open-select-label"
                                    id="demo-controlled-open-select"
                                    open={open}
                                    onClose={handleClose}
                                    onOpen={handleOpen}
                                    value={dashboardItem}
                                    label="Item"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={"today"}>Today</MenuItem>
                                    <MenuItem value={"tomorrow"}>Tomorrow</MenuItem>
                                    <MenuItem value={"due"}>Due</MenuItem>
                                    <MenuItem value={"saved"}>Saved</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}