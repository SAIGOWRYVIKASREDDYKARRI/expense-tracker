import { useEffect, useState } from "react";

function AdminLogs({ user }) {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    if (!user || user.role !== "ADMIN") return;

    fetch(`http://localhost:5000/admin/logs/${user.id}`)
      .then((r) => r.json())
      .then(setLogs);
  }, [user]);

  if (!user || user.role !== "ADMIN") return null;

  return (
    <div className="bg-white p-6 rounded shadow mt-6">
      <h3 className="text-lg font-semibold mb-4">
        Admin Activity Logs
      </h3>

      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2">User</th>
              <th className="p-2">Action</th>
              <th className="p-2">Details</th>
              <th className="p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t">
                <td className="p-2">{log.username}</td>
                <td className="p-2">{log.action}</td>
                <td className="p-2">{log.details}</td>
                <td className="p-2">
                  {new Date(log.action_time).toLocaleString("en-IN")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminLogs;
