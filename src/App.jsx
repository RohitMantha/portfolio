import React, { useState, useEffect } from 'react';
import { Terminal, Database, Server, Brain, Code, Brackets, ChevronRight, Mail, FileText, Send, CheckCircle, Workflow, Cpu } from 'lucide-react';
import './index.css';

const App = () => {
  // Terminal Typing Effect State
  const [terminalText, setTerminalText] = useState('');
  const fullText = "Building an open-source RAG tool for financial APIs... [██████████░░] 85%";
  
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

  // Form State
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    // Provide your Web3Forms Access Key here
    formData.append("access_key", "YOUR_ACCESS_KEY_HERE");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      setResult("Message sent successfully!");
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
            <div className="availability-badge" style={{ marginRight: '1rem', display: 'none' }}>
               {/* Display block on desktop, hidden on mobile via CSS usually, but we'll leave it inline for now */}
               <div className="pulse-dot"></div>
               Available for Freelance
            </div>
            <a href="#services">Services</a>
            <a href="#projects">Projects</a>
            <a href="#resume">Resume</a>
            <a href="#contact" className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem', color: 'white' }}>Hire Me</a>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section id="about" className="container" style={{ paddingTop: '10rem' }}>
          
          <div style={{ marginBottom: '2rem' }}>
            <div className="availability-badge">
               <div className="pulse-dot"></div>
               Available for Full-Time Roles & Freelance Projects
            </div>
          </div>

          <h1 style={{ fontSize: '4rem', lineHeight: '1.1', marginBottom: '1.5rem' }}>
            Hi, I'm Rohit.<br />
            I build <span className="gradient-text">Production AI.</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '3rem' }}>
            AI Engineer specializing in RAG Pipelines, Agentic Workflows, and ML Inference Optimization. 
            I take LLMs out of notebooks and put them into reliable enterprise systems.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '5rem', flexWrap: 'wrap' }}>
            <a href="#services" className="btn btn-primary">
              See What I Build <ChevronRight size={18} />
            </a>
            <a href="#resume" className="btn btn-secondary">
              <FileText size={18} /> View Resume
            </a>
          </div>

          {/* Terminal Component */}
          <div className="terminal">
            <div className="terminal-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <div className="terminal-dot dot-red"></div>
                <div className="terminal-dot dot-yellow"></div>
                <div className="terminal-dot dot-green"></div>
              </div>
              <div style={{ fontSize: '0.8rem', color: '#9ca3af', fontFamily: 'var(--font-body)', fontWeight: 500 }}>
                bash — Currently Building & Learning
              </div>
            </div>
            <div className="log-line">
              <span className="log-prefix" style={{ color: '#fbbf24' }}>rohit@ai-portfolio:~$</span>
              <span className="log-info" style={{ marginLeft: '8px' }}>cat currently_learning.txt</span>
            </div>
            <div className="log-line" style={{ marginBottom: '1.2rem', color: '#d1d5db', fontStyle: 'italic' }}>
              &gt; Exploring advanced multi-agent orchestration with LangGraph and CrewAI.
            </div>
            <div className="log-line">
              <span className="log-prefix" style={{ color: '#fbbf24' }}>rohit@ai-portfolio:~$</span>
              <span className="log-info" style={{ marginLeft: '8px' }}>./execute_current_project.sh</span>
            </div>
            <div className="log-line">
              <span className="log-success">➜</span>
              <span style={{ color: '#f3f4f6', marginLeft: '8px' }}>{terminalText}</span><span className="cursor"></span>
            </div>
          </div>
        </section>

        {/* Services Section (New for Freelance) */}
        <section id="services" className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}><span className="gradient-text">What I Build</span></h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem', maxWidth: '600px' }}>
            Whether you are hiring for a full-time role or need a freelance expert, I deliver production-ready AI infrastructure.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            <div className="glass-card">
              <Database size={32} color="var(--accent-blue)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Custom RAG Pipelines</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                I build intelligent retrieval systems that connect LLMs to your private enterprise data (PDFs, Databases, Confluence). 
                I focus on hybrid retrieval and re-ranking to stop hallucinations.
              </p>
            </div>

            <div className="glass-card">
              <Workflow size={32} color="var(--accent-purple)" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>Agentic AI Workflows</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                I design autonomous multi-agent systems using LangGraph that can research, plan, and execute complex, multi-step tasks without human intervention.
              </p>
            </div>

            <div className="glass-card">
              <Cpu size={32} color="#10b981" style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>ML Inference & APIs</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                I don't leave models in Jupyter Notebooks. I optimize them (Quantization/ONNX), wrap them in scalable FastAPI microservices, and containerize them with Docker.
              </p>
            </div>

          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="container">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '3rem' }}><span className="gradient-text">Featured Projects</span></h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
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

          </div>
        </section>

        {/* Resume Embed Section */}
        <section id="resume" className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
            <div>
              <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}><span className="gradient-text">Resume</span></h2>
              <p style={{ color: 'var(--text-muted)' }}>My complete professional background and education.</p>
            </div>
            <a href="/resume.html" target="_blank" className="btn btn-secondary">
              Open Full Screen
            </a>
          </div>
          
          <div style={{ 
            width: '100%', 
            height: '800px', 
            borderRadius: '16px', 
            overflow: 'hidden', 
            border: '1px solid var(--border)',
            background: '#fff'
          }}>
            <iframe 
              src="/resume.html" 
              title="Rohit Resume"
              style={{ width: '100%', height: '100%', border: 'none' }}
            ></iframe>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="container" style={{ paddingBottom: '8rem' }}>
          <div className="glass-card" style={{ maxWidth: '700px', margin: '0 auto', padding: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}><span className="gradient-text">Let's Work Together</span></h2>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '2.5rem' }}>
              Whether you have a freelance project or a full-time opportunity, drop me a message and I'll get back to you within 24 hours.
            </p>
            
            <form onSubmit={onSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div>
                  <label className="form-label">Your Name</label>
                  <input type="text" name="name" className="form-input" required placeholder="John Doe" />
                </div>
                <div>
                  <label className="form-label">Your Email</label>
                  <input type="email" name="email" className="form-input" required placeholder="john@company.com" />
                </div>
              </div>
              
              <div className="form-group">
                <label className="form-label">Project Details / Message</label>
                <textarea name="message" className="form-textarea" required placeholder="Tell me about your AI needs..."></textarea>
              </div>

              <input type="hidden" name="subject" value="New Inquiry from AI Portfolio!" />
              
              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <Send size={18} /> Send Message
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
    </>
  );
};

export default App;
