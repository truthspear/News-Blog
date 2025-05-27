import React, { useState } from "react";
import { db } from "./firebaseContact";
import { collection, addDoc } from "firebase/firestore";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        createdAt: new Date()
      });
      alert("Your message has been submitted 👍");

      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Error submitting contact form:", err);
      alert("Failed to submit. Please try again.");
    }

    setIsSubmitting(false);
  };

  return (
    <div className="contact-container">
      <h1 className="contact-title">Contact Us</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          className="contact-input"
          placeholder="Your Name"
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="contact-input"
          placeholder="Your Email"
        />

        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          className="contact-textarea"
          placeholder="Your Message"
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="contact-button"
        >
          {isSubmitting ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
