import { useState, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

import Doc from '../doku/ToDo_Webapp_Documentation.md'
export const Documentation = () => {
    const [DocContent, setDocContent] = useState('')

    useEffect(() => {
        fetch(Doc)
        fetch(Doc)
            .then(res => res.text())
            .then(text => setDocContent(text))
    })

    return (
        <div>
            <ReactMarkdown children={DocContent} />
        </div>
    )
}