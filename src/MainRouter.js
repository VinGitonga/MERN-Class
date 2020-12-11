import React from 'react'
import {Route, Switch, BrowserRouter} from 'react-router-dom'
import Home from './components/core/Home'
import Menu1 from "./components/core/Menu";
import NewCourse from './components/courses/NewCourse'
import AllCourses from './components/courses/AllCourses'
import EditCourse from './components/courses/EditCourse'
import DeleteCourse from './components/courses/DeleteCourse'
import NewInstructor from './components/instructors/NewInstructor'
import EditInstructor from './components/instructors/EditInstructor'
import DeleteInstructor from './components/instructors/DeleteInstructor'
import AllInstructors from './components/instructors/AllInstructors'
import NewStudent from './components/students/NewStudent'
import EditStudent from './components/students/EditStudent'
import DeleteStudent from './components/students/DeleteStudent'
import AllStudents from './components/students/AllStudents'


const MainRouter = () =>{
    return (
        <BrowserRouter>
            <Menu1/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/courses/new" component={NewCourse}/>
                <Route path="/courses/edit/:courseId" component={EditCourse}/>
                <Route path="/courses/all" component={AllCourses}/>
                <Route path="/courses/delete/:courseId" component={DeleteCourse}/>
                <Route path="/instructors/new" component={NewInstructor}/>
                <Route path="/instructors/edit/:instructorId" component={EditInstructor}/>
                <Route path="/instructors/all" component={AllInstructors}/>
                <Route path="/instructors/delete/:instructorId" component={DeleteInstructor}/>
                <Route path="/students/new" component={NewStudent}/>
                <Route path="/students/edit/:studentId" component={EditStudent}/>
                <Route path="/students/delete/:studentId" component={DeleteStudent}/>
                <Route path="/students/all" component={AllStudents}/>
            </Switch>
        </BrowserRouter>
    )
}

export default MainRouter