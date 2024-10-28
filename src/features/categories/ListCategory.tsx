import { Box, Button, Typography } from "@mui/material";
import { GridFilterModel } from "@mui/x-data-grid";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "./categorySlice";
import { CategoryTable } from "./components/CategoryTable";

export const CategoryList = () => {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [rowsPerPage] = useState([10, 20, 30]);

  const options = { perPage, page: page + 1, search };

  const { data, isFetching, error } = useGetCategoriesQuery(options);
  const [deleteCategory, deleteCategoryStatus] = useDeleteCategoryMutation();
  const { enqueueSnackbar } = useSnackbar();

  function handleOnPageChange(newPage: number) {
    setPage(newPage);
  }

  function handleOnPageSizeChange(newPerPage: number) {
    setPerPage(newPerPage);
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    if (filterModel.quickFilterValues?.length) {
      const search = filterModel.quickFilterValues.join("");
      setSearch(search);
    } else {
      setSearch("");
    }
  }

  async function handleDeleteCategory(id: string) {
    await deleteCategory({ id });
  }

  useEffect(() => {
    if (deleteCategoryStatus.isSuccess) {
      enqueueSnackbar("Category deleted successfully", { variant: "success" });
    }
    if (deleteCategoryStatus.error) {
      enqueueSnackbar("Category not deleted", { variant: "error" });
    }
  }, [deleteCategoryStatus, enqueueSnackbar]);

  if (error) {
    return <Typography>Error fetching categories</Typography>;
  }

  return (
    <Box maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          color="secondary"
          component={Link}
          style={{ marginBottom: "1rem" }}
          to="/categories/create"
          variant="contained"
        >
          New Category
        </Button>
      </Box>
      <CategoryTable
        data={data}
        isFetching={isFetching}
        page={page}
        perPage={perPage}
        rowsPerPage={rowsPerPage}
        handleDelete={handleDeleteCategory}
        handleOnPageChange={handleOnPageChange}
        handleOnPageSizeChange={handleOnPageSizeChange}
        handleFilterChange={handleFilterChange}
      />
    </Box>
  );
};
