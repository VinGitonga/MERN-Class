import React from 'react'
import { Menu} from 'semantic-ui-react'
import {NavLink, withRouter} from 'react-router-dom'


const isActive = (history, path)=>{
    if(history.location.pathname === path)
       return {color:"#f57c00"}
    else
        return {color:'#fffde7'}
}

/*
const isPartActive = (history, path)=>{
    if(history.location.pathname.includes(path))
       return {color:'#fffde7', backgroundColor:'#f57c00',marginRight:10}
    else
        return {color:'#616161', backgroundColor:'#fffde7', border:'1px solid #f57c00', marginRight:10}
}*/

const Menu1 = withRouter(({history})=>(
    <Menu secondary>
        <h6>MERN CLASS</h6>
        <Menu.Item as={NavLink} to="/" name="Home"
           active={isActive(history,'/')}/>
        <Menu.Item
           as={NavLink} to="/courses/all"
           name="Course" active={isActive(history,'/courses/all')}/>
    </Menu>
))

export default Menu1