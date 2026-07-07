import React, { useState, useEffect } from 'react';
import { Terminal, Database, Server, Brain, Code, Brackets, ChevronRight, Mail } from 'lucide-react';
import './index.css';

const App = () => {
  // Terminal Typing Effect State
  const [terminalText, setTerminalText] = useState('');
  const fullText = "Fine-tuning Llama-3 on financial data... [██████████░░] 85%";
  
  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullText.length) {
        setTerminalText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 50);
    return () => clearInterval(typingInterval);
  }, []);

  return (
    <>
      <div className="bg-mesh"></div>

      {/* Navigation */}
      <nav>
        <div className="nav-content">
          <a href="#" className="logo">rohit<span className="gradient-text">.ai</span></a>
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="about" className="container" style={{ paddingTop: '12rem' }}>
          <h1 style={{ fontSize: '4rem', lineHeight: '1.1', marginBottom: '1.5rem' }}>
            Hi, I'm Rohit.<br />
            I build <span className="gradient-text">Production AI.</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '3rem' }}>
            AI Engineer specializing in RAG Pipelines, Agentic Workflows, and ML Inference Optimization. 
            I take LLMs out of notebooks and put them into reliable enterprise systems.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '5rem' }}>
            <a href="#projects" className="btn btn-primary">
              View My Work <ChevronRight size={18} />
            </a>
            <a href="mailto:mantharohit03@gmail.com" className="btn btn-secondary">
              Contact Me
            </a>
          </div>

          {/* Terminal Component */}
          <div className="terminal">
            <div className="terminal-header">
              <div className="terminal-dot dot-red"></div>
              <div className="terminal-dot dot-yellow"></div>
              <div className="terminal-dot dot-green"></div>
            </div>
            <div className="log-line">
              <span className="log-time">[09:41:22]</span>
              <span className="log-prefix">system:</span>
              <span className="log-info">Initializing AI Agent Protocol...</span>
            </div>
            <div className="log-line">
              <span className="log-time">[09:41:23]</span>
              <span className="log-prefix">auth:</span>
              <span className="log-success">Vector DB connected successfully.</span>
            </div>
            <div className="log-line">
              <span className="log-time">[09:41:25]</span>
              <span className="log-prefix">build:</span>
              <span style={{ color: '#f3f4f6' }}>{terminalText}</span><span className="cursor"></span>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}><span className="gradient-text">Experience</span></h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Sciforn */}
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.4rem' }}>AI Engineer</h3>
                  <div style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>Sciforn Solutions Pvt. Ltd</div>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Dec 2025 – Present</div>
              </div>
              <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Deployed a production RAG pipeline using LangChain and ChromaDB to automate unstructured financial document extraction, reducing manual review time by 65%.</li>
                <li>Engineered agentic AI workflows via LangGraph to orchestrate multi-step document processing, enabling autonomous parsing of 1,200+ PDFs daily.</li>
                <li>Implemented hybrid retrieval (dense + BM25 + re-ranking), achieving 86% Context Precision and 91% Faithfulness on RAGAS benchmarks.</li>
              </ul>
            </div>

            {/* LTIMindtree */}
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.4rem' }}>MLOps Engineer</h3>
                  <div style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>LTIMINDTREE</div>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Jun 2025 – Dec 2025</div>
              </div>
              <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Designed automated ML model validation pipelines using Azure DevOps, reducing deployment regression cycles by 30% before production releases.</li>
                <li>Built data integrity frameworks for ML training data during backend migrations, seamlessly processing 2M+ records with zero data loss.</li>
              </ul>
            </div>
            
            {/* MDI AI */}
            <div className="glass-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.4rem' }}>ML Engineer Intern</h3>
                  <div style={{ color: 'var(--accent-blue)', fontWeight: 600 }}>MDI AI Detection LLC</div>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Dec 2024 – May 2025</div>
              </div>
              <ul style={{ color: 'var(--text-muted)', paddingLeft: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Optimized ML inference pipelines for edge deployment using model quantization (FP16/INT8), achieving 3.2x speedup while maintaining 96%+ accuracy.</li>
                <li>Deployed scalable real-time inference APIs processing 30+ concurrent data streams using FastAPI.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}><span className="gradient-text">Featured Projects</span></h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* Project 1 */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Brain size={32} color="var(--accent-blue)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.3rem' }}>Enterprise RAG Pipeline</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flexGrow: 1 }}>
                End-to-end RAG system over 50K+ financial documents with hybrid retrieval. Achieved 78.2% Context Precision.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '12px' }}>LangChain</span>
                <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '12px' }}>ChromaDB</span>
                <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '12px' }}>FastAPI</span>
              </div>
              <a href="https://github.com/rohit-mantha" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem' }}>
                <Code size={16} /> Source Code
              </a>
            </div>

            {/* Project 2 */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Server size={32} color="var(--accent-purple)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.3rem' }}>Multi-Agent AI Platform</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flexGrow: 1 }}>
                Agentic AI platform with autonomous agents for research and analysis, reducing complex task times to under 3 minutes.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '12px' }}>LangGraph</span>
                <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '12px' }}>CrewAI</span>
                <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '12px' }}>OpenAI</span>
              </div>
              <a href="https://github.com/rohit-mantha" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem' }}>
                <Code size={16} /> Source Code
              </a>
            </div>

            {/* Project 3 */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Database size={32} color="#10b981" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.3rem' }}>AI Finance Assistant</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem', flexGrow: 1 }}>
                Intelligent Q&A system enabling natural language queries over financial reports using 512-token semantic chunking.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
                <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '12px' }}>Gemini API</span>
                <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '12px' }}>Sentence-Transformers</span>
              </div>
              <a href="https://github.com/rohit-mantha" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.9rem' }}>
                <Code size={16} /> Source Code
              </a>
            </div>

          </div>
        </section>

        {/* Skills Section */}
        <section className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}><span className="gradient-text">Core Competencies</span></h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            {['RAG Pipelines', 'LangChain', 'LangGraph', 'Agentic AI', 'Prompt Engineering', 'Model Fine-Tuning', 'LlamaIndex', 'PyTorch', 'HuggingFace', 'ChromaDB', 'FastAPI', 'Docker', 'Python', 'MLOps'].map(skill => (
              <div key={skill} style={{ 
                background: 'rgba(255,255,255,0.05)', 
                border: '1px solid rgba(255,255,255,0.1)', 
                padding: '12px 24px', 
                borderRadius: '30px',
                fontSize: '1rem',
                fontWeight: 500
              }}>
                {skill}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', padding: '4rem 0', marginTop: '4rem', textAlign: 'center' }}>
        <div className="container">
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Let's build something intelligent.</h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '3rem' }}>
            <a href="https://github.com/rohit-mantha" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s', textDecoration: 'none' }}>
              GitHub
            </a>
            <a href="https://linkedin.com/in/rohit-mantha" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s', textDecoration: 'none' }}>
              LinkedIn
            </a>
            <a href="mailto:mantharohit03@gmail.com" style={{ color: 'var(--text-muted)', transition: 'color 0.2s' }}>
              <Mail size={28} />
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
