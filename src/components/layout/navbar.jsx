import React from 'react'
import { connect } from 'react-redux'
import LoggedinLink from '../auth/loggedin_link';
import LoggedoutLinks from '../auth/loggedout_links';

const Navigation = ({ is_authenticated }) => {
    const navigation = is_authenticated ? <LoggedinLink /> : <LoggedoutLinks />
    return (
        <>
            {navigation}
        </>
    )
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)