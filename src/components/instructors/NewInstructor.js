import React,{ useState } from "react";
import {create} from './api-instructor'

import { Card,Form,Input,Button } from "semantic-ui-react";
import {Link, Redirect} from 'react-router-dom'


export default function NewInstructor(){

    const [values, setValues] = useState({
        name:'',
        email:'',
        phoneno:'',
        department:'',
        password:'',
        redirect:false,
        error:''
    })

    const handleChange = name => event=>{
        setValues({...values, [name]:event.target.value})
    }


    const clickSubmit = () => {
        let instructorData = new FormData()
        values.name && instructorData.append('name',values.name)
        values.email && instructorData.append('email',values.email)
        values.phoneno && instructorData.append('phoneno',values.phoneno)
        values.department && instructorData.append('department',values.department)
        values.password && instructorData.append('password',values.password)

        create(instructorData).then((data)=>{
            if(data.error){
                setValues({...values, error:data.error})
            } else{
                setValues({...values, redirect:true})
            }
        })
    }


    if(values.redirect){
        return (<Redirect to={'/instructors/all'}/>)
    }


    return (
        <div>
            <Card centered>
                <Card.Content>
                    <Card.Header>Add New Instructor</Card.Header>
                    <Card.Meta>Details</Card.Meta>
                    <Form onSubmit={clickSubmit}>
                        <Form.Field id="form-input"
                            control={Input}
                            label="Name"
                            placeholder="Joe Doe"
                            type="text"
                            value={values.name}
                            onChange={handleChange('name')}/>

                        <Form.Field id="form-input"
                           control={Input}
                           label="Email Address"
                           placeholder="joe.doe@outlook.com"
                           type="email"
                           value={values.email}
                           onChange={handleChange('email')}/>
                        <Form.Field id="form-input"
                           control={Input}
                           label="Department"
                           placeholder="Finance"
                           type="text"
                           value={values.department}
                           onChange={handleChange('department')}/>
                        <Form.Field id="form-input"
                           control={Input}
                           label="Phone No"
                           placeholder="+254700000000"
                           type="tel"
                           value={values.phoneno}
                           onChange={handleChange('phoneno')}
                        />
                        <Form.Field id="form-input"
                           control={Input}
                           label="Password"
                           type="password"
                           placeholder="**********"
                           value={values.password}
                           onChange={handleChange('password')}/>

                        <Button primary>Add</Button>
                        <Link to={'/instructors/all'}>
                            <Button secondary>Cancel</Button>
                        </Link>
                    </Form>
                </Card.Content>
            </Card>
        </div>
    )
}
