import { convertToIndianCurrency } from '@/utils/helper';
import React from 'react';

export const ReminderEmailTemplate = ({
  recipientName,
  dueDate,
  amount,
  paymentLink,
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.title}>Payment Reminder</h1>

        <div style={styles.message}>
          <p style={styles.greeting}>Dear {recipientName},</p>

          <p style={styles.paragraph}>
            This is a friendly reminder that your payment of{' '}
            <strong>{convertToIndianCurrency(amount)}</strong> is due on{' '}
            {dueDate}.
          </p>

          <p style={styles.paragraph}>
            We have stayed stronger together. Let's keep it going.
          </p>

          <div style={styles.paymentBox}>
            <p style={styles.paymentText}>Payment Details:</p>
            <ul style={styles.detailsList}>
              <li>Amount Due: {convertToIndianCurrency(amount)}</li>
              <li>Due Date: {dueDate}</li>
            </ul>
          </div>

          <div style={styles.buttonContainer}>
            <a href={paymentLink} style={styles.button}>
              Make Payment Now
            </a>
          </div>

          <p style={styles.paragraph}>
            If you have already made this payment, please disregard this
            reminder. Thank you for your prompt attention to this matter.
          </p>

          <p style={styles.paragraph}>
            Best regards,
            <br />
            Shyam Colony Welfare Association
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#ffffff',
  },
  content: {
    padding: '30px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  title: {
    color: '#2c3e50',
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  message: {
    color: '#333333',
    lineHeight: '1.6',
  },
  greeting: {
    fontSize: '18px',
    marginBottom: '20px',
  },
  paragraph: {
    marginBottom: '20px',
    fontSize: '16px',
  },
  paymentBox: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '6px',
    margin: '20px 0',
    border: '1px solid #e0e0e0',
  },
  paymentText: {
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#2c3e50',
  },
  detailsList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  buttonContainer: {
    textAlign: 'center',
    margin: '30px 0',
  },
  button: {
    display: 'inline-block',
    padding: '12px 24px',
    backgroundColor: '#3498db',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '4px',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease',
  },
};
