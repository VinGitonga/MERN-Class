import React, {useState} from 'react';
import { Card,Button,Input,Form } from "semantic-ui-react";
import {update} from './api-course'
import {Link, Redirect} from 'react-router-dom'


export default function EditCourse({match}){
    const [course, setCourse] = useState({
        name:'',
        department:'',
        intake:''
    })

    const [values, setValues] = useState({
        redirect:false,
        error:''
    })

    const handleChange = name => event => {
        setCourse({...course, [name]:event.target.value})
    }

    const clickSubmit = () =>{
        let courseData = new FormData()
        course.name && courseData.append('name',course.name)
        course.department && courseData.append('department',course.department)
        course.intake && courseData.append('intake',course.intake)

        update({
            courseId:match.params.courseId
        },courseData).then((data)=>{
            if(data && data.error){
                console.log(data.error)
                setValues({...values, error:data.error})
            } else{
                setValues({...values, redirect:true})
            }
        })
    }

    if(values.redirect){
        return (<Redirect to='/courses/all'/>)
    }

    return (
        <div>
            <Card centered>
                <Card.Content>
                    <Card.Header>Modify Course</Card.Header>
                    <Card.Meta>Details</Card.Meta>
                    <Form onSubmit={clickSubmit}>
                            <Form.Field id="form-input" 
                                control={Input} 
                                label="Name" 
                                placeholder="Name" 
                                type="text"
                                value={course.name} 
                                onChange={handleChange('name')}/>
                            <Form.Field id="form-input"
                                 control={Input}
                                 label="Department"
                                 placeholder="Dept"
                                 type="text"
                                 value={course.department}
                                 onChange={handleChange('department')}/>
                            <Form.Field id="form-input"
                               control={Input}
                               label={"Intake"}
                               type="number"
                               placeholder="54"
                               value={course.intake}
                               onChange={handleChange('intake')}/>
                        <Button primary>Modify</Button>
                        <Link to={'/courses/all'}>
                            <Button secondary>Cancel</Button>
                        </Link>
                    </Form>
                </Card.Content>
            </Card>
        </div>
    )
}