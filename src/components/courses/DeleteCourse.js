import React,{useState} from 'react'
import {remove} from './api-course'
//import {Modal} from 'react-bootstrap'
import {Button, Icon, Modal} from 'semantic-ui-react'
//import {Redirect} from 'react-router-dom'
//import PropTypes from 'prop-types'
//import axios from 'axios'

export default function DeleteCourse({match}){
    const [open, setOpen] = useState(false)

    const clickButton = () => {
        setOpen(true)
    }

    const deleteCourse = () =>{
        remove({
            courseId:match.params.courseId
        }).then((data)=>{
            if(data.error){
                console.log(data.error)
            } else {
                setOpen(false);
            }
        })
    }

    const handleCloseRequest = () =>{
        setOpen(false)
    }


    return (
        <>
           <Button color="primary" onClick={clickButton}>
               <Icon name="trash"/>
           </Button>
           <Modal size='mini' open={open} onClose={handleCloseRequest}>
               <Modal.Header>
                   "Delete"
               </Modal.Header>
               <Modal.Content>
                   <p>Are you sure to delete course </p>
               </Modal.Content>
               <Modal.Actions>
                   <Button negative onClick={handleCloseRequest}>Cancel</Button>
                   <Button positive onClick={deleteCourse}>Delete</Button>
               </Modal.Actions>
           </Modal>
        </>
    )
}
/*
DeleteCourse.propTypes = {
    course: PropTypes.object.isRequired,
    onRemove: PropTypes.func.isRequired
}*/