import React,{useState} from 'react'
import {Icon, Modal, Button} from 'semantic-ui-react'
import {remove} from './api-instructor'


export default function DeleteInstructor({match}){

    const [open, setOpen] = useState(false)

    const clickButton = () =>{
        setOpen(true)
    }

    const deleteInstructor = () =>{
        remove({
            instructorId:match.params.instructorId
        }).then((data)=>{
            if(data.error){
                console.log(data.error)
            } else {
                setOpen(false)
            }
        })
    }

    const handleCloseRequest =()=>{
        setOpen(false)
    }

    return(
        <>
        <Button color="primary" onClick={clickButton}>
            <Icon name="trash"/>
        </Button>
        <Modal size='mini' open={open} onClose={handleCloseRequest}>
            <Modal.Header>
                Delete
            </Modal.Header>
            <Modal.Content>
                <p>Are you sure to delete instructor</p>
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={handleCloseRequest}>Cancel</Button>
                <Button positive onClick={deleteInstructor}>Delete</Button>
            </Modal.Actions>
        </Modal>
        </>
    )
}
