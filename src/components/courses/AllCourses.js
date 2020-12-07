import React, {useEffect,useState} from 'react'
//import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {list} from './api-course'
import {Card,Table,Button,Container,Icon} from 'semantic-ui-react'


export default function AllCourses(){


    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        list(signal).then((data)=>{
            if(data.error){
                console.log('No data')
            } else{
                setCourses(data)
            }
        })
        return function cleanUp(){
            abortController.abort()
        }
    }, [])

    
    return(
        <Container textAlign="justified">
            <Card fluid>
                <Card.Content>
                    <Card.Header>All Course</Card.Header>
                    <Card.Meta>New Course 2020</Card.Meta>
                    <br/>
                    <br/>
                    <Table singleline>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Name</Table.HeaderCell>
                                <Table.HeaderCell>Department</Table.HeaderCell>
                                <Table.HeaderCell>Intake</Table.HeaderCell>
                                <Table.HeaderCell>Created</Table.HeaderCell>
                                <Table.HeaderCell>Action</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {courses.map((course,i)=>{
                                return (
                                    <Table.Row>
                                        <Table.Cell>{course.name}</Table.Cell>
                                        <Table.Cell>{course.department}</Table.Cell>
                                        <Table.Cell>{course.intake}</Table.Cell>
                                        <Table.Cell>{course.created}</Table.Cell>
                                        <Table.Cell key={i}>
                                            <Link to={'/courses/edit/'+course._id}>
                                                <Button icon>
                                                    <Icon name="pencil" />
                                                </Button>
                                            </Link>
                                            <Link to={'/courses/delete/'+course._id}>
                                                <Button icon>
                                                    <Icon name="trash"/>
                                                </Button>
                                            </Link>
                                        </Table.Cell>
                                    </Table.Row>
                                )
                            })}
                        </Table.Body>
                    </Table>
                </Card.Content>
            </Card>
        </Container>
    )
}
