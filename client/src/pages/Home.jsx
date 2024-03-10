import React, { useEffect, useState } from 'react'
import { useAddTransactionMutation, useDeleteTransactionMutation, useGetTransactionMutation, useLazySummaryTransactionQuery } from '../redux/transactionApi'
import { toast } from 'react-toastify'

const Home = () => {

    const [getTransaction, { data }] = useGetTransactionMutation()

    const [addTransaction, { isSuccess }] = useAddTransactionMutation()

    const [deleteTransaction, { isSuccess: deleteSuccess }] = useDeleteTransactionMutation()

    const [getSummary, { data: summaryData }] = useLazySummaryTransactionQuery()

    const dateString = summaryData && summaryData.date;
    const dateObject = dateString ? new Date(dateString) : null;

    const formatDate = dateObject ? dateObject.toLocaleDateString() : 'Invalid Date';

    const [selectedDate, setSelectedDate] = useState({})

    const [inpData, setInpData] = useState({})

    const handleDateChange = e => {

        const { name, value } = e.target
        setSelectedDate({ ...selectedDate, [name]: value })

    }


    const handleChange = e => {
        const { name, value } = e.target;

        setInpData({ ...inpData, [name]: value });
    };



    const handleViewTransaction = () => {
        const { startDate, lastDate } = selectedDate;

        if (!startDate || !lastDate || startDate > lastDate) {
            console.error('Invalid date range');
            return;
        }

        getTransaction(selectedDate);
    };


    useEffect(() => {
        if (isSuccess) {
            toast.success("Transaction Added Successfully")
        }
    }, [isSuccess])


    useEffect(() => {
        if (deleteSuccess) {
            toast.error("Transaction Deleted Successfully")
        }
    }, [deleteSuccess])



    const getCurrentDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        let month = today.getMonth() + 1;
        let day = today.getDate();

        month = month < 10 ? `0${month}` : month;
        day = day < 10 ? `0${day}` : day;

        return `${year}-${month}-${day}`;
    };



    return <>
        <div className="container">
            <div className='text-end'>
                <button
                    data-bs-toggle="modal"
                    data-bs-target="#add"
                    type="button"
                    class="btn btn-primary my-5 fw-semibold">
                    Add Transaction
                </button>
            </div>
        </div>

        {/* Add Modal */}

        <div class="modal fade" id="add" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Add Transaction</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <input
                            onChange={handleChange}
                            name='amount'
                            type="number"
                            class="form-control my-2"
                            placeholder="Enter Amount"
                        />

                        <div className="form-check">
                            <input
                                onChange={handleChange}
                                name='type'
                                className="form-check-input"
                                type="radio"
                                value="income"
                                id="income"
                            />
                            <label className="form-check-label" htmlFor="income">
                                Income
                            </label>
                        </div>

                        <div className="form-check">
                            <input
                                onChange={handleChange}
                                name='type'
                                className="form-check-input"
                                type="radio"
                                value="expense"
                                id="expense"
                            />
                            <label className="form-check-label" htmlFor="expense">
                                Expense
                            </label>
                        </div>


                        <input
                            onChange={handleChange}
                            name='category'
                            type="text"
                            class="form-control my-2"
                            placeholder="Enter category"
                        />


                        <input
                            onChange={handleChange}
                            name='date'
                            type="date"
                            className="form-control my-2"
                            max={getCurrentDate()}
                        />



                        <input
                            onChange={handleChange}
                            name='description'
                            type="text"
                            class="form-control my-2"
                            placeholder='Enter Description (optional)'
                        />

                    </div>
                    <div class="modal-footer">
                        <button
                            onClick={e => addTransaction(inpData)}
                            type="button"
                            class="btn btn-primary"
                            data-bs-dismiss="modal">
                            Add Transaction
                        </button>
                    </div>
                </div>
            </div>
        </div>

        {/* Add Modal */}


        {/* Summary */}

        <div className="modal fade" id="edit" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header bg-primary text-white">
                        <h5 className="modal-title" id="exampleModalLabel">Transaction Summary</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="card">
                            <div className="card-body">
                                <h6 className="card-title">Transaction Id: <span>{summaryData && summaryData._id}</span></h6>
                                <h6 className="card-subtitle mb-2 text-muted">Transaction Date: <span>{formatDate}</span></h6>
                                <h6 className="card-subtitle mb-2 text-muted">Amount: <span>{summaryData && summaryData.amount}</span></h6>
                                <h6 className="card-subtitle mb-2 text-muted">Transaction Type: <span>{summaryData && summaryData.type}</span></h6>
                                <h6 className="card-subtitle mb-2 text-muted">Category: <span>{summaryData && summaryData.category}</span></h6>
                                {summaryData && summaryData.description && (
                                    <h6 className="card-subtitle mb-2 text-muted">Description: <span>{summaryData && summaryData.description}</span></h6>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>


        {/* Summary */}

        {/* Filter By Date */}

        <div className='d-flex w-100 justify-content-center align-items-end gap-5'>
            <div>
                <label htmlFor="formDate" className="form-label">From Date</label>
                <input onChange={handleDateChange} name='startDate' type="date" className="form-control" id="formDate" />
            </div>

            <div>
                <label htmlFor="toDate" className="form-label">To Date</label>
                <input onChange={handleDateChange} name='lastDate' type="date" className="form-control" id="toDate" min={selectedDate.startDate} />
            </div>

            <div>
                <button onClick={handleViewTransaction} type="button" className="btn btn-primary">View Transaction</button>
            </div>
        </div>


        {/* Filter By Date */}


        {/* Main Data */}

        {
            data
                ? <>
                    <div className="container mt-4">
                        <table className='table table-bordered table-striped text-center'>
                            <thead>
                                <tr>
                                    <th>Sr.No</th>
                                    <th>Amount</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((item, i) => <tr key={item._id}>
                                        <td>{i + 1}</td>
                                        <td>{item.amount} ₹</td>
                                        <td>{item.type}</td>
                                        <td className='d-flex justify-content-around gap-2 '>
                                            <button
                                                onClick={e => getSummary(item._id)}
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit"
                                                type="button"
                                                class="btn btn-warning fw-semibold text-white  w-100">
                                                Summary
                                            </button>
                                            <button onClick={e => deleteTransaction(item._id)} type="button" class="btn btn-danger  fw-semibold w-100">Delete</button>
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>

                    </div>
                </>
                : <>
                    <div className='text-center my-5'>
                        <h1>No Transacation Found</h1>
                        <p className='text-danger fs-6 fw-medium-'>Note: Please select a date</p>
                    </div>
                </>
        }


        {/* Main Data */}

    </>
}

export default Home