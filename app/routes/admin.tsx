import { Outlet } from "@remix-run/react";

function Admin() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '3fr 9fr' }}>
      <div>Sidebar</div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default Admin;