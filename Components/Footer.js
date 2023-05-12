import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-left">

      </div>
      <div className="footer-right">

      </div>
      <style jsx>{`
        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          background-color: #0072c6;
          color: #fff;
          position: fixed;
          bottom: 0;
          width: 100%;
        }

        .footer-left {
          display: flex;
          align-items: center;
        }

        .footer-right {
          display: flex;
          align-items: center;
        }

        .footer-text {
          margin: 0;
          font-size: 24px;
        }

        .footer-link {
          display: inline-block;
          margin-left: 20px;
        }

        .footer-link:hover {
          opacity: 0.8;
        }
      `}</style>
    </footer>
  )
}

export default Footer
