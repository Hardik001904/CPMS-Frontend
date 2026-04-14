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

// Mock Data
// const summaryStats = [
//   { title: 'Total Students', value: '1,240', icon: <Users className="w-5 h-5" />, change: '+12%', positive: true },
//   { title: 'Total Companies', value: '84', icon: <Building2 className="w-5 h-5" />, change: '+5%', positive: true },
//   { title: 'Active Job Postings', value: '156', icon: <Briefcase className="w-5 h-5" />, change: '-2%', positive: false },
//   { title: 'Total Placed Students', value: '942', icon: <CheckCircle2 className="w-5 h-5" />, change: '+18%', positive: true },
// ];

// const companyPlacementsData = [
//   { name: 'Google', placements: 12 },
//   { name: 'Amazon', placements: 8 },
//   { name: 'Microsoft', placements: 5 },
//   { name: 'Meta', placements: 7 },
//   { name: 'Apple', placements: 4 },
//   { name: 'Netflix', placements: 3 },
//   { name: 'Adobe', placements: 6 },
// ];

// const yearlyTrendsData = [
//   { year: '2021', placements: 450 },
//   { year: '2022', placements: 580 },
//   { year: '2023', placements: 720 },
//   { year: '2024', placements: 890 },
//   { year: '2025', placements: 942 },
// ];

// const distributionData = [
//   { name: 'Placed', value: 95 },
//   { name: 'Unplaced', value: 298 },
// ];

// const jobsVsPlacementsData = [
//   { month: 'Jan', jobs: 45, placements: 32 },
//   { month: 'Feb', jobs: 52, placements: 38 },
//   { month: 'Mar', jobs: 48, placements: 42 },
//   { month: 'Apr', jobs: 61, placements: 45 },
//   { month: 'May', jobs: 55, placements: 48 },
//   { month: 'Jun', jobs: 67, placements: 52 },
// ];



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
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-sm">
            Export PDF
          </button>
          <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20">
            Generate Report
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {summaryStats.map((stat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-slate-50 rounded-xl text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${stat.positive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{stat.title}</p>
              <p className="text-3xl font-black text-slate-900 tracking-tighter ">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div> */}

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Company-wise Placement Chart */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
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
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
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
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
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
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm">
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