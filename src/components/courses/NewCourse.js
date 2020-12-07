import React, {useState} from 'react'
import {create} from './api-course'
//import { Card, Button, Form,Container } from "react-bootstrap";
import {Card, Form, Input, Button} from 'semantic-ui-react'
import {Link, Redirect} from 'react-router-dom'
//import axios from 'axios'

export default function NewCourse(){

    const [values, setValues] = useState({
        name:'',
        department:'',
        intake:'',
        redirect:false,
        error:''
    })

    const handleChange = name => event=>{
        setValues({...values, [name]: event.target.value})
    }

    const clickSubmit = () =>{
        let courseData = new FormData()
        values.name && courseData.append('name',values.name)
        values.department && courseData.append('department',values.department)
        values.intake && courseData.append('intake',values.intake)

        /*
        axios.post('http://localhost:3001/api/courses/new',courseData)
        .then(res => {
            console.log(res.data);
        })*/

        
        create(courseData).then((data)=>{
            if(data.error){
                setValues({...values, error:data.error})
            } else{
                setValues({...values,redirect:true})
            }
        })
    }

    if(values.redirect){
        return (<Redirect to={'/courses/all'}/>)
    }

    return (
        <div>
            <Card centered>
                <Card.Content>
                    <Card.Header>Add New Course</Card.Header>
                    <Card.Meta>Details</Card.Meta>
                    <Form onSubmit={clickSubmit}>
                            <Form.Field id="form-input" 
                                control={Input} 
                                label="Name" 
                                placeholder="Name" 
                                type="text"
                                value={values.name} 
                                onChange={handleChange('name')}/>
                            <Form.Field id="form-input"
                                 control={Input}
                                 label="Department"
                                 placeholder="Dept"
                                 type="text"
                                 value={values.department}
                                 onChange={handleChange('department')}/>
                            <Form.Field id="form-input"
                               control={Input}
                               label={"Intake"}
                               type="number"
                               placeholder="54"
                               value={values.intake}
                               onChange={handleChange('intake')}/>
                        <Button primary>Add</Button>
                        <Link to={'/courses/all'}>
                            <Button secondary>Cancel</Button>
                        </Link>
                    </Form>
                </Card.Content>
            </Card>
        </div>
    )
}