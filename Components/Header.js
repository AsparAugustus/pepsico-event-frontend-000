import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
          <div className="header-link">
            <Image
              src="/pepsi.jpeg"
              alt="PepsiCo R&D"
              width={300}
              height={85}
            />
          </div>
      </div>
      <div className="header-right">
          <div className="header-link">
            <Image
              src="/PepsiCo.svg"
              alt="PepsiCo logo"
              width={130}
              height={70}
            />
          </div>
      </div>
      <style jsx>{`
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px;
          background-color: #0072c6;
          color: #fff;
        }

        .header-left {
          display: flex;
          align-items: center;
        }

        .header-right {
          display: flex;
          align-items: center;
        }

        .header-text {
          margin: 0;
          font-size: 24px;
        }

        .header-link {
          display: inline-block;
          margin-left: 20px;
        }

        .header-link:hover {
          opacity: 0.8;
        }
      `}</style>
    </header>
  );
};

export default Header;
