import { useFormik } from "formik";
import { ArrowBigLeft, Edit, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Hourglass } from "react-loader-spinner";
import axios from "../services/axios";

export default function DummyPage() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const appurl = import.meta.env.VITE_API_URL;
  const token = sessionStorage.getItem("token");

  /* ================= FETCH USERS ================= */
  const fetchUsers = async () => {
    try {
      const res = await axios.get(`/user/get`);

      const mainData = res.data.users;
      console.log("man",mainData)
      const mainFliter = mainData?.filter((u) => u.role === "COMPANY");
      console.log("company data", mainFliter);
      setUsers(res.data.users || []);
    } catch (err) {
      console.error("Fetch failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /* ================= FORMIK ================= */
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: selectedUser?.name || "",
      email: selectedUser?.email || "",
      password: "",
      role: selectedUser?.role || "STUDENT",
    },
    onSubmit: async (values) => {
      try {
        if (isEditMode) {
          // UPDATE USER
          const res = await axios.put(`/user/update/${selectedUser._id}`, {
            name: values.name,
            email: values.email,
            role: values.role,
          });

          setUsers((prev) =>
            prev.map((u) => (u._id === selectedUser._id ? res.data.user : u)),
          );
        } else {
          // ADD USER (ADMIN)
          const res = await axios.post(`/user/create`, values);

          setUsers((prev) => [...prev, res.data.user]);
        }

        setShowForm(false);
        setIsEditMode(false);
        setSelectedUser(null);
        formik.resetForm();
      } catch (err) {
        console.error("Operation failed");
      }
    },
  });

  /* ================= HANDLERS ================= */
  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user?")) return;

    try {
      await axios.delete(`/user/delete/${id}`);

      setUsers((prev) => prev.filter((u) => u._id !== id));
    } catch {
      console.error("Delete failed");
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="fixed inset-0 flex justify-center items-center bg-white">
        <Hourglass height="80" width="80" />
      </div>
    );
  }

  /* ================= UI ================= */
  return (
    <div className="min-h-screen p-6">
      {!showForm ? (
        <>
          {/* ADD USER BUTTON */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                setSelectedUser(null);
                setIsEditMode(false);
                setShowForm(true);
              }}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              + Add User
            </button>
          </div>

          {/* USER TABLE */}
          <table border="1" cellPadding="10" className="w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <Edit
                      className="cursor-pointer"
                      onClick={() => handleEdit(user)}
                    />
                  </td>
                  <td>
                    <Trash2
                      className="cursor-pointer text-red-600"
                      onClick={() => handleDelete(user._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <ArrowBigLeft
            className="cursor-pointer mb-4"
            onClick={() => setShowForm(false)}
          />

          {/* ADD / EDIT FORM */}
          <form onSubmit={formik.handleSubmit}>
            <div>
              <label>Name</label>
              <input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                className="border ml-2"
                required
              />
            </div>

            <div className="mt-3">
              <label>Email</label>
              <input
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className="border ml-2"
                required
              />
            </div>

            {!isEditMode && (
              <div className="mt-3">
                <label>Password</label>
                <input
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className="border ml-2"
                  required
                />
              </div>
            )}

            <div className="mt-3">
              <label>Role</label>
              <select
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                className="border ml-2"
              >
                <option value="STUDENT">STUDENT</option>
                <option value="COMPANY">COMPANY</option>
                <option value="ADMIN">ADMIN</option>
              </select>
            </div>

            <button
              type="submit"
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              {isEditMode ? "Update User" : "Create User"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
