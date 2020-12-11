import React from "react";
import {Link} from 'react-router-dom'
import {list} from './api-instructor'
import {Card, Button,Table, Container, Icon} from 'semantic-ui-react'
//import {Table} from 'reactstrap'


const AllInstructors = () =>{

    const [tutors, setTutors] = React.useState([]);

    React.useEffect(()=>{
      const abortController = new AbortController()
      const signal = abortController.signal
      list(signal).then((data)=>{
        if(data.error){
          console.log('No data')
        }
        setTutors(data)
      });
      return function cleanIt(){
        abortController.abort()
      }
    }, []);
    

    return(
          <Container textAlign="justified">
              <Card fluid>
                  <Card.Content>
                      <Card.Header>All Instructors</Card.Header>
                      <Card.Meta>Instructor's List 2020</Card.Meta>
                      <br/>
                      <br/>
                      <Table singleLine>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Name</Table.HeaderCell>
                            <Table.HeaderCell>Department</Table.HeaderCell>
                            <Table.HeaderCell>Email</Table.HeaderCell>
                            <Table.HeaderCell>Phone No</Table.HeaderCell>
                            <Table.HeaderCell>Action</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {tutors.map(function(tut,i){
                            return (
                              <Table.Row>
                                <Table.Cell>{tut.name}</Table.Cell>
                                <Table.Cell>{tut.department}</Table.Cell>
                                <Table.Cell>{tut.email}</Table.Cell>
                                <Table.Cell>{tut.phoneno}</Table.Cell>
                                <Table.Cell>
                                  <Link to={"/instructors/edit/"+tut._id}>
                                    <Button icon>
                                      <Icon name="pencil"/>
                                    </Button>
                                  </Link>
                                  <Link to={"/instructors/delete/"+tut._id}>
                                    <Button icon>
                                      <Icon name="trash alternate outline"/>
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

export default AllInstructors
