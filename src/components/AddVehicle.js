import React from "react";

const AddVehicle = ({ onAdd }) => {
  return (
    <button className="btn btn-primary" onClick={onAdd}>
      Add Vehicle
    </button>
  );
};

export default AddVehicle;
