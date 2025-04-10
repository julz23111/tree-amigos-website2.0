import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';
import { SendEmailDto } from './dto/send-email.dto';

@Injectable()
export class EmailService {
  private resend = new Resend(process.env.RESEND_API_KEY);

  async sendCustomerEmail(data: SendEmailDto) {
    try {
      const [adminResponse, customerResponse] = await Promise.all([
        // Send to Tree Amigos admin
        this.resend.emails.send({
          from: 'Tree Amigos <estimates@treeamigosmt.com>',
          to: ['estimates@treeamigosmt.com'],
          subject: `📥 New Estimate Request from ${data.name}`,
          html: `
            <p><strong>Name:</strong> ${data.name}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Message:</strong><br/>${data.message}</p>
          `,
        }),

        // Confirmation to the customer
        this.resend.emails.send({
          from: 'Tree Amigos <estimates@treeamigosmt.com>',
          to: [data.email],
          subject: '🌳 We received your estimate request!',
          html: `
            <p>Hi ${data.name},</p>
            <p>Thanks for reaching out to Tree Amigos. We've received your request and will get back to you shortly!</p>
            <hr />
            <p><strong>Here’s what you submitted:</strong></p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Message:</strong><br/>${data.message}</p>
            <br/>
            <p>– The Tree Amigos Team 🌲</p>
          `,
        }),
      ]);

      return { success: true, adminResponse, customerResponse };
    } catch (error) {
      console.error('Email sending failed:', error);
      return { success: false, error };
    }
  }
}