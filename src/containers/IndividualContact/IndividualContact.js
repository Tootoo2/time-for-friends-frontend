import React from 'react'

const individualContact = (props) => {
  const person = props.location.state.person
  return (<div>{person.name.firstName}</div>)
}

export default individualContact;