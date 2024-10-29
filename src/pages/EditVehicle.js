import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditVehicle = () => {
  const [vehicle, setVehicle] = useState({
    nomorRegistrasiKendaraan: "",
    namaPemilik: "",
    alamat: "",
    merkKendaraan: "",
    tahunPembuatan: "",
    kapasitasSilinder: "",
    warnaKendaraan: "",
    bahanBakar: "",
  });

  const navigate = useNavigate();
  const { id } = useParams(); // Get the vehicle ID from the URL

  useEffect(() => {
    // Fetch the vehicle data based on the ID
    axios
      .get(`http://localhost:8080/api/vehicles/${id}`)
      .then((response) => {
        setVehicle(response.data); // Set the vehicle data
      })
      .catch((error) => console.error("Error fetching vehicle data:", error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVehicle({ ...vehicle, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:8080/api/vehicles/${id}`, vehicle)
      .then((response) => {
        console.log("Vehicle updated successfully:", response.data);
        navigate("/"); // Redirect to the vehicle table after editing
      })
      .catch((error) => console.error("Error updating vehicle:", error));
  };

  return (
    <div className="container mt-4">
      <h2>Edit Data Kendaraan</h2>
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">No Registrasi</label>
            <input
              type="text"
              name="nomorRegistrasiKendaraan"
              value={vehicle.nomorRegistrasiKendaraan}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col">
            <label className="form-label">Tahun Pembuatan</label>
            <input
              type="number"
              name="tahunPembuatan"
              value={vehicle.tahunPembuatan}
              onChange={handleChange}
              className="form-control"
              required
              min="1900"
              max={new Date().getFullYear()}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Nama Pemilik</label>
            <input
              type="text"
              name="namaPemilik"
              value={vehicle.namaPemilik}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col">
            <label className="form-label">Kapasitas Silinder (cc)</label>
            <input
              type="number"
              name="kapasitasSilinder"
              value={vehicle.kapasitasSilinder}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Merk Kendaraan</label>
            <input
              type="text"
              name="merkKendaraan"
              value={vehicle.merkKendaraan}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="col">
            <label className="form-label">Warna Kendaraan</label>
            <select
              name="warnaKendaraan"
              value={vehicle.warnaKendaraan}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Pilih Warna</option>
              <option value="Merah">Merah</option>
              <option value="Biru">Biru</option>
              <option value="Hijau">Hijau</option>
              <option value="Kuning">Kuning</option>
              <option value="Hitam">Hitam</option>
              <option value="Putih">Putih</option>
            </select>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col">
            <label className="form-label">Alamat</label>
            <textarea
              name="alamat"
              value={vehicle.alamat}
              onChange={handleChange}
              className="form-control"
              required
            ></textarea>
          </div>
          <div className="col">
            <label className="form-label">Bahan Bakar</label>
            <select
              name="bahanBakar"
              value={vehicle.bahanBakar}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value="">Pilih Bahan Bakar</option>
              <option value="Bensin">Bensin</option>
              <option value="Solar">Solar</option>
            </select>
          </div>
        </div>
        <div className="d-flex justify-content-start">
          <button type="submit" className="btn btn-primary me-2">
            Simpan
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditVehicle;
