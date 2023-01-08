import React, { Component } from 'react';
import PropTypes from 'prop-types';

class StaffProfile extends Component {
    render() {
        return this.props.profiles.map(staff => (
            <React.Fragment>
                <div style={{justifyContent: 'center', alignItems: 'center', display: 'inline-block', paddingRight: '30px'}}>
                    <img
                        alt='BizarreAvatar'
                        src={`https://cravatar.eu/avatar/${staff.uuid}/100.png`}
                        width='125px'
                    />
                    <p style={{fontSize: '14px', fontWeight: '700'}}>{staff.name}</p>
                </div>
            </React.Fragment>
        ))
    }
}


StaffProfile.propType = {
    profiles: PropTypes.array.isRequired
}

export default StaffProfile;