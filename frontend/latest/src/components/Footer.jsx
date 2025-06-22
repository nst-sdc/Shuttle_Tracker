import React from "react";

function Footer() {
    return (
        <footer style={{
            backgroundColor: '#2563eb',
            color: '#fff',
            padding: 'clamp(1rem, 3vw, 2rem)',
            textAlign: 'center',
            width: '100%',
            marginTop: 'auto'
        }}>
            <p style={{
                margin: 0,
                fontSize: 'clamp(0.9rem, 2vw, 1rem)'
            }}>
                © 2025 Shuttle Tracker. All rights reserved
            </p>
        </footer>
    )
}

export default Footer;