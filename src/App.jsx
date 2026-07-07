import React, { useState, useEffect } from 'react';
import { Terminal, Database, Server, Brain, Code, ChevronRight, Send, Briefcase, MessageSquare, Zap, FileText, Download, ExternalLink } from 'lucide-react';
import './index.css';

const App = () => {
  // Terminal Typing Effect State
  const [terminalText, setTerminalText] = useState('');
  const fullText = "Building an open-source AI tool for financial APIs... [██████████░░] 85%";
  
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
            <div className="availability-badge" style={{ marginRight: '1rem', display: 'none' }}>
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

          <h1 style={{ fontSize: '4.5rem', lineHeight: '1.1', marginBottom: '1.5rem' }}>
            Hi, I'm Rohit.<br />
            I build <span className="gradient-text">Custom AI Software.</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', maxWidth: '650px', marginBottom: '3rem' }}>
            I help businesses integrate AI into their products. Whether you need a custom ChatGPT for your private data, or automated AI agents to do your busy work, I build reliable systems that actually work.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '5rem', flexWrap: 'wrap' }}>
            <a href="#services" className="btn btn-primary">
              See What I Build <ChevronRight size={18} />
            </a>
            <a href="#contact" className="btn btn-secondary">
              Let's Talk
            </a>
          </div>

          {/* Terminal Component */}
          <div className="terminal" style={{ maxWidth: '800px' }}>
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
              &gt; Exploring advanced multi-agent orchestration for business automation.
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

        {/* Services Section (Simplified for non-tech clients) */}
        <section id="services" className="container">
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}><span className="gradient-text">How I Can Help You</span></h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '4rem', fontSize: '1.2rem', maxWidth: '600px' }}>
            I specialize in turning raw AI technology (like ChatGPT and Gemini) into usable software for your business.
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            <div className="glass-card" style={{ padding: '2.5rem 2rem' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <MessageSquare size={32} color="var(--accent-blue)" />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Custom AI Chatbots</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                Want a ChatGPT that knows everything about your business? I build intelligent chatbots that securely read your private PDFs, websites, and databases to answer customer or employee questions accurately.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '2.5rem 2rem' }}>
              <div style={{ background: 'rgba(139, 92, 246, 0.1)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Zap size={32} color="var(--accent-purple)" />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Automated AI Agents</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                Stop doing manual, repetitive tasks. I design "AI Agents" that can autonomously research the web, extract data from documents, fill out forms, and trigger emails without you lifting a finger.
              </p>
            </div>

            <div className="glass-card" style={{ padding: '2.5rem 2rem' }}>
              <div style={{ background: 'rgba(16, 185, 129, 0.1)', width: '60px', height: '60px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <Briefcase size={32} color="#10b981" />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>AI App Development</h3>
              <p style={{ color: 'var(--text-muted)', lineHeight: '1.7' }}>
                Have an idea for an AI startup or internal tool? I build the complete software package. From integrating OpenAI and Gemini APIs, to building the backend infrastructure so it runs incredibly fast.
              </p>
            </div>

          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="container">
          <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}><span className="gradient-text">Featured Projects</span></h2>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            
            {/* Project 1 */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '2rem' }}>
              <Brain size={36} color="var(--accent-blue)" style={{ marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Enterprise RAG Pipeline</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flexGrow: 1, lineHeight: '1.6' }}>
                End-to-end RAG (Retrieval-Augmented Generation) system over 50K+ financial documents using hybrid retrieval. Achieved 78.2% Context Precision, eliminating hallucinations.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px' }}>LangChain</span>
                <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px' }}>ChromaDB</span>
                <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px' }}>FastAPI</span>
              </div>
              <a href="https://github.com/rohit-mantha" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                <Code size={18} /> Source Code
              </a>
            </div>

            {/* Project 2 */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '2rem' }}>
              <Server size={36} color="var(--accent-purple)" style={{ marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>Multi-Agent AI Platform</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flexGrow: 1, lineHeight: '1.6' }}>
                An orchestration platform where autonomous AI agents collaborate to conduct research and write reports, reducing complex task times to under 3 minutes.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px' }}>LangGraph</span>
                <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px' }}>CrewAI</span>
                <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px' }}>OpenAI</span>
              </div>
              <a href="https://github.com/rohit-mantha" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                <Code size={18} /> Source Code
              </a>
            </div>

            {/* Project 3 */}
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', height: '100%', padding: '2rem' }}>
              <Database size={36} color="#10b981" style={{ marginBottom: '1.5rem' }} />
              <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>AI Finance Assistant</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', flexGrow: 1, lineHeight: '1.6' }}>
                Intelligent Q&A system enabling natural language queries over dense financial reports using 512-token semantic chunking for high accuracy.
              </p>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px' }}>Gemini API</span>
                <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px' }}>Transformers</span>
                <span style={{ fontSize: '0.85rem', background: 'rgba(255,255,255,0.08)', padding: '6px 12px', borderRadius: '20px' }}>Pinecone</span>
              </div>
              <a href="https://github.com/rohit-mantha" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
                <Code size={18} /> Source Code
              </a>
            </div>

          </div>
        </section>

        {/* Resume Section (Sleek Card UI instead of massive iframe) */}
        <section id="resume" className="container">
          <div className="glass-card" style={{ 
            padding: '4rem', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            textAlign: 'center',
            background: 'linear-gradient(145deg, rgba(15,15,15,0.9) 0%, rgba(5,5,5,0.95) 100%)',
            border: '1px solid rgba(255,255,255,0.05)'
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
            
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}><span className="gradient-text">Full Resume & Experience</span></h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', marginBottom: '3rem' }}>
              Looking for a deep dive into my professional experience, education, and technical stack? View my complete ATS-friendly resume.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
              <a href="/resume.html" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '12px 24px', fontSize: '1.1rem' }}>
                <ExternalLink size={20} /> View Resume
              </a>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section id="contact" className="container" style={{ paddingBottom: '8rem' }}>
          <div className="glass-card" style={{ maxWidth: '700px', margin: '0 auto', padding: '4rem 3rem' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}><span className="gradient-text">Let's Work Together</span></h2>
            <p style={{ color: 'var(--text-muted)', textAlign: 'center', marginBottom: '3rem', fontSize: '1.1rem' }}>
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
              
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label className="form-label">Project Details / Message</label>
                <textarea name="message" className="form-textarea" required placeholder="Tell me about your AI needs..."></textarea>
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
            <a href="https://github.com/rohit-mantha" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s', textDecoration: 'none', fontWeight: 500 }}>
              GitHub
            </a>
            <a href="https://linkedin.com/in/rohit-mantha" target="_blank" rel="noreferrer" style={{ color: 'var(--text-muted)', transition: 'color 0.2s', textDecoration: 'none', fontWeight: 500 }}>
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
