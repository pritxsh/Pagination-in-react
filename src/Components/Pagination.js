import { useEffect, useState } from "react";
import axios from "axios";
import "../Components/Pagination.css";
const Pagination = () => {
  const [tabledata, setTabledata] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const indexOfLastItem = currentPage * rowsPerPage;
  const indexOfFirstItem = indexOfLastItem - rowsPerPage;
  const currentItems = tabledata?.users?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  console.log(currentItems);
  const totalPages = Math.ceil(tabledata?.total / rowsPerPage);
  useEffect(() => {
    axios.get("https://dummyjson.com/users?limit=0").then((response) => {
      // console.log(response);
      setTabledata(response?.data);
    });
  }, []);
  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>E-mail </th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((value, index) => {
            return (
              <tr key={index}>
                <td>{`${value.firstName + " " + value.lastName}`}</td>
                <td>{value.email}</td>
                <td>{value.gender}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="pagination">
        <button>Prev</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button>{index + 1}</button>
        ))}
        <button>Next</button>
      </div>
    </>
  );
};

export default Pagination;
