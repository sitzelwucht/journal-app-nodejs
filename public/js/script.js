
getQuote()

async function getQuote() {
    const rand = Math.floor(Math.random() * 150)
    const result = await fetch('https://type.fit/api/quotes')
        
    const data = await result.json()
        
    let quote = {
        author: data[rand].author,
        quote: data[rand].text
    }

    let authorName = quote.author == null ? 'Anonymous' : quote.author
    document.querySelector('#quote').innerHTML= `${quote.quote} <br>- ${authorName}`

    }
        
        // dark mode

    let modeBtn = document.querySelector('#mode')
    const currentTheme = localStorage.getItem("theme");
    modeBtn.addEventListener('click', toggleMode)

        if (currentTheme == "dark") {
            document.body.classList.add("darkmode");
            document.querySelector('.container').classList.add('container-dark')
            document.querySelectorAll('.current').forEach(item => item.classList.add('li-current-dark'))
            document.querySelectorAll('.post').forEach(item => item.classList.add('post-dark'))
            document.querySelectorAll('.entry-form-input').forEach(item => item.classList.add('input-dark'))
            modeBtn.innerHTML = 'daymode'
        }

        function toggleMode() {
            document.body.classList.toggle("darkmode");
            document.querySelector('.container').classList.toggle('container-dark')
            document.querySelectorAll('.current').forEach(item => item.classList.toggle('li-current-dark'))
            document.querySelectorAll('.post').forEach(item => item.classList.toggle('post-dark'))
            document.querySelectorAll('.entry-form-input').forEach(item => item.classList.toggle('input-dark'))
            modeBtn.innerHTML = modeBtn.innerHTML == 'daymode' ? modeBtn.innerHTML = 'nightmode' :  modeBtn.innerHTML = 'daymode'
            modeBtn.classList.toggle('night')

            let theme = "light";
            if (document.body.classList.contains('darkmode')) {
                    theme = "dark";
                }
            localStorage.setItem('theme', theme);
        }