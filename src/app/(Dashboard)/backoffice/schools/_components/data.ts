const getRandomStatus = () => {
  const statuses = ["in-progress","completed","suspended","rejected"];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
};

const generateRandomDate = () => {
  const startDate = new Date(2021, 0, 1); // January 1, 2021
  const endDate = new Date();
  const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  return randomDate.toISOString().split('T')[0];
};

export const applicationHistory = [
  {
    companyName: "Metro",
    roles: "Advertising Manager",
    dateApplied: "24th July 2021",
    status: "in-review"
  },
  // Generate 50 more objects
  ...Array.from({ length: 50 }, (_, index) => ({
    companyName: `Company${index + 2}`,
    roles: `Role${index + 2}`,
    dateApplied: generateRandomDate(),
    status: getRandomStatus()
  }))
];

export const statusColor = {
  "in-review": "bg-yellow-50 text-yellow-600",
  "in-progress": "bg-orange-50 text-orange-600",
  "suspended": "bg-purple-50 text-purple-600",
  "completed": "bg-emerald-50 text-emerald-600",
  "rejected": "bg-rose-50 text-rose-600"
}