export interface Education {
  degree: string
  institution: string
  year: string
  /** Optional, e.g. "CGPA: 9.32". */
  details?: string
}

export interface Certification {
  name: string
  issuer: string
  /** Optional — e.g. "Aug 2026". */
  date?: string
  /** Optional — e.g. "Valid through Aug 2029". */
  note?: string
  /** Optional certificate PDF/image in /public, e.g. 'certificates/my-cert.pdf'. */
  file?: string
  /** Optional online verification link. */
  credentialUrl?: string
  /** Optional ID to show alongside the verification link. */
  credentialId?: string
}

export const education: Education[] = [
  {
    degree: 'B.Tech in Computer Science and Engineering',
    institution: 'Sree Vidyanikethan Engineering College, Tirupati',
    year: '2020 – 2024',
    details: 'CGPA: 9.32',
  },
]

export const certifications: Certification[] = [
  {
    name: 'Cisco Certified AI Technical Practitioner',
    issuer: 'Cisco',
    date: 'Aug 2026',
    note: 'Valid through Aug 2029',
    file: 'certificates/cisco-ai-technical-practitioner.pdf',
    // Opens Cisco's official verification page directly for this credential.
    credentialUrl: 'https://cp.certmetrics.com/cisco/en/public/verify/credential/8a7e7dd206754476a42ea9f2092cf97a',
  },
  {
    name: 'Angular 21 Full Course: Complete Zero to Hero',
    issuer: 'Udemy',
    date: 'Aug 2026',
    note: '25.5 hours',
    file: 'certificates/udemy-angular-21.pdf',
    credentialUrl: 'https://www.udemy.com/certificate/UC-f5bdd9cd-9c79-4e7c-abda-ecb656d7e8dc/',
  },
  {
    name: 'Mastering the System Design Interview',
    issuer: 'Udemy · Sundog Education',
    date: 'Aug 2026',
    note: '5 hours',
    file: 'certificates/udemy-system-design.pdf',
    credentialUrl: 'https://www.udemy.com/certificate/UC-39906add-6313-455e-8021-e6b1a649b192/',
  },
  {
    name: 'HTML, CSS, JavaScript, React & SQL',
    issuer: 'NxtWave',
  },
]
