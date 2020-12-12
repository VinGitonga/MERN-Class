import React, {useState, useEffect} from 'react'
import {update} from './api-student'
import {list as listCourse} from '../courses/api-course'
import {list as listInstructor} from '../instructors/api-instructor'
import {Link, Redirect} from 'react-router-dom'
import {Select, Form, Button,Card, Container,Input} from 'semantic-ui-react'


export default function EditStudent ({match}){

    const [student, setStudent] = useState({
        name:"",
        gender:"",
        religion:"",
        dob:"",
        email:"",
        address:"",
        guardianname:"",
        phoneno:"",
        course:"",
        instructor:"",
        dateofadmission:""
    });


    const [values, setValues] = useState({
        redirect:false,
        error:''
    })


    ///load the course data

    const [courses, setCourses] = useState([])

    useEffect(()=>{
        const abortController = new AbortController()
        const signal = abortController.signal;

        listCourse(signal).then((data)=>{
            if(data.error){
                console.log('No Course Data')
            } else {
                setCourses(data)
            }
        })
        return function cleanIt(){
            abortController.abort()
        }
    })

    //append the loaded courses to be selected
    const optsCourses = courses.map((crs,i)=>{
        return (
            {key:i, text:crs.name, value:student.course}
        )
    })


    //load the instructors
    const [tutors, setTutors] = useState([])

    useEffect(()=>{
        const abortController = new AbortController()
        const signal = abortController.signal

        listInstructor(signal).then((data)=>{
            if(data.error){
                console.log('No Tutor data yet')
            } else {
                setTutors(data)
            }
        })
        return function cleanUp(){
            abortController.abort()
        }
    })

    //append the tutors data to be selected
    const optsTuts = tutors.map((tut,i)=>{
        return  (
            {key:i, text:tut.name, value:student.instructor}
        )
    })


    //handleChange on the fields
    const handleChange = name => event => {
        setStudent({...student, [name]:event.target.value})
    }

    //get options for gender
    const optsGender = [
        {key:1, text:"Male",value:student.gender},
        {key:2, text:"Female",value:student.gender},
        {key:3, text:"Others",value:student.gender}
    ]

    //options religion
    const optsReligion = [
        {key:1,text:"Christian",value:student.religion},
        {key:2,text:"Muslim",value:student.religion},
        {key:3,text:"Hindu",value:student.religion},
        {key:4,text:"Others",value:student.religion}
    ]

    //handle form submission and saving data
    const clickSubmit = () =>{
        let studentData = new FormData()
        student.name && studentData.append('name',student.name)
        student.gender && studentData.append('gender',student.gender)
        student.religion && studentData.append('religion',student.religion)
        student.dob && studentData.append('dob',student.dob)
        student.email && studentData.append('email',student.email)
        student.address && studentData.append('address',student.address)
        student.phoneno && studentData.append('phoneno',student.phoneno)
        student.guardianname && studentData.append('guardianname',student.guardianname)
        student.course && studentData.append('course',student.course)
        student.instructor && studentData.append('instructor',student.instructor)
        student.dateofadmission && studentData.append('dateofadmission',student.dateofadmission)

        update({
        studentId:match.params.studentId
        }, studentData).then((data)=>{
            if(data.error){
                setValues({...values, error:data.error})
            } else{
                setValues({...values, redirect:true})
            }
        })
    }


    //after update redirect to the list of all students
    if(values.redirect){
        return (<Redirect to={'/students/all'}/>)
    }




    //render the form

    return (
        <>
           <Container textAlign="justified">
               <Card fluid>
                   <Card.Content>
                       <Card.Header>Modify Student</Card.Header>
                       <Card.Meta>Studente Detalia</Card.Meta>
                       <Form onSubmit={clickSubmit}>
                           <Form.Group widths="equal">
                               <Form.Field id="form-input"
                                  control={Input}
                                  label="Name"
                                  placeholder="Joe Allen"
                                  type="text"
                                  value={student.name}
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
                                  value={student.dob}
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
                                  value={student.email}
                                  onChange={handleChange('email')}/>

                                <Form.Field id="form-input"
                                   control={Input}
                                   label="Phone No"
                                   placeholder="+254709040501"
                                   type="tel"
                                   value={student.phoneno}
                                   onChange={handleChange('phoneno')}
                                   />

                                <Form.Field id="form-input"
                                   control={Input}
                                   label="Guardian's Name"
                                   placeholder="Jack Allen"
                                   type="text"
                                   value={student.guardianname}
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
                                  value={student.address}
                                  onChange={handleChange('address')}
                                  />
                           </Form.Group>
                            <Form.Group widths="equal">
                                <Form.Field id="form-input"
                                  control={Input}
                                  label="Date of Admission"
                                  placeholder="04-12-2020"
                                  type="date"
                                  value={student.dateofadmission}
                                  onChange={handleChange('dateofadmission')}
                                />
                                <Form.Field id="form-input"
                                   control={Select}
                                   label="Course"
                                   placeholder="Choose ..."
                                   options={optsCourses}
                                   onChange={handleChange('course')}/>

                                <Form.Field id="form-input"
                                   control={Select}
                                   label="Instructor"
                                   placeholder="Choose ...."
                                   options={optsTuts}
                                   onChange={handleChange('instructor')} />

                           </Form.Group>
                            <Button primary>Modify </Button>
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
