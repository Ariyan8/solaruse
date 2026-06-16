"use client";

import { useState } from "react";

export default function ContactForm() {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e:any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log(form);
    alert("پیام شما ارسال شد");
  };

  return (

    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-xl shadow space-y-6"
    >

      <h2 className="text-2xl font-bold mb-4">
        ارسال پیام
      </h2>

      <input
        type="text"
        name="name"
        placeholder="نام و نام خانوادگی"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="ایمیل"
        value={form.email}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
        required
      />

      <input
        type="text"
        name="phone"
        placeholder="شماره تماس"
        value={form.phone}
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      <textarea
        name="message"
        placeholder="متن پیام"
        value={form.message}
        onChange={handleChange}
        rows={5}
        className="w-full border p-3 rounded-lg"
        required
      />

      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-3 rounded-lg hover:bg-orange-600"
      >
        ارسال پیام
      </button>

    </form>
  );
}
