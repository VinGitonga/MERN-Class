import React,{useState} from 'react'
import {remove} from './api-student'
import {Button, Icon, Modal} from 'semantic-ui-react'

export default function DeleteStudent({match}){

    //set the modal open to false using useState
    const [open, setOpen] = useState(false)

    //control the delete button
    const clickButton = () =>{
        setOpen(true)
    }

    //fn to handle deleting the student from the database
    const deleteStudent = () =>{
        remove({
            studentId:match.params.studentId
        }).then((data)=>{
            if(data.error){
                console.log(data.error)
            } else{
                setOpen(false)
            }
        })
    }

    //handle closing of the modal on demand
    const handleCloseRequest = () => {
        setOpen(false)
    }


    //render the modal
    return (
        <>
            <Button primary onClick={clickButton}>
                <Icon name="trash alternate"/>
            </Button>

            <Modal size="mini" open={open} onClose={handleCloseRequest}>
                <Modal.Header>Delete</Modal.Header>
                <Modal.Content>
                    <p>Are you sure to delete student data</p>
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={handleCloseRequest}>Cancel</Button>
                    <Button positive onClick={deleteStudent}>Delete</Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}