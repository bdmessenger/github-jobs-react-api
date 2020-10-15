import React from 'react'
import Job from './Job'

const JobsList = ({loading, jobs, error}) => (
    <div>
        {
            (!loading && !error) && (
                jobs.length > 0 ?
                jobs.map(job => <Job key={job.id} job={job} />) :
                <h2 className="my-4">No Jobs Available</h2>
            )
        }
    </div>
)

export default JobsList