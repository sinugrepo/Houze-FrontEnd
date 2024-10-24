import React, { useState, useEffect } from "react";
import axios from "axios";
import { useTable, useSortBy, useFilters, usePagination } from "react-table";


const CatalogTable = () => {
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCatalogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/catalogs",
          { withCredentials: true }
        );
        setCatalogs(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchCatalogs();
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Catalog Name",
        accessor: "catalog_name",
      },
      {
        Header: "Catalog Type",
        accessor: "catalog_type",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Description",
        accessor: "description",
      },
      {
        Header: "Actions",
        accessor: "actions", // Ubah id kolom menjadi "actions"
        Cell: ({ value }) => (
          <div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-2">
              Edit
            </button>
            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded">
              Delete
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    // nextPage,
    // previousPage,
    // canNextPage,
    // canPreviousPage,
    // pageOptions,
    state,
    // gotoPage,
    // pageSize,
    // setPageSize,
    prepareRow,
  } = useTable(
    {
      columns,
      data: catalogs,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

//   const { pageIndex, pageSize: selectedPageSize } = state;

  return (
    <>
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      {loading ? (
        <p className="text-lg text-gray-600">Loading...</p>
      ) : (
          <table
            {...getTableProps()}
            className="table-auto w-full border-collapse border border-gray-300"
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  key={headerGroup.id}
                  className="bg-gray-100"
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={column.id}
                      className="px-4 py-2 text-left text-xs leading-5 font-medium text-gray-600 uppercase cursor-pointer"
                    >
                      {column.render("Header")}
                      <span>
                        {column.isSorted
                          ? column.isSortedDesc
                            ? " 🔽"
                            : " 🔼"
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    key={row.id}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        key={cell.column.id}
                        className="px-4 py-2 text-sm leading-5 text-gray-600"
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
      )}
    </div>
    </>
  );
};

export default CatalogTable;


