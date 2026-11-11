'use client'

import { CircleHelp, LockKeyhole } from 'lucide-react'
import type { PaymentMethod } from '@/src/types'

type CheckoutPaymentDetailsProps = {
  payment: PaymentMethod
  codAgreed: boolean
  onCodAgreementChange: (agreed: boolean) => void
  codAgreementError?: string
}

export function BankAccountDetails({ title = 'Bank account details (demo)' }: { title?: string }) {
  return (
    <div className="bank-account-details">
      <div className="bank-account-heading">
        <strong>{title}</strong>
        <span className="demo-details-badge">Demo details</span>
      </div>
      <dl>
        <div><dt>Bank</dt><dd>Bank Islami</dd></div>
        <div><dt>Account No.</dt><dd>314700067420001</dd></div>
        <div><dt>Account title</dt><dd>Ocean Clothing</dd></div>
        <div><dt>IBAN</dt><dd>PK87BKIP0314700067420001</dd></div>
      </dl>
      <p className="payment-demo-note">Replace these sample bank details before accepting real payments.</p>
    </div>
  )
}

export function CardBrandBadges() {
  return (
    <span className="card-brand-badges" role="img" aria-label="Visa, Mastercard, and American Express">
      <span className="card-brand-visa" aria-hidden="true">VISA</span>
      <span className="card-brand-mastercard" aria-hidden="true"><i /><i /></span>
      <span className="card-brand-amex" aria-hidden="true">AM<br />EX</span>
    </span>
  )
}

function CreditCardFieldsPreview() {
  const securityCodeHelp = '3-digit security code usually found on the back of your card. American Express cards have a 4-digit code located on the front.'

  return (
    <>
      <div className="card-fields-preview" aria-hidden="true">
        <div className="card-field-preview">Card number <LockKeyhole size={15} /></div>
        <div className="card-field-preview-row">
          <div className="card-field-preview">Expiration date (MM / YY)</div>
          <div className="card-field-preview" title={securityCodeHelp}>Security code <CircleHelp size={16} /></div>
        </div>
        <div className="card-field-preview">Name on card</div>
      </div>
      <p className="sr-only">Card number, expiration date, security code, and name on card fields are visual placeholders and do not accept input.</p>
      <p className="payment-demo-note">Visual preview only. Card details are not collected, stored, or processed.</p>
    </>
  )
}

export function CheckoutPaymentDetails({ payment, codAgreed, onCodAgreementChange, codAgreementError }: CheckoutPaymentDetailsProps) {
  return (
    <div className="payment-details" aria-live="polite">
      {payment === 'card' && <CreditCardFieldsPreview />}

      {payment === 'bank_transfer' && (
        <>
          <p>Make a direct bank transfer from your digital wallet to our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared. Your Order ID will appear after you place your order.</p>
          <p>After payment, share a screenshot as proof on WhatsApp only: <a href="https://wa.me/923335315527" target="_blank" rel="noreferrer">+92 333 5315527</a>. Thank you for your order.</p>
          <BankAccountDetails />
        </>
      )}

      {payment === 'cod' && (
        <>
          <p>Pay with cash upon delivery. Open parcel policy is available; please mention “Open parcel” in Cart notes.</p>
          <p>If you refuse the parcel when the rider arrives, Rs. 300 delivery charges are due via bank transfer to the account below.</p>
          <label className="cod-agreement" htmlFor="cod-agreement">
            <input
              id="cod-agreement"
              type="checkbox"
              checked={codAgreed}
              onChange={(event) => onCodAgreementChange(event.target.checked)}
              aria-invalid={Boolean(codAgreementError)}
              aria-describedby={codAgreementError ? 'cod-agreement-error' : undefined}
            />
            <span>I swear by Allah (SWT) that I will receive this parcel when the rider comes to deliver it. If I fail to do so, I agree to pay Rs. 300 in delivery charges.</span>
          </label>
          {codAgreementError && <p className="field-error" id="cod-agreement-error">{codAgreementError}</p>}
          <BankAccountDetails title="Account for delivery charges (demo)" />
        </>
      )}
    </div>
  )
}
