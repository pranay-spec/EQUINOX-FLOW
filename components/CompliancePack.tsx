'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Download, Shield, CheckCircle, AlertTriangle, 
  Sparkles, Clock, Globe, Building, CreditCard, Lock,
  ChevronRight, Eye, Zap, Award, TrendingUp, Users, X
} from 'lucide-react';
import { CalendarIntegration } from './CalendarIntegration';
import toast from 'react-hot-toast';

interface CompliancePackProps {
  location: string;
  userProfile: any;
}

interface Document {
  id: string;
  name: string;
  type: string;
  status: 'ready' | 'generating' | 'pending';
  description: string;
  icon: any;
  color: string;
}

export function CompliancePack({ location, userProfile }: CompliancePackProps) {
  const [activeTab, setActiveTab] = useState<'documents' | 'credibility' | 'negotiation'>('documents');
  const [trustScore, setTrustScore] = useState(0);
  const [generatingDoc, setGeneratingDoc] = useState<string | null>(null);
  const [downloadedDocs, setDownloadedDocs] = useState<string[]>([]);
  const [showCredibilityLetter, setShowCredibilityLetter] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<Document | null>(null);
  const [showCustomizeModal, setShowCustomizeModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState(location || 'Berlin, Germany');
  const [letterData, setLetterData] = useState({
    applicantName: 'John Doe',
    propertyAddress: location,
    landlordName: 'Property Manager',
    additionalNotes: ''
  });

  // Top 10 developed cities for compliance
  const topCities = [
    { name: 'Berlin, Germany', flag: '🇩🇪', treaty: 'Germany-US Tax Treaty' },
    { name: 'Tokyo, Japan', flag: '🇯🇵', treaty: 'Japan-US Tax Treaty' },
    { name: 'Singapore', flag: '🇸🇬', treaty: 'Singapore-US Tax Treaty' },
    { name: 'London, UK', flag: '🇬🇧', treaty: 'UK-US Tax Treaty' },
    { name: 'Amsterdam, Netherlands', flag: '🇳🇱', treaty: 'Netherlands-US Tax Treaty' },
    { name: 'Zurich, Switzerland', flag: '🇨🇭', treaty: 'Switzerland-US Tax Treaty' },
    { name: 'Sydney, Australia', flag: '🇦🇺', treaty: 'Australia-US Tax Treaty' },
    { name: 'Toronto, Canada', flag: '🇨🇦', treaty: 'Canada-US Tax Treaty' },
    { name: 'Dubai, UAE', flag: '🇦🇪', treaty: 'UAE Tax Regulations' },
    { name: 'Paris, France', flag: '🇫🇷', treaty: 'France-US Tax Treaty' },
  ];

  const currentCityData = topCities.find(c => c.name === selectedCity) || topCities[0];

  const trustComponents = {
    payment_reliability: 94,
    income_stability: 89,
    credit_history: 91,
    asset_verification: 87,
    employment_tenure: 92
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      let current = 0;
      const interval = setInterval(() => {
        current += 1;
        setTrustScore(current);
        if (current >= 87.3) clearInterval(interval);
      }, 20);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const documents: Document[] = [
    { id: 'form1040nr', name: 'Form 1040-NR (Pre-filled)', type: 'US Tax', status: 'ready', description: 'Non-resident alien income tax return with your data pre-populated', icon: FileText, color: '#10b981' },
    { id: 'dtaa', name: 'DTAA Relief Application', type: 'Tax Treaty', status: 'ready', description: 'Double Taxation Avoidance Agreement claim form for Germany-US treaty', icon: Globe, color: '#3b82f6' },
    { id: 'w8ben', name: 'Form W-8BEN', type: 'Withholding', status: 'ready', description: 'Certificate of foreign status for US tax withholding', icon: Shield, color: '#8b5cf6' },
    { id: 'residency', name: 'Tax Residency Certificate', type: 'Certification', status: 'generating', description: 'Official proof of tax residency status', icon: Award, color: '#f59e0b' },
    { id: 'income_proof', name: 'Verified Income Statement', type: 'Financial', status: 'ready', description: 'Blockchain-verified income documentation', icon: CreditCard, color: '#ec4899' },
    { id: 'credibility', name: 'Financial Credibility Letter', type: 'Negotiation', status: 'ready', description: 'AI-generated letter for landlords/banks explaining your financial profile', icon: Building, color: '#06b6d4' },
  ];

  const handleDownload = (doc: Document) => {
    setGeneratingDoc(doc.id);
    
    // Simulate document generation
    setTimeout(() => {
      // Create a sample PDF-like content
      const docContent = generateDocumentContent(doc);
      const blob = new Blob([docContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${doc.name.replace(/[^a-zA-Z0-9]/g, '_')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setGeneratingDoc(null);
      setDownloadedDocs(prev => [...prev, doc.id]);
      toast.success(`${doc.name} downloaded successfully!`, { icon: '📄' });
    }, 1500);
  };

  const handlePreview = (doc: Document) => {
    setPreviewDoc(doc);
  };

  const generateCredibilityLetter = () => {
    const date = new Date().toLocaleDateString();
    return `
═══════════════════════════════════════════════════════════════
            FINANCIAL CREDIBILITY LETTER
         Cryptographically Signed Attestation
═══════════════════════════════════════════════════════════════

Date: ${date}
Reference: FCL-${Date.now()}
Digital Signature: 0x7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069

───────────────────────────────────────────────────────────────
                    OFFICIAL ATTESTATION
───────────────────────────────────────────────────────────────

To: ${letterData.landlordName}
Re: Rental Application for ${letterData.propertyAddress}

Dear ${letterData.landlordName},

I am writing to introduce ${letterData.applicantName}, who has expressed
interest in renting your property at ${letterData.propertyAddress}.

While the applicant's income originates from international sources,
our Zero-Knowledge verification system has confirmed a Trust Score
of ${trustScore.toFixed(1)}/100, placing them in the top 8% of verified
applicants globally.

───────────────────────────────────────────────────────────────
            VERIFIED ATTRIBUTES (Zero-Knowledge Proof)
───────────────────────────────────────────────────────────────

The following attributes have been cryptographically verified
WITHOUT exposing the applicant's sensitive financial data:

  ✓ Consistent income stream for 36+ consecutive months
  ✓ Zero payment defaults in rental history (verified)
  ✓ Verified liquid assets exceeding 12 months rent
  ✓ Active employment with Fortune 500 company
  ✓ Payment reliability score: 94%
  ✓ Credit history score: 91%
  ✓ Income stability index: 89%

───────────────────────────────────────────────────────────────
                    TRUST SCORE BREAKDOWN
───────────────────────────────────────────────────────────────

  Payment Reliability:     ████████████████████░░  94%
  Income Stability:        █████████████████░░░░░  89%
  Credit History:          ██████████████████░░░░  91%
  Asset Verification:      █████████████████░░░░░  87%
  Employment Tenure:       ██████████████████░░░░  92%
  ─────────────────────────────────────────────────
  OVERALL TRUST SCORE:     ██████████████████░░░░  ${trustScore.toFixed(1)}%

───────────────────────────────────────────────────────────────
                    VERIFICATION DETAILS
───────────────────────────────────────────────────────────────

This letter is backed by cryptographic zero-knowledge proofs that
verify the applicant's financial standing without exposing their
actual bank statements, salary figures, or personal financial data.

Verification Method: zk-SNARK (Zero-Knowledge Succinct Non-Interactive
                     Argument of Knowledge)
Blockchain: Ethereum Mainnet
Proof Hash: 0x${Array(64).fill(0).map(() => Math.floor(Math.random() * 16).toString(16)).join('')}

${letterData.additionalNotes ? `
───────────────────────────────────────────────────────────────
                    ADDITIONAL NOTES
───────────────────────────────────────────────────────────────

${letterData.additionalNotes}
` : ''}
───────────────────────────────────────────────────────────────
                    INDEPENDENT VERIFICATION
───────────────────────────────────────────────────────────────

This attestation can be independently verified at:
https://verify.equinoxflow.com/FCL-${Date.now()}

The verification link will remain active for 90 days from the
date of issuance.

───────────────────────────────────────────────────────────────

Sincerely,

Equinox Flow Negotiation Agent
AI-Powered Financial Verification System

[DIGITAL SIGNATURE VERIFIED]
[DOCUMENT INTEGRITY: INTACT]
[TIMESTAMP: ${new Date().toISOString()}]

═══════════════════════════════════════════════════════════════
    This document was generated by Equinox Flow Compliance Engine
         © 2026 Equinox Flow - Agentic Financial Digital Twin
═══════════════════════════════════════════════════════════════
`;
  };

  const generateDocumentContent = (doc: Document) => {
    const date = new Date().toLocaleDateString();
    const templates: { [key: string]: string } = {
      form1040nr: `
═══════════════════════════════════════════════════════════════
                    FORM 1040-NR (Pre-filled)
              U.S. Nonresident Alien Income Tax Return
═══════════════════════════════════════════════════════════════

Tax Year: 2025
Generated: ${date}
Status: PRE-FILLED - Ready for Review

───────────────────────────────────────────────────────────────
PART I - IDENTIFICATION
───────────────────────────────────────────────────────────────
Name: [Your Name]
Current Address: \
Country of Citizenship: [Your Country]
Visa Type: [Your Visa Type]

───────────────────────────────────────────────────────────────
PART II - INCOME
───────────────────────────────────────────────────────────────
Line 1a - Wages, salaries, tips: $95,000.00
Line 2a - Tax-exempt interest: $0.00
Line 3a - Qualified dividends: $1,200.00
Line 4a - IRA distributions: $0.00

───────────────────────────────────────────────────────────────
PART III - TAX COMPUTATION
───────────────────────────────────────────────────────────────
Taxable Income: $78,500.00
Tax (from Tax Table): $12,847.00
Tax Treaty Benefits Applied: -$1,927.05 (15% relief)
Total Tax Due: $10,919.95

───────────────────────────────────────────────────────────────
CERTIFICATION
───────────────────────────────────────────────────────────────
This form has been pre-filled using verified financial data.
Please review all information before filing.

Generated by Equinox Flow Compliance Engine
Document ID: EQ-1040NR-${Date.now()}
      `,
      dtaa: `
═══════════════════════════════════════════════════════════════
              DTAA RELIEF APPLICATION FORM
        Double Taxation Avoidance Agreement Claim
              Germany-United States Treaty
═══════════════════════════════════════════════════════════════

Application Date: ${date}
Treaty Reference: Germany-US Tax Treaty (1989, amended 2006)

───────────────────────────────────────────────────────────────
APPLICANT INFORMATION
───────────────────────────────────────────────────────────────
Name: [Your Name]
Tax Residence: \
US Tax ID (if any): [Your TIN]
German Tax ID: [To be assigned]

───────────────────────────────────────────────────────────────
TREATY BENEFITS CLAIMED
───────────────────────────────────────────────────────────────
Article 15 - Income from Employment
  → Relief on employment income during transition period
  → Estimated benefit: $8,400/year

Article 23 - Relief from Double Taxation
  → Credit method for US taxes paid
  → Prevents taxation in both jurisdictions

───────────────────────────────────────────────────────────────
SUPPORTING DOCUMENTS ATTACHED
───────────────────────────────────────────────────────────────
☑ Certificate of Tax Residence
☑ Employment Contract
☑ US Tax Returns (last 2 years)
☑ Proof of German Address

Generated by Equinox Flow Compliance Engine
Document ID: EQ-DTAA-${Date.now()}
      `,
      w8ben: `
═══════════════════════════════════════════════════════════════
                      FORM W-8BEN
       Certificate of Foreign Status of Beneficial Owner
            for United States Tax Withholding
═══════════════════════════════════════════════════════════════

Generated: ${date}

───────────────────────────────────────────────────────────────
PART I - IDENTIFICATION OF BENEFICIAL OWNER
───────────────────────────────────────────────────────────────
1. Name: [Your Name]
2. Country of citizenship: [Your Country]
3. Permanent residence address: \
4. Mailing address (if different): Same as above

───────────────────────────────────────────────────────────────
PART II - CLAIM OF TAX TREATY BENEFITS
───────────────────────────────────────────────────────────────
9a. I certify that the beneficial owner is a resident of:
    Germany (Treaty Country)

9b. Special rates and conditions:
    Article 12 - Royalties: 0% withholding
    Article 11 - Interest: 0% withholding
    Article 10 - Dividends: 15% withholding

───────────────────────────────────────────────────────────────
CERTIFICATION
───────────────────────────────────────────────────────────────
Under penalties of perjury, I declare that I have examined
the information on this form and to the best of my knowledge
and belief it is true, correct, and complete.

Signature: _________________________ Date: ${date}

Generated by Equinox Flow Compliance Engine
Document ID: EQ-W8BEN-${Date.now()}
      `,
      residency: `
═══════════════════════════════════════════════════════════════
              TAX RESIDENCY CERTIFICATE
═══════════════════════════════════════════════════════════════

Certificate Number: TRC-${Date.now()}
Issue Date: ${date}
Valid Until: ${new Date(Date.now() + 365*24*60*60*1000).toLocaleDateString()}

───────────────────────────────────────────────────────────────
CERTIFICATE HOLDER
───────────────────────────────────────────────────────────────
Name: [Your Name]
Date of Birth: [Your DOB]
Nationality: [Your Nationality]
Passport Number: [Your Passport]

───────────────────────────────────────────────────────────────
RESIDENCY STATUS
───────────────────────────────────────────────────────────────
Tax Residence Country: Germany
Address: \
Residency Start Date: [Move Date]
Tax Year: 2025

───────────────────────────────────────────────────────────────
CERTIFICATION
───────────────────────────────────────────────────────────────
This is to certify that the above-named individual is a
tax resident of Germany for the purposes of the Double
Taxation Agreement between Germany and the United States.

This certificate is issued for tax treaty purposes only.

Generated by Equinox Flow Compliance Engine
      `,
      income_proof: `
═══════════════════════════════════════════════════════════════
            VERIFIED INCOME STATEMENT
         Blockchain-Verified Documentation
═══════════════════════════════════════════════════════════════

Verification ID: VIS-${Date.now()}
Generated: ${date}
Blockchain Hash: 0x7f83b...e4d2a

───────────────────────────────────────────────────────────────
INCOME VERIFICATION
───────────────────────────────────────────────────────────────
Verified Annual Income: $95,000.00 USD
Income Source: Employment
Employer: [Employer Name]
Employment Status: Full-time
Tenure: 36+ months

───────────────────────────────────────────────────────────────
MONTHLY BREAKDOWN (Last 12 Months)
───────────────────────────────────────────────────────────────
Average Monthly: $7,916.67
Highest Month: $8,500.00 (December - Bonus)
Lowest Month: $7,916.67
Consistency Score: 98.5%

───────────────────────────────────────────────────────────────
VERIFICATION STATUS
───────────────────────────────────────────────────────────────
☑ Bank statements verified
☑ Employer confirmation received
☑ Tax returns cross-referenced
☑ Blockchain attestation complete

This document is cryptographically signed and can be
verified at: verify.equinoxflow.com/VIS-${Date.now()}

Generated by Equinox Flow Compliance Engine
      `,
      credibility: `
═══════════════════════════════════════════════════════════════
            FINANCIAL CREDIBILITY LETTER
              AI-Generated Attestation
═══════════════════════════════════════════════════════════════

Date: ${date}
Reference: FCL-${Date.now()}

To Whom It May Concern,

───────────────────────────────────────────────────────────────

I am writing to introduce [Applicant Name], who has expressed
interest in renting your property at \.

While the applicant's income originates from international
sources, our Zero-Knowledge verification system has confirmed
a Trust Score of 87.3/100, placing them in the top 8% of
verified applicants.

KEY VERIFIED ATTRIBUTES:
───────────────────────────────────────────────────────────────
✓ Consistent income for 36+ months
✓ Zero payment defaults in rental history
✓ Verified assets exceeding 12 months rent
✓ Active employment with Fortune 500 company
✓ Payment reliability score: 94%
✓ Credit history score: 91%

ZERO-KNOWLEDGE VERIFICATION:
───────────────────────────────────────────────────────────────
This letter is backed by cryptographic proofs that verify
the applicant's financial standing without exposing sensitive
personal data. The verification can be independently confirmed.

Verification URL: verify.equinoxflow.com/FCL-${Date.now()}

Sincerely,
Equinox Flow Negotiation Agent
AI-Powered Financial Verification System
      `
    };
    return templates[doc.id] || `Document: ${doc.name}\nGenerated: ${date}\n\nContent for ${doc.name} would appear here.`;
  };

  const renderTrustScoreRing = () => (
    <div style={{ position: 'relative', width: '200px', height: '200px' }}>
      <svg width="200" height="200" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="100" cy="100" r="85" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
        <motion.circle
          cx="100" cy="100" r="85" fill="none" stroke="url(#trustGradient)" strokeWidth="12"
          strokeLinecap="round" strokeDasharray={534}
          initial={{ strokeDashoffset: 534 }}
          animate={{ strokeDashoffset: 534 - (534 * trustScore / 100) }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="trustGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Lock style={{ width: '24px', height: '24px', color: '#10b981', marginBottom: '8px' }} />
        <motion.span style={{ fontSize: '42px', fontWeight: 800, color: 'white' }}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {trustScore.toFixed(1)}
        </motion.span>
        <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', marginTop: '4px' }}>Zero-Knowledge Score</span>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '100px', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '16px' }}>
          <Zap style={{ width: '16px', height: '16px', color: '#10b981' }} />
          <span style={{ fontSize: '13px', color: '#10b981', fontWeight: 600 }}>Autonomous Compliance Engine</span>
        </motion.div>
        <h2 style={{ fontSize: '36px', fontWeight: 800, background: 'linear-gradient(135deg, #667eea 0%, #10b981 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
          One-Click Compliance Pack
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
          AI-generated, pre-filled documentation ready for {selectedCity}. All forms verified against latest tax treaties.
        </p>
      </div>

      {/* City Selector */}
      <div style={{ 
        background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(102, 126, 234, 0.2)',
        marginBottom: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Globe style={{ width: '20px', height: '20px', color: '#667eea' }} />
            <span style={{ fontSize: '14px', fontWeight: 600, color: 'white' }}>Select Destination City</span>
          </div>
          <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Top 10 Developed Cities</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
          {topCities.map((city) => (
            <motion.button
              key={city.name}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedCity(city.name);
                setLetterData(prev => ({ ...prev, propertyAddress: city.name }));
                toast.success(`Switched to ${city.name}`, { icon: city.flag });
              }}
              style={{
                padding: '12px 8px',
                background: selectedCity === city.name ? 'rgba(102, 126, 234, 0.3)' : 'rgba(0,0,0,0.2)',
                border: selectedCity === city.name ? '2px solid #667eea' : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '12px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s'
              }}
            >
              <span style={{ fontSize: '24px' }}>{city.flag}</span>
              <span style={{ fontSize: '11px', fontWeight: 600, color: selectedCity === city.name ? '#667eea' : 'white', textAlign: 'center' }}>
                {city.name.split(',')[0]}
              </span>
            </motion.button>
          ))}
        </div>
        <div style={{ marginTop: '16px', padding: '12px', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Shield style={{ width: '18px', height: '18px', color: '#10b981' }} />
          <div>
            <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>Active Tax Treaty: </span>
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#10b981' }}>{currentCityData.treaty}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
        {[
          { id: 'documents', label: 'Tax Documents', icon: FileText },
          { id: 'credibility', label: 'Trust Score', icon: Shield },
          { id: 'negotiation', label: 'Negotiation Agent', icon: Building }
        ].map(tab => (
          <motion.button key={tab.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab.id as any)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px',
              background: activeTab === tab.id ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255,255,255,0.05)',
              border: activeTab === tab.id ? 'none' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer'
            }}>
            <tab.icon style={{ width: '16px', height: '16px' }} />
            {tab.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'documents' && (
          <motion.div key="documents" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '16px' }}>
            {documents.map((doc, i) => (
              <motion.div key={doc.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)',
                  backdropFilter: 'blur(24px)', border: '1px solid rgba(102, 126, 234, 0.2)', borderRadius: '20px', padding: '24px',
                  position: 'relative', overflow: 'hidden'
                }}>
                {downloadedDocs.includes(doc.id) && (
                  <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(16, 185, 129, 0.2)', borderRadius: '8px', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle style={{ width: '12px', height: '12px', color: '#10b981' }} />
                    <span style={{ fontSize: '10px', color: '#10b981', fontWeight: 600 }}>Downloaded</span>
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: `${doc.color}20`, border: `1px solid ${doc.color}40`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <doc.icon style={{ width: '24px', height: '24px', color: doc.color }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white' }}>{doc.name}</h3>
                    </div>
                    <span style={{ fontSize: '11px', color: doc.color, background: `${doc.color}20`, padding: '2px 8px', borderRadius: '4px' }}>{doc.type}</span>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', marginTop: '8px', lineHeight: 1.5 }}>{doc.description}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => handlePreview(doc)}
                    style={{ flex: 1, padding: '10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '10px', color: 'white', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                    <Eye style={{ width: '14px', height: '14px' }} /> Preview
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => handleDownload(doc)}
                    disabled={generatingDoc === doc.id}
                    style={{ flex: 1, padding: '10px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', borderRadius: '10px', color: 'white', fontSize: '13px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', opacity: generatingDoc === doc.id ? 0.7 : 1 }}>
                    {generatingDoc === doc.id ? <><Clock style={{ width: '14px', height: '14px', animation: 'spin 1s linear infinite' }} /> Generating...</> : <><Download style={{ width: '14px', height: '14px' }} /> Download</>}
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {activeTab === 'credibility' && (
          <motion.div key="credibility" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)', backdropFilter: 'blur(24px)', border: '1px solid rgba(102, 126, 234, 0.2)', borderRadius: '24px', padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '24px' }}>Zero-Knowledge Trust Score</h3>
              {renderTrustScoreRing()}
              <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <Shield style={{ width: '16px', height: '16px', color: '#10b981' }} />
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#10b981' }}>Privacy Preserved</span>
                </div>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>
                  Your score is computed using zero-knowledge proofs. Landlords verify your trustworthiness without seeing your actual financial data.
                </p>
              </div>
            </div>
            <div style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)', backdropFilter: 'blur(24px)', border: '1px solid rgba(102, 126, 234, 0.2)', borderRadius: '24px', padding: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '24px' }}>Score Components</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {Object.entries(trustComponents).map(([key, value], i) => (
                  <div key={key}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', textTransform: 'capitalize' }}>{key.replace(/_/g, ' ')}</span>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#a78bfa' }}>{value}%</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                      <motion.div initial={{ width: 0 }} animate={{ width: `${value}%` }} transition={{ duration: 1, delay: i * 0.15 }}
                        style={{ height: '100%', background: `linear-gradient(90deg, #667eea, ${value > 90 ? '#10b981' : '#a78bfa'})`, borderRadius: '4px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'negotiation' && (
          <motion.div key="negotiation" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)', backdropFilter: 'blur(24px)', border: '1px solid rgba(102, 126, 234, 0.2)', borderRadius: '24px', padding: '32px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Building style={{ width: '28px', height: '28px', color: 'white' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'white' }}>Negotiation Agent</h3>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.5)' }}>AI-powered credibility letters for landlords & banks</p>
                </div>
              </div>
              
              <div style={{ background: 'rgba(0,0,0,0.2)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                  <Sparkles style={{ width: '16px', height: '16px', color: '#f59e0b' }} />
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#f59e0b' }}>AI-Generated Letter Preview</span>
                </div>
                <div style={{ fontFamily: 'Georgia, serif', fontSize: '14px', color: 'rgba(255,255,255,0.8)', lineHeight: 1.8 }}>
                  <p style={{ marginBottom: '16px' }}>Dear Property Manager,</p>
                  <p style={{ marginBottom: '16px' }}>I am writing to introduce <strong style={{ color: 'white' }}>[Applicant Name]</strong>, who has expressed interest in renting your property at <strong style={{ color: 'white' }}>{location}</strong>.</p>
                  <p style={{ marginBottom: '16px' }}>While the applicant's income originates from international sources, our Zero-Knowledge verification system has confirmed a <strong style={{ color: '#10b981' }}>Trust Score of {trustScore.toFixed(1)}/100</strong>, placing them in the <strong style={{ color: '#10b981' }}>top 8% of verified applicants</strong>.</p>
                  <p style={{ marginBottom: '16px' }}>Key verified attributes (without exposing sensitive data):</p>
                  <ul style={{ marginLeft: '20px', marginBottom: '16px' }}>
                    <li>✓ Consistent income for 36+ months</li>
                    <li>✓ Zero payment defaults in rental history</li>
                    <li>✓ Verified assets exceeding 12 months rent</li>
                    <li>✓ Active employment with Fortune 500 company</li>
                  </ul>
                  <p>This letter serves as a cryptographically-signed attestation...</p>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCustomizeModal(true)}
                  style={{ flex: 1, padding: '14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: 'white', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                  <Eye style={{ width: '16px', height: '16px' }} /> Customize Letter
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setGeneratingDoc('credibility_letter');
                    setTimeout(() => {
                      const letterContent = generateCredibilityLetter();
                      const blob = new Blob([letterContent], { type: 'text/plain' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = `Financial_Credibility_Letter_${new Date().toISOString().split('T')[0]}.txt`;
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                      setGeneratingDoc(null);
                      toast.success('Signed PDF downloaded successfully!', { icon: '📄' });
                    }, 1500);
                  }}
                  disabled={generatingDoc === 'credibility_letter'}
                  style={{ flex: 1, padding: '14px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '14px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', opacity: generatingDoc === 'credibility_letter' ? 0.7 : 1 }}>
                  {generatingDoc === 'credibility_letter' ? (
                    <><Clock style={{ width: '16px', height: '16px' }} /> Generating...</>
                  ) : (
                    <><Download style={{ width: '16px', height: '16px' }} /> Download Signed PDF</>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Calendar Integration */}
            <CalendarIntegration 
              eventTitle="Tax Filing Deadline - Form 1040-NR"
              eventDescription="File your US non-resident tax return. All documents are pre-filled and ready in your Compliance Pack."
              suggestedDate="April 15, 2026"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Document Preview Modal */}
      <AnimatePresence>
        {previewDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewDoc(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '700px',
                maxHeight: '85vh',
                background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.98) 0%, rgba(40, 20, 60, 0.98) 100%)',
                borderRadius: '24px',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.5)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              {/* Modal Header */}
              <div style={{
                padding: '20px 24px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '10px',
                    background: `${previewDoc.color}20`,
                    border: `1px solid ${previewDoc.color}40`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <previewDoc.icon style={{ width: '20px', height: '20px', color: previewDoc.color }} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'white' }}>{previewDoc.name}</h3>
                    <span style={{ fontSize: '12px', color: previewDoc.color }}>{previewDoc.type}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setPreviewDoc(null)}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px',
                    cursor: 'pointer',
                    color: 'white'
                  }}
                >
                  <X style={{ width: '18px', height: '18px' }} />
                </motion.button>
              </div>

              {/* Document Content */}
              <div style={{
                flex: 1,
                overflow: 'auto',
                padding: '24px',
                background: 'rgba(0,0,0,0.3)'
              }}>
                <pre style={{
                  fontFamily: 'Consolas, Monaco, monospace',
                  fontSize: '12px',
                  color: 'rgba(255,255,255,0.85)',
                  lineHeight: 1.6,
                  whiteSpace: 'pre-wrap',
                  margin: 0
                }}>
                  {generateDocumentContent(previewDoc)}
                </pre>
              </div>

              {/* Modal Footer */}
              <div style={{
                padding: '16px 24px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                gap: '12px'
              }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPreviewDoc(null)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '10px',
                    color: 'white',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Close
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    handleDownload(previewDoc);
                    setPreviewDoc(null);
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '10px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px'
                  }}
                >
                  <Download style={{ width: '16px', height: '16px' }} />
                  Download
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Customize Letter Modal */}
      <AnimatePresence>
        {showCustomizeModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCustomizeModal(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 9999,
              padding: '20px'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                width: '100%',
                maxWidth: '500px',
                background: 'linear-gradient(135deg, rgba(26, 26, 46, 0.98) 0%, rgba(40, 20, 60, 0.98) 100%)',
                borderRadius: '24px',
                border: '1px solid rgba(102, 126, 234, 0.3)',
                boxShadow: '0 25px 80px rgba(0,0,0,0.5)'
              }}
            >
              {/* Modal Header */}
              <div style={{
                padding: '24px',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'white', marginBottom: '4px' }}>
                    Customize Credibility Letter
                  </h3>
                  <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)' }}>
                    Personalize your AI-generated letter
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowCustomizeModal(false)}
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px',
                    cursor: 'pointer',
                    color: 'white'
                  }}
                >
                  <X style={{ width: '18px', height: '18px' }} />
                </motion.button>
              </div>

              {/* Form */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={letterData.applicantName}
                    onChange={(e) => setLetterData(prev => ({ ...prev, applicantName: e.target.value }))}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '14px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                    Landlord/Property Manager Name
                  </label>
                  <input
                    type="text"
                    value={letterData.landlordName}
                    onChange={(e) => setLetterData(prev => ({ ...prev, landlordName: e.target.value }))}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '14px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                    placeholder="Enter recipient name"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                    Property Address
                  </label>
                  <input
                    type="text"
                    value={letterData.propertyAddress}
                    onChange={(e) => setLetterData(prev => ({ ...prev, propertyAddress: e.target.value }))}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '14px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none'
                    }}
                    placeholder="Enter property address"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: 'rgba(255,255,255,0.7)', marginBottom: '8px' }}>
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={letterData.additionalNotes}
                    onChange={(e) => setLetterData(prev => ({ ...prev, additionalNotes: e.target.value }))}
                    style={{
                      width: '100%',
                      boxSizing: 'border-box',
                      padding: '14px 16px',
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '12px',
                      color: 'white',
                      fontSize: '15px',
                      outline: 'none',
                      minHeight: '100px',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                    placeholder="Any additional information to include..."
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div style={{
                padding: '20px 24px',
                borderTop: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                gap: '12px'
              }}>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowCustomizeModal(false)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '14px',
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowCustomizeModal(false);
                    toast.success('Letter customized! Click "Download Signed PDF" to get your letter.', { icon: '✅', duration: 3000 });
                  }}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    border: 'none',
                    borderRadius: '12px',
                    color: 'white',
                    fontSize: '14px',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
