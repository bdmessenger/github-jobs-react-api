import React, { useState } from 'react';
import { Container } from 'react-bootstrap'
import useFetchJobs from './useFetchJobs'

import SearchForm from './components/SearchForm'
import JobsList from './components/JobsList'
import JobsPagination from './components/JobsPagination'

function App() {
  const [params, setParams] = useState({
    description: '',
    location: '',
    full_time: false
  })
  const [page, setPage] = useState(1)
  const { jobs, loading, error, hasNextPage } = useFetchJobs(params, page)

  const handleParamChange = e => {
    const param = e.target.name
    const value = param === "full_time" ? e.target.checked : e.target.value
    setPage(1)
    setParams(previousParams => {
      return {...previousParams, [param]: value}
    })
  }

  return (
    <Container className="my-4">
      <h1 className="mb-4">GitHub Jobs</h1>
      <SearchForm params={params} onParamChange={handleParamChange}/>
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
      {loading && <h2 className="my-4">Loading...</h2>}
      {error && <h2 className="my-4">Error. Try Refreshing The Page.</h2>}
      <JobsList loading={loading} jobs={jobs} error={error}/>
      <JobsPagination page={page} setPage={setPage} hasNextPage={hasNextPage} />
    </Container>
  );
}

export default App;
