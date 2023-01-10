import axios from "axios";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import StaffProfile from "./StaffProfile";

function StaffProfiles() {
  const [loading, setLoading] = useState(true);
  const [staff, setStaff] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:1337/staff/users/website", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoading(false);
        setStaff(res.data.response);
      })
      .catch((err) => {
        setLoading(false);
      })
  }, []);

  return (
    <>
      {loading && <h2>Loading...</h2>}
      {!loading && staff === null && <h2>Cannot load staff data! Try again later.</h2>}
      {staff !== null &&
        staff.map((profiles) => (
          <div style={{ marginTop: "10px" }} key={profiles.rank}>
            <div
              style={{
                backgroundColor: "#fdcf78",
                width: "95%",
                margin: "0 auto",
                marginBottom: "10px",
                paddingTop: "3px",
                paddingBottom: "3px",
              }}
            >
              <p
                style={{
                  fontSize: "22px",
                  fontWeight: "700",
                  paddingLeft: "20px",
                  marginBottom: 0,
                }}
              >{`${profiles.rank.toUpperCase()}S`}</p>
            </div>
            <div
              style={{ margin: "0 auto", width: "95%", paddingLeft: "20px" }}
            >
              <StaffProfile profiles={profiles.players} />
            </div>
          </div>
        ))}
    </>
  );
}

StaffProfiles.propType = {
  profiles: PropTypes.array.isRequired,
};

export default StaffProfiles;
