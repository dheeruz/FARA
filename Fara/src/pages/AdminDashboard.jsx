    import React, { useEffect, useState } from "react";
    import axios from "axios";

    const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [filteredContacts, setFilteredContacts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchContacts = async () => {
        try {
        const res = await axios.get("http://localhost:5000/api/contacts");
        setContacts(res.data);
        setFilteredContacts(res.data);
        } catch (err) {
        console.error("Error fetching contacts:", err);
        }
    };

    useEffect(() => {
        fetchContacts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to delete this contact?")) return;

        try {
        await axios.delete(`http://localhost:5000/api/contacts/${id}`); // <-- Fixed here
        setContacts((prev) => prev.filter((c) => c.id !== id));
        setFilteredContacts((prev) => prev.filter((c) => c.id !== id));
        } catch (err) {
        console.error("Delete failed:", err);
        }
    };

    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        setFilteredContacts(
        contacts.filter(
            (c) =>
            c.name.toLowerCase().includes(term) ||
            c.email.toLowerCase().includes(term) ||
            c.message.toLowerCase().includes(term)
        )
        );
    };

    const handleReply = (email) => {
        window.location.href = `mailto:${email}`;
    };

    return (
        <div style={{ padding: "1rem" }}>
        <h2>📥 Contact Messages</h2>

        <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="🔍 Search by name, email or message"
            style={{
            padding: "8px",
            margin: "12px 0",
            width: "100%",
            maxWidth: "400px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            }}
        />

        {filteredContacts.length === 0 ? (
            <p>No messages found.</p>
        ) : (
            <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
                <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {filteredContacts.map((contact) => (
                <tr key={contact.id}>
                    <td>{contact.id}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.message}</td>
                    <td>
                    <button
                        onClick={() => handleReply(contact.email)}
                        style={{
                        marginRight: "8px",
                        background: "#007bff",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        }}
                    >
                        Reply
                    </button>
                    <button
                        onClick={() => handleDelete(contact.id)}
                        style={{
                        background: "#dc3545",
                        color: "white",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "4px",
                        cursor: "pointer",
                        }}
                    >
                        Delete
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </div>
    );
    };

    export default AdminContacts;
