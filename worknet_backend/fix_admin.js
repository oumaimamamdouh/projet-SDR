

// 2. Create properly hashed password in Node.js first
// Create a simple Node.js script: fix_admin.js
const bcrypt = require('bcryptjs');

async function createAdminUser() {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("pwd12345", salt);
    
    console.log("Hashed password:", hashedPassword);
    console.log("\nCopy this and use in MongoDB:");
    console.log(`
db.users.insertOne({
  email: "admin@example.com",
  username: "admin",
  password: "${hashedPassword}",
  role: "admin",
  full_name: "System Administrator",
  avatar_url: "",
  bio: "System administrator account",
  phone_number: "+1234567890",
  country: "United States",
  city: "San Francisco",
  skills: ["administration", "management", "system"],
  hourly_rate: 0,
  rating: 5.0,
  total_reviews: 0,
  completed_orders: 0,
  response_time: 1,
  languages: ["English"],
  is_verified: true,
  is_active: true,
  created_at: new Date(),
  updated_at: new Date(),
  last_login: null
});
    `);
}

createAdminUser();