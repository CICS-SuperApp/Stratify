import { useState, type FormEvent } from 'react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    'w-full font-sans text-[#1B1B18] font-medium bg-transparent border border-[rgba(27,27,24,0.25)] rounded-[10px] px-4 py-4 outline-none transition-colors duration-200 focus:border-[#1B1B18] placeholder:text-[rgba(27,27,24,0.5)]';
  const labelClass =
    'section-label text-[#BCC1B7] block mb-2';

  if (submitted) {
    return (
      <div className="mt-8 p-6 rounded-[10px] bg-[#BCC1B7]/20">
        <p className="font-sans text-base font-medium text-[#BCC1B7]">
          Thank you! We will get back to you soon.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="form-field">
        <label className={labelClass}>Name</label>
        <input
          type="text"
          placeholder="Your Name"
          required
          className={inputClass}
          style={{ fontSize: 'clamp(16px, 1.25vw, 18px)' }}
        />
      </div>
      <div className="form-field">
        <label className={labelClass}>Email</label>
        <input
          type="email"
          placeholder="your@email.com"
          required
          className={inputClass}
          style={{ fontSize: 'clamp(16px, 1.25vw, 18px)' }}
        />
      </div>
      <div className="form-field">
        <label className={labelClass}>Message</label>
        <textarea
          placeholder="Your Message..."
          required
          rows={5}
          className={`${inputClass} resize-y min-h-[150px]`}
          style={{ fontSize: 'clamp(16px, 1.25vw, 18px)' }}
        />
      </div>
      <button
        type="submit"
        className="form-field btn-text bg-[#1B1B18] text-[#EDE8E4] px-8 py-4 rounded-[10px] hover:scale-[1.02] active:scale-[0.98] transition-transform duration-200 self-start"
      >
        Send Message
      </button>
    </form>
  );
}
