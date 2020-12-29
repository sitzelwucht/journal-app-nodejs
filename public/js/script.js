getQuote()
getRandomFact()

async function getQuote() {
    const rand = Math.floor(Math.random() * 150)
    const result = await fetch('https://type.fit/api/quotes')
        
    const data = await result.json()
        
    let quote = {
        author: data[rand].author,
        quote: data[rand].text
    }
    document.querySelector('#quote').innerHTML= `${quote.quote} <br>- ${quote.author}`

    }
        

async function getRandomFact() {
    const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en')
        try {
            const data = await response.json()
    
            const fact = {
                text: data.text,
                source: data.source_url
            }
    
            document.querySelector('#fact').innerHTML = `Random fact: ${fact.text} <br>(${fact.source})`
                    
            }
        catch (err) {
            console.log(err)
        }
    }

        // dark mode
    
const currentTheme = localStorage.getItem("theme");

    if (currentTheme == "dark") {
        document.body.classList.add("darkmode");
        document.querySelector('.container').classList.add('container-dark')
        document.querySelectorAll('.current').forEach(item => item.classList.add('li-current-dark'))
        document.querySelectorAll('.post').forEach(item => item.classList.add('post-dark'))
        document.querySelector('#mode-icon').src = '/sun.svg'
    }

    document.querySelector("#mode-icon").addEventListener("click", () => {
        document.body.classList.toggle("darkmode");
        document.querySelector('.container').classList.toggle('container-dark')
        document.querySelectorAll('.current').forEach(item => item.classList.toggle('li-current-dark'))
        document.querySelectorAll('.post').forEach(item => item.classList.toggle('post-dark'))
       
        let theme = "light";
        if (document.body.classList.contains('darkmode')) {
                theme = "dark";
            }
        localStorage.setItem('theme', theme);
    
        });



