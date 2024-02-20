# Image modifier app

This project was carried out as a study on Server-Side Rendering and REST APIs.

The application was designed with Express.js, and uses the Embedded JavaScript (ejs) module as its ‘view engine‘ middleware, easily allowing for conditional HTML rendering.

Image styling is achieved with the sharp package - by utilizing its _tint_ method, an inheritance of the _sharp_ class. Combined with Node.js built-in randomization method, it alters the original RBG parameters of the input image, supporting JPEG, PNG, and GIF media formats.

It’s hosted on Google Cloud Platform: https://image-modifier-app.uc.r.appspot.com/

## Technical evaluation of the project

Below is an assessment on technical aspects of the project.

### Pros

The Server-Side Rendering aspect can improve user experience by reducing the page loading time, given that all the HTML content is rendered before being sent to the client, thus potentially minimizing the number of server requests during the initial loading.

Additionally, this reduced number of initial server requests favours Search Engine Optimization (SEO), given that the content is both rendered and shown before it would if it were rendered only after multiple client requests.

### Cons

However, this rendering approach requires the client to make a new request to the server each time the app is used, which, depending on network traffic, can be a performance bottleneck. 

To either enhancing the user experience and attempting to mitigate this issue, caching features can be implemented to store previously loaded content locally or near the client.


