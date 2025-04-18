import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import { SubmitBtn } from "../../components/ui/Buttons";
import axiosInstance from "../../config/axiosInstance.js";
import Swal from "sweetalert2";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.post("/user/contact", formData);
      if (response.status === 200 || response.status === 201) {
        Swal.fire("Message Sent!", "We will connect with you soon.", "success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        Swal.fire("Oops!", "Failed to send message. Try again.", "error");
      }
    } catch (error) {
      Swal.fire("Error!", "There was an issue sending your message.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-base-300 py-16 px-8 mb-10 rounded-md">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-18 text-primary">
          Let’s Connect
        </h2>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
            <p className="text-base-content/80 mb-6">
              We’re here to assist you with any questions or feedback. Reach out today!
            </p>
            <ul className="space-y-4">
              <li className="flex items-center gap-2">
                <Mail className="w-6 h-6 text-primary" />
                <a href="mailto:lockmyseats@gmail.com" className="text-primary">
                  lockmyseats@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-6 h-6 text-primary" />
                +91 8606727349
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-6 h-6 text-primary" />
                Mahe, Puducherry, India
              </li>
            </ul>
          </div>
          <div className="md:w-1/2">
            <form onSubmit={handleSubmit} className="card bg-base-100 shadow-xl p-6 space-y-6">
              <h3 className="text-2xl font-bold text-center mb-4">Send Us a Message</h3>
              <div className="form-control">
                <label className="label mb-1">
                  <span className="label-text">Your Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="input input-bordered w-full focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label mb-1">
                  <span className="label-text">Your Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="input input-bordered w-full focus:border-primary focus:outline-none"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label mb-1">
                  <span className="label-text">Your Message</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Type your message here"
                  className="textarea textarea-bordered w-full h-32 focus:border-primary focus:outline-none"
                  required
                ></textarea>
              </div>
              <SubmitBtn title="Send Message" loading={loading} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
