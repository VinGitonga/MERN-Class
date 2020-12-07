import React from 'react'
import {Route, Switch} from 'react-router-dom'
import Home from './components/core/Home'
import Menu1 from "./components/core/Menu";
import NewCourse from './components/courses/NewCourse'
import AllCourses from './components/courses/AllCourses'
import EditCourse from './components/courses/EditCourse'
import DeleteCourse from './components/courses/DeleteCourse'

const MainRouter = () =>{
    return (
        <div>
            <Menu1/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/courses/new" component={NewCourse}/>
                <Route path="/courses/edit/:courseId" component={EditCourse}/>
                <Route path="/courses/all" component={AllCourses}/>
                <Route path="/courses/delete/:courseId" component={DeleteCourse}/>
            </Switch>
        </div>
    )
}

export default MainRouter