import React, { useState, useEffect } from "react";

function Pv2({currentHp, maxHp}) { 

  return (
    <>
      <div>
        <div style={{ width: "50vh" }}>
          <div
            style={{
              width: `${(currentHp/maxHp)*100}%`,
              height: "15px",
              backgroundColor: "purple",
              transition: "width 0s",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Pv2;
