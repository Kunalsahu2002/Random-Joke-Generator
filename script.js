const URL = "https://official-joke-api.appspot.com/jokes/random/1";
let jokePara = document.querySelector("#joke");
let btn = document.querySelector("#btn");
let loading = document.querySelector("#loading");

const getJokes = async () => {
  try {
    // Show loading state
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Loading...</span>';
    loading.style.display = 'flex';
    
    console.log("Fetching data...");
    let response = await fetch(URL);
    console.log(response);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    let data = await response.json();
    console.log(data);
    
    // Update joke display with proper formatting
    const jokeText = jokePara.querySelector('.joke-text');
    jokeText.innerHTML = `${data[0].setup}<br><br><strong>${data[0].punchline}</strong>`;
    
    // Add animation class
    jokePara.style.animation = 'none';
    jokePara.offsetHeight; // Trigger reflow
    jokePara.style.animation = 'fadeInUp 0.5s ease-out';
    
  } catch (error) {
    console.error('Error fetching joke:', error);
    const jokeText = jokePara.querySelector('.joke-text');
    jokeText.innerHTML = 'Sorry! Could not load a joke. Please try again.';
  } finally {
    // Hide loading state and restore button
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-dice"></i><span>Get Random Joke</span>';
    loading.style.display = 'none';
  }
};

btn.addEventListener("click", getJokes);
