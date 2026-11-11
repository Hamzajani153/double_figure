'use client'

import type { FormEvent } from 'react'

export function ContactForm() {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    event.currentTarget.reset()
    window.alert('Thanks for reaching out. Our team will be in touch soon.')
  }

  return (
    <form className="track-form" onSubmit={submit}>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="contact-name">Your name</label>
          <input id="contact-name" required />
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">Email</label>
          <input id="contact-email" type="email" required />
        </div>
        <div className="form-field full">
          <label htmlFor="contact-message">How can we help?</label>
          <textarea id="contact-message" required />
        </div>
        <div className="form-field full">
          <button className="button button-dark" type="submit">Send message</button>
        </div>
      </div>
    </form>
  )
}
