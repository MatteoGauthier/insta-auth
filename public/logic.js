const query = window.location.search.substring(1)
const token = Cookies.get('insta_id_token')
var cookie = document.cookie;
var feed = []

fetch(`https://api.instagram.com/v1/users/self/media/recent/?access_token=${token}`, {

        method: 'GET'
    })
    // Parse the response as JSON
    .then(res => res.json())
    .then(res => {
        // Welcome
        console.log(res)
        let data = res.data
        
        data.forEach(element => {
            console.log(element.images.standard_resolution.url)
            feed.push(element.images.standard_resolution.url)
        });
        
        // const nameNode = document.createTextNode(`Welcome, ${res.name}`)
        // document.body.appendChild(nameNode)

        // // Replace value
        // reposData.textContent = res.public_repos
    });

    new Vue({
        el: '#v-for-object',
        data: {
          feed
        }
      })
