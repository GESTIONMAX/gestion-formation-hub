import nodemailer, { Transporter } from 'nodemailer';

// Interface pour les options d'email
interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: Array<{
    filename: string;
    content: Buffer | string;
    path?: string;
    contentType?: string;
  }>;
}

let transporter: Transporter | null = null;

// Initialisation du transporteur Nodemailer
function initTransporter() {
  if (transporter) return transporter;
  
  // Utiliser les variables d'environnement pour la configuration
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.example.com',
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASSWORD || '',
    },
  });
  
  return transporter;
}

// Fonction pour envoyer un email
export async function sendMail(options: EmailOptions): Promise<boolean> {
  try {
    const mailTransporter = initTransporter();

    // Configurer les options d'envoi
    const mailOptions = {
      from: options.from || process.env.MAIL_FROM || 'noreply@gestionmax.fr',
      to: options.to,
      cc: options.cc,
      bcc: options.bcc,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments,
    };

    // Envoyer l'email
    await mailTransporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return false;
  }
}

// Fonction pour envoyer un email de notification quand un nouveau document est disponible
export async function sendDocumentNotification(
  apprenantEmail: string, 
  apprenantNom: string,
  apprenantPrenom: string | null,
  documentNom: string,
  etape: string,
  programmeNom: string
): Promise<boolean> {
  const nom = apprenantPrenom ? `${apprenantPrenom} ${apprenantNom}` : apprenantNom;
  const etapeFormatee = 
    etape === 'avant' ? 'avant la formation' :
    etape === 'pendant' ? 'pendant la formation' : 'après la formation';
  
  return sendMail({
    to: apprenantEmail,
    subject: `Nouveau document disponible pour votre formation ${programmeNom}`,
    text: 
`Bonjour ${nom},

Un nouveau document est disponible pour votre formation "${programmeNom}".

Nom du document: ${documentNom}
Étape: ${etapeFormatee}

Vous pouvez le consulter dès maintenant dans votre espace apprenant.

Cordialement,
L'équipe GestionMax`,
    html: 
`<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Nouveau document disponible</h2>
  <p>Bonjour ${nom},</p>
  <p>Un nouveau document est disponible pour votre formation "<strong>${programmeNom}</strong>".</p>
  <div style="background-color: #f5f5f5; padding: 15px; margin: 15px 0; border-left: 4px solid #0070f3;">
    <p><strong>Nom du document:</strong> ${documentNom}</p>
    <p><strong>Étape:</strong> ${etapeFormatee}</p>
  </div>
  <p>Vous pouvez le consulter dès maintenant dans votre <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://formation.gestionmax.fr'}/apprenants/espace">espace apprenant</a>.</p>
  <p>Cordialement,<br>L'équipe GestionMax</p>
</div>`
  });
}
