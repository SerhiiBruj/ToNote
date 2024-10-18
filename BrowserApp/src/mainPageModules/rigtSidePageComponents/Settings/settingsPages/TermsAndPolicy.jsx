const TermsAndPolicy = () => {
  return (
    <div className="settingsSection">
      <h1 style={{ fontSize: "40px" }}>Terms and Poclicy</h1>
      <div style={{ marginTop: "20px", height: "500px", overflowY: "scroll" }}>
        <p>Please read and accept our terms and conditions.</p>
        <div>
          <h3>Terms of Service</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non
            urna vitae elit cursus ultricies...
          </p>
        </div>
        <div style={{ marginTop: "20px" }}>
          <h1>Terms of Service</h1>
          <p>
            Welcome to TONOTE! Your registration and use of our application
            means you agree to abide by these Terms of Service. Please read the
            following terms carefully before continuing to use our service.
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            Your use of our application confirms your agreement to these terms.
            If you do not agree with any part of these terms, please do not use
            our application.
          </p>

          <h2>2. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Any changes
            will take effect upon their posting on our platform. You are
            responsible for reviewing these terms regularly.
          </p>

          <h2>3. Use of the Application</h2>
          <p>
            You agree to use the application only for lawful purposes and in
            accordance with all applicable laws and regulations.
          </p>

          <h2>4. Liability</h2>
          <p>
            We are not liable for any damages or losses arising from your use of
            our application or inability to use it.
          </p>

          <h1>Privacy Policy</h1>
          <p>
            Your privacy is important to us. We are committed to protecting your
            personal information and providing you with control over it.
          </p>

          <h2>1. Information Collection</h2>
          <p>
            We collect information you provide to us during registration and use
            of the application. This may include personal data such as your
            name, email address, and other information you choose to provide.
          </p>

          <h2>2. Use of Information</h2>
          <p>
            We use your information to provide you with services, improve our
            application, and communicate with you. We will not sell or share
            your personal information with third parties without your consent.
          </p>

          <h2>3. Data Protection</h2>
          <p>
            We take all necessary measures to protect your personal information
            from unauthorized access, loss, or disclosure.
          </p>

          <h2>4. Your Rights</h2>
          <p>
            You have the right to access, correct, or delete your personal data
            through the relevant features in our application or by contacting
            our support team.
          </p>

          <p>
            If you have any questions about our Terms of Service or Privacy
            Policy, please contact us using the contact information provided in
            the application.
          </p>
        </div>
      </div>
      <button
        className="submit accept"
       
      >
        Accept Terms
      </button>
    </div>
  );
};

export default TermsAndPolicy;
