import { Resend } from 'resend';
import VerificationEmail from '../../emails/VerificationEmail';

const resend = new Resend(process.env.RESEND_API_KEY);


export { resend };