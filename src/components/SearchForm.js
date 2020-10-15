import React from 'react'
import { Form, Col } from 'react-bootstrap'

const SearchForm = ({params, onParamChange}) => {
    const { Row, Group, Label, Check, Control} = Form;

    return(
        <Form className="mb-4">
            <Row className="align-items-end">
                <Group as={Col}>
                    <Label>Description</Label>
                    <Control 
                        onChange={onParamChange}
                        value={params.description}
                        name="description"
                        type="text"
                    />
                </Group>
                <Group as={Col}>
                    <Label>Location</Label>
                    <Control 
                        onChange={onParamChange}
                        value={params.location}
                        name="location"
                        type="text"
                    />
                </Group>
                <Group as={Col} xs={12} md="auto" className="ml-md-2">
                    <Check 
                        onChange={onParamChange}
                        checked={params.full_time}
                        value={params.full_time}
                        name="full_time"
                        id="full-time"
                        label="Only Full Time"
                        type="checkbox"
                        className="mb-md-2"
                    />
                </Group>
            </Row>
        </Form>
    )
}

export default SearchForm