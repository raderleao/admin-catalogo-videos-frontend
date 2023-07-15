import { Box, Paper,Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Category, selectCategoryById, updateCategory } from "./CategorySlice";
import { CategoryFrom } from "./components/CategoryFrom";

export const CategoryEdit = () => {
  const id = useParams().id || "";
  const [isdisabled, setIsdisabled] = useState(false);
  const category = useAppSelector((state) => selectCategoryById(state, id));
  const [categoryState, setCategoryState] = useState<Category>(category);
  const dispatch = useAppDispatch()
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubimit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(updateCategory(categoryState));
    enqueueSnackbar("Success updating category!", { variant: "success" });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCategoryState({ ...categoryState, [name]: value });
  };
  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setCategoryState({ ...categoryState, [name]: checked });
  };

  return (
    <Box>
      <Paper>
        <Box p={2}>
          <Box mb={2}>
            <Typography variant="h4">Edit Category</Typography>
          </Box>
        </Box>

        <CategoryFrom
          category={categoryState}
          isdisabled={isdisabled}
          isLoading={false}
          handleSubmit={handleSubimit}
          handleChange={handleChange}
          handleToggle={handleToggle}
        />
      </Paper>
    </Box>
  );
};