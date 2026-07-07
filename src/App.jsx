import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Database, Server, Brain, Code, ChevronRight, Send, Briefcase, Zap, FileText, ExternalLink, Download, Phone, Rocket, Shield } from 'lucide-react';
import './index.css';

/* ─── 3D Transformer Architecture Network ─── */
const TransformerNetwork = () => {
  const groupRef = useRef();
  const pointsRefs = useRef([]);
  
  // Create 4 concentric spherical layers to represent deep learning neural layers
  const [layers] = useState(() => {
    const layersData = [];
    const layerCount = 4;
    for (let l = 0; l < layerCount; l++) {
      const count = 200 + (l * 50);
      const pos = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        // Spherical distribution for a cool "brain" / network look
        const r = 1.2 + (l * 0.8);
        const theta = Math.random() * 2 * Math.PI;
        const phi = Math.acos(2 * Math.random() - 1);
        pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);
      }
      layersData.push({ original: pos, current: new Float32Array(pos) });
    }
    return layersData;
  });

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
      groupRef.current.rotation.x += delta * 0.08;
      
      // Interactive mouse follow
      groupRef.current.rotation.y += (state.pointer.x * 0.06);
      groupRef.current.rotation.x -= (state.pointer.y * 0.06);
    }
    
    // "Breathing" data processing animation for nodes
    const t = state.clock.getElapsedTime();
    layers.forEach((layer, layerIdx) => {
      if (pointsRefs.current[layerIdx]) {
        const positions = pointsRefs.current[layerIdx].geometry.attributes.position.array;
        for (let i = 0; i < layer.original.length / 3; i++) {
          // Calculate a pulsing factor based on time and layer depth
          const pulse = 1 + Math.sin(t * 2 + layerIdx) * 0.04;
          positions[i * 3] = layer.original[i * 3] * pulse;
          positions[i * 3 + 1] = layer.original[i * 3 + 1] * pulse;
          positions[i * 3 + 2] = layer.original[i * 3 + 2] * pulse;
        }
        pointsRefs.current[layerIdx].geometry.attributes.position.needsUpdate = true;
      }
    });
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      {layers.map((layer, index) => (
        <points key={index} ref={el => pointsRefs.current[index] = el}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={layer.current.length / 3}
              array={layer.current}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial 
            size={0.06 + (index * 0.01)} 
            color={index % 2 === 0 ? "#60a5fa" : "#8b5cf6"} 
            transparent 
            opacity={0.7} 
            sizeAttenuation={true} 
            blending={THREE.AdditiveBlending}
          />
        </points>
      ))}
      {/* Central "Core" processing unit */}
      <mesh>
        <octahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial color="#34d399" wireframe transparent opacity={0.3} />
      </mesh>
      {/* Outer subtle containment field */}
      <mesh>
        <icosahedronGeometry args={[4.2, 2]} />
        <meshBasicMaterial color="#1e3a8a" wireframe transparent opacity={0.05} />
      </mesh>
    </group>
  );
};

/* ─── Looping Terminal Animation ─── */
const terminalCommands = [
  { prompt: 'cat current_focus.txt', output: '> Exploring multi-agent orchestration for autonomous enterprise workflows.' },
  { prompt: './deploy_rag_pipeline.sh --env=production', output: '✓ RAG pipeline deployed — 86% Context Precision, p95 latency 120ms' },
  { prompt: 'python train.py --model=mistral-7b --method=qlora', output: '✓ Fine-tuning complete — 15% accuracy ↑, 40% inference cost ↓' },
  { prompt: 'kubectl get pods -n ai-services', output: '✓ 4/4 pods running: rag-api, agent-orchestrator, vector-db, eval-service' },
  { prompt: 'python eval.py --benchmark=ragas --dataset=finance', output: '✓ Faithfulness: 91.2% | Context Precision: 86.4% | Answer Relevancy: 88.7%' },
  { prompt: './launch_agents.sh --crew=research,analyst,writer', output: '✓ 3 agents spawned — task decomposition active, ETA: 2m 48s' },
];

