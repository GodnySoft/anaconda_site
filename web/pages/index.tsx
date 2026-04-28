import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch('/api/v1/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, phone, company }),
    });

    if (res.ok) {
      alert('Lead created successfully!');
    } else {
      alert('Failed to create lead.');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <nav className="mb-4 flex space-x-4">
        <Link href="/implementation-levels">
          <a className="text-blue-500">Implementation Levels</a>
        </Link>
        <Link href="/demo">
          <a className="text-blue-500">Demo</a>
        </Link>
        <Link href="/workspace">
          <a className="text-blue-500">Workspace</a>
        </Link>
        <Link href="/chatbot">
          <a className="text-blue-500">AI Chatbot</a>
        </Link>
      </nav>
      <h1 className="text-2xl font-bold mb-4">Anaconda</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block">Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="border p-2 w-full" />
        </div>
        <div>
          <label htmlFor="email" className="block">Email</label>
          <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="border p-2 w-full" />
        </div>
        <div>
          <label htmlFor="phone" className="block">Phone</label>
          <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="border p-2 w-full" />
        </div>
        <div>
          <label htmlFor="company" className="block">Company</label>
          <input type="text" id="company" value={company} onChange={(e) => setCompany(e.target.value)} className="border p-2 w-full" />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
}
