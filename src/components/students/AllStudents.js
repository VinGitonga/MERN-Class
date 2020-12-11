import React from 'react'
import {Link} from 'react-router-dom'
import {list} from './api-student'
import {Card,Container,Button,Table,Icon} from 'semantic-ui-react'


export default function AllStudents(){
    const [students, setStudents] = React.useState([]);

    //load the student from database
    React.useEffect(()=>{
        const abortController = new AbortController()
        const signal = abortController.signal
        list(signal).then((data)=>{
            if(data.error){
                console.log('No Stud data')
            }
            setStudents(data)
        });
        return function cleanIt(){
            abortController.abort()
        }
    }, []);


    //render the student data

    return (
        <>
           <Container textAlign="justified">
               <Card fluid>
                   <Card.Content>
                       <Card.Header>All Students</Card.Header>
                       <Card.Meta>Students' List 2020</Card.Meta>
                       <br/>
                       <br/>
                       <Table singleLine>
                           <Table.Header>
                               <Table.Row>
                                   <Table.HeaderCell>Name</Table.HeaderCell>
                                   <Table.HeaderCell>Gender</Table.HeaderCell>
                                   <Table.HeaderCell>Email</Table.HeaderCell>
                                   <Table.HeaderCell>Course</Table.HeaderCell>
                                   <Table.HeaderCell>Instructor</Table.HeaderCell>
                                   <Table.HeaderCell>Action</Table.HeaderCell>
                               </Table.Row>
                           </Table.Header>
                           <Table.Body>
                               {students.map(function(stud,i){
                                   return (
                                       <Table.Row>
                                           <Table.Cell>{stud.name}</Table.Cell>
                                           <Table.Cell>{stud.gender}</Table.Cell>
                                           <Table.Cell>{stud.email}</Table.Cell>
                                           <Table.Cell>{stud.course}</Table.Cell>
                                           <Table.Cell>{stud.instructor}</Table.Cell>
                                           <Table.Cell>
                                               <Link to={"/students/edit/"+stud._id}>
                                                   <Button icon>
                                                       <Icon name="pencil"/>
                                                   </Button>
                                               </Link>
                                               <Link to={"/students/delete/"+stud._id}>
                                                   <Button icon>
                                                       <Icon name="pencil"/>
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
        </>
    )
}