const App = () => {
  // Looping Terminal State
  const [terminalLines, setTerminalLines] = useState([]);
  const [currentText, setCurrentText] = useState('');
  const [isTypingPrompt, setIsTypingPrompt] = useState(true);
  const cmdIndex = useRef(0);
  const charIndex = useRef(0);
  const phaseRef = useRef('prompt'); // 'prompt' | 'output' | 'pause'

  useEffect(() => {
    // Terminal typing logic
    const tick = () => {
      const cmd = terminalCommands[cmdIndex.current];

      if (phaseRef.current === 'prompt') {
        if (charIndex.current < cmd.prompt.length) {
          charIndex.current++;
          setCurrentText(cmd.prompt.substring(0, charIndex.current));
          setIsTypingPrompt(true);
          return 45 + Math.random() * 35; // typing speed variation
        } else {
          // Done typing prompt, show output
          phaseRef.current = 'output';
          charIndex.current = 0;
          return 300; // brief pause before output
        }
      }

      if (phaseRef.current === 'output') {
        // Show output instantly
        setTerminalLines(prev => {
          const newLines = [...prev, { prompt: cmd.prompt, output: cmd.output }];
          // Keep only last 4 command pairs visible
          return newLines.slice(-4);
        });
        setCurrentText('');
        setIsTypingPrompt(true);
        phaseRef.current = 'pause';
        return 1500; // pause before next command
      }

      if (phaseRef.current === 'pause') {
        phaseRef.current = 'prompt';
        charIndex.current = 0;
        cmdIndex.current = (cmdIndex.current + 1) % terminalCommands.length;
        return 100;
      }

      return 50;
    };

    let timeout;
    const schedule = () => {
      const delay = tick();
      timeout = setTimeout(schedule, delay);
    };
    schedule();

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  // Form State
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "a7d19e34-ed4a-4e83-854b-96ce54fd8a17");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Message sent successfully! I will reply shortly.");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };

  return (
    <>
      <div className="bg-mesh"></div>

      {/* Navigation */}
      <nav>
        <div className="nav-content">
          <a href="#" className="logo">rohit<span className="gradient-text">.ai</span></a>
          <div className="nav-links">
            <a href="#services">Services</a>
            <a href="#projects">Work</a>
            <a href="#resume">Resume</a>
            <a href="#contact" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem', color: 'white' }}>Hire Me</a>
          </div>
        </div>
      </nav>

      <main style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
        
        {/* ═══════════════════ HERO ═══════════════════ */}
        <section id="about" className="container">
          <div className="hero-layout">
            {/* Left: Text Content */}
            <div className="hero-text">
              <div style={{ marginBottom: '1.5rem' }}>
                <div className="availability-badge">
                   <div className="pulse-dot"></div>
                   Available for Full-Time Roles & Freelance Projects
                </div>
              </div>

              <h1 style={{ fontSize: '4.5rem', lineHeight: '1.1', marginBottom: '1rem' }}>
                I build <span className="gradient-text">Generative AI</span><br />
                systems that ship.
              </h1>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '650px', marginBottom: '2.5rem' }}>
                AI Engineer helping businesses turn ChatGPT, Gemini, and open-source LLMs into production software. From custom chatbots over your private data to autonomous AI agents that eliminate busywork.
              </p>
              
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <a href="#contact" className="btn btn-primary">
                  Let's Talk <ChevronRight size={18} />
                </a>
                <a href="#projects" className="btn btn-secondary">
                  See My Work
                </a>
              </div>
            </div>

            {/* Right: 3D Orb */}
            <div className="hero-3d">
              <Canvas camera={{ position: [0, 0, 9], fov: 45 }} style={{ background: 'transparent' }}>
                <TransformerNetwork />
              </Canvas>
            </div>
          </div>

          {/* Terminal Layout */}
          <div style={{ width: '100%', marginBottom: '2rem' }}>
            
            {/* Terminal Component */}
            <div className="terminal" style={{ width: '100%' }}>
              <div className="terminal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div className="terminal-dot dot-red"></div>
                  <div className="terminal-dot dot-yellow"></div>
                  <div className="terminal-dot dot-green"></div>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#9ca3af', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                  rohit@ai — live feed
                </div>
              </div>

              {/* Previous completed commands */}
              {terminalLines.map((line, i) => (
                <div key={i} style={{ marginBottom: '6px' }}>
                  <div className="log-line">
                    <span className="log-prefix" style={{ color: '#fbbf24' }}>rohit@ai:~$</span>
                    <span className="log-info" style={{ marginLeft: '8px' }}>{line.prompt}</span>
                  </div>
                  <div className="log-line" style={{ color: '#6ee7b7', paddingLeft: '4px' }}>
                    {line.output}
                  </div>
                </div>
              ))}

              {/* Currently typing command */}
              <div className="log-line">
                <span className="log-prefix" style={{ color: '#fbbf24' }}>rohit@ai:~$</span>
                <span className="log-info" style={{ marginLeft: '8px' }}>{currentText}</span>
                <span className="cursor"></span>
              </div>
            </div>

          </div>
        </section>

        {/* ═══════════════════ SERVICES ═══════════════════ */}
        <section id="services" className="container">
          <div className="section-card">
            <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><span className="gradient-text">How I Can Help You</span></h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '3rem' }}>
              I turn raw AI technology (like ChatGPT, Gemini, and open-source models) into usable software for your business.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              
              <div className="glass-card">
                <div style={{ background: 'rgba(59, 130, 246, 0.1)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Brain size={32} color="var(--accent-blue)" />
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Custom AI Chatbots</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                  Want a ChatGPT that knows everything about your business? I build intelligent chatbots that securely read your private PDFs, websites, and databases to answer customer or employee questions accurately.
                </p>
              </div>

              <div className="glass-card">
                <div style={{ background: 'rgba(139, 92, 246, 0.1)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Zap size={32} color="var(--accent-purple)" />
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Automated AI Agents</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                  Stop doing manual, repetitive tasks. I design AI Agents that can autonomously research the web, extract data from documents, fill out forms, and trigger emails — without you lifting a finger.
                </p>
              </div>

              <div className="glass-card">
                <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  <Briefcase size={32} color="#10b981" />
                </div>
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>AI App Development</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                  Have an idea for an AI startup or internal tool? I build the complete software — from integrating OpenAI and Gemini APIs, to the backend infrastructure that makes it run fast and reliably at scale.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* ═══════════════════ HOW I WORK ═══════════════════ */}
        <section id="process" className="container">
          <div className="section-card">
            <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem', textAlign: 'center' }}><span className="gradient-text">How I Work</span></h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', textAlign: 'center', maxWidth: '650px', margin: '0 auto 3rem' }}>
              These stages are highly related and flow in a strict order — from our first discovery call straight through to production deployment.
            </p>
            
            <div className="process-grid">
              <div className="process-step">
                <div className="step-number" style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--accent-blue)' }}>
                  <Phone size={24} />
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Discovery</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  We hop on a call. I learn your data, your goals, and your constraints. No jargon, just clarity.
                </p>
              </div>
              
              <div className="process-step">
                <div className="step-number" style={{ background: 'rgba(139, 92, 246, 0.1)', color: 'var(--accent-purple)' }}>
                  <Rocket size={24} />
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Rapid Prototype</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  I deliver a working MVP in 1–2 weeks. You see real results before committing to a full build.
                </p>
              </div>
              
              <div className="process-step">
                <div className="step-number" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                  <Shield size={24} />
                </div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>Production Deploy</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  I scale, optimize, and deploy the final system. You get full documentation and handoff.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════ PROJECTS (CASE STUDIES) ═══════════════════ */}
        <section id="projects" className="container">
          <div className="section-card">
            <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><span className="gradient-text">Featured Work</span></h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '3rem' }}>
              Real problems solved with production-grade AI systems.
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
              
              {/* Project 1 - Case Study Format */}
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Brain size={36} color="var(--accent-blue)" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Enterprise RAG Pipeline</h3>
                <div style={{ color: 'var(--text-muted)', marginBottom: '2rem', flexGrow: 1, lineHeight: '1.7' }}>
                  <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Problem:</strong> A financial firm was manually reviewing 1,200+ documents daily.</p>
                  <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Solution:</strong> Built a RAG pipeline with LangChain + ChromaDB using hybrid retrieval and re-ranking.</p>
                  <p><strong style={{ color: 'var(--text-main)' }}>Result:</strong> 65% reduction in manual review. 78.2% Context Precision.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px' }}>LangChain</span>
                  <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px' }}>ChromaDB</span>
                  <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px' }}>FastAPI</span>
                </div>
                <a href="https://github.com/RohitMantha" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Code size={18} /> Source Code
                </a>
              </div>

              {/* Project 2 - Case Study Format */}
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Server size={36} color="var(--accent-purple)" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Multi-Agent AI Platform</h3>
                <div style={{ color: 'var(--text-muted)', marginBottom: '2rem', flexGrow: 1, lineHeight: '1.7' }}>
                  <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Problem:</strong> Complex research and analysis tasks were taking teams 2+ hours each.</p>
                  <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Solution:</strong> Designed autonomous AI agents that collaborate using LangGraph with human-in-the-loop approval gates.</p>
                  <p><strong style={{ color: 'var(--text-main)' }}>Result:</strong> Task completion in under 3 minutes with built-in cost tracking.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px' }}>LangGraph</span>
                  <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px' }}>CrewAI</span>
                  <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px' }}>OpenAI</span>
                </div>
                <a href="https://github.com/RohitMantha" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Code size={18} /> Source Code
                </a>
              </div>

              {/* Project 3 - Case Study Format */}
              <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Database size={36} color="#10b981" style={{ marginBottom: '1.5rem' }} />
                <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>AI Finance Assistant</h3>
                <div style={{ color: 'var(--text-muted)', marginBottom: '2rem', flexGrow: 1, lineHeight: '1.7' }}>
                  <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Problem:</strong> Analysts couldn't quickly query dense financial reports in natural language.</p>
                  <p style={{ marginBottom: '0.5rem' }}><strong style={{ color: 'var(--text-main)' }}>Solution:</strong> Built an intelligent Q&A system with 512-token semantic chunking and Gemini API integration.</p>
                  <p><strong style={{ color: 'var(--text-main)' }}>Result:</strong> Instant natural language queries over thousands of financial pages.</p>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                  <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px' }}>Gemini API</span>
                  <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px' }}>Transformers</span>
                  <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px' }}>Pinecone</span>
                </div>
                <a href="https://github.com/RohitMantha" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                  <Code size={18} /> Source Code
                </a>
              </div>

            </div>
          </div>
        </section>


        {/* ═══════════════════ RESUME ═══════════════════ */}
        <section id="resume" className="container">
          <div className="section-card" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center'
          }}>
            <div style={{ 
              background: 'rgba(59, 130, 246, 0.1)', 
              width: '80px', 
              height: '80px', 
              borderRadius: '50%', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              marginBottom: '2rem',
              boxShadow: '0 0 30px rgba(59, 130, 246, 0.2)'
            }}>
              <FileText size={40} color="var(--accent-blue)" />
            </div>
            
            <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}><span className="gradient-text">Full Resume & Experience</span></h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '2.5rem' }}>
              3 companies. 3 production AI systems. Deep dive into my professional experience, education, and technical stack.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="resume.html" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '1.1rem' }}>
                <ExternalLink size={20} /> View Resume
              </a>
              <a href="Rohit_AI_Engineer_Resume.pdf" download="Rohit_Mantha_AI_Engineer_Resume.pdf" className="btn btn-secondary" style={{ padding: '12px 24px', fontSize: '1.1rem' }}>
                <Download size={20} /> Download PDF
              </a>
            </div>
          </div>
        </section>

        {/* ═══════════════════ CONTACT ═══════════════════ */}
        <section id="contact" className="container">
          <div className="section-card" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '0.5rem', textAlign: 'center' }}><span className="gradient-text">Let's Work Together</span></h2>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '3rem', fontSize: '1.1rem' }}>
              Whether you have a freelance project or a full-time opportunity, drop me a message and I'll get back to you within 24 hours.
            </p>
            
            <form onSubmit={onSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label className="form-label">Your Name</label>
                  <input type="text" name="name" className="form-input" required placeholder="John Doe" />
                </div>
                <div>
                  <label className="form-label">Your Email</label>
                  <input type="email" name="email" className="form-input" required placeholder="john@company.com" />
                </div>
              </div>
              
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label className="form-label">Project Details / Message</label>
                <textarea name="message" className="form-textarea" required placeholder="Tell me about your project or opportunity..."></textarea>
              </div>

              <input type="hidden" name="subject" value="New Inquiry from AI Portfolio!" />
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1.1rem' }}>
                <Send size={20} /> Send Message
              </button>
            </form>
            
            {result && (
              <div style={{ marginTop: '1.5rem', textAlign: 'center', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', color: result.includes("success") ? '#10b981' : 'var(--text-main)' }}>
                {result}
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '4rem 0', textAlign: 'center' }}>
        <div className="container">
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Let's build something intelligent.</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginBottom: '3rem' }}>
            <a href="https://github.com/RohitMantha" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s', textDecoration: 'none', fontWeight: 500 }}>
              GitHub
            </a>
            <a href="https://linkedin.com/in/RohitMantha" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s', textDecoration: 'none', fontWeight: 500 }}>
              LinkedIn
            </a>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            &copy; 2026 M Naga Vijay Rohit. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default App;
