'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Lock, Eye, EyeOff, CheckCircle, Key, FileText,
  Fingerprint, Server, Zap, AlertTriangle, Upload, Download
} from 'lucide-react';
import toast from 'react-hot-toast';

interface ZKProof {
  id: string;
  type: string;
  claim: string;
  status: 'pending' | 'verified' | 'shared';
  verifier?: string;
  timestamp: string;
  proofHash: string;
}

interface EncryptedDocument {
  id: string;
  name: string;
  type: string;
  encrypted: boolean;
  uploadDate: string;
  size: string;
}

export function PrivacyVault() {
  const [showProofDemo, setShowProofDemo] = useState(false);
  const [generatingProof, setGeneratingProof] = useState(false);
  const [proofGenerated, setProofGenerated] = useState(false);
  const [selectedClaim, setSelectedClaim] = useState<string>('income');
  const [revealedDocs, setRevealedDocs] = useState<Set<string>>(new Set());

  const zkProofs: ZKProof[] = [
    { id: '1', type: 'Income Verification', claim: 'Annual income exceeds $80,000', status: 'verified', timestamp: '2026-01-04', proofHash: '0x7f3a...8c2d' },
    { id: '2', type: 'Trust Score', claim: 'Trust score is above 85/100', status: 'shared', verifier: 'Berlin Landlord GmbH', timestamp: '2026-01-03', proofHash: '0x9b2e...4f1a' },
    { id: '3', type: 'Employment Status', claim: 'Currently employed full-time', status: 'verified', timestamp: '2026-01-02', proofHash: '0x3d5c...7e9b' },
    { id: '4', type: 'Credit History', claim: 'No defaults in past 5 years', status: 'pending', timestamp: '2026-01-04', proofHash: '0x1a8f...2c3d' },
  ];

  const encryptedDocs: EncryptedDocument[] = [
    { id: 'd1', name: 'Bank_Statement_Dec2025.pdf', type: 'Financial', encrypted: true, uploadDate: '2025-12-28', size: '2.4 MB' },
    { id: 'd2', name: 'Employment_Contract.pdf', type: 'Employment', encrypted: true, uploadDate: '2025-11-15', size: '1.1 MB' },
    { id: 'd3', name: 'Passport_Scan.pdf', type: 'Identity', encrypted: true, uploadDate: '2025-10-20', size: '3.2 MB' },
    { id: 'd4', name: 'Tax_Return_2024.pdf', type: 'Tax', encrypted: true, uploadDate: '2025-04-15', size: '4.8 MB' },
  ];

  const generateZKProof = () => {
    setGeneratingProof(true);
    setProofGenerated(false);
    
    // Simulate ZK proof generation
    setTimeout(() => {
      setGeneratingProof(false);
      setProofGenerated(true);
      toast.success('Zero-Knowledge Proof generated successfully!', { icon: '🔐' });
    }, 3000);
  };

  const claimOptions = [
    { id: 'income', label: 'Income > $80,000', desc: 'Prove income threshold without revealing exact amount' },
    { id: 'trust', label: 'Trust Score > 85', desc: 'Prove creditworthiness without exposing financial history' },
    { id: 'employment', label: 'Employed Full-Time', desc: 'Verify employment without sharing contract details' },
    { id: 'residency', label: 'Legal Residency', desc: 'Prove visa status without revealing passport data' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '8px' }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '100px', border: '1px solid rgba(16, 185, 129, 0.3)', marginBottom: '16px' }}>
          <Shield style={{ width: '16px', height: '16px', color: '#10b981' }} />
          <span style={{ fontSize: '13px', color: '#10b981', fontWeight: 600 }}>Zero-Knowledge Privacy</span>
        </motion.div>
        <h2 style={{ fontSize: '32px', fontWeight: 800, background: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '8px' }}>
          Privacy Vault
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px' }}>
          Prove claims without revealing sensitive data using Zero-Knowledge Proofs
        </p>
      </div>

      {/* Security Status Banner */}
      <div style={{ background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15) 0%, rgba(59, 130, 246, 0.1) 100%)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '20px' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Lock style={{ width: '28px', height: '28px', color: 'white' }} />
        </div>
        <div style={{ flex: 1 }}>
          <h4 style={{ fontSize: '16px', fontWeight: 700, color: 'white', marginBottom: '6px' }}>End-to-End Encryption Active</h4>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
            All documents encrypted with AES-256. Your data never leaves your device unencrypted. 
            AI models process only encrypted hashes - they never see your raw data.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle style={{ width: '14px', height: '14px', color: '#10b981' }} />
            <span style={{ fontSize: '11px', color: '#10b981' }}>SOC 2 Type II</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle style={{ width: '14px', height: '14px', color: '#10b981' }} />
            <span style={{ fontSize: '11px', color: '#10b981' }}>GDPR Compliant</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* ZK Proof Generator */}
        <div style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)', backdropFilter: 'blur(24px)', border: '1px solid rgba(102, 126, 234, 0.2)', borderRadius: '20px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Fingerprint style={{ width: '20px', height: '20px', color: 'white' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'white' }}>ZK-Identity Bridge</h3>
              <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>Generate verifiable proofs without exposing data</p>
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '10px', display: 'block' }}>Select Claim to Prove</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {claimOptions.map((option) => (
                <div key={option.id} onClick={() => setSelectedClaim(option.id)}
                  style={{ padding: '14px', background: selectedClaim === option.id ? 'rgba(139, 92, 246, 0.2)' : 'rgba(0,0,0,0.2)', border: `1px solid ${selectedClaim === option.id ? '#8b5cf6' : 'rgba(255,255,255,0.05)'}`, borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: `2px solid ${selectedClaim === option.id ? '#8b5cf6' : 'rgba(255,255,255,0.2)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {selectedClaim === option.id && <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#8b5cf6' }} />}
                    </div>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>{option.label}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>{option.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={generateZKProof} disabled={generatingProof}
            style={{ width: '100%', padding: '14px', background: generatingProof ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', border: 'none', borderRadius: '12px', color: 'white', fontSize: '14px', fontWeight: 600, cursor: generatingProof ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            {generatingProof ? (
              <><Zap style={{ width: '16px', height: '16px', animation: 'pulse 1s infinite' }} /> Generating ZK Circuit...</>
            ) : proofGenerated ? (
              <><CheckCircle style={{ width: '16px', height: '16px' }} /> Proof Ready - Share</>
            ) : (
              <><Key style={{ width: '16px', height: '16px' }} /> Generate ZK Proof</>
            )}
          </motion.button>

          {proofGenerated && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              style={{ marginTop: '16px', padding: '14px', background: 'rgba(16, 185, 129, 0.1)', borderRadius: '10px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <CheckCircle style={{ width: '14px', height: '14px', color: '#10b981' }} />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#10b981' }}>Proof Generated</span>
              </div>
              <code style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)', wordBreak: 'break-all' }}>
                Proof Hash: 0x8f2a9c3d7e1b4f6a...{Math.random().toString(16).slice(2, 10)}
              </code>
            </motion.div>
          )}
        </div>

        {/* Encrypted Documents */}
        <div style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)', backdropFilter: 'blur(24px)', border: '1px solid rgba(102, 126, 234, 0.2)', borderRadius: '20px', padding: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Server style={{ width: '20px', height: '20px', color: 'white' }} />
              </div>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'white' }}>Encrypted Storage</h3>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>AES-256 encrypted at rest</p>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              onClick={() => toast.success('Upload feature - drag & drop your documents')}
              style={{ padding: '8px 14px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Upload style={{ width: '14px', height: '14px' }} />
              Upload
            </motion.button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {encryptedDocs.map((doc) => (
              <div key={doc.id} style={{ padding: '14px', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: 'rgba(59, 130, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText style={{ width: '18px', height: '18px', color: '#3b82f6' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: 'white', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {revealedDocs.has(doc.id) ? doc.name : '••••••••••••.pdf'}
                    <Lock style={{ width: '12px', height: '12px', color: '#10b981' }} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '10px', padding: '2px 6px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '4px', color: '#3b82f6' }}>{doc.type}</span>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.4)' }}>{doc.size}</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      const newRevealed = new Set(revealedDocs);
                      if (newRevealed.has(doc.id)) newRevealed.delete(doc.id);
                      else newRevealed.add(doc.id);
                      setRevealedDocs(newRevealed);
                    }}
                    style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '6px', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}>
                    {revealedDocs.has(doc.id) ? <EyeOff style={{ width: '14px', height: '14px' }} /> : <Eye style={{ width: '14px', height: '14px' }} />}
                  </motion.button>
                  <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    onClick={() => toast.success('Decrypting and downloading...')}
                    style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', border: 'none', borderRadius: '6px', cursor: 'pointer', color: 'rgba(255,255,255,0.6)' }}>
                    <Download style={{ width: '14px', height: '14px' }} />
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active ZK Proofs */}
      <div style={{ background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.05) 100%)', backdropFilter: 'blur(24px)', border: '1px solid rgba(102, 126, 234, 0.2)', borderRadius: '20px', padding: '24px' }}>
        <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'white', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Key style={{ width: '18px', height: '18px', color: '#a78bfa' }} />
          Active Zero-Knowledge Proofs
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
          {zkProofs.map((proof) => (
            <div key={proof.id} style={{ padding: '16px', background: 'rgba(0,0,0,0.2)', borderRadius: '14px', border: `1px solid ${proof.status === 'shared' ? 'rgba(16, 185, 129, 0.3)' : proof.status === 'verified' ? 'rgba(59, 130, 246, 0.3)' : 'rgba(245, 158, 11, 0.3)'}` }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>{proof.type}</span>
                <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '4px', fontWeight: 600,
                  background: proof.status === 'shared' ? 'rgba(16, 185, 129, 0.2)' : proof.status === 'verified' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                  color: proof.status === 'shared' ? '#10b981' : proof.status === 'verified' ? '#3b82f6' : '#f59e0b'
                }}>{proof.status.toUpperCase()}</span>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '10px' }}>"{proof.claim}"</p>
              {proof.verifier && (
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>
                  Shared with: <span style={{ color: '#10b981' }}>{proof.verifier}</span>
                </div>
              )}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <code style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{proof.proofHash}</code>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{proof.timestamp}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Notice */}
      <div style={{ padding: '16px 20px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '12px', border: '1px solid rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <AlertTriangle style={{ width: '18px', height: '18px', color: '#f59e0b', flexShrink: 0, marginTop: '2px' }} />
        <div>
          <div style={{ fontSize: '13px', fontWeight: 600, color: '#f59e0b', marginBottom: '4px' }}>Privacy Guarantee</div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, margin: 0 }}>
            Your documents are encrypted client-side before upload. Our AI models only process cryptographic hashes and ZK proofs - 
            they never access your raw financial data, passport details, or personal documents. All data is excluded from model training.
          </p>
        </div>
      </div>
    </div>
  );
}
