// Replace with your actual data fetching/calculation logic
const learnerData = {
    wordsLearned: 15,
    avgQuizScore: 85,
    timeSpent: {
      hours: 1,
      minutes: 30,
      seconds: 0
    },
    activities: [
      {
        name: "Listening Practice",
        attempts: 10,
        successRate: 70,
        timeSpent: {
          hours: 0,
          minutes: 45,
          seconds: 0
        }
      },
      {
        name: "Pronunciation Check",
        attempts: 5,
        successRate: 90,
        timeSpent: {
          hours: 0,
          minutes: 30,
          seconds: 0
        }
      }
    ]
  };
  
  // Update overall progress section
  document.getElementById('words-learned').textContent = learnerData.wordsLearned;
  const avgQuizScore = learnerData.avgQuizScore + "%"; // Add percentage symbol
  document.getElementById('avg-quiz-score').textContent = avgQuizScore;
  const totalTimeSpent = `${learnerData.timeSpent.hours}h ${learnerData.timeSpent.minutes}m ${learnerData.timeSpent.seconds}s`;
  