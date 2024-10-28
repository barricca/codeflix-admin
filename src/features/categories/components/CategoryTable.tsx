import { GridFilterModel } from "@mui/x-data-grid";
import { Results } from "../../../types/Category";

type Props = {
  data: Results | undefined;
  perPage: number;
  isFetching: boolean;
  rowsPerPage?: number;

  handleOnPageChange: (page: number) => void;
  handleFilterChange: (filterModel: GridFilterModel) => void;
  handleOnPageSizeChange: (pageSize: number) => void;
  handleDelete: (id: string) => void;
};

export function CategoryTable({
  data,
  perPage,
  isFetching,
  rowsPerPage = 5,
  handleOnPageChange,
  handleFilterChange,
  handleOnPageSizeChange,
  handleDelete,
}: Props) {}
