import React, { Component } from 'react'
import { Container } from 'semantic-ui-react'
import Navbar from './Navbar'

export class Layout extends Component {
  render() {
    return (
      <Container>
        <Navbar/>
        {this.props.children}
      </Container>
    )
  }
}

export default Layout