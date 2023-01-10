import React from "react";
import PropTypes from "prop-types";
import { useState } from 'react';

export default function StaffProfile({ profiles }) {
  const [clicked, setClicked] = useState(false);

  const buttonClick = () => {
    setClicked(!clicked);
  }

  return profiles.map((staff) => (
    <>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          display: "inline-block",
          paddingRight: "30px",
        }}
        onClick={buttonClick}
      >
        {clicked && <p>{staff.name}</p>}
        <img
          alt={`${staff.name} Minecraft Skin Avatar`}
          src={`https://cravatar.eu/avatar/${staff.uuid}/100.png`}
          width="125px"
        />
        <p style={{ fontSize: "14px", fontWeight: "700" }}>{staff.name}</p>
      </div>
    </>
  ));
}

StaffProfile.propType = {
  profiles: PropTypes.array.isRequired,
};
