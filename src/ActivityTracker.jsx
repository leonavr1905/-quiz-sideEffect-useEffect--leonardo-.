import React, { useState, useEffect, useRef } from 'react';

const ActivityTracker = () => {
  const [count, setCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  
  const isMounted = useRef(false);

  useEffect(() => {
    console.log("Page loaded");
  }, []);

  useEffect(() => {
    if (isMounted.current) {
      console.log("Count updated");
    } else {
      isMounted.current = true;
    }
  }, [count]);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isTracking) {
      console.log("Tracking active");
    }
  }, [isTracking]);

  const styles = {
    container: {
      maxWidth: '450px',
      margin: '40px auto',
      padding: '25px',
      borderRadius: '20px',
      backgroundColor: '#ffffff',
      boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
      fontFamily: "'Inter', sans-serif",
      textAlign: 'center',
    },
    card: {
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '15px',
      marginBottom: '20px',
      border: '1px solid #eee'
    },
    countText: {
      fontSize: '48px',
      fontWeight: '800',
      color: '#2d3436',
      margin: '10px 0'
    },
    timerBox: {
      backgroundColor: '#1e272e',
      color: '#00d2d3',
      padding: '15px',
      borderRadius: '12px',
      fontSize: '32px',
      fontWeight: 'bold',
      fontFamily: 'monospace',
      display: 'inline-block',
      minWidth: '150px',
      marginTop: '10px',
      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
    },
    btnBlue: {
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: '600',
      color: '#fff',
      backgroundColor: '#0984e3',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
    btnTrack: (active) => ({
      padding: '12px 24px',
      fontSize: '16px',
      fontWeight: '600',
      color: '#fff',
      backgroundColor: active ? '#d63031' : '#00b894',
      border: 'none',
      borderRadius: '10px',
      cursor: 'pointer',
      marginTop: '10px'
    }),
    badge: (active) => ({
      display: 'inline-block',
      padding: '6px 12px',
      borderRadius: '20px',
      fontSize: '11px',
      fontWeight: '800',
      backgroundColor: active ? '#fab1a0' : '#dfe6e9',
      color: active ? '#d63031' : '#636e72',
      marginTop: '15px',
      textTransform: 'uppercase'
    })
  };

  return (
    <div style={styles.container}>
      <h2 style={{ color: '#2d3436', marginBottom: '5px' }}>Activity Tracker</h2>
      <p style={{ color: '#636e72', fontSize: '14px', marginBottom: '25px' }}>Quiz: React Lifecycle & Side Effects</p>

      <div style={styles.card}>
        <p style={{ margin: 0, color: '#b2bec3', fontWeight: '600' }}>TOTAL CLICKS</p>
        <div style={styles.countText}>{count}</div>
        <button 
          style={styles.btnBlue}
          onClick={() => setCount(count + 1)}
          onMouseDown={(e) => e.target.style.transform = 'scale(0.95)'}
          onMouseUp={(e) => e.target.style.transform = 'scale(1)'}
        >
          Increase Count
        </button>
      </div>

      <div style={styles.card}>
        <p style={{ margin: 0, color: '#b2bec3', fontWeight: '600' }}>SESSION TIME</p>
        <div style={styles.timerBox}>
          {String(Math.floor(timer / 60)).padStart(2, '0')}:
          {String(timer % 60).padStart(2, '0')}
        </div>
      </div>

      <div>
        <button 
          style={styles.btnTrack(isTracking)}
          onClick={() => setIsTracking(!isTracking)}
        >
          {isTracking ? "Stop Tracking" : "Start Tracking"}
        </button>
        <br />
        <div style={styles.badge(isTracking)}>
          {isTracking ? "● Active Now" : "○ Inactive"}
        </div>
      </div>
    </div>
  );
};

export default ActivityTracker;