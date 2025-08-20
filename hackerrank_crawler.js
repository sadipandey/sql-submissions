// Replace this list with the list of problems you've solved :) 
let submissions = ["https://www.hackerrank.com/rest/contests/master/challenges/name-of-employees/submissions/433231891",
    "https://www.hackerrank.com/rest/contests/master/challenges/more-than-75-marks/submissions/433231642",
    "https://www.hackerrank.com/rest/contests/master/challenges/weather-observation-station-12/submissions/433230750",
    "https://www.hackerrank.com/rest/contests/master/challenges/weather-observation-station-12/submissions/433230711",
    "https://www.hackerrank.com/rest/contests/master/challenges/weather-observation-station-11/submissions/433230585",
    "https://www.hackerrank.com/rest/contests/master/challenges/weather-observation-station-11/submissions/433230544",
    "https://www.hackerrank.com/rest/contests/master/challenges/weather-observation-station-10/submissions/433230361",
    "https://www.hackerrank.com/rest/contests/master/challenges/weather-observation-station-9/submissions/433230047",
    "https://www.hackerrank.com/rest/contests/master/challenges/weather-observation-station-9/submissions/433230035",
    "https://www.hackerrank.com/rest/contests/master/challenges/weather-observation-station-8/submissions/433229792",
    "https://www.hackerrank.com/rest/contests/master/challenges/weather-observation-station-7/submissions/430972776",
    "https://www.hackerrank.com/rest/contests/master/challenges/weather-observation-station-6/submissions/430972413",
    "https://www.hackerrank.com/rest/contests/master/challenges/weather-observation-station-6/submissions/430972395",
    "https://www.hackerrank.com/rest/contests/master/challenges/weather-observation-station-6/submissions/430972389",
    "https://www.hackerrank.com/rest/contests/master/challenges/weather-observation-station-6/submissions/430972341",
    "https://www.hackerrank.com/rest/contests/master/challenges/weather-observation-station-5/submissions/430972067",
    "https://www.hackerrank.com/rest/contests/master/challenges/weather-observation-station-4/submissions/430970929",
    "https://www.hackerrank.com/rest/contests/master/challenges/weather-observation-station-3/submissions/430970364",
    "https://www.hackerrank.com/rest/contests/master/challenges/weather-observation-station-1/submissions/430970125",
    "https://www.hackerrank.com/rest/contests/master/challenges/japanese-cities-name/submissions/430969983",
    "https://www.hackerrank.com/rest/contests/master/challenges/japanese-cities-attributes/submissions/430969902",
    "https://www.hackerrank.com/rest/contests/master/challenges/select-by-id/submissions/430969832",
    "https://www.hackerrank.com/rest/contests/master/challenges/select-all-sql/submissions/430969808",
    "https://www.hackerrank.com/rest/contests/master/challenges/revising-the-select-query-2/submissions/430969788",
    "https://www.hackerrank.com/rest/contests/master/challenges/revising-the-select-query/submissions/430969718"]


// Helper function for delay
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Fetch JSON from a URL
async function fetchJson(url) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
    return await res.json();
}

// Main function
async function run() {
    let output = '';

    for (let submissionUrl of submissions) {
        try {
            // Extract challenge slug from submission URL
            const match = submissionUrl.match(/challenges\/([^/]+)\//);
            if (!match) {
                console.error(`Cannot extract slug from ${submissionUrl}`);
                continue;
            }
            const slug = match[1];
            const challengeUrl = `https://www.hackerrank.com/rest/contests/master/challenges/${slug}`;

            // 1. Fetch challenge details
            const challengeData = await fetchJson(challengeUrl);
            const model = challengeData.model;

            const questionDetails = `
  Title: ${model.name}
  Slug: ${model.slug}
  Difficulty: ${model.difficulty_name || 'N/A'}
  Topics: ${model.topics && model.topics.length ? model.topics.join(', ') : 'N/A'}
  Preview: ${model.preview || 'No preview'}
  Problem Statement: ${model.problem_statement || 'N/A'}
  Constraints: ${model.constraints || 'N/A'}
  Input Format: ${model.input_format || 'N/A'}
  Output Format: ${model.output_format || 'N/A'}
  `;

            console.log(`Fetched question for: ${slug}`);
            await delay(3000); // wait 3s

            // 2. Fetch submission for the code
            const submissionData = await fetchJson(submissionUrl);
            const answer = submissionData.model.code || 'No code';
            console.log(`Fetched code for submission: ${submissionData.model.id}`);
            await delay(3000); // wait 3s

            // Append to output
            output += `Question Details:\n${questionDetails}\nMy submission:\n${answer}\n\n----------------------\n\n`;
        } catch (err) {
            console.error(err);
            await delay(3000); // wait 3s after error
        }
    }

    // Create downloadable text file
    const blob = new Blob([output], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'hackerrank_submissions.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    console.log('Download started: hackerrank_submissions.txt');
}

// Run the script
run();
