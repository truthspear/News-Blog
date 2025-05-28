import React from 'react';
import './AboutUs.css'; // Import the CSS file

const teamMembers = [
  {
    name: 'Atul Kumar Singh',
    role: 'Frontend Developer',
    email: 'atul@example.com',
    image: 'https://ui-avatars.com/api/?name=Aarav+Sharma&background=0D8ABC&color=fff&size=150'
  },
  {
    name: 'Ujjwal Garg',
    role: 'Backend Developer',
    email: 'ujjwal@example.com',
    image: 'https://ui-avatars.com/api/?name=Diya+Mehta&background=0D8ABC&color=fff&size=150'
  },
  {
    name: 'Aman Sharma',
    role: 'UI/UX Designer',
    email: 'aman@example.com',
    image: 'src/assets/images/user.jpg'
  },
  {
    name: 'Niladri Pramanik',
    role: 'Content Writer',
    email: 'Niladri@example.com',
    image: 'https://ui-avatars.com/api/?name=Sneha+Kapoor&background=0D8ABC&color=fff&size=150'
  }
];

export default function AboutUs() {
  return (
    <div className="about-page">
      <h1 className="about-title">Meet Our Team</h1>
      <div className="team-grid">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.image} alt={member.name} className="team-photo" />
            <h2>{member.name}</h2>
            <p>{member.role}</p>
            <a href={`mailto:${member.email}`}>{member.email}</a>
          </div>
        ))}
      </div>
    </div>
  );
}
