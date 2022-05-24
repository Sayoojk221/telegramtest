import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";



import { getTransactions } from "../store/selectors";
import { convertData } from "../utils/func_";



function Summary() {
  const {address,list} = useSelector(getTransactions);  
  const [transactions,setTransaction] = useState()

  useEffect(() => {
    if (list.length > 0) {
      convertData(list,address,setTransaction)
    }
  }, [list]);

  return (
    <div className="col-md-7 ">
      <div className="card">
        <div className="card-header">Transation summary</div>
        <div className="card-body">
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Amount</th>
                <th scope="col">Time</th>
                <th scope="col">Type</th>
              </tr>
            </thead>
            <tbody>
              {transactions?.map((trans, key) => (
                <tr key={key}>
                  <th scope="row">{key + 1}</th>
                  <td>{trans.amount}</td>
                  <td>{trans.date}</td>
                  <td>{trans.mode}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Summary;
