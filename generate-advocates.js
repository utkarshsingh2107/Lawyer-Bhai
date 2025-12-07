// Script to generate comprehensive advocates data
const fs = require('fs');

const cities = ['Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad'];
const categories = ['Criminal Law', 'Family Law', 'Divorce Law', 'Property Law', 'Corporate Law', 'Cyber Law', 'Consumer Law', 'Labour Law', 'Tax Law', 'Immigration Law'];
const courts = ['District Court', 'High Court', 'Supreme Court'];
const firstNames = ['Rajesh', 'Priya', 'Vikram', 'Anjali', 'Sanjay', 'Neha', 'Rahul', 'Kavita', 'Amit', 'Meera', 'Arjun', 'Sneha', 'Karan', 'Pooja', 'Rohan', 'Divya', 'Suresh', 'Ritu', 'Anil', 'Swati'];
const lastNames = ['Kumar', 'Sharma', 'Singh', 'Gupta', 'Malhotra', 'Kapoor', 'Verma', 'Reddy', 'Joshi', 'Patel', 'Mehta', 'Desai', 'Shah', 'Nair', 'Kulkarni', 'Iyer', 'Rao', 'Chopra', 'Bhat', 'Menon'];

let advocates = [];
let id = 1;

cities.forEach(city => {
  for (let i = 0; i < 8; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const category = categories[Math.floor(Math.random() * categories.length)];
    const court = courts[Math.floor(Math.random() * courts.length)];
    const experience = 5 + Math.floor(Math.random() * 20);
    const rating = (4.3 + Math.random() * 0.7).toFixed(1);
    const casesHandled = experience * 15 + Math.floor(Math.random() * 50);
    const casesWon = Math.floor(casesHandled * (0.75 + Math.random() * 0.15));
    const fees = court === 'Supreme Court' ? 10000 + Math.floor(Math.random() * 5000) :
                 court === 'High Court' ? 4000 + Math.floor(Math.random() * 4000) :
                 2000 + Math.floor(Math.random() * 3000);

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

const fileContent = `// Comprehensive Advocates Database
// ${advocates.length} advocates across major Indian cities

const ADVOCATES_DATA = ${JSON.stringify(advocates, null, 2)};

export default ADVOCATES_DATA;
`;

fs.writeFileSync('src/data/advocatesData.js', fileContent);
console.log(`✓ Generated ${advocates.length} advocates across ${cities.length} cities`);
