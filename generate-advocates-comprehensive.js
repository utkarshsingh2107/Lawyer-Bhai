// Script to generate comprehensive advocates data with balanced distribution
const fs = require('fs');

const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad'];

// All legal categories
const categories = [
  'Criminal Law',
  'Civil Law', 
  'Family Law',
  'Divorce Law',
  'Property Law',
  'Corporate Law',
  'Cyber Law',
  'Consumer Law',
  'Labour Law',
  'Tax Law',
  'Immigration Law',
  'Intellectual Property Law',
  'Environmental Law',
  'Banking Law',
  'Real Estate Law'
];

const courts = ['District Court', 'High Court', 'Supreme Court'];

const firstNames = [
  'Rajesh', 'Priya', 'Vikram', 'Anjali', 'Sanjay', 'Neha', 'Rahul', 'Kavita', 
  'Amit', 'Meera', 'Arjun', 'Sneha', 'Karan', 'Pooja', 'Rohan', 'Divya',
  'Suresh', 'Ritu', 'Anil', 'Swati', 'Deepak', 'Nisha', 'Manoj', 'Preeti',
  'Ashok', 'Sunita', 'Ramesh', 'Geeta', 'Vijay', 'Anita', 'Sandeep', 'Rekha',
  'Arun', 'Shweta', 'Prakash', 'Madhuri', 'Naveen', 'Shalini', 'Ravi', 'Pallavi'
];

const lastNames = [
  'Kumar', 'Sharma', 'Singh', 'Gupta', 'Malhotra', 'Kapoor', 'Verma', 'Reddy',
  'Joshi', 'Patel', 'Mehta', 'Desai', 'Shah', 'Nair', 'Kulkarni', 'Iyer',
  'Rao', 'Chopra', 'Bhat', 'Menon', 'Agarwal', 'Banerjee', 'Chatterjee', 'Das',
  'Mishra', 'Pandey', 'Saxena', 'Sinha', 'Thakur', 'Varma'
];

let advocates = [];
let id = 1;
let usedNames = new Set();

// Helper function to generate unique name
function generateUniqueName() {
  let attempts = 0;
  while (attempts < 100) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName}`;
    
    if (!usedNames.has(fullName)) {
      usedNames.add(fullName);
      return { firstName, lastName, fullName };
    }
    attempts++;
  }
  // Fallback with ID
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return { firstName, lastName, fullName: `${firstName} ${lastName} ${id}` };
}

// Generate advocates ensuring good distribution
cities.forEach(city => {
  // For each city, ensure we have advocates in each category and court level
  
  // Generate 5 advocates per category (15 categories × 5 = 75 per city)
  categories.forEach(category => {
    for (let i = 0; i < 5; i++) {
      const { firstName, lastName } = generateUniqueName();
      
      // Distribute court levels evenly
      let court;
      if (i === 0 || i === 1) court = 'District Court';
      else if (i === 2 || i === 3) court = 'High Court';
      else court = 'Supreme Court';
      
      const experience = 5 + Math.floor(Math.random() * 20);
      const rating = (4.3 + Math.random() * 0.7).toFixed(1);
      const casesHandled = experience * 15 + Math.floor(Math.random() * 50);
      const casesWon = Math.floor(casesHandled * (0.75 + Math.random() * 0.15));
      
      // Fees based on court level
      let fees;
      if (court === 'Supreme Court') {
        fees = 10000 + Math.floor(Math.random() * 8000);
      } else if (court === 'High Court') {
        fees = 4000 + Math.floor(Math.random() * 6000);
      } else {
        fees = 2000 + Math.floor(Math.random() * 4000);
      }

      advocates.push({
        id: String(id++),
        name: `Adv. ${firstName} ${lastName}`,
        city,
        category,
        court,
        experience,
        rating: parseFloat(rating),
        casesHandled,
        casesWon,
        fees,
        image: `https://ui-avatars.com/api/?name=${firstName}+${lastName}&background=2563EB&color=fff&size=200`
      });
    }
  });
});

// Shuffle advocates for better distribution
advocates.sort(() => Math.random() - 0.5);

const fileContent = `// Comprehensive Advocates Database
// ${advocates.length} advocates across ${cities.length} cities
// Balanced distribution across all categories and court levels

const ADVOCATES_DATA = ${JSON.stringify(advocates, null, 2)};

export default ADVOCATES_DATA;
`;

fs.writeFileSync('src/data/advocatesData.js', fileContent);

// Generate statistics
const stats = {
  total: advocates.length,
  byCity: {},
  byCategory: {},
  byCourt: {}
};

advocates.forEach(adv => {
  stats.byCity[adv.city] = (stats.byCity[adv.city] || 0) + 1;
  stats.byCategory[adv.category] = (stats.byCategory[adv.category] || 0) + 1;
  stats.byCourt[adv.court] = (stats.byCourt[adv.court] || 0) + 1;
});

console.log(`\n✓ Generated ${advocates.length} advocates\n`);
console.log('Distribution by City:');
Object.entries(stats.byCity).forEach(([city, count]) => {
  console.log(`  ${city}: ${count} advocates`);
});

console.log('\nDistribution by Category:');
Object.entries(stats.byCategory).forEach(([category, count]) => {
  console.log(`  ${category}: ${count} advocates`);
});

console.log('\nDistribution by Court:');
Object.entries(stats.byCourt).forEach(([court, count]) => {
  console.log(`  ${court}: ${count} advocates`);
});

console.log(`\n✓ Data saved to src/data/advocatesData.js\n`);
