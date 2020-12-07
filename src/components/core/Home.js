import React from 'react'
import {Image} from 'semantic-ui-react'

export default function Home(){
    return(
        <div className="content-wrapper align-items-center">
            <br/>
            <br/>
            <h1>Course Database for dummies</h1>
            <p>
                This app uses rest api to create, update and delete courses
            </p>
            <Image src="/img4.jpg" fluid/>
        </div>
    )
}