import React, { useEffect, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, Legend, AreaChart, Area
} from 'recharts';
import { 
  Users, Building2, Briefcase, CheckCircle2, 
  TrendingUp, PieChart as PieChartIcon, BarChart3, ArrowUpRight, ArrowDownRight, Activity
} from 'lucide-react';
// import { motion } from 'motion/react';
import { motion } from "framer-motion";
import { fetchSystemStats } from '../../services/adminService';



const COLORS = ['#2563eb', '#e2e8f0'];

const Reports= () => {
const [stats, setStats] = useState(null);

//Fetch API
useEffect(() => {
  const loadStats = async () => {
    try {
      const data = await fetchSystemStats();
      setStats(data);
    } catch (error) {
      console.error(error);
    }
  };
  loadStats();
}, []);

//Loading Check
if(!stats){
  return <p className='text-center mt-10'>Loading Analytics..</p>;
}

//Transform bakcend data
const companyData = stats.companyPlacements?.map(c => ({
  name: c._id || "Unknown",
  placements: c.placements
})) || [];

const yearlyData = stats.yearlyTrends?.map(y => ({
  year: y._id,
  placements: y.placements
})) || [];

const distributionData = [
  { name: "Placed", value: stats.placedCount },
  { name: "Unplaced", value: stats.students - stats.placedCount }
];

const monthlyData = stats.monthlyPlacements?.map(m => ({
  month: m._id,
  placements: m.placements
})) || [];


  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-2xl font-black text-slate-900  tracking-tight">Placement Intelligence</h3>
          <p className="text-slate-500 font-medium">Comprehensive analytics and institutional performance metrics.</p>
        </div>
        {/* <div className="flex flex-wrap items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-sm">
            Export PDF
          </button>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
            Generate Report
          </button>
        </div> */}
      </div>


      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Company-wise Placement Chart */}
        <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest ">Company Placements</h4>
              <p className="text-xs text-slate-500 font-medium">Top hiring partners by volume</p>
            </div>
            <BarChart3 className="w-5 h-5 text-slate-300" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {/* <BarChart data={companyPlacementsData}> */}
              <BarChart data={companyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} 
                />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                />
                <Bar dataKey="placements" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Year-wise Placement Trends */}
        <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest ">Placement Trends</h4>
              <p className="text-xs text-slate-500 font-medium">Annual growth trajectory</p>
            </div>
            <TrendingUp className="w-5 h-5 text-slate-300" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {/* <LineChart data={yearlyTrendsData}> */}
              <LineChart data={yearlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="placements" 
                  stroke="#2563eb" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Placement Distribution */}
        <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest ">Placement Distribution</h4>
              <p className="text-xs text-slate-500 font-medium">Current batch status</p>
            </div>
            <PieChartIcon className="w-5 h-5 text-slate-300" />
          </div>
          <div className="h-[300px] w-full flex items-center">
            {/* <ResponsiveContainer width="100%" height="100%"> */}
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                />
                <Legend 
                  verticalAlign="middle" 
                  align="right" 
                  layout="vertical"
                  iconType="circle"
                  formatter={(value) => <span className="text-xs font-bold text-slate-600 ml-2">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Jobs vs Placements Chart */}
        <div className="bg-white p-4 md:p-8 rounded-2xl md:rounded-[2.5rem] border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest ">Jobs vs Placements</h4>
              <p className="text-xs text-slate-500 font-medium">Monthly conversion analysis</p>
            </div>
            <Activity className="w-5 h-5 text-slate-300" />
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              {/* <BarChart data={jobsVsPlacementsData}> */}
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                />
                <Legend 
                  verticalAlign="top" 
                  align="right" 
                  iconType="circle"
                  wrapperStyle={{ paddingBottom: '20px' }}
                  formatter={(value) => <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">{value}</span>}
                />
                {/* <Bar dataKey="jobs" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={20} name="Jobs Posted" /> */}
                <Bar dataKey="placements" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={20} name="Placed Students" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;