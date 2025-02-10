import { DataGrid, GridColDef } from "@mui/x-data-grid";

export interface Cycle {
  id: string;
  name: string;
  notes: string;
  startDate: Date;
}

export default function CycleGrid({ rows }: { rows: Array<Cycle> }) {
  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "notes", headerName: "Notes", flex: 1 },
    { field: "startDate", headerName: "Creation Date", flex: 3 },
  ];
  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </div>
  );
}
