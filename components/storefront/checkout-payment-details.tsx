'use client'

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

export function CheckoutPaymentDetails({ payment, codAgreed, onCodAgreementChange, codAgreementError }: CheckoutPaymentDetailsProps) {
  return (
    <div className="payment-details" aria-live="polite">
      {payment === 'card' && (
        <>
          <p>The 3-digit security code is usually on the back of your card. American Express cards have a 4-digit code on the front.</p>
          <p className="payment-demo-note">Card processing is not connected in this demo, and this form does not collect card details.</p>
        </>
      )}

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
