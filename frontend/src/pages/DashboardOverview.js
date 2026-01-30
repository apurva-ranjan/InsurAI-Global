import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Activity, Users, ShieldCheck, DollarSign } from 'lucide-react';

const data = [
  { name: 'Jan', revenue: 4000, apps: 24 },
  { name: 'Feb', revenue: 3000, apps: 13 },
  { name: 'Mar', revenue: 5000, apps: 38 },
  { name: 'Apr', revenue: 4500, apps: 30 },
];

const StatCard = ({ title, value, icon: Icon, color }) => (
  <div className="card border-0 shadow-sm p-3">
    <div className="d-flex align-items-center">
      <div className={`p-3 rounded-3 bg-light text-${color} me-3`}>
        <Icon size={24} />
      </div>
      <div>
        <h6 className="text-muted mb-0">{title}</h6>
        <h4 className="fw-bold mb-0">{value}</h4>
      </div>
    </div>
  </div>
);

const DashboardOverview = () => {
  return (
    <div className="animate__animated animate__fadeIn">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Executive Overview</h2>
        <button className="btn btn-primary shadow-sm">Generate Report (PDF)</button>
      </div>

      <div className="row g-4 mb-5">
        <div className="col-md-3"><StatCard title="Total Revenue" value="$124,500" icon={DollarSign} color="success" /></div>
        <div className="col-md-3"><StatCard title="Active Policies" value="1,240" icon={ShieldCheck} color="primary" /></div>
        <div className="col-md-3"><StatCard title="New Users" value="84" icon={Users} color="info" /></div>
        <div className="col-md-3"><StatCard title="Claim Ratio" value="12%" icon={Activity} color="warning" /></div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card border-0 shadow-sm p-4 mb-4">
            <h5 className="fw-bold mb-4">Revenue Growth</h5>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#0d6efd" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-md-4">
            <div className="card border-0 shadow-sm p-4 h-100">
                <h5 className="fw-bold mb-3">Recent Activity</h5>
                <ul className="list-unstyled">
                    <li className="mb-3 d-flex align-items-center">
                        <div className="bg-soft-success p-2 rounded-circle me-3"></div>
                        <div><small className="d-block fw-bold">New Policy Approved</small><small className="text-muted">Premium Health Shield - 2 mins ago</small></div>
                    </li>
                    <li className="mb-3 d-flex align-items-center">
                        <div className="bg-soft-primary p-2 rounded-circle me-3"></div>
                        <div><small className="d-block fw-bold">Payment Received</small><small className="text-muted">$2,500 from John Doe</small></div>
                    </li>
                </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardOverview;