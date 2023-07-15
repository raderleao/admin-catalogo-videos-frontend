import React from "react";
import { 
    Box, 
    Button, 
    Grid, 
    FormControl, 
    TextField, 
    FormControlLabel,
    Switch, 
    FormGroup
  } from "@mui/material";
  import { Link, useParams } from "react-router-dom";
  import { Category } from "../CategorySlice";

  type Props = {
    category: Category;
    isdisabled?: boolean;
    isLoading?: boolean;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleToggle: (e: React.ChangeEvent<HTMLInputElement>) => void;

  };
  
export function CategoryFrom({
    category,
    isdisabled = false,
    isLoading = false,
    handleSubmit,
    handleChange,
    handleToggle,
}:Props) {

  return (
    <Box p={2}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      name="name"
                      label="Name"
                      value={category.name}
                      disabled={isdisabled}
                      onChange={handleChange}
                    />  
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      required
                      name="description"
                      label="Description"
                      disabled={isdisabled}
                      value={category.description}
                      onChange={handleChange}
                    />  
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          name="is_active"
                          color="secondary"
                          onChange={handleToggle}
                          checked={ category.is_active}
                          inputProps={{ "aria-label": "controlled"}}
                        />
                      }
                      label="Active"
                    />
                  </FormGroup>
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" gap={2}>
                    <Button variant="contained" component={Link} to="/categories">
                      Back
                    </Button>

                    <Button 
                      type="submit"
                      variant="contained"
                      color="secondary"
                      disabled={isdisabled}
                    >
                    Save
                    </Button>

                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
  )
}
