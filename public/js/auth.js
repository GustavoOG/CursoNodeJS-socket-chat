
const miFormulario = document.querySelector('form');


const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/auth/'
            : 'https://restserver-curso-fher.herokuapp.com/api/auth/';


//Login manual
miFormulario.addEventListener('submit', ev => {
    ev.preventDefault();
    const formData = {};

    for( let el of miFormulario.elements ) {
        if ( el.name.length > 0 ) 
            formData[el.name] = el.value
    }

    fetch( url + 'login', {
        method: 'POST',
        body: JSON.stringify( formData ),
        headers: { 'Content-Type': 'application/json' }
    })
    .then( resp => resp.json() )
    .then( ({ msg, token }) => {
        if( msg ){
            return console.error( msg );
        }
        localStorage.setItem('token', token);
        window.location = 'chat.html';
    })
    .catch( err => {
        console.log(err)
    })
    
});

//Login Google
function handleCredentialResponse(response) {
    //Google Token : ID_TOKEN
    //console.log("id_token", response.credential);
    const body = { id_token: response.credential };
    fetch("http://localhost:8080/api/auth/google", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((resp) => resp.json())
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("email", resp.usuario.correo);

        localStorage.setItem("token", resp.token);
        window.location = "chat.html";
      })
      .catch(console.warn);

    // // decodeJwtResponse() is a custom function defined by you
    // // to decode the credential response.
    // const responsePayload = decodeJwtResponse(response.credential);

    // console.log("ID: " + responsePayload.sub);
    // console.log("Full Name: " + responsePayload.name);
    // console.log("Given Name: " + responsePayload.given_name);
    // console.log("Family Name: " + responsePayload.family_name);
    // console.log("Image URL: " + responsePayload.picture);
    // console.log("Email: " + responsePayload.email);
  }

  const button = document.getElementById("google-signout");
  button.onclick = () => {
    localStorage.removeItem('token');
    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();
    google.accounts.id.revoke(localStorage.getItem("email"), (done) => {
      localStorage.clear();
      location.reload();
    });
  };



            
//Logica vieja de google
// function onSignIn(googleUser) {

//     // var profile = googleUser.getBasicProfile();
//     // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//     // console.log('Name: ' + profile.getName());
//     // console.log('Image URL: ' + profile.getImageUrl());
//     // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

//     var id_token = googleUser.getAuthResponse().id_token;
//     const data = { id_token };

//     fetch( url + 'google', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify( data )
//     })
//     .then( resp => resp.json() )
//     .then( ({ token }) => {
//         localStorage.setItem('token',token);
//         alert("Hola");
//         window.location = 'chat.html';
//     })
//     .catch( console.log );
    
// }

// function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//         alert("Hola");
//     console.log('User signed out.');
//     });
// }