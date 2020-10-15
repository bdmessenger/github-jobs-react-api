import React, {useState} from 'react'
import {Card, Badge, Button, Collapse} from 'react-bootstrap'
import ReactMarkdown from 'react-markdown'

const Job = ({ job }) => {
    const { Body, Title, Subtitle, Text} = Card
    const [open, setOpen] = useState(false)

    return (
        <Card className="mb-3">
            <Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <Title>
                            {job.title} - 
                            <span className="text-muted font-weight-light">{job.company}</span>
                        </Title>
                        <Subtitle className="text-muted mb-2">
                            { new Date(job.created_at).toLocaleDateString() }
                        </Subtitle>
                        <Badge variant="secondary" className="mr-2">{job.type}</Badge>
                        <Badge variant="secondary">{job.location}</Badge>
                        <div style={{ wordBreak: 'break-all' }}>
                            <ReactMarkdown source={job.how_to_apply} />
                        </div>
                    </div>
                    <img 
                        className="d-none d-md-block" 
                        height={50}
                        alt={job.company}
                        src={job.company_logo}
                    />
                </div>
                <Text>
                    <Button
                        onClick={() => setOpen(state => !state)}
                        variant="primary"
                    >
                        {open ? 'Hide Details' : 'View Details'}
                    </Button>
                </Text>
                <Collapse in={open}>
                    <div className="mt-4">
                        <ReactMarkdown source={job.description} />
                    </div>
                </Collapse>
            </Body>
        </Card>
    )
}

export default Job