import { GridFilterModel } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useGetCastMembersQuery } from "./castMembersSlice";
import { Typography } from "@mui/material";

export const ListCastMembers = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [rowsPerPage] = useState([10, 25, 50, 100]);
  const options = { page, perPage, search };

  const { data, isFetching, error } = useGetCastMembersQuery(options);

  function handleOnPageChange(newPage: number) {
    setPage(newPage + 1);
  }

  function handleOnPageSizeChange(perPage: number) {
    setPerPage(perPage);
  }

  function handleFilterChange(filterModel: GridFilterModel) {
    if (!filterModel.quickFilterValues?.length) {
      return setSearch("");
    }
    const search = filterModel.quickFilterValues.join("");
    setSearch(search);
  }

  useEffect(() => {
    if (error) {
      console.error("Error fetching cast members:", error);
    }
  }, [error]);

  if (error) {
    return <Typography variant="h2">Erro</Typography>
  }

  return <div>ListCastMembers</div>
}