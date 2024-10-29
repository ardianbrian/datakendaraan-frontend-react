import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from "../components/Alert";
import SearchBar from "../components/SearchBar";
import VehicleTable from "../components/VehicleTable";
import AddVehicle from "../components/AddVehicle";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 30;

const MonitoringVehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [alert, setAlert] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/vehicles");
        setVehicles(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setAlert({
          type: "danger",
          message: "Failed to load vehicle data. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id, nomorRegistrasiKendaraan) => {
    if (
      window.confirm(
        `Anda yakin ingin menghapus data: ${nomorRegistrasiKendaraan}?`
      )
    ) {
      axios
        .delete(`http://localhost:8080/api/vehicles/${id}`)
        .then(() => {
          setVehicles(vehicles.filter((vehicle) => vehicle.id !== id));
          setAlert({
            type: "success",
            message: `Vehicle with No Registrasi: ${nomorRegistrasiKendaraan} has been deleted successfully!`,
          });
        })
        .catch((error) => {
          console.error("Error deleting vehicle:", error);
          setAlert({
            type: "danger",
            message:
              "There was an error deleting the vehicle. Please try again.",
          });
        });
    }
  };

  const filteredVehicles = vehicles.filter((vehicle) => {
    const noRegistrasiMatch = vehicle.nomorRegistrasiKendaraan
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const namaPemilikMatch = vehicle.namaPemilik
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return noRegistrasiMatch || namaPemilikMatch;
  });

  const indexOfLastVehicle = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstVehicle = indexOfLastVehicle - ITEMS_PER_PAGE;
  const currentVehicles = filteredVehicles.slice(
    indexOfFirstVehicle,
    indexOfLastVehicle
  );
  const totalPages = Math.ceil(filteredVehicles.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Aplikasi Data Kendaraan</h2>
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
      <div className="mb-3">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={(e) => setSearchQuery(e.target.value)}
          placeholder={"Cari dengan nama atau no registrasi"}
        />
      </div>
      <div className="text-end mb-3">
        <AddVehicle onAdd={() => navigate("/add")} />
      </div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <VehicleTable
            vehicles={currentVehicles}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default MonitoringVehicle;
