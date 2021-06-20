import React from "react";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import EditIcon from "@material-ui/icons/Edit";
import Box from "@material-ui/core/Box";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import { ROUTES } from "common/constants/paths";
import NextLink from "next/link";

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  })
);

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

interface Item {
  id: string;
  title: string;
  content: string;
}

export interface TableProps {
  rows: Item[];
  onDeleteClick?: (itemId: string) => void;
  onEditClick?: (itemId: string) => void;
}

/**
 * @callback onDeleteClick
 * @param {string} itemId - identyfikator posta
 * @returns {void}
 */
/**
 * @callback onEditClick
 * @param {string} itemId - identyfikator posta
 * @returns {void}
 */
/**
 * @typedef {object} Item - interface pojedynczego itemu wyświetlanego w tabeli
 * @property {string} id - identyfikator danego elementu
 * @property {string} title - tytuł danego elementu
 * @property {string} content - skrócony opis danego elementu
 */
/**
 * Komponent zwracający tabelę
 * @param {Item[]}  rows - właściwość otrzymująca dane, na podstawie których zwraca zawartość
 * @param {onDeleteClick=}  onDeleteClick - funkcja uruchamiana przy kliknięciu na ikonę usunięcia - jeśli nie podano: nie pojawi się ikona
 * @param {onEditClick=}  onEditClick - funkcja uruchamiana przy kliknięciu na ikonę edycji - jeśli nie podano: nie pojawi się ikona
 * */
function CustomTable({ rows, onDeleteClick, onEditClick }: TableProps) {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="Punkty turystyczne">
        <TableHead>
          <TableRow>
            <TableCell>Tytuł</TableCell>
            <TableCell align="left">Skrócony opis</TableCell>
            <TableCell align="left">Akcje</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.title}
              </TableCell>
              <TableCell align="left">
                {row.content.length > 70
                  ? `${row.content.slice(0, 70)}...`
                  : row.content}
              </TableCell>

              <TableCell style={{ width: 160 }} align="right">
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  alignItems="center"
                >
                  <NextLink href={ROUTES.POST(row.id)}>
                    <IconButton component="a">
                      <VisibilityIcon />
                    </IconButton>
                  </NextLink>

                  {onEditClick && onDeleteClick && (
                    <>
                      <IconButton onClick={() => onEditClick(row.id)}>
                        <EditIcon />
                      </IconButton>

                      <IconButton onClick={() => onDeleteClick(row.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </>
                  )}
                </Box>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { "aria-label": "rows per page" },
                native: true,
              }}
              onChangePage={(_, newPage: number) => handleChangePage(newPage)}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
export default CustomTable;
