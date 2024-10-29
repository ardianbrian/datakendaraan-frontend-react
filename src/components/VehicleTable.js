import React from "react";

const VehicleTable = ({ vehicles, onEdit, onDelete }) => (
  <div className="table-responsive">
    <table className="table table-striped table-hover small text-center">
      <thead className="table-primary">
        <tr>
          <th>No</th>
          <th>No Registrasi</th>
          <th>Nama Pemilik</th>
          <th>Merk Kendaraan</th>
          <th>Tahun Pembuatan</th>
          <th>Kapasitas</th>
          <th>Warna</th>
          <th>Bahan Bakar</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {vehicles.map((vehicle, index) => (
          <tr key={vehicle.id}>
            <td>{index + 1}</td>
            <td>{vehicle.nomorRegistrasiKendaraan}</td>
            <td>{vehicle.namaPemilik}</td>
            <td>{vehicle.merkKendaraan}</td>
            <td>{vehicle.tahunPembuatan}</td>
            <td>{vehicle.kapasitasSilinder} cc</td>
            <td>{vehicle.warnaKendaraan}</td>
            <td>{vehicle.bahanBakar}</td>
            <td>
              <div className="d-flex justify-content-center">
                <button
                  onClick={() => onEdit(vehicle.id)}
                  className="btn btn-primary btn-sm me-1"
                >
                  Edit
                </button>
                <button
                  onClick={() =>
                    onDelete(vehicle.id, vehicle.nomorRegistrasiKendaraan)
                  }
                  className="btn btn-danger btn-sm"
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default VehicleTable;
