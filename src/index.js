import React from 'react'
import { render } from 'react-dom'


function Hi(){
    return <p>This is Initial setup</p>
}

render(<Hi/>, document.getElementById('app'));