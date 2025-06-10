// Define interfaces for the data structure
export interface Program {
  id: string;
  name: string;
  sections: string[];
}

export interface Department {
  id: string;
  name: string;
  programs: Program[];
}

export interface School {
  id: string;
  name: string;
  address: string;
  city?: string;
  state?: string;
  zip?: string;
  contactPerson: string;
  email: string;
  phone: string;
  website?: string;
  description?: string;
  status: string;
  counselors: number;
  students: number;
  logo?: string;
  departments: Department[];
}

// Mock data for schools - shared across components
export const mockSchools: School[] = [
  {
    id: "1",
    name: "Springfield High School",
    address: "123 Main St, Springfield",
    city: "Springfield",
    state: "IL",
    zip: "62701",
    contactPerson: "Principal Skinner",
    email: "skinner@springfield.edu",
    phone: "(555) 123-4567",
    website: "https://springfield.edu",
    status: "active",
    counselors: 3,
    students: 245,
    description: "Springfield High School is committed to academic excellence and student well-being.",
    logo: "/logos/springfield.png",
    departments: [
      { 
        id: "101", 
        name: "Science Department",
        programs: [
          { 
            id: "1001", 
            name: "Bachelor of Science in Biology",
            sections: ["A", "B", "C"]
          },
          { 
            id: "1002", 
            name: "Bachelor of Science in Chemistry",
            sections: ["A", "B"] 
          },
          { 
            id: "1003", 
            name: "Bachelor of Science in Physics",
            sections: ["A"] 
          }
        ]
      },
      { 
        id: "102", 
        name: "Arts Department",
        programs: [
          { 
            id: "1004", 
            name: "Bachelor of Fine Arts",
            sections: ["A", "B", "C", "D"] 
          },
          { 
            id: "1005", 
            name: "Bachelor of Arts in Literature",
            sections: ["A", "B"] 
          }
        ]
      }
    ]
  },
  {
    id: "2",
    name: "Riverdale Academy",
    address: "456 River Rd, Riverdale",
    city: "Riverdale",
    state: "NY",
    zip: "10471",
    contactPerson: "Principal Weatherbee",
    email: "weatherbee@riverdale.edu",
    phone: "(555) 987-6543",
    website: "https://riverdale.edu",
    status: "active",
    counselors: 2,
    students: 178,
    description: "Riverdale Academy provides a nurturing environment for students to excel.",
    logo: "/logos/riverdale.png",
    departments: [
      { 
        id: "201", 
        name: "Business Department",
        programs: [
          { 
            id: "2001", 
            name: "Bachelor of Business Administration",
            sections: ["A", "B", "C"] 
          },
          { 
            id: "2002", 
            name: "Bachelor of Science in Economics",
            sections: ["A"] 
          }
        ]
      },
      { 
        id: "202", 
        name: "Technology Department",
        programs: [
          { 
            id: "2003", 
            name: "Bachelor of Science in Computer Science",
            sections: ["A", "B", "C", "D", "E"] 
          },
          { 
            id: "2004", 
            name: "Bachelor of Science in Information Technology",
            sections: ["A", "B", "C"] 
          }
        ]
      }
    ]
  },
  {
    id: "3",
    name: "Westview High School",
    address: "789 West Ave, Westview",
    city: "Westview",
    state: "NJ",
    zip: "07675",
    contactPerson: "Principal Morita",
    email: "morita@westview.edu",
    phone: "(555) 456-7890",
    website: "https://westview.edu",
    status: "pending",
    counselors: 0,
    students: 0,
    description: "Westview High School is dedicated to fostering academic achievement and personal growth.",
    logo: "/logos/westview.png",
    departments: []
  },
]

// Mock data for counselors
export interface Counselor {
  id: string;
  name: string;
  email: string;
  phone?: string;
  school: string;
  schoolId?: string;
  departments?: string[];
  status: string;
  students: number;
  lastLogin?: string;
}

export const mockCounselors: Counselor[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    email: "sjohnson@springfield.edu",
    phone: "(555) 123-4567",
    school: "Springfield High School",
    schoolId: "1",
    departments: ["101", "102"],
    status: "active",
    students: 82,
    lastLogin: "2023-11-10 09:45 AM",
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    email: "mchen@springfield.edu",
    phone: "(555) 234-5678",
    school: "Springfield High School",
    schoolId: "1",
    departments: ["101"],
    status: "active",
    students: 76,
    lastLogin: "2023-11-09 03:22 PM",
  },
  {
    id: "3",
    name: "Dr. Lisa Rodriguez",
    email: "lrodriguez@riverdale.edu",
    phone: "(555) 345-6789",
    school: "Riverdale Academy",
    schoolId: "2",
    departments: ["201", "202"],
    status: "active",
    students: 91,
    lastLogin: "2023-11-10 11:05 AM",
  },
] 