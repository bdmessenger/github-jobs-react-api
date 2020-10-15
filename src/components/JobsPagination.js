import React from 'react'
import { Pagination } from 'react-bootstrap'

const JobsPagination = ({page, setPage, hasNextPage}) => {
    const {Prev, Item, Ellipsis, Next} = Pagination
    const adjustPage = amount => ( setPage(prevPage => prevPage + amount) )

    return (
        <Pagination>
            {page !== 1 && <Prev onClick={() => adjustPage(-1)}/>}
            {page !== 1 && <Item onClick={() => setPage(1)}>1</Item>}
            {page > 2 && <Ellipsis/>}
            {page > 2 && <Item onClick={() => adjustPage(-1)}>{page - 1}</Item>}
            <Item active>{page}</Item>
            {hasNextPage && <Item onClick={() => adjustPage(1)}>{page + 1}</Item>}
            {hasNextPage && <Next onClick={() => adjustPage(1)}/>}
        </Pagination>
    )
}

export default JobsPagination