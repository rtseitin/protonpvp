import React, { Component } from 'react';
import PropTypes from 'prop-types';
import StaffProfile from './StaffProfile';

class StaffProfiles extends Component {
    render() {
        return this.props.profiles.map(profiles => (
            <React.Fragment>
                <div style={{marginTop: '10px'}}>
                    <div style={{backgroundColor: '#fdcf78', width: '95%', margin: '0 auto', marginBottom: '10px', paddingTop: '3px', paddingBottom: '3px'}}>
                        <p style={{fontSize: '22px', fontWeight: '700', paddingLeft: '20px', marginBottom: 0}}>{`${profiles.rank.toUpperCase()}S`}</p>
                    </div>
                </div>
                <div style={{margin: '0 auto', width: '95%', paddingLeft: '20px'}}>
                <StaffProfile profiles={profiles.players}/>
                </div>
            </React.Fragment>
        ));
    }
}

StaffProfiles.propType = {
    profiles: PropTypes.array.isRequired
}

export default StaffProfiles;