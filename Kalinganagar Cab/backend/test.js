const fetch = require("node-fetch");

async function testAPI() {
  try {
    // Test health endpoint
    console.log("Testing health endpoint...");
    const healthResponse = await fetch("http://localhost:5000/api/health");
    const healthData = await healthResponse.json();
    console.log("Health:", healthData);

    // Test registration
    console.log("\nTesting registration...");
    const registerResponse = await fetch(
      "http://localhost:5000/api/auth/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Test User",
          email: "test@example.com",
          phone: "1234567890",
          password: "password123",
        }),
      }
    );

    const registerData = await registerResponse.json();
    console.log("Registration:", registerData);

    // Test login
    console.log("\nTesting login...");
    const loginResponse = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
    });

    const loginData = await loginResponse.json();
    console.log("Login:", loginData);
  } catch (error) {
    console.error("Test error:", error);
  }
}

testAPI();
