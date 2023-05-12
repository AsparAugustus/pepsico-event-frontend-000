import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
    
      </div>
      <div className="header-right">
        <Link href="/">
          <a className="header-link">
            <Image
              src="/PepsiCo.svg"
              alt="PepsiCo logo"
              width={100}
              height={50}
            />
          </a>
        </Link>
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
