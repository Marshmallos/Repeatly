import { DataGrid, GridColDef } from "@mui/x-data-grid";

export interface Activity {
  id: string;
  name: string;
  notes: string;
  startDate: Date;
  endDate: Date;
  noDays: number;
}

export default function ActivityGrid({ rows }: { rows: Array<Activity> }) {
  const columns: GridColDef<(typeof rows)[number]>[] = [
    { field: "name", headerName: "Name", flex: 1 },
    { field: "startDate", headerName: "Start Date", flex: 2 },
    { field: "endDate", headerName: "End Date", flex: 3 },
    { field: "noDays", headerName: "Num of days", flex: 1 },
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
        checkboxSelection={false}
        disableRowSelectionOnClick
      />
    </div>
  );
}
