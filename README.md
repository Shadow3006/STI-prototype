QuantumShield: Post-Quantum Cryptography Simulator

QuantumShield is an interactive React application designed to demonstrate and simulate Post-Quantum Cryptography (PQC) concepts in a secure chat environment. It visualizes how future-proof encryption standards like Kyber and Dilithium protect communications against quantum computer attacks.

🚀 Features

1. Zero-Trust Authentication (MFA)

Before accessing the secure channel, the application simulates a robust multi-factor authentication process:

Geofencing: Verifies the physical location of the device (simulated GPS coordinates).

Biometrics: Simulates a Face ID scan for identity verification.

Negative Testing: Includes options to simulate "Geofence Failures" (wrong location) and "Biometric Mismatches" to demonstrate access control.

2. The Quantum Pipeline

Every message sent through the chat passes through a visual cryptographic pipeline:

QRNG (Quantum Random Number Generator): Harvests true entropy from quantum phenomena to generate unpredictable seeds.

Kyber-1024 (Key Encapsulation): Establishes a shared secret using lattice-based cryptography (NIST standardized as ML-KEM), replacing classical Diffie-Hellman/RSA key exchange.

Dilithium (Digital Signatures): Signs messages to prove authenticity and integrity (NIST standardized as ML-DSA), replacing RSA/ECDSA signatures.

3. Attack Simulations (Negative Testing)

The application allows users to inject failures and attacks to observe system behavior:

MITM Attack (Man-in-the-Middle): Intercepts the message and alters the payload. The Dilithium verification step detects the signature mismatch and rejects the message.

QRNG Failure: Simulates low entropy generation, triggering system alerts.

Kyber Failure: Simulates a failed key exchange handshake.

4. Educational Walkthrough Mode

A dedicated "Walkthrough" view provides interactive learning modules that compare Classical vs. Post-Quantum algorithms:

Visual Comparisons: Animated graphs showing the difference between Pseudo-RNG vs. True Quantum Randomness.

Vulnerability Demos: Visualizes how Shor's Algorithm breaks RSA while Kyber remains secure.

Technical Deep Dives: Explains the advantages and trade-offs of lattice-based cryptography.

🛠️ Technologies Used

React 18: Core UI framework.

TypeScript: Type safety and component interfaces.

Tailwind CSS: Styling and animations for the cryptographic pipeline.

Lucide React: Iconography for visual indicators (locks, keys, shields).

💻 Installation & Setup

If you have downloaded this project, follow these steps to run it locally:

Prerequisites: Ensure you have Node.js installed on your computer.

Install Dependencies: Open the project folder in your terminal and run the following command. This will download all necessary libraries (creating the node_modules folder):

npm install


Start the Application: Run the development server:

npm start


Open http://localhost:3000 to view it in the browser.

📖 How to Use

Authentication: Click "Authenticate Device" on the home screen. You can run a normal login or use the test buttons to simulate failures.

Live Demo (Chat):

Type a message to "Bob".

Watch the pipeline indicators (QRNG -> Kyber -> Dilithium) light up as the message is processed.

Use the "Terminal" dropdown to select a "Test Scenario" (e.g., MITM Attack) and try sending a message to see it get rejected.

Walkthrough: Switch views using the top navigation to explore the educational slides and comparisons.

🔒 Security Concepts

ML-KEM (Module Learning with Errors Key Encapsulation Mechanism): The underlying math for Kyber.

ML-DSA (Module Lattice-based Digital Signature Algorithm): The underlying math for Dilithium.

Entropy: The measure of randomness essential for secure key generation.

Note: This is a simulation for educational purposes. Actual implementation of PQC requires specific cryptographic libraries (like liboqs).
