import React from 'react';
import 'semantic-ui-css/semantic.min.css'
//import ReactDOM from 'react-dom'
import {hydrate} from 'react-dom'
import App from './App'

hydrate(
	<App/>,
	document.getElementById('root')
)

