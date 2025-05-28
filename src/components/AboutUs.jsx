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
      <h1 className="about-title">About TruthSpear</h1>
      <div className="about-section">
        <h2>Project Overview</h2>
        <p>
          <strong>TruthSpear</strong> is a comprehensive news and blog platform that offers curated headlines, personal blogs, real-time weather updates, calendar functionality, and integration of scientific research papers—all in one place.
        </p>
      </div>

      <div className="about-section">
        <h2>Problems It Solves</h2>
        <ul>
          <li>Centralizes credible news, research, and weather for easier access</li>
          <li>Enables users to bookmark and manage articles</li>
          <li>Supports blogging and note-taking for personal reflection or sharing</li>
        </ul>
      </div>

      <div className="about-section">
        <h2>Why We Built It</h2>
        <p>
          We saw a gap in the availability of platforms that blend news, personal expression, and academic research. TruthSpear was born to empower users to stay informed and express their views freely, all from a unified dashboard.
        </p>
      </div>

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