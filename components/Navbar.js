import React from 'react'
import { Input, Menu} from 'semantic-ui-react'
import {Link} from '../routes';

export default function Navbar() {
  return (
    <div>
        <Menu pointing style={{marginTop: '10px', marginBottom: '20px'}}>
          <Link href='/'>
            <a className='item'>Rayoc</a>
          </Link>
          <Link href='/post'>
            <a className='item'>Give Feedback</a>
          </Link>
          <Menu.Menu position='right'>
            <Menu.Item>
              <Input icon='search' placeholder='Search...' />
            </Menu.Item>
          </Menu.Menu>
        </Menu>
    </div>
  )
}
