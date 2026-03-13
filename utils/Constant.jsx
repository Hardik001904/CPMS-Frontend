// Fix: Removed .ts extension from import
// import { Job, Application, ApplicationStatus, User, UserRole } from './types';

export const INITIAL_ADMIN = {
  id: "admin_1",
  name: "Placement Director",
  email: "admin@placement.edu",
  // role: UserRole.ADMIN,
  isApproved: true,
};

export const MOCK_USERS = [
  INITIAL_ADMIN,
  // Companies
  {
    id: "c1",
    name: "Google",
    email: "hiring@google.com",
    // role: UserRole.COMPANY,
    isApproved: true,
    profile: {
      description:
        "Global leader in search, cloud, and advertising technology.",
      website: "https://careers.google.com",
      location: "Mountain View, CA",
      size: "100,000+",
    },
  },
  {
    id: "c2",
    name: "Microsoft",
    email: "campus@microsoft.com",
    // role: UserRole.COMPANY,
    isApproved: true,
    profile: {
      description:
        "Empowering every person and every organization on the planet to achieve more.",
      website: "https://microsoft.com/careers",
      location: "Redmond, WA",
      size: "150,000+",
    },
  },
  {
    id: "c3",
    name: "Amazon",
    email: "jobs@amazon.com",
    // role: UserRole.COMPANY,
    isApproved: true,
    profile: {
      description: "Earth's most customer-centric company.",
      website: "https://amazon.jobs",
      location: "Seattle, WA",
      size: "1,000,000+",
    },
  },
  // Students
  {
    id: "s1",
    name: "Alex Johnson",
    email: "alex.j@university.edu",
    // role: UserRole.STUDENT,
    isApproved: true,
    profile: {
      university: "Tech Institute of Technology",
      // Added missing department property
      department: "Computer Science",
      branch: "Computer Science",
      cgpa: "9.2",
      gradYear: "2026",
      phone: "+1 555-0101",
      dob: "2004-05-15",
      skills: ["React", "Node.js", "TypeScript", "Go"],
      resumeUrl: "#",
      enrollmentNumber: "TIT/2026/CS/042",
    },
  },
  {
    id: "s2",
    name: "Sarah Chen",
    email: "sarah.c@university.edu",
    // role: UserRole.STUDENT,
    isApproved: true,
    profile: {
      university: "Tech Institute of Technology",
      // Added missing department property
      department: "Data Science",
      branch: "Data Science",
      cgpa: "8.8",
      gradYear: "2026",
      phone: "+1 555-0102",
      dob: "2004-08-22",
      skills: ["Python", "SQL", "TensorFlow", "Tableau"],
      resumeUrl: "#",
      enrollmentNumber: "TIT/2026/DS/015",
    },
  },
  {
    id: "s3",
    name: "Michael Ross",
    email: "m.ross@university.edu",
    // role: UserRole.STUDENT,
    isApproved: true,
    profile: {
      university: "Tech Institute of Technology",
      // Added missing department property
      department: "Information Technology",
      branch: "Information Technology",
      cgpa: "7.5",
      gradYear: "2026",
      phone: "+1 555-0103",
      dob: "2003-12-10",
      skills: ["Java", "Spring Boot", "MySQL"],
      resumeUrl: "#",
      enrollmentNumber: "TIT/2026/IT/089",
    },
  },
  // Pending Approval User
  {
    id: "s4",
    name: "Jordan Smith",
    email: "jordan.s@university.edu",
    // role: UserRole.STUDENT,
    isApproved: false,
    profile: {
      university: "Tech Institute of Technology",
      // Added missing department property
      department: "Electrical Engineering",
      branch: "Electrical Engineering",
      cgpa: "8.1",
      gradYear: "2026",
      phone: "+1 555-0104",
      dob: "2004-01-05",
      skills: ["MATLAB", "C++", "Circuit Design"],
      resumeUrl: "#",
      enrollmentNumber: "TIT/2026/EE/003",
    },
  },
];

export const MOCK_JOBS = [
  {
    id: "j1",
    title: "Software Engineer (L3)",
    companyId: "c1",
    companyName: "Google",
    location: "Mountain View, CA",
    salary: "$165,000",
    description:
      "Work on large-scale distributed systems and core search infrastructure.",
    criteria: "CGPA > 8.5, Proficiency in C++, Java, or Go.",
    postedDate: "2024-05-10",
    status: "Open",
  },
  {
    id: "j2",
    title: "Azure Cloud Architect",
    companyId: "c2",
    companyName: "Microsoft",
    location: "Redmond, WA (Remote Friendly)",
    salary: "$145,000",
    description:
      "Design and implement cloud solutions for enterprise customers using Azure.",
    criteria: "CGPA > 8.0, Strong networking and virtualization knowledge.",
    postedDate: "2024-05-12",
    status: "Open",
  },
  {
    id: "j3",
    title: "Data Scientist I",
    companyId: "c3",
    companyName: "Amazon",
    location: "Seattle, WA",
    salary: "$130,000",
    description:
      "Apply machine learning models to optimize logistics and delivery routes.",
    criteria: "Strong Python and SQL skills. Experience with AWS is a plus.",
    postedDate: "2024-05-14",
    status: "Open",
  },
  {
    id: "j4",
    title: "Frontend Developer (React)",
    companyId: "c2",
    companyName: "Microsoft",
    location: "Remote",
    salary: "$125,000",
    description:
      "Build user-facing features for Microsoft Teams and Office 365.",
    criteria: "Experience with React, TypeScript, and modern CSS frameworks.",
    postedDate: "2024-05-16",
    status: "Open",
  },
];

export const MOCK_APPLICATIONS = [
  {
    id: "a1",
    jobId: "j1",
    jobTitle: "Software Engineer (L3)",
    studentName: "Alex Johnson",
    studentId: "s1",
    companyId: "c1",
    companyName: "Google",
    appliedDate: "2024-05-15",
    // status: ApplicationStatus.SHORTLISTED,
  },
  {
    id: "a2",
    jobId: "j3",
    jobTitle: "Data Scientist I",
    studentName: "Sarah Chen",
    studentId: "s2",
    companyId: "c3",
    companyName: "Amazon",
    appliedDate: "2024-05-16",
    // status: ApplicationStatus.SELECTED,
  },
  {
    id: "a3",
    jobId: "j2",
    jobTitle: "Azure Cloud Architect",
    studentName: "Alex Johnson",
    studentId: "s1",
    companyId: "c2",
    companyName: "Microsoft",
    appliedDate: "2024-05-17",
    // status: ApplicationStatus.APPLIED,
  },
  {
    id: "a4",
    jobId: "j4",
    jobTitle: "Frontend Developer (React)",
    studentName: "Michael Ross",
    studentId: "s3",
    companyId: "c2",
    companyName: "Microsoft",
    appliedDate: "2024-05-18",
    // status: ApplicationStatus.REJECTED,
  },
];
