import React, { useEffect, useRef, useState } from 'react';

// Option 1: Animated SVG code background
function CodeBackground() {
  const codeSymbols = ['<>', '//', '{}', '()', '[]', '&&', '||', '=>', '++', '--', '**', '%%'];
  const symbolCount = 40;
  
  return (
    <div className="code-background">
      {Array.from({ length: symbolCount }).map((_, index) => {
        const randomSymbol = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
        const size = Math.random() * 30 + 10; // 10-40px
        const x = Math.random() * 100; // 0-100%
        const y = Math.random() * 100; // 0-100%
        const animationDuration = Math.random() * 30 + 20; // 20-50s
        const delay = Math.random() * 20; // 0-20s
        
        return (
          <div
            key={index}
            className="floating-code"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              fontSize: `${size}px`,
              opacity: Math.random() * 0.4 + 0.1, // 0.1-0.5
              animationDuration: `${animationDuration}s`,
              animationDelay: `${delay}s`,
              color: `rgba(${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 100 + 100)}, ${Math.floor(Math.random() * 255)}, 0.3)`
            }}
          >
            {randomSymbol}
          </div>
        );
      })}
    </div>
  );
}

// Option 2: Matrix-style falling code
function MatrixBackground() {
  const [columns, setColumns] = useState([]);
  
  useEffect(() => {
    const CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789{}[];:<>,./?|\\=+-_)(*&^%$#@!~`';
    const COLUMN_COUNT = Math.floor(window.innerWidth / 20);
    
    const initialColumns = Array.from({ length: COLUMN_COUNT }).map(() => ({
      chars: Array.from({ length: Math.floor(Math.random() * 25) + 5 }).map(() => 
        CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length))
      ),
      x: Math.floor(Math.random() * window.innerWidth),
      speed: Math.random() * 100 + 50,
      opacity: Math.random() * 0.5 + 0.1
    }));
    
    setColumns(initialColumns);
    
    const updateColumnsInterval = setInterval(() => {
      setColumns(prevColumns => 
        prevColumns.map(column => ({
          ...column,
          chars: [
            CHARACTERS.charAt(Math.floor(Math.random() * CHARACTERS.length)),
            ...column.chars.slice(0, column.chars.length - 1)
          ]
        }))
      );
    }, 100);
    
    return () => clearInterval(updateColumnsInterval);
  }, []);
  
  return (
    <div className="matrix-background">
      {columns.map((column, columnIndex) => (
        <div 
          key={columnIndex}
          className="matrix-column"
          style={{ 
            left: `${column.x}px`,
            opacity: column.opacity,
            animationDuration: `${column.speed}s`
          }}
        >
          {column.chars.map((char, charIndex) => (
            <div 
              key={charIndex} 
              className="matrix-char"
              style={{ 
                opacity: 1 - charIndex / column.chars.length,
                color: charIndex === 0 ? '#fff' : '#0f8'  
              }}
            >
              {char}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

// Option 3: Particle network effect
function ParticleNetwork() {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100);
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        vx: Math.random() * 2 - 1,
        vy: Math.random() * 2 - 1,
        color: `rgba(${Math.random() * 40 + 20}, ${Math.random() * 150 + 100}, ${Math.random() * 100 + 155}, 0.7)`
      });
    }
    
    const animate = () => {
      requestAnimationFrame(animate);
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.vx = -particle.vx;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy = -particle.vy;
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      
      ctx.strokeStyle = 'rgba(120, 255, 220, 0.1)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="particle-canvas" />;
}

export { CodeBackground, MatrixBackground, ParticleNetwork };
