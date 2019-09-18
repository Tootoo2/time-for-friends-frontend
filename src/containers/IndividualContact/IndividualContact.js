import React from 'react'

const individualContact = (props) => {
  console.log(props)
  const contact = props.location.state
  return (<div>{contact.name.firstName}</div>)
}

export default individualContact;