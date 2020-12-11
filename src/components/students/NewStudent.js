import React, {useState,useEffect} from 'react'
import {create} from './api-student'
import {list as listInstructor} from '../instructors/api-instructor'
import {list as listCourse} from '../courses/api-course'
import {Card, Form,Button,Input,Container,Select} from 'semantic-ui-react'
import {Link, Redirect} from 'react-router-dom'


export default function NewStudent(){

    const [values, setValues] = useState({
        name:'',
        gender:'',
        religion:'',
        dob:'',
        email:'',
        phoneno:'',
        guardianname:'',
        address:'',
        course:'',
        instructor:'',
        dateofadmission:'',
        redirect:false,
        error:''
    })

    //load the instructors from database
    const [instructors, setInstructors] = useState([])

    useEffect(()=>{
        const abortController = new AbortController()
        const signal = abortController.signal

        listInstructor(signal).then((data)=>{
            if(data.error){
                console.log('No Instructor data')
            } else{
                setInstructors(data)
            }
        })
        return function cleanUp(){
            abortController.abort()
        }
    }, [])


    //load the courses ready from database

    const [courses, setCourses] = useState([])

    useEffect(()=>{
        const abortController = new AbortController()
        const signal = abortController.signal

        listCourse(signal).then((data)=>{
            if(data.error){
                console.log('No Course data')
            } else{
                setCourses(data)
            }
        })
        return function cleanUp(){
            abortController.abort()
        }
    }, [])


    //handle change 
    const handleChange = name => event=>{
        setValues({...values, [name]:event.target.value})
    }

    //handle form submission

    const clickSubmit = () =>{
        let studentData = new FormData()
        values.name && studentData.append('name',values.name)
        values.gender && studentData.append('gender',values.gender)
        values.religion && studentData.append('religion',values.religion)
        values.dob && studentData.append('dob',values.dob)
        values.email && studentData.append('email',values.email)
        values.phoneno && studentData.append('phoneno',values.phoneno)
        values.guardianname && studentData.append('guardianname',values.guardianname)
        values.address && studentData.append('address',values.address)
        values.course && studentData.append('course',values.course)
        values.instructor && studentData.append('instructor',values.instructor)
        values.dateofadmission && studentData.append('dateofadmission',values.dateofadmission)

        create(studentData).then((data)=>{
            if(data.error){
                setValues({...values, error:data.error})
            } else{
                setValues({...values, redirect:true})
            }
        })

    }

    const optsGender = [
        {key: 1, text:'Male', value:values.gender},
        {key: 2, text:'Female', value:values.gender},
        {key: 3, text:'Others', value:values.gender}
    ]

    const optsReligion = [
        {key:1, text:'Christian',value:values.religion},
        {key:2, text:'Hindu',value:values.religion},
        {key:3,text:'Muslim',value:values.religion},
        {key:4,text:'Others',value:values.religion}
    ]

    

    

    const opts = courses.map((crs,i)=>{
        return (
            {key:i,text:crs.name,value:values.course}
        )
    })

    const optsInts = instructors.map((ints,i)=>{
        return (
            {key:i, text:ints.name, value:values.instructor}
        )
    })

    if(values.redirect){
        return (<Redirect to={'/students/all'}/>)
    }

    return (
        <>
           <Container textAlign="justified">
               <Card fluid>
                   <Card.Content>
                       <Card.Header>Add New Student</Card.Header>
                       <Card.Meta>Studente Detalia</Card.Meta>
                       <Form onSubmit={clickSubmit}>
                           <Form.Group widths="equal">
                               <Form.Field id="form-input"
                                  control={Input}
                                  label="Name"
                                  placeholder="Joe Allen"
                                  type="text"
                                  value={values.name}
                                  onChange={handleChange('name')}/>
                                <Form.Field id="form-input"
                                   control={Select}
                                   label="Gender"
                                   placeholder="Choose ..."
                                   options={optsGender}
                                   onChange={handleChange('gender')}
                                   />

                                
                                <Form.Field id='form-input'
                                   control={Select}
                                   label="Religion"
                                   placeholder="Choose ..."
                                   options={optsReligion}
                                   onChange={handleChange('religion')}/>
                           </Form.Group>

                           <Form.Group widths="equal">
                               <Form.Field id="form-input"
                                  control={Input}
                                  label="Date of Birth"
                                  placeholder="11-04-1999"
                                  type="date"
                                  value={values.dob}
                                  onChange={handleChange('dob')}
                                />
                           </Form.Group>

                           <br/>
                           <Form.Group widths="equal">
                               <Form.Field id="form-input"
                                  control={Input}
                                  label="Email address"
                                  placeholder="joe.allen@outlook.com"
                                  type="email"
                                  value={values.email}
                                  onChange={handleChange('email')}/>

                                <Form.Field id="form-input"
                                   control={Input}
                                   label="Phone No"
                                   placeholder="+254709040501"
                                   type="tel"
                                   value={values.phoneno}
                                   onChange={handleChange('phoneno')}
                                   />
                                
                                <Form.Field id="form-input"
                                   control={Input}
                                   label="Guardian's Name"
                                   placeholder="Jack Allen"
                                   type="text"
                                   value={values.guardianname}
                                   onChange={handleChange('guardianname')}
                                   />
                           </Form.Group>

                           <br/>

                           <Form.Group widths="equal">
                               <Form.Field id="form-input"
                                  control={Input}
                                  label="Address"
                                  placeholder="Pipeline, Nakuru"
                                  type="text"
                                  value={values.address}
                                  onChange={handleChange('address')}
                                  />
                           </Form.Group>
                            <Form.Group widths="equal">                                
                                <Form.Field id="form-input"
                                  control={Input}
                                  label="Date of Admission"
                                  placeholder="04-12-2020"
                                  type="date"
                                  value={values.dateofadmission}
                                  onChange={handleChange('dateofadmission')}
                                />
                                <Form.Field id="form-input"
                                   control={Select}
                                   label="Course"
                                   placeholder="Choose ..."
                                   options={opts}
                                   onChange={handleChange('course')}/>

                                <Form.Field id="form-input"
                                   control={Select}
                                   label="Instructor"
                                   placeholder="Choose ...."
                                   options={optsInts}
                                   onChange={handleChange('instructor')} />
                                   
                           </Form.Group>
                            <Button primary>Add </Button>
                            <Link to={'/students/all'}>
                                <Button secondary>Cancel</Button>
                            </Link>
                           
                       </Form>
                   </Card.Content>
               </Card>
           </Container>
        </>
    )
}
