import React, { useState, useEffect, useRef } from 'react';
import {
  Shield, Zap, Key, FileCheck, Send, ArrowRight, ChevronLeft, ChevronRight,
  Lock, User, MapPin, ScanFace, CheckCircle, XCircle, AlertTriangle,
  Cloud, Smartphone, RefreshCw, Terminal, Ban, Unlock, BarChart3, Database, ShieldCheck,
  Split, Eye, Binary, Hash, PenTool
} from 'lucide-react';

// --- FLOWCHART COMPONENTS ---
const FlowchartNode: React.FC<{
  icon: any;
  label: string;
  subLabel?: string;
  isActive: boolean;
  isCompleted: boolean;
  isError?: boolean;
  color: string;
}> = ({ icon: Icon, label, subLabel, isActive, isCompleted, isError, color }) => (
  <div className={`flex flex-col items-center gap-2 transition-all duration-500 ${isActive ? 'scale-110' : 'scale-100 opacity-70'}`}>
    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${isError ? 'bg-red-500/20 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]' :
      isActive ? `bg-${color}-500/20 border-${color}-400 shadow-[0_0_15px_rgba(var(--${color}-500-rgb),0.5)]` :
        isCompleted ? `bg-${color}-500/10 border-${color}-600` :
          'bg-slate-800 border-slate-700'
      }`}>
      <Icon className={`w-6 h-6 ${isError ? 'text-red-500' :
        isActive ? `text-${color}-400` :
          isCompleted ? `text-${color}-500` :
            'text-slate-600'
        }`} />
    </div>
    <div className="text-center">
      <div className={`text-xs font-bold font-mono ${isActive ? `text-${color}-400` : 'text-slate-500'}`}>{label}</div>
      {subLabel && <div className="text-[10px] text-slate-500 font-mono mt-0.5">{subLabel}</div>}
    </div>
  </div>
);

const FlowchartArrow: React.FC<{ isActive: boolean; color: string }> = ({ isActive, color }) => (
  <div className="flex-1 h-[2px] bg-slate-800 relative mx-2">
    <div className={`absolute inset-0 transition-all duration-500 ${isActive ? `bg-${color}-500/50 w-full` : 'w-0'}`} />
    {isActive && <div className={`absolute right-0 -top-1 w-2 h-2 rounded-full bg-${color}-400 animate-ping`} />}
  </div>
);

// --- TYPES ---
type PipelineStep = 'IDLE' | 'QRNG' | 'KYBER' | 'DILITHIUM' | 'SENDING' | 'REJECTED' | 'FAILED';
type ViewMode = 'CHAT' | 'WALKTHROUGH';
type WalkthroughStep = 0 | 1 | 2;
type LoginStep = 'IDLE' | 'GEO' | 'FACE' | 'SUCCESS' | 'FAILURE';
type TestScenario = 'NONE' | 'QRNG_FAIL' | 'KYBER_FAIL' | 'HYBRID_FAIL' | 'QRNG_BIAS' | 'KYBER_REPLAY' | 'NETWORK_INTERCEPT' | 'DOWNGRADE_ATTACK';

interface Message {
  id: string;
  sender: 'user' | 'bob' | 'system';
  text: string;
  encrypted: boolean;
  timestamp: number;
  status?: 'sent' | 'rejected' | 'failed';
}

interface InfoCardData {
  title: string;
  role: string;
  classicalAlgo: string;
  comparisonTitle: string;
  pros: string[];
  cons: string[];
  technicalDetail: string;
  threatModel: string;
  nistStatus: string;
  implementation: string;
  stats: { label: string; value: string; desc: string }[];
  futureOutlook: string;
}

// --- SUB-COMPONENTS ---

// ... (LoginScreen remains exactly the same)
const LoginScreen: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  const [step, setStep] = useState<LoginStep>('IDLE');
  const [logs, setLogs] = useState<string[]>([]);
  const [loginTest, setLoginTest] = useState<'NONE' | 'GEO_FAIL' | 'FACE_FAIL'>('NONE');

  const addLog = (msg: string) => setLogs(p => [...p, msg]);

  const startLogin = async (scenario: 'NONE' | 'GEO_FAIL' | 'FACE_FAIL' = 'NONE') => {
    setLoginTest(scenario);
    setStep('GEO');
    setLogs([]);

    addLog("Initializing GPS...");
    await new Promise(r => setTimeout(r, 800));

    if (scenario === 'GEO_FAIL') {
      addLog("Coordinates: 51.5074° N, 0.1278° W (London)");
      await new Promise(r => setTimeout(r, 600));
      addLog("ERROR: Device outside designated secure zone (Singapore).");
      setStep('FAILURE');
      return;
    }

    addLog("Coordinates: 1.3521° N, 103.8198° E (Singapore)");
    await new Promise(r => setTimeout(r, 800));
    addLog("Geofence Check: INSIDE SECURE ZONE");

    setStep('FACE');

    await new Promise(r => setTimeout(r, 500));
    addLog("Initializing Biometric Scanner...");
    await new Promise(r => setTimeout(r, 1500));

    if (scenario === 'FACE_FAIL') {
      addLog("Biometric Match: 12.4%");
      addLog("ERROR: Identity verification failed. Biometrics do not match stored hash.");
      setStep('FAILURE');
      return;
    }

    addLog("Biometric Match: 99.8%");
    addLog("Identity Verified: RYAN LEE");

    setStep('SUCCESS');
    await new Promise(r => setTimeout(r, 1000));
    onLogin();
  };

  const reset = () => {
    setStep('IDLE');
    setLogs([]);
    setLoginTest('NONE');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100 p-4">
      <div className="w-full max-w-md bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 shadow-2xl">
        <div className="text-center mb-8">
          <Shield className="w-12 h-12 text-cyan-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold">QuantumShield Access</h1>
          <p className="text-slate-400 text-sm font-mono mt-2">Multi-Factor Authentication Required</p>
        </div>

        {step === 'IDLE' && (
          <div className="space-y-4">
            <button
              onClick={() => startLogin('NONE')}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl font-bold text-lg hover:scale-[1.02] transition-transform flex items-center justify-center gap-2"
            >
              <Smartphone className="w-5 h-5" />
              Authenticate Device
            </button>

            <div className="pt-4 border-t border-slate-700">
              <p className="text-xs text-slate-500 font-mono mb-2 text-center uppercase">Negative Test Scenarios</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => startLogin('GEO_FAIL')}
                  className="px-3 py-2 bg-red-900/20 border border-red-800/50 text-red-400 text-xs font-mono rounded hover:bg-red-900/40"
                >
                  Test: Geofence Fail
                </button>
                <button
                  onClick={() => startLogin('FACE_FAIL')}
                  className="px-3 py-2 bg-red-900/20 border border-red-800/50 text-red-400 text-xs font-mono rounded hover:bg-red-900/40"
                >
                  Test: Biometric Fail
                </button>
              </div>
            </div>
          </div>
        )}

        {step !== 'IDLE' && (
          <div className="space-y-6">
            <div className="flex justify-center gap-8">
              <div className={`flex flex-col items-center gap-2 transition-opacity ${step === 'GEO' ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${step === 'FAILURE' && loginTest === 'GEO_FAIL' ? 'border-red-500 bg-red-500/20' :
                  step === 'GEO' ? 'border-cyan-400 bg-cyan-500/20 animate-pulse' : 'border-slate-600'
                  }`}>
                  {step === 'FAILURE' && loginTest === 'GEO_FAIL' ? <Ban className="w-8 h-8 text-red-500" /> : <MapPin className="w-8 h-8 text-cyan-400" />}
                </div>
                <span className={`text-xs font-mono ${step === 'FAILURE' && loginTest === 'GEO_FAIL' ? 'text-red-400' : ''}`}>Geofence</span>
              </div>
              <div className={`flex flex-col items-center gap-2 transition-opacity ${step === 'FACE' ? 'opacity-100' : 'opacity-40'}`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center border-2 ${step === 'FAILURE' && loginTest === 'FACE_FAIL' ? 'border-red-500 bg-red-500/20' :
                  step === 'FACE' ? 'border-violet-400 bg-violet-500/20 animate-pulse' : 'border-slate-600'
                  }`}>
                  {step === 'FAILURE' && loginTest === 'FACE_FAIL' ? <XCircle className="w-8 h-8 text-red-500" /> : <ScanFace className="w-8 h-8 text-violet-400" />}
                </div>
                <span className={`text-xs font-mono ${step === 'FAILURE' && loginTest === 'FACE_FAIL' ? 'text-red-400' : ''}`}>Face ID</span>
              </div>
            </div>

            <div className={`rounded-lg p-4 font-mono text-xs min-h-[140px] border ${step === 'FAILURE' ? 'bg-red-950/30 border-red-500/50 text-red-300' : 'bg-slate-950 border-slate-700 text-green-400'}`}>
              {logs.map((log, i) => (
                <div key={i} className="mb-1">{'>'} {log}</div>
              ))}
              {step === 'SUCCESS' && <div className="text-cyan-400 font-bold mt-2">ACCESS GRANTED...</div>}
              {step === 'FAILURE' && (
                <div className="mt-4 pt-2 border-t border-red-800/50 flex justify-center">
                  <button onClick={reset} className="flex items-center gap-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-500 transition-colors">
                    <RefreshCw className="w-3 h-3" /> Retry Authentication
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ... (Pipeline and QRNG Module remain the same for Chat View)
const Pipeline: React.FC<{ step: PipelineStep; testMode: TestScenario }> = ({ step, testMode }) => {
  const steps = [
    { id: 'QRNG', icon: Zap, label: 'QRNG', color: 'cyan' },
    { id: 'KYBER', icon: Key, label: 'Kyber', color: 'violet' },
    { id: 'DILITHIUM', icon: FileCheck, label: 'Hybrid Sig', color: 'emerald' },
    { id: 'SENDING', icon: Send, label: 'Network', color: 'blue' }
  ];

  const isRejected = step === 'REJECTED';
  const isFailed = step === 'FAILED';
  const failStepId =
    testMode === 'QRNG_FAIL' || testMode === 'QRNG_BIAS' ? 'QRNG' :
      testMode === 'KYBER_FAIL' || testMode === 'KYBER_REPLAY' ? 'KYBER' :
        testMode === 'HYBRID_FAIL' || testMode === 'DOWNGRADE_ATTACK' ? 'DILITHIUM' :
          testMode === 'NETWORK_INTERCEPT' ? 'SENDING' : null;

  return (
    <div className={`flex items-center justify-center gap-2 p-4 bg-slate-800/50 backdrop-blur-sm rounded-lg border transition-colors duration-500 ${isRejected || isFailed ? 'border-red-500/50 bg-red-900/10' : 'border-slate-700'}`}>
      {steps.map((s, idx) => {
        const Icon = s.icon;
        const isActive = step === s.id;
        const isPast = (!isRejected && !isFailed) && steps.findIndex(st => st.id === step) > idx;
        const isErrorStep = (isRejected && s.id === 'DILITHIUM') || (isFailed && s.id === failStepId);

        return (
          <React.Fragment key={s.id}>
            <div className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive || isErrorStep ? 'scale-110' : isPast ? 'opacity-50' : 'opacity-30'
              }`}>
              <div className={`p-3 rounded-full border-2 ${isErrorStep
                ? 'bg-red-500/20 border-red-500 animate-pulse'
                : isActive
                  ? `bg-${s.color}-500/20 border-${s.color}-400 animate-pulse shadow-lg shadow-${s.color}-500/50`
                  : isPast
                    ? `bg-${s.color}-500/10 border-${s.color}-600`
                    : 'bg-slate-800 border-slate-600'
                }`}>
                {isErrorStep ? <XCircle className="w-5 h-5 text-red-500" /> :
                  <Icon className={`w-5 h-5 ${isActive ? `text-${s.color}-400` : isPast ? `text-${s.color}-500` : 'text-slate-500'
                    }`} />}
              </div>
              <span className={`text-xs font-mono ${isErrorStep ? 'text-red-400 font-bold' : isActive ? `text-${s.color}-400` : 'text-slate-500'
                }`}>{s.label}</span>
            </div>
            {idx < steps.length - 1 && (
              <ArrowRight className={`w-4 h-4 ${(isRejected || isFailed) && idx >= steps.findIndex(st => st.id === (failStepId || 'DILITHIUM')) ? 'text-red-900' :
                isPast ? 'text-emerald-400' : step === s.id ? 'text-cyan-400 animate-pulse' : 'text-slate-600'
                }`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const QRNGModule: React.FC<{ isError?: boolean }> = ({ isError }) => {
  const [step, setStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setStep(s => (s + 1) % 4), 1000);
    return () => clearInterval(interval);
  }, []);

  // Background noise animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const animate = () => {
      const imageData = ctx.createImageData(canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const value = Math.random() < 0.1 ? 255 : 0; // Sparse noise
        data[i] = 0; data[i + 1] = value; data[i + 2] = value; data[i + 3] = value ? 50 : 0;
      }
      ctx.putImageData(imageData, 0, 0);
    };
    const interval = setInterval(animate, 100);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: "Laser Source", sub: "Photon Emission", icon: Zap },
    { label: "Beam Splitter", sub: "Quantum State", icon: Split },
    { label: "Detector", sub: "Measurement", icon: Eye },
    { label: "Digitizer", sub: "Binary Output", icon: Binary }
  ];

  return (
    <div className={`flex flex-col items-center gap-6 p-6 bg-slate-800/50 backdrop-blur-sm rounded-lg border relative overflow-hidden ${isError ? 'border-red-500' : 'border-cyan-500/30'}`}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" width={300} height={200} />

      <div className="flex items-center gap-2 z-10">
        {isError ? <AlertTriangle className="w-6 h-6 text-red-500" /> : <Zap className="w-6 h-6 text-cyan-400 animate-pulse" />}
        <h3 className={`text-xl font-bold font-mono ${isError ? 'text-red-500' : 'text-cyan-400'}`}>
          {isError ? 'QRNG FAILURE' : 'QRNG Process Flow'}
        </h3>
      </div>

      <div className="flex items-center justify-between w-full max-w-2xl z-10">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <FlowchartNode
              icon={s.icon}
              label={s.label}
              subLabel={s.sub}
              isActive={step === i}
              isCompleted={step > i}
              isError={isError}
              color="cyan"
            />
            {i < steps.length - 1 && <FlowchartArrow isActive={step > i} color="cyan" />}
          </React.Fragment>
        ))}
      </div>

      <div className="h-8 flex items-center justify-center z-10">
        <span className="font-mono text-cyan-400 text-sm">
          {step === 3 ? "Output: 10110100..." : "Processing..."}
        </span>
      </div>
    </div>
  );
};

const KyberModule: React.FC<{ isError?: boolean }> = ({ isError }) => {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setStep(s => (s + 1) % 4), 1500);
    return () => clearInterval(interval);
  }, []);

  const steps = [
    { label: "Alice", sub: "KeyGen", icon: Key },
    { label: "Bob", sub: "Encapsulate", icon: Lock },
    { label: "Alice", sub: "Decapsulate", icon: Unlock },
    { label: "Shared Secret", sub: "Established", icon: ShieldCheck }
  ];

  return (
    <div className={`flex flex-col items-center gap-6 p-6 bg-slate-800/50 backdrop-blur-sm rounded-lg border ${isError ? 'border-red-500' : 'border-violet-500/30'}`}>
      <div className="flex items-center gap-2">
        {isError ? <XCircle className="w-6 h-6 text-red-500" /> : <Key className="w-6 h-6 text-violet-400 animate-pulse" />}
        <h3 className={`text-xl font-bold font-mono ${isError ? 'text-red-500' : 'text-violet-400'}`}>
          {isError ? 'KEY EXCHANGE FAILED' : 'Kyber-1024 Flow'}
        </h3>
      </div>

      <div className="flex items-center justify-between w-full max-w-2xl">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <FlowchartNode
              icon={s.icon}
              label={s.label}
              subLabel={s.sub}
              isActive={step === i}
              isCompleted={step > i}
              isError={isError && i === 2} // Error happens at decapsulation usually
              color="violet"
            />
            {i < steps.length - 1 && <FlowchartArrow isActive={step > i} color="violet" />}
          </React.Fragment>
        ))}
      </div>

      <div className={`text-center p-2 rounded-lg ${isError ? 'bg-red-500/10' : 'bg-violet-500/10'} w-full`}>
        <p className={`text-sm font-mono ${isError ? 'text-red-300 font-bold' : 'text-violet-300'}`}>
          {step === 0 && "Generating Public/Private Keypair..."}
          {step === 1 && "Encapsulating Shared Secret with Public Key..."}
          {step === 2 && (isError ? "ERROR: DECAPSULATION MISMATCH" : "Decapsulating with Private Key...")}
          {step === 3 && "Secure Channel Established."}
        </p>
      </div>
    </div>
  );
};

const DilithiumStep: React.FC<{ isAttack?: boolean }> = ({ isAttack = false }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setStep(s => {
      if (isAttack && s === 2) return 2; // Stuck at verify if attack
      return (s + 1) % 4;
    }), 1500);
    return () => clearInterval(interval);
  }, [isAttack]);

  const steps = [
    { label: "Message", sub: "Hashing", icon: Hash },
    { label: "Dual Sign", sub: "ECDSA + Dilithium", icon: PenTool },
    { label: "Dual Verify", sub: "Hybrid Check", icon: ShieldCheck },
    { label: "Valid", sub: "Authenticated", icon: CheckCircle }
  ];

  return (
    <div className={`flex flex-col items-center gap-6 p-6 bg-slate-800/50 backdrop-blur-sm rounded-lg border-2 ${isAttack ? 'border-red-500 bg-red-900/10' : 'border-emerald-500/30'}`}>
      <div className="flex items-center gap-2">
        {isAttack ? <AlertTriangle className="w-6 h-6 text-red-500" /> : <FileCheck className="w-6 h-6 text-emerald-400 animate-pulse" />}
        <h3 className={`text-xl font-bold font-mono ${isAttack ? 'text-red-500' : 'text-emerald-400'}`}>
          {isAttack ? 'SIGNATURE REJECTED' : 'Hybrid Dilithium Flow'}
        </h3>
      </div>

      <div className="flex items-center justify-between w-full max-w-2xl">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <FlowchartNode
              icon={s.icon}
              label={s.label}
              subLabel={s.sub}
              isActive={step === i}
              isCompleted={step > i}
              isError={isAttack && i === 2}
              color="emerald"
            />
            {i < steps.length - 1 && <FlowchartArrow isActive={step > i} color="emerald" />}
          </React.Fragment>
        ))}
      </div>

      <div className={`text-center p-2 rounded-lg ${isAttack ? 'bg-red-500/10' : 'bg-emerald-500/10'} w-full`}>
        <p className={`text-sm font-mono ${isAttack ? 'text-red-400 font-bold' : 'text-emerald-300'}`}>
          {step === 0 && "Hashing Message Content..."}
          {step === 1 && "Generating Hybrid Signature (Classical + PQ)..."}
          {step === 2 && (isAttack ? "ERROR: SIGNATURE INVALID" : "Verifying Both Signatures...")}
          {step === 3 && "Hybrid Signature Valid. Message Authentic."}
        </p>
      </div>
    </div>
  );
};

// ... (SecureChatModule remains the same)
const SecureChatModule: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [pipelineStep, setPipelineStep] = useState<PipelineStep>('IDLE');
  const [processing, setProcessing] = useState(false);
  const [backupStatus, setBackupStatus] = useState("Synced");
  const [testScenario, setTestScenario] = useState<TestScenario>('NONE');

  useEffect(() => {
    const interval = setInterval(() => {
      setBackupStatus("Syncing...");
      setTimeout(() => {
        setBackupStatus(`Last backup: ${new Date().toLocaleTimeString()}`);
      }, 2000);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const getBobResponse = async (userMessage: string) => {
    const responses = [
      "Hey bestie! Just got your message safe and sound. This quantum tech is wild, right? 🚀",
      "Locked and loaded! Or should I say, encrypted and encoded? 😉 How's your day going?",
      "Got it! Man, knowing no one can snoop on us makes me want to share secrets haha. What are you up to?",
      "Secure connection established! 🛡️ Always got your back. What's the latest news?",
      "Yo! Message received. It's so cool that physics is protecting our chat. Anyway, you won't believe what happened today..."
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const sendMessage = async () => {
    if (!input.trim() || processing) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      encrypted: true,
      timestamp: Date.now()
    };

    const currentInput = input;
    setInput('');
    setMessages(prev => [...prev, userMessage]);
    setProcessing(true);

    setPipelineStep('QRNG');
    await new Promise(r => setTimeout(r, 800));

    if (testScenario === 'QRNG_FAIL') {
      setPipelineStep('FAILED');
      setMessages(prev => prev.map(m =>
        m.id === userMessage.id ? { ...m, encrypted: false, status: 'failed', text: 'Message Failed: RNG Entropy Insufficient' } : m
      ));
      setMessages(prev => [...prev, {
        id: Date.now().toString(), sender: 'system', text: "SYSTEM ERROR: Random Number Generator entropy dropped below safe threshold. Aborting encryption.", encrypted: false, timestamp: Date.now()
      }]);
      setProcessing(false);
      setTimeout(() => setPipelineStep('IDLE'), 3000);
      return;
    }



    if (testScenario === 'QRNG_BIAS') {
      setPipelineStep('FAILED');
      setMessages(prev => prev.map(m =>
        m.id === userMessage.id ? { ...m, encrypted: false, status: 'failed', text: 'Message Failed: QRNG Statistical Bias Detected' } : m
      ));
      setMessages(prev => [...prev, {
        id: Date.now().toString(), sender: 'system', text: "SECURITY ALERT: Continuous monitoring detected bias in random number stream. Entropy source compromised.", encrypted: false, timestamp: Date.now()
      }]);
      setProcessing(false);
      setTimeout(() => setPipelineStep('IDLE'), 3000);
      return;
    }

    setPipelineStep('KYBER');
    await new Promise(r => setTimeout(r, 800));

    if (testScenario === 'KYBER_FAIL') {
      setPipelineStep('FAILED');
      setMessages(prev => prev.map(m =>
        m.id === userMessage.id ? { ...m, encrypted: false, status: 'failed', text: 'Message Failed: Key Exchange Error' } : m
      ));
      setMessages(prev => [...prev, {
        id: Date.now().toString(), sender: 'system', text: "SYSTEM ERROR: Kyber encapsulation mismatch. Shared secret could not be derived.", encrypted: false, timestamp: Date.now()
      }]);
      setProcessing(false);
      setTimeout(() => setPipelineStep('IDLE'), 3000);
      return;
    }

    if (testScenario === 'KYBER_REPLAY') {
      setPipelineStep('FAILED');
      setMessages(prev => prev.map(m =>
        m.id === userMessage.id ? { ...m, encrypted: false, status: 'failed', text: 'Message Failed: Replay Attack Detected' } : m
      ));
      setMessages(prev => [...prev, {
        id: Date.now().toString(), sender: 'system', text: "SECURITY ALERT: Key encapsulation ciphertext has been seen before. Possible replay attack blocked.", encrypted: false, timestamp: Date.now()
      }]);
      setProcessing(false);
      setTimeout(() => setPipelineStep('IDLE'), 3000);
      return;
    }

    setPipelineStep('DILITHIUM');
    await new Promise(r => setTimeout(r, 1000));

    if (testScenario === 'HYBRID_FAIL') {
      setPipelineStep('REJECTED');
      setMessages(prev => prev.map(m =>
        m.id === userMessage.id ? { ...m, encrypted: false, status: 'rejected', text: '⚠️ Message dropped: Hybrid Signature Mismatch.' } : m
      ));
      const sysMsg: Message = {
        id: Date.now().toString(),
        sender: 'system',
        text: "CRITICAL ALERT: Hybrid Check Failed. ECDSA signature valid, but Dilithium signature invalid. Potential quantum forgery attempt detected.",
        encrypted: false,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, sysMsg]);
      setProcessing(false);
      setTimeout(() => setPipelineStep('IDLE'), 4000);
      return;
    }

    if (testScenario === 'DOWNGRADE_ATTACK') {
      setPipelineStep('REJECTED');
      setMessages(prev => prev.map(m =>
        m.id === userMessage.id ? { ...m, encrypted: false, status: 'rejected', text: '⚠️ Message dropped: Policy Violation (Downgrade).' } : m
      ));
      const sysMsg: Message = {
        id: Date.now().toString(),
        sender: 'system',
        text: "SECURITY ALERT: Post-Quantum signature missing. Downgrade attack detected. Message rejected due to strict hybrid policy.",
        encrypted: false,
        timestamp: Date.now()
      };
      setMessages(prev => [...prev, sysMsg]);
      setProcessing(false);
      setTimeout(() => setPipelineStep('IDLE'), 4000);
      return;
    }

    setPipelineStep('SENDING');
    await new Promise(r => setTimeout(r, 600));

    if (testScenario === 'NETWORK_INTERCEPT') {
      setPipelineStep('FAILED');
      setMessages(prev => prev.map(m =>
        m.id === userMessage.id ? { ...m, encrypted: false, status: 'failed', text: 'Message Failed: Network Packet Intercepted' } : m
      ));
      setMessages(prev => [...prev, {
        id: Date.now().toString(), sender: 'system', text: "NETWORK ALERT: Anomalous traffic pattern detected. Packet dropped to prevent data exfiltration.", encrypted: false, timestamp: Date.now()
      }]);
      setProcessing(false);
      setTimeout(() => setPipelineStep('IDLE'), 3000);
      return;
    }

    setMessages(prev => prev.map(m =>
      m.id === userMessage.id ? { ...m, encrypted: false, status: 'sent' } : m
    ));
    setPipelineStep('IDLE');

    await new Promise(r => setTimeout(r, 500));
    const bobText = await getBobResponse(currentInput);
    const bobMessage: Message = {
      id: (Date.now() + 1).toString(),
      sender: 'bob',
      text: bobText,
      encrypted: true,
      timestamp: Date.now()
    };
    setMessages(prev => [...prev, bobMessage]);

    await new Promise(r => setTimeout(r, 1500));
    setMessages(prev => prev.map(m =>
      m.id === bobMessage.id ? { ...m, encrypted: false } : m
    ));
    setProcessing(false);
  };

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between bg-slate-900/50 p-3 rounded-lg border border-slate-700">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-2">
            <Terminal className="w-4 h-4 text-slate-400" />
            <select
              value={testScenario}
              onChange={(e) => setTestScenario(e.target.value as TestScenario)}
              className="bg-slate-800 border border-slate-600 rounded px-2 py-1 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
            >
              <option value="NONE">Normal Operation</option>
              <option value="QRNG_FAIL">Simulate QRNG Entropy Drop</option>
              <option value="QRNG_BIAS">Simulate QRNG Statistical Bias</option>
              <option value="KYBER_FAIL">Simulate Key Exchange Failure</option>
              <option value="KYBER_REPLAY">Simulate Replay Attack</option>
              <option value="HYBRID_FAIL">Simulate Hybrid Sig Failure</option>
              <option value="DOWNGRADE_ATTACK">Simulate Downgrade Attack</option>
              <option value="NETWORK_INTERCEPT">Simulate Network Interception</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 px-3 py-1 rounded text-xs font-mono border transition-colors bg-blue-900/20 border-blue-800 text-blue-300">
          <Cloud className={`w-3 h-3 ${backupStatus === 'Syncing...' ? 'animate-bounce' : ''}`} />
          <span>S3 Backup: {backupStatus}</span>
        </div>
      </div>

      <Pipeline step={pipelineStep} testMode={testScenario} />

      <div className="flex-1 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-slate-700 p-4 overflow-y-auto min-h-[350px] max-h-[450px]">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full text-slate-500 font-mono text-sm">
            Secure channel established. Ready for transmission.
          </div>
        )}
        <div className="flex flex-col gap-3">
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender === 'system' ? 'bg-red-500/20 border border-red-400' :
                  msg.sender === 'user' ? 'bg-cyan-500/20 border border-cyan-400' :
                    'bg-violet-500/20 border border-violet-400'
                  }`}>
                  {msg.sender === 'system' ? <AlertTriangle className="w-4 h-4 text-red-400" /> :
                    <User className={`w-5 h-5 ${msg.sender === 'user' ? 'text-cyan-400' : 'text-violet-400'}`} />}
                </div>

                <div className={`px-4 py-2 rounded-lg ${msg.sender === 'system'
                  ? 'bg-red-900/30 border border-red-500/50 text-red-200'
                  : msg.status === 'rejected' || msg.status === 'failed'
                    ? 'bg-red-900/10 border border-red-500/30 text-red-300'
                    : msg.sender === 'user'
                      ? 'bg-cyan-500/20 border border-cyan-400/50'
                      : 'bg-violet-500/20 border border-violet-400/50'
                  }`}>
                  <p className="text-sm font-mono text-slate-200">
                    {msg.encrypted ? '••• ENCRYPTED •••' : msg.text}
                  </p>
                  {msg.sender !== 'system' && (
                    <div className="mt-1 flex justify-end">
                      {msg.status === 'rejected' ?
                        <span className="text-[10px] text-red-400 flex items-center gap-1"><XCircle className="w-3 h-3" /> Sig Fail</span> :
                        msg.status === 'failed' ?
                          <span className="text-[10px] text-red-400 flex items-center gap-1"><XCircle className="w-3 h-3" /> Send Fail</span> :
                          msg.encrypted ? <Lock className="w-3 h-3 text-slate-500" /> : <CheckCircle className="w-3 h-3 text-emerald-400" />
                      }
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyPress={e => e.key === 'Enter' && sendMessage()}
          placeholder={testScenario !== 'NONE' ? `Running Test: ${testScenario}...` : "Type a secure message..."}
          disabled={processing}
          className={`flex-1 px-4 py-3 bg-slate-800/50 border rounded-lg text-slate-200 placeholder-slate-500 font-mono text-sm focus:outline-none disabled:opacity-50 ${testScenario !== 'NONE' ? 'border-yellow-600/50 focus:border-yellow-500' : 'border-slate-700 focus:border-cyan-400'}`}
        />
        <button
          onClick={sendMessage}
          disabled={processing || !input.trim()}
          className={`px-6 py-3 font-bold rounded-lg transition-all flex items-center gap-2 ${testScenario !== 'NONE'
            ? 'bg-yellow-600 hover:bg-yellow-700 text-white disabled:bg-slate-700'
            : 'bg-cyan-500 hover:bg-cyan-600 text-slate-900 disabled:bg-slate-700 disabled:text-slate-500'
            }`}
        >
          <Send className="w-4 h-4" />
          {testScenario !== 'NONE' ? 'Test' : 'Send'}
        </button>
      </div>
    </div>
  );
};

// 7. NEW COMPARISON WIDGET
const ComparisonWidget: React.FC<{ step: WalkthroughStep }> = ({ step }) => {
  // --- STEP 0: QRNG vs PRNG ---
  const PrngCanvas = useRef<HTMLCanvasElement>(null);
  const QrngCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (step !== 0) return;

    // PRNG Animation (Sine Wave)
    const ctxP = PrngCanvas.current?.getContext('2d');
    // QRNG Animation (White Noise)
    const ctxQ = QrngCanvas.current?.getContext('2d');

    if (!ctxP || !ctxQ) return;

    let t = 0;
    const animate = () => {
      // PRNG: Predictable Sine Wave
      ctxP.fillStyle = 'rgba(15, 23, 42, 0.5)'; // Fade effect
      ctxP.fillRect(0, 0, 300, 100);

      ctxP.beginPath();
      ctxP.strokeStyle = '#ef4444'; // Red
      ctxP.lineWidth = 2;
      for (let x = 0; x < 300; x++) {
        const y = 50 + Math.sin((x + t) * 0.05) * 30;
        if (x === 0) ctxP.moveTo(x, y);
        else ctxP.lineTo(x, y);
      }
      ctxP.stroke();

      // QRNG: True Random Noise
      const w = 300;
      const h = 100;
      const imgData = ctxQ.createImageData(w, h);
      for (let i = 0; i < imgData.data.length; i += 4) {
        const val = Math.random() < 0.5 ? 0 : 255; // Binary noise
        // Green/Cyan tint
        imgData.data[i] = 0;     // R
        imgData.data[i + 1] = val; // G
        imgData.data[i + 2] = val; // B
        imgData.data[i + 3] = val === 0 ? 0 : 255; // Alpha
      }
      ctxQ.putImageData(imgData, 0, 0);

      t += 2;
      requestAnimationFrame(animate);
    };
    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [step]);

  // --- STEP 1: Kyber vs RSA ---
  const [rsaCrackProgress, setRsaCrackProgress] = useState(0);
  const LatticeCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (step !== 1) return;

    // RSA Cracking Simulation
    const interval = setInterval(() => {
      setRsaCrackProgress(p => (p + 1) % 100);
    }, 50);

    // Kyber Lattice Animation
    const ctx = LatticeCanvas.current?.getContext('2d');
    if (ctx) {
      let t = 0;
      const animateLattice = () => {
        ctx.clearRect(0, 0, 300, 120);
        ctx.fillStyle = '#8b5cf6'; // Violet
        for (let x = 10; x < 300; x += 30) {
          for (let y = 10; y < 120; y += 30) {
            const offX = Math.sin((y + t) * 0.05) * 2;
            const offY = Math.cos((x + t) * 0.05) * 2;
            ctx.beginPath();
            ctx.arc(x + offX, y + offY, 3, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        t++;
        requestAnimationFrame(animateLattice);
      }
      animateLattice();
    }

    return () => clearInterval(interval);
  }, [step]);

  // --- STEP 2: Dilithium vs ECDSA ---
  const [ecdsaState, setEcdsaState] = useState<'LOCKED' | 'CRACKING' | 'BROKEN'>('LOCKED');
  const DilithiumCanvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (step !== 2) return;

    // ECDSA Animation Loop
    const interval = setInterval(() => {
      setEcdsaState(s => s === 'LOCKED' ? 'CRACKING' : s === 'CRACKING' ? 'BROKEN' : 'LOCKED');
    }, 1500);

    // Dilithium Geometry Animation
    const ctx = DilithiumCanvas.current?.getContext('2d');
    if (ctx) {
      let angle = 0;
      const animateGeo = () => {
        ctx.clearRect(0, 0, 300, 120);
        ctx.strokeStyle = '#10b981'; // Emerald
        ctx.lineWidth = 2;

        const cx = 150, cy = 60, r = 40;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const theta = angle + (i * Math.PI * 2) / 6;
          const x = cx + Math.cos(theta) * r;
          const y = cy + Math.sin(theta) * r;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();

        // Inner connections
        ctx.beginPath();
        ctx.lineWidth = 0.5;
        for (let i = 0; i < 6; i++) {
          const theta = angle + (i * Math.PI * 2) / 6;
          const x = cx + Math.cos(theta) * r;
          const y = cy + Math.sin(theta) * r;
          ctx.moveTo(cx, cy);
          ctx.lineTo(x, y);
        }
        ctx.stroke();

        angle += 0.02;
        requestAnimationFrame(animateGeo);
      }
      animateGeo();
    }

    return () => clearInterval(interval);
  }, [step]);


  if (step === 0) { // QRNG vs PRNG
    return (
      <div className="flex flex-col gap-4 h-full">
        <div className="bg-slate-900/50 p-4 rounded border border-red-900/30 flex flex-col items-center justify-between flex-1">
          <div className="flex items-center gap-2 mb-2 w-full justify-center">
            <span className="text-sm font-mono text-slate-400">Classical PRNG</span>
          </div>
          <canvas ref={PrngCanvas} width={300} height={100} className="w-full h-24 rounded border border-slate-700 bg-slate-950" />
          <div className="text-xs text-red-400 font-mono mt-2 flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" /> PREDICTABLE PATTERN
          </div>
        </div>
        <div className="bg-slate-900/50 p-4 rounded border border-cyan-900/30 flex flex-col items-center justify-between flex-1">
          <div className="flex items-center gap-2 mb-2 w-full justify-center">
            <span className="text-sm font-mono text-cyan-400">Quantum QRNG</span>
          </div>
          <canvas ref={QrngCanvas} width={300} height={100} className="w-full h-24 rounded border border-cyan-900/50 bg-slate-950" />
          <div className="text-xs text-cyan-400 font-mono mt-2 flex items-center gap-1">
            <Zap className="w-4 h-4" /> TRUE RANDOMNESS
          </div>
        </div>
      </div>
    );
  }

  if (step === 1) { // Kyber vs RSA
    return (
      <div className="flex flex-col gap-4 h-full">
        <div className="bg-slate-900/50 p-4 rounded border border-red-900/30 flex flex-col items-center justify-between flex-1">
          <span className="text-sm font-mono text-slate-400 mb-2">RSA-2048</span>
          <div className="relative w-full h-24 flex items-center justify-center bg-slate-950 rounded border border-slate-700 overflow-hidden">
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30 font-mono text-xs text-red-500 leading-none">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i}>{Math.random().toString(16).substr(2, 12)}</div>
              ))}
            </div>
            <div className="z-10 font-mono text-2xl font-bold text-red-500">
              {rsaCrackProgress < 30 ? "FACTORING" : rsaCrackProgress < 70 ? "CRACKING" : "BROKEN"}
            </div>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-red-500 transition-all duration-100" style={{ width: `${rsaCrackProgress}%` }} />
          </div>
        </div>
        <div className="bg-slate-900/50 p-4 rounded border border-violet-900/30 flex flex-col items-center justify-between flex-1">
          <span className="text-sm font-mono text-violet-400 mb-2">Kyber-1024</span>
          <canvas ref={LatticeCanvas} width={300} height={120} className="w-full h-24 rounded border border-violet-900/50 bg-slate-950" />
          <span className="text-xs text-violet-400 font-mono mt-2">Lattice Grid (Safe)</span>
        </div>
      </div>
    );
  }

  if (step === 2) { // Dilithium vs ECDSA
    return (
      <div className="flex flex-col gap-4 h-full">
        <div className="bg-slate-900/50 p-4 rounded border border-red-900/30 flex flex-col items-center justify-between flex-1">
          <span className="text-sm font-mono text-slate-400 mb-2">ECDSA</span>
          <div className="w-full h-24 flex items-center justify-center bg-slate-950 rounded border border-slate-700">
            {ecdsaState === 'LOCKED' && <Lock className="w-12 h-12 text-slate-500" />}
            {ecdsaState === 'CRACKING' && <RefreshCw className="w-12 h-12 text-yellow-500 animate-spin" />}
            {ecdsaState === 'BROKEN' && <Unlock className="w-12 h-12 text-red-500 animate-bounce" />}
          </div>
          <span className={`text-xs font-mono mt-2 ${ecdsaState === 'BROKEN' ? 'text-red-500 font-bold' : 'text-slate-500'}`}>
            {ecdsaState === 'BROKEN' ? 'KEY FORGED' : 'Vulnerable'}
          </span>
        </div>
        <div className="bg-slate-900/50 p-4 rounded border border-emerald-900/30 flex flex-col items-center justify-between flex-1">
          <span className="text-sm font-mono text-emerald-400 mb-2">Hybrid Dilithium</span>
          <canvas ref={DilithiumCanvas} width={300} height={120} className="w-full h-24 rounded border border-emerald-900/50 bg-slate-950" />
          <span className="text-xs text-emerald-400 font-mono mt-2">Geometric + Classical</span>
        </div>
      </div>
    );
  }
  return null;
}

// 8. UPDATED PRESENTATION VIEW
const PresentationView: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<WalkthroughStep>(0);
  const infoCards: InfoCardData[] = [
    {
      title: "QRNG: Quantum Randomness",
      role: "Entropy Source",
      classicalAlgo: "Pseudo-RNG (PRNG)",
      comparisonTitle: "Predictability vs. Entropy",
      pros: ["True randomness", "Unpredictable", "Physics-based"],
      cons: ["Hardware required", "Slower generation", "Validation needed"],
      technicalDetail: "Classical computers generate 'random' numbers using math formulas (PRNG). If an attacker knows the seed (input) or sees enough output, they can predict future numbers. QRNG uses quantum states (like photon arrival times) which are fundamentally unpredictable by the laws of physics.",
      threatModel: "Predictable RNG seeds allowing key recovery and session hijacking.",
      nistStatus: "SP 800-90B (Entropy Sources)",
      implementation: "Photon arrival time measurement via IDQ chips",
      stats: [
        { label: "Entropy", value: "100%", desc: "True Random" },
        { label: "Prediction", value: "0%", desc: "Impossible" },
        { label: "Speed", value: "4 Gbps", desc: "High Throughput" }
      ],
      futureOutlook: "Essential for securing IoT devices, Edge computing, and future 6G networks where low-latency security is critical."
    },
    {
      title: "Kyber: Key Encapsulation",
      role: "Key Exchange",
      classicalAlgo: "RSA / Elliptic Curve",
      comparisonTitle: "Shor's Algorithm Resilience",
      pros: ["Quantum-resistant", "NIST Standard (ML-KEM)", "Efficient"],
      cons: ["Large keys", "New standard", "Complex math"],
      technicalDetail: "Classical algorithms (RSA) rely on the difficulty of factoring large numbers. A quantum computer running Shor's Algorithm can factor these easily, cracking the code. Kyber uses 'Module Learning With Errors' (Lattice math), a problem even quantum computers cannot solve efficiently.",
      threatModel: "Harvest Now, Decrypt Later (HNDL) attacks targeting long-term secrets.",
      nistStatus: "FIPS 203 (ML-KEM)",
      implementation: "Module Learning With Errors (MLWE)",
      stats: [
        { label: "Key Size", value: "1568 B", desc: "Kyber-1024" },
        { label: "Security", value: "128-bit", desc: "Post-Quantum" },
        { label: "Latency", value: "<1 ms", desc: "Encapsulation" }
      ],
      futureOutlook: "Mandatory for all TLS 1.3 connections and VPNs by 2030 to prevent retroactive decryption of captured traffic."
    },
    {
      title: "Hybrid Dilithium: Dual Signatures",
      role: "Authentication",
      classicalAlgo: "RSA / ECDSA",
      comparisonTitle: "Forgery Resistance",
      pros: ["Quantum-resistant", "Backward Compatible", "Defense in Depth"],
      cons: ["Larger signatures", "Slower verification", "Complex implementation"],
      technicalDetail: "Hybrid Dilithium combines a classical ECDSA signature with a post-quantum Dilithium signature. This 'Dual Signature' approach ensures security even if one algorithm is broken, providing a robust defense-in-depth strategy during the transition to quantum computing.",
      threatModel: "Forged digital signatures allowing impersonation and data tampering.",
      nistStatus: "FIPS 204 (ML-DSA) + FIPS 186-5",
      implementation: "Hybrid (ECDSA P-256 + Dilithium2)",
      stats: [
        { label: "Sig Size", value: "2.5 KB", desc: "Combined" },
        { label: "Verify", value: "Hybrid", desc: "Dual Check" },
        { label: "Security", value: "128-bit", desc: "PQ + Classical" }
      ],
      futureOutlook: "The preferred standard for high-security applications (Gov/Mil) requiring both FIPS compliance and future-proofing."
    }
  ];

  const modules = [<QRNGModule key={0} />, <KyberModule key={1} />, <DilithiumStep key={2} />];

  return (
    <div className="grid md:grid-cols-[1.5fr_1fr] gap-6 h-full">
      <div className="flex items-center justify-center p-4 relative bg-slate-900/20 rounded-xl border border-slate-800/50">
        {/* Background label */}
        <div className="absolute top-0 left-0 p-2 bg-slate-800/50 rounded-br-lg border-b border-r border-slate-700 text-xs font-mono text-slate-500">
          Active Module Visualization
        </div>
        <div className="scale-125 transform transition-transform">
          {modules[currentStep]}
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6 bg-slate-800/30 backdrop-blur-sm rounded-lg border border-slate-700 overflow-y-auto h-full">
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 font-mono mb-1">{infoCards[currentStep].title}</h2>
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <span className="px-2 py-0.5 bg-slate-700 rounded text-xs">Replaces: {infoCards[currentStep].classicalAlgo}</span>
          </div>
        </div>

        {/* COMPARISON SECTION - Now takes more space */}
        <div className="bg-slate-900/40 border border-slate-700 rounded-lg p-4 flex-1 flex flex-col">
          <h3 className="text-sm font-bold text-slate-300 font-mono mb-3 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-violet-400" />
            Comparison: {infoCards[currentStep].comparisonTitle}
          </h3>
          <div className="flex-1">
            <ComparisonWidget step={currentStep} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-red-900/20 border border-red-900/50 rounded-lg p-3">
              <h4 className="text-xs font-bold text-red-400 uppercase mb-1 flex items-center gap-2">
                <AlertTriangle className="w-3 h-3" /> Threat Model
              </h4>
              <p className="text-xs text-red-200/80 leading-snug">
                {infoCards[currentStep].threatModel}
              </p>
            </div>
            <div className="bg-blue-900/20 border border-blue-900/50 rounded-lg p-3">
              <h4 className="text-xs font-bold text-blue-400 uppercase mb-1 flex items-center gap-2">
                <CheckCircle className="w-3 h-3" /> NIST Standard
              </h4>
              <p className="text-xs text-blue-200/80 leading-snug font-mono">
                {infoCards[currentStep].nistStatus}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {infoCards[currentStep].stats.map((stat, i) => (
              <div key={i} className="bg-slate-900/50 border border-slate-700 rounded p-2 text-center">
                <div className="text-[10px] text-slate-500 uppercase font-bold">{stat.label}</div>
                <div className="text-lg font-bold text-cyan-400 font-mono">{stat.value}</div>
                <div className="text-[10px] text-slate-400">{stat.desc}</div>
              </div>
            ))}
          </div>

          <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 mt-2">
            <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Technical Deep Dive</h4>
            <p className="text-sm text-slate-300 leading-relaxed mb-2">
              {infoCards[currentStep].technicalDetail}
            </p>
            <div className="pt-2 border-t border-slate-800">
              <span className="text-xs text-slate-500 font-mono">Implementation: </span>
              <span className="text-xs text-cyan-400 font-mono">{infoCards[currentStep].implementation}</span>
            </div>
          </div>

          <div className="bg-emerald-900/10 border border-emerald-900/30 rounded-lg p-3">
            <h4 className="text-xs font-bold text-emerald-500 uppercase mb-1">Future Outlook</h4>
            <p className="text-xs text-emerald-200/80 leading-snug">
              {infoCards[currentStep].futureOutlook}
            </p>
          </div>
        </div>

        <div className="flex justify-between mt-auto pt-4">
          <button onClick={() => setCurrentStep(s => Math.max(0, s - 1) as WalkthroughStep)} disabled={currentStep === 0} className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-200 disabled:opacity-50"><ChevronLeft className="w-4 h-4" />Prev</button>

          <div className="flex gap-2 items-center">
            {[0, 1, 2].map(i => (
              <div key={i} className={`w-2 h-2 rounded-full transition-colors ${i === currentStep ? 'bg-cyan-400' : 'bg-slate-600'}`} />
            ))}
          </div>

          <button onClick={() => setCurrentStep(s => Math.min(2, s + 1) as WalkthroughStep)} disabled={currentStep === 2} className="flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-slate-200 disabled:opacity-50">Next<ChevronRight className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
};

// ... (Main App Export remains the same)
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('CHAT');

  if (!isLoggedIn) {
    return <LoginScreen onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">
      <nav className="border-b border-slate-700 bg-slate-900/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-cyan-400" />
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 bg-clip-text text-transparent">
              QuantumShield
            </h1>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setViewMode('CHAT')} className={`px-6 py-2 rounded-lg font-semibold transition-all ${viewMode === 'CHAT' ? 'bg-cyan-500 text-slate-900' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>Live Demo</button>
            <button onClick={() => setViewMode('WALKTHROUGH')} className={`px-6 py-2 rounded-lg font-semibold transition-all ${viewMode === 'WALKTHROUGH' ? 'bg-violet-500 text-slate-900' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}>Walkthrough</button>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 py-8">
        {viewMode === 'CHAT' ? (
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 text-center">
              <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent">Secure Communication Channel</h2>
              <p className="text-slate-400 font-mono text-sm">Post-Quantum Cryptography • S3 Encrypted Backup • Active MITM Protection</p>
            </div>
            <SecureChatModule />
          </div>
        ) : (
          <PresentationView />
        )}
      </main>
      <footer className="border-t border-slate-700 mt-12 py-6 text-center text-slate-500 text-sm font-mono">
        <p>Quantum-Secure Communication Simulator • Secure Technology Innovation Demo</p>
      </footer>
    </div>
  );
}