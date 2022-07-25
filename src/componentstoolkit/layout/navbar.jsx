import React from 'react';
import LoggedinLink from '../auth/loggedin_link';
import LoggedoutLinks from '../auth/loggedout_links';
import { useSelector} from 'react-redux';

const Navigation = () => {
  const redux_state = useSelector((mainstate)=>{
    return {
      isAuthenticated:mainstate.auth.isAuthenticated,
    }
  })
    const navigation = redux_state.isAuthenticated ? <LoggedinLink /> : <LoggedoutLinks />
    return (
        <>
            {navigation}
        </>
    )
}


export default Navigation;