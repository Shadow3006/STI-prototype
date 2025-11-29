# 🛡️ QuantumShield: Post-Quantum Cryptography Simulator

![React](https://img.shields.io/badge/React-18.0-blue?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![NIST Standards](https://img.shields.io/badge/NIST-FIPS_203_%2F_204-orange?style=flat-square)

**QuantumShield** is an interactive React application designed to demonstrate and simulate **Post-Quantum Cryptography (PQC)** concepts in a secure chat environment. It visualizes how future-proof encryption standards like **Kyber** and **Dilithium** protect communications against quantum computer attacks.

---

## 🚀 Features

### 1. Zero-Trust Authentication (MFA)
Before accessing the secure channel, the application simulates a robust multi-factor authentication process:
*   **📍 Geofencing**: Verifies the physical location of the device (simulated GPS coordinates).
*   **👤 Biometrics**: Simulates a Face ID scan for identity verification.
*   **🧪 Negative Testing**: Includes options to simulate "Geofence Failures" and "Biometric Mismatches".

### 2. The Quantum Pipeline
Every message sent through the chat passes through a visual cryptographic pipeline:
*   **⚡ QRNG (Quantum Random Number Generator)**: Harvests true entropy from quantum phenomena to generate unpredictable seeds.
*   **🔑 Kyber-1024 (Key Encapsulation)**: Establishes a shared secret using lattice-based cryptography (**NIST FIPS 203**), replacing classical Diffie-Hellman/RSA.
*   **🛡️ Hybrid Dilithium (Dual Signatures)**: Signs messages using **BOTH** classical ECDSA and post-quantum Dilithium (**NIST FIPS 204**). This "Defense in Depth" strategy ensures security even if one algorithm is compromised.

### 3. Attack Simulations (Negative Testing)
The application allows users to inject failures and attacks to observe system behavior:
*   **🔓 Hybrid Sig Failure**: Simulates a sophisticated attack where the classical signature is valid, but the quantum signature is invalid (or vice versa).
*   **📉 Downgrade Attack**: Simulates an attacker stripping the post-quantum signature to force the system to use weaker classical security. The system detects and rejects this.
*   **⚠️ QRNG Failure**: Simulates low entropy generation, triggering system alerts.
*   **🔄 Kyber Replay**: Simulates a replay attack on the key exchange.

### 4. Educational Walkthrough Mode
A dedicated "Walkthrough" view provides interactive learning modules:
*   **Visual Comparisons**: Animated graphs showing Pseudo-RNG vs. True Quantum Randomness.
*   **Interactive Flowcharts**: Detailed visualizations of the internal logic for QRNG, Kyber, and Dilithium.
*   **Technical Deep Dives**: Explains the advantages and trade-offs of lattice-based cryptography.

---

## 🛠️ Technologies Used
*   **React 18**: Core UI framework.
*   **TypeScript**: Type safety and component interfaces.
*   **Tailwind CSS**: Styling and animations for the cryptographic pipeline.
*   **Lucide React**: Iconography for visual indicators.

---

## 💻 Installation & Setup

If you have downloaded this project, follow these steps to run it locally:

1.  **Prerequisites**: Ensure you have [Node.js](https://nodejs.org/) installed.
2.  **Navigate to folder and Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Start the Application**:
    ```bash
    npm start
    ```
4.  **View**: Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 How to Use

1.  **Authentication**: Click "Authenticate Device". Use test buttons to simulate failures if desired.
2.  **Live Demo (Chat)**:
    *   Type a message to "Bob".
    *   Watch the pipeline indicators (**QRNG** → **Kyber** → **Hybrid Sig**) light up.
    *   Use the **Terminal Dropdown** to select a "Test Scenario" (e.g., *Simulate Downgrade Attack*) and send a message to see the rejection logic.
3.  **Walkthrough**: Switch views using the top navigation to explore educational slides.

---

## 🔒 Security Concepts

| Concept | Description | NIST Standard |
| :--- | :--- | :--- |
| **ML-KEM** | **Module Learning with Errors Key Encapsulation Mechanism**. The underlying math for Kyber. | FIPS 203 |
| **ML-DSA** | **Module Lattice-based Digital Signature Algorithm**. The underlying math for Dilithium. | FIPS 204 |
| **Entropy** | The measure of randomness essential for secure key generation. | SP 800-90B |
| **Hybrid** | Combining classical (ECC) and post-quantum (Lattice) algorithms for backward compatibility. | FIPS 186-5 + 204 |

> **Note**: This is a simulation for educational purposes. Actual implementation of PQC requires specific cryptographic libraries (like `liboqs`).

---

<p align="center">
  <strong>STI-Prototype</strong>
</p>
