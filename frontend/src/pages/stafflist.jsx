import { Button } from "react-bootstrap";
import React from "react";
import StaffProfiles from "../components/StaffProfiles";

function StaffList() {
  return (
    <React.Fragment>
      <div>
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            paddingTop: "15px",
            paddingBottom: "10px",
            verticalAlign: "middle",
            paddingLeft: "5px",
            paddingRight: "5px",
          }}
        >
          <h1
            className="ml-auto"
            style={{
              fontSize: "32px",
              color: "#343a40",
              fontWeight: "700",
              display: "inline-block",
            }}
          >
            Staff List
          </h1>
          <Button
            variant="dark"
            style={{
              display: "inline-block",
              float: "right",
              backgroundColor: "#343a40",
              color: "orange",
            }}
          >
            Apply for Staff
          </Button>
        </div>
        <div
          style={{
            maxWidth: "1400px",
            backgroundColor: "#f5f5f5",
            borderStyle: "solid",
            borderColor: "#343a404b",
            borderWidth: "1.5px",
            margin: "0 auto",
          }}
        >
          <StaffProfiles />
        </div>
      </div>
    </React.Fragment>
  );
}

export default StaffList;
