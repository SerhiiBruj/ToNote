import React from "react";
import { Link } from "react-router-dom";

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError() {
      return { hasError: true };
    }
  
    componentDidCatch(error, errorInfo) {
      // Log the error to an error reporting service
      console.error(error, errorInfo);
    }
  
    render() {
      if (this.state.hasError) {
        return <div style={{
          display: 'flex',
          width: '100%',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <h1 style={{textAlign: 'center', color: 'gray', fontSize: '40px'}}>Something went wrong.</h1>
          <p style={{textAlign: 'center', color: 'gray', fontSize: '30px'}}>Please try again later. <br /><Link style={{fontSize: '30px',lineHeight: '60px',color: 'gray'}} to='/'>Go back</Link></p>
          
        </div>
      }
  
      // eslint-disable-next-line react/prop-types
      return this.props.children; 
    }
  }

  
  export default ErrorBoundary