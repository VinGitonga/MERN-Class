import React, {useState} from 'react'
import {Card,Button,Form,Input} from 'semantic-ui-react'
import {update} from './api-instructor'
import {Link, Redirect} from 'react-router-dom'


export default function EditInstructor({match}){
    const [instructor, setInstructor] = useState({
        name:'',
        email:'',
        department:'',
        phoneno:'',
        password:''
    })

    const [values, setValues] = useState({
        redirect:false,
        error:''
    })

    const handleChange = name => event => {
        setInstructor({...instructor, [name]:event.target.value})
    }

    const clickSubmit = () => {
        let instructorData = new FormData()
        instructor.name && instructorData.append('name',instructor.name)
        instructor.email && instructorData.append('email',instructor.email)
        instructor.department && instructorData.append('department',instructor.department)
        instructor.phoneno && instructorData.append('phoneno',instructor.phoneno)
        instructor.password && instructorData.append('password', instructor.password)

        update({
            instructorId:match.params.instructorId
        },instructorData).then((data)=>{
            if(data.error){
                setValues({...values, error:data.error})
            } else {
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
                    <Card.Header>Modify Instructor</Card.Header>
                    <Card.Meta>Details</Card.Meta>
                    <Form onSubmit={clickSubmit}>
                        <Form.Field id="form-input"
                            control={Input}
                            label="Name"
                            placeholder="Joe Doe"
                            type="text"
                            value={instructor.name}
                            onChange={handleChange('name')}/>
                        
                        <Form.Field id="form-input"
                           control={Input}
                           label="Email Address"
                           placeholder="joe.doe@outlook.com"
                           type="email"
                           value={instructor.email}
                           onChange={handleChange('email')}/>

                        <Form.Field id="form-input"
                           control={Input}
                           label="Department"
                           placeholder="Finance"
                           type="text"
                           value={instructor.department}
                           onChange={handleChange('department')}/>

                        <Form.Field id="form-input"
                           control={Input}
                           label="Phone No"
                           placeholder="+254700000000"
                           type="tel"
                           value={instructor.phoneno}
                           onChange={handleChange('phoneno')}
                        />
                        
                        <Form.Field id="form-input"
                           control={Input}
                           label="Password"
                           type="password"
                           placeholder="**********"
                           value={instructor.password}
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