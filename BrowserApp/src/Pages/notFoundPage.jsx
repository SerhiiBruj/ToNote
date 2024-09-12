import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <div
        className="centerDiv"
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <h1
          style={{
            fontSize: "60px",
          }}
        >
          Error 404 testing
        </h1>
        <h2 >
          <Link style={{ fontSize: "40px",textDecoration:'none'}} to="/Home">Go Home</Link>
        </h2>
      </div>
    </>
  );
};

export default NotFoundPage;
