const postsTemplate = Handlebars.compile(
  document.getElementById('posts-template').innerHTML
) 

Handlebars.registerHelper('commas', function(subscribers){
  return Number(subscribers).toLocaleString('en')
});

$('.searchbar').on('submit', async function(e) {
    e.preventDefault();
   
    $('#results').html("<div class = \"loader\"></div>");
  
    try {
      let item = $('input[name="userinput"]').val();
    
      let promise = await $.ajax({
        type: 'GET',
        url: 'https://www.reddit.com/r/'+ item + '.json'
      });
      let sanitizedHtml = postsTemplate({ 
        post: promise.data.children
      });

      $('#results').html(sanitizedHtml);
  } catch (error) {
    console.log(error)
    $('#results').html('No results found.')
  }
    });

  
