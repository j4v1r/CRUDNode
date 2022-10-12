import {PORT, DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER} from './config.js'
import express from 'express';
import mysql from 'mysql2';
import bodyParser from 'body-parser';
var app = express();

var con = mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT
})

app.use(express.static('public'))

con.connect();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}))

app.post('/createProducto', (req, res) => {
  let nombre = req.body.nombre
  let ano = parseInt(req.body.ano)
  let calificacion = parseFloat(req.body.calificacion)
  let id_edoproducto = req.body.producto_tipo
  let id_cproducto = req.body.producto_estado
  console.log(`La variable es ${nombre}, ${ano}`)

  con.query('insert into mproducto (nombre_producto, ano_producto, calificacion, id_edoproducto, id_cproducto) values("' + nombre + '",' + ano + ',' + calificacion + ',' + id_edoproducto + ',' + id_cproducto + ')', (err, respuesta, fields) => {

    if (err) return console.log("Error", err)

    return res.redirect("/readProductos")


  })

})

app.post('/deleteProducto', (req, res) => {
  let id_producto = req.body.producto;
  console.log(`La variable es ${id_producto}`)

  con.query('DELETE FROM mproducto WHERE id_producto=' + id_producto + '', (err, respuesta, field) => {
    if (err) return console.log('ERROR:', err)

    return res.send(`
        <a href="index.html">Inicio</a>
        <h1>Usuario ${id_producto} eliminado</h1>`)
  })
})

app.get('/borrar', (req, res) => {
  let id_producto = req.query.id_producto
  console.log(`La variable es ${id_producto}`)

  con.query('DELETE FROM mproducto WHERE id_producto=' + id_producto + '', (err, respuesta, field) => {
    if (err) return console.log('ERROR:', err)

    return res.redirect("/readProductos")
  })
})


app.get('/readProductos', (req, res) => {

  con.query('select * from imprimir', (err, respuesta, field) => {
    if (err) return console.log('ERROR:', err)

    var userHTML = ``
    var i = 0
    console.log(respuesta)
    respuesta.forEach(producto => {
      i++
      userHTML += `
            <tbody class="u-table-body">
              <tr style="height: 129px;">
                <td class="u-border-1 u-border-grey-30 u-first-column u-palette-5-light-1 u-table-cell u-table-cell-8">${producto.nombre_producto}</td>
                <td class="u-border-1 u-border-grey-30 u-table-cell">${producto.ano_producto}</td>
                <td class="u-border-1 u-border-grey-30 u-table-cell">${producto.calificacion}</td>
                <td class="u-border-1 u-border-grey-30 u-table-cell">${producto.edo_producto}</td>
                <td class="u-border-1 u-border-grey-30 u-table-cell">${producto.tipo_producto}</td>
                <td class="u-border-1 u-border-grey-30 u-table-cell"><a href="/mandarAUpdate?id_producto=${producto.id_producto}"><i class="fa-sharp fa-solid fa-pen-to-square"></i></a></td>
                <td class="u-border-1 u-border-grey-30 u-table-cell"><a href="/borrar?id_producto=${producto.id_producto}"><i class="fa-solid fa-trash-can" style="font-size: 20px;"></i></a></td>
                </tr>
            
            </tbody>
            `
    })

    return res.send(`
        <!DOCTYPE html>
<html style="font-size: 16px;" lang="es"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <title>Mostrar</title>
    <link rel="stylesheet" href="nicepage.css" media="screen">
<link rel="stylesheet" href="Mostrar.css" media="screen">
    <script class="u-script" type="text/javascript" src="jquery.js" defer=""></script>
    <script class="u-script" type="text/javascript" src="nicepage.js" defer=""></script>
    <script src="https://kit.fontawesome.com/75e8eeea01.js" crossorigin="anonymous"></script>
    <meta name="generator" content="Nicepage 4.19.3, nicepage.com">
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    
    
    <script type="application/ld+json">{
		"@context": "http://schema.org",
		"@type": "Organization",
		"name": "",
		"logo": "images/default-logo.png",
		"sameAs": []
}</script>
    <meta name="theme-color" content="#478ac9">
    <meta property="og:title" content="Mostrar">
    <meta property="og:type" content="website">
  </head>
  <body class="u-body u-overlap u-xl-mode" data-lang="es"><header class="u-clearfix u-header u-palette-1-light-1 u-header" id="sec-7c60"><div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <a href="https://nicepage.com" class="u-image u-logo u-image-1" data-image-width="80" data-image-height="40">
          <img src="images/default-logo.png" class="u-logo-image u-logo-image-1">
        </a>
        <nav class="u-menu u-menu-one-level u-offcanvas u-menu-1">
          <div class="menu-collapse" style="font-size: 1rem; letter-spacing: 0px;">
            <a class="u-button-style u-custom-active-color u-custom-color u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-text-active-color u-custom-text-color u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="#">
              <svg class="u-svg-link" viewBox="0 0 24 24"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#menu-hamburger"></use></svg>
              <svg class="u-svg-content" version="1.1" id="menu-hamburger" viewBox="0 0 16 16" x="0px" y="0px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g><rect y="1" width="16" height="2"></rect><rect y="7" width="16" height="2"></rect><rect y="13" width="16" height="2"></rect>
</g></svg>
            </a>
          </div>
          <div class="u-custom-menu u-nav-container">
            <ul class="u-nav u-unstyled u-nav-1"><li class="u-nav-item"><a class="u-active-palette-2-light-1 u-button-style u-nav-link u-text-grey-90 u-text-hover-palette-2-base" href="Registro.html" style="padding: 10px 20px;">Nuevo...</a>
</li><li class="u-nav-item"><a class="u-active-palette-2-light-1 u-button-style u-nav-link u-text-grey-90 u-text-hover-palette-2-base" href="/readProductos3" style="padding: 10px 20px;">Lista de espera</a>
</li><li class="u-nav-item"><a class="u-active-palette-2-light-1 u-button-style u-nav-link u-text-grey-90 u-text-hover-palette-2-base" href="#" style="padding: 10px 20px;">Mis favoritos</a>
</li><li class="u-nav-item"><a class="u-active-palette-2-light-1 u-button-style u-nav-link u-text-grey-90 u-text-hover-palette-2-base" href="Acerca-de.html" style="padding: 10px 20px;">Acerca de</a>
</li></ul>
          </div>
          <div class="u-custom-menu u-nav-container-collapse">
            <div class="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
              <div class="u-inner-container-layout u-sidenav-overflow">
                <div class="u-menu-close"></div>
                <ul class="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="Nuevo...">Nuevo...</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="Que mierda">Lista de espera</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="#">Mis favoritos</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="#">Acerca de</a>
</li></ul>
              </div>
            </div>
            <div class="u-black u-menu-overlay u-opacity u-opacity-70"></div>
          </div>
        </nav>
      </div></header>
    <section class="u-align-center u-clearfix u-image u-shading u-section-1" src="" data-image-width="960" data-image-height="540" id="sec-7cc4">
      <div class="u-align-left u-clearfix u-sheet u-sheet-1">
        <div class="u-align-center u-table u-table-responsive u-table-1">
          <table class="u-table-entity">
            <colgroup>
              <col width="20.5%">
              <col width="18.1%">
              <col width="17.2%">
              <col width="14.8%">
              <col width="13.4%">
              <col width="9.4%">
              <col width="6.5%">
            </colgroup>
            <thead class="u-palette-4-base u-table-header u-table-header-1">
              <tr style="height: 82px;">
                <th class="u-border-1 u-border-palette-4-base u-palette-1-light-1 u-table-cell u-table-cell-1">Nombre</th>
                <th class="u-border-1 u-border-palette-4-base u-palette-1-light-1 u-table-cell u-table-cell-2">Año Publicación</th>
                <th class="u-border-1 u-border-palette-4-base u-palette-1-light-1 u-table-cell u-table-cell-3">Calificación</th>
                <th class="u-border-1 u-border-palette-4-base u-palette-1-light-1 u-table-cell u-table-cell-4">Estado</th>
                <th class="u-border-1 u-border-palette-2-light-2 u-palette-1-light-1 u-table-cell u-table-cell-5">Clasificación</th>
                <th class="u-border-1 u-border-palette-4-base u-palette-1-light-1 u-table-cell u-table-cell-6">Editar</th>
                <th class="u-border-1 u-border-palette-2-light-2 u-palette-1-light-1 u-table-cell u-table-cell-7">Eliminar</th>
              </tr>
            </thead>
            ${userHTML}
            </table>
            </div>
      </div>
    </section>
    
    
    <footer class="u-align-center-md u-align-center-sm u-align-center-xs u-clearfix u-footer u-grey-80" id="sec-4e1e"><div class="u-clearfix u-sheet u-sheet-1">
        <div class="u-align-left u-social-icons u-spacing-10 u-social-icons-1">
          <a class="u-social-url" title="twitter" target="_blank" href=""><span class="u-icon u-social-icon u-social-twitter u-icon-1"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112" style=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-454a"></use></svg><svg class="u-svg-content" viewBox="0 0 112 112" x="0" y="0" id="svg-454a"><circle fill="currentColor" class="st0" cx="56.1" cy="56.1" r="55"></circle><path fill="#FFFFFF" d="M83.8,47.3c0,0.6,0,1.2,0,1.7c0,17.7-13.5,38.2-38.2,38.2C38,87.2,31,85,25,81.2c1,0.1,2.1,0.2,3.2,0.2
            c6.3,0,12.1-2.1,16.7-5.7c-5.9-0.1-10.8-4-12.5-9.3c0.8,0.2,1.7,0.2,2.5,0.2c1.2,0,2.4-0.2,3.5-0.5c-6.1-1.2-10.8-6.7-10.8-13.1
            c0-0.1,0-0.1,0-0.2c1.8,1,3.9,1.6,6.1,1.7c-3.6-2.4-6-6.5-6-11.2c0-2.5,0.7-4.8,1.8-6.7c6.6,8.1,16.5,13.5,27.6,14
            c-0.2-1-0.3-2-0.3-3.1c0-7.4,6-13.4,13.4-13.4c3.9,0,7.3,1.6,9.8,4.2c3.1-0.6,5.9-1.7,8.5-3.3c-1,3.1-3.1,5.8-5.9,7.4
            c2.7-0.3,5.3-1,7.7-2.1C88.7,43,86.4,45.4,83.8,47.3z"></path></svg></span>
          </a>
        </div>
        <p class="u-align-center-lg u-align-center-md u-align-center-xl u-text u-text-1">Almita sígame en twitter</p>
      </div></footer>
    <section class="u-backlink u-clearfix u-grey-80">
      <a class="u-link" href="https://nicepage.com/website-templates" target="_blank">
        <span>Website Templates</span>
      </a>
      <p class="u-text">
        <span>created with</span>
      </p>
      <a class="u-link" href="" target="_blank">
        <span>Website Builder Software</span>
      </a>. 
    </section>
  
</body></html>`)
  })
})

app.get('/readProductos3', (req, res) => {

  con.query('select * from imprimir where id_edoproducto=3', (err, respuesta, field) => {
    if (err) return console.log('ERROR:', err)

    var userHTML = ``
    var i = 0
    console.log(respuesta)
    respuesta.forEach(producto => {
      i++
      userHTML += `
            <tbody class="u-table-body">
              <tr style="height: 129px;">
                <td class="u-border-1 u-border-grey-30 u-first-column u-palette-5-light-1 u-table-cell u-table-cell-8">${producto.nombre_producto}</td>
                <td class="u-border-1 u-border-grey-30 u-table-cell">${producto.ano_producto}</td>
                <td class="u-border-1 u-border-grey-30 u-table-cell">${producto.calificacion}</td>
                <td class="u-border-1 u-border-grey-30 u-table-cell">${producto.edo_producto}</td>
                <td class="u-border-1 u-border-grey-30 u-table-cell">${producto.tipo_producto}</td>
                <td class="u-border-1 u-border-grey-30 u-table-cell"><a href="/mandarAUpdate?id_producto=${producto.id_producto}"><i class="fa-sharp fa-solid fa-pen-to-square"></i></a></td>
                <td class="u-border-1 u-border-grey-30 u-table-cell"><a href="/borrar?id_producto=${producto.id_producto}"><i class="fa-solid fa-trash-can" style="font-size: 20px;"></i></a></td>
                </tr>
            
            </tbody>
            `
    })

    return res.send(`
        <!DOCTYPE html>
<html style="font-size: 16px;" lang="es"><head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta charset="utf-8">
    <meta name="keywords" content="">
    <meta name="description" content="">
    <title>Mostrar</title>
    <link rel="stylesheet" href="nicepage.css" media="screen">
<link rel="stylesheet" href="Mostrar.css" media="screen">
    <script class="u-script" type="text/javascript" src="jquery.js" defer=""></script>
    <script class="u-script" type="text/javascript" src="nicepage.js" defer=""></script>
    <script src="https://kit.fontawesome.com/75e8eeea01.js" crossorigin="anonymous"></script>
    <meta name="generator" content="Nicepage 4.19.3, nicepage.com">
    <link id="u-theme-google-font" rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">
    
    
    <script type="application/ld+json">{
		"@context": "http://schema.org",
		"@type": "Organization",
		"name": "",
		"logo": "images/default-logo.png",
		"sameAs": []
}</script>
    <meta name="theme-color" content="#478ac9">
    <meta property="og:title" content="Mostrar">
    <meta property="og:type" content="website">
  </head>
  <body class="u-body u-overlap u-xl-mode" data-lang="es"><header class="u-clearfix u-header u-palette-1-light-1 u-header" id="sec-7c60"><div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
        <a href="https://nicepage.com" class="u-image u-logo u-image-1" data-image-width="80" data-image-height="40">
          <img src="images/default-logo.png" class="u-logo-image u-logo-image-1">
        </a>
        <nav class="u-menu u-menu-one-level u-offcanvas u-menu-1">
          <div class="menu-collapse" style="font-size: 1rem; letter-spacing: 0px;">
            <a class="u-button-style u-custom-active-color u-custom-color u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-text-active-color u-custom-text-color u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="#">
              <svg class="u-svg-link" viewBox="0 0 24 24"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#menu-hamburger"></use></svg>
              <svg class="u-svg-content" version="1.1" id="menu-hamburger" viewBox="0 0 16 16" x="0px" y="0px" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg"><g><rect y="1" width="16" height="2"></rect><rect y="7" width="16" height="2"></rect><rect y="13" width="16" height="2"></rect>
</g></svg>
            </a>
          </div>
          <div class="u-custom-menu u-nav-container">
            <ul class="u-nav u-unstyled u-nav-1"><li class="u-nav-item"><a class="u-active-palette-2-light-1 u-button-style u-nav-link u-text-grey-90 u-text-hover-palette-2-base" href="Registro.html" style="padding: 10px 20px;">Nuevo...</a>
</li><li class="u-nav-item"><a class="u-active-palette-2-light-1 u-button-style u-nav-link u-text-grey-90 u-text-hover-palette-2-base" href="#" style="padding: 10px 20px;">Lista de espera</a>
</li><li class="u-nav-item"><a class="u-active-palette-2-light-1 u-button-style u-nav-link u-text-grey-90 u-text-hover-palette-2-base" href="/readProductos" style="padding: 10px 20px;">Mis favoritos</a>
</li><li class="u-nav-item"><a class="u-active-palette-2-light-1 u-button-style u-nav-link u-text-grey-90 u-text-hover-palette-2-base" href="Acerca-de.html" style="padding: 10px 20px;">Acerca de</a>
</li></ul>
          </div>
          <div class="u-custom-menu u-nav-container-collapse">
            <div class="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
              <div class="u-inner-container-layout u-sidenav-overflow">
                <div class="u-menu-close"></div>
                <ul class="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2"><li class="u-nav-item"><a class="u-button-style u-nav-link" href="Nuevo...">Nuevo...</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="Que mierda">Lista de espera</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="#">Mis favoritos</a>
</li><li class="u-nav-item"><a class="u-button-style u-nav-link" href="#">Acerca de</a>
</li></ul>
              </div>
            </div>
            <div class="u-black u-menu-overlay u-opacity u-opacity-70"></div>
          </div>
        </nav>
      </div></header>
    <section class="u-align-center u-clearfix u-image u-shading u-section-1" src="" data-image-width="960" data-image-height="540" id="sec-7cc4">
      <div class="u-align-left u-clearfix u-sheet u-sheet-1">
        <div class="u-align-center u-table u-table-responsive u-table-1">
          <table class="u-table-entity">
            <colgroup>
              <col width="20.5%">
              <col width="18.1%">
              <col width="17.2%">
              <col width="14.8%">
              <col width="13.4%">
              <col width="9.4%">
              <col width="6.5%">
            </colgroup>
            <thead class="u-palette-4-base u-table-header u-table-header-1">
              <tr style="height: 82px;">
                <th class="u-border-1 u-border-palette-4-base u-palette-1-light-1 u-table-cell u-table-cell-1">Nombre</th>
                <th class="u-border-1 u-border-palette-4-base u-palette-1-light-1 u-table-cell u-table-cell-2">Año Publicación</th>
                <th class="u-border-1 u-border-palette-4-base u-palette-1-light-1 u-table-cell u-table-cell-3">Calificación</th>
                <th class="u-border-1 u-border-palette-4-base u-palette-1-light-1 u-table-cell u-table-cell-4">Estado</th>
                <th class="u-border-1 u-border-palette-2-light-2 u-palette-1-light-1 u-table-cell u-table-cell-5">Clasificación</th>
                <th class="u-border-1 u-border-palette-4-base u-palette-1-light-1 u-table-cell u-table-cell-6">Editar</th>
                <th class="u-border-1 u-border-palette-2-light-2 u-palette-1-light-1 u-table-cell u-table-cell-7">Eliminar</th>
              </tr>
            </thead>
            ${userHTML}
            </table>
            </div>
      </div>
    </section>
    
    
    <footer class="u-align-center-md u-align-center-sm u-align-center-xs u-clearfix u-footer u-grey-80" id="sec-4e1e"><div class="u-clearfix u-sheet u-sheet-1">
        <div class="u-align-left u-social-icons u-spacing-10 u-social-icons-1">
          <a class="u-social-url" title="twitter" target="_blank" href=""><span class="u-icon u-social-icon u-social-twitter u-icon-1"><svg class="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112" style=""><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-454a"></use></svg><svg class="u-svg-content" viewBox="0 0 112 112" x="0" y="0" id="svg-454a"><circle fill="currentColor" class="st0" cx="56.1" cy="56.1" r="55"></circle><path fill="#FFFFFF" d="M83.8,47.3c0,0.6,0,1.2,0,1.7c0,17.7-13.5,38.2-38.2,38.2C38,87.2,31,85,25,81.2c1,0.1,2.1,0.2,3.2,0.2
            c6.3,0,12.1-2.1,16.7-5.7c-5.9-0.1-10.8-4-12.5-9.3c0.8,0.2,1.7,0.2,2.5,0.2c1.2,0,2.4-0.2,3.5-0.5c-6.1-1.2-10.8-6.7-10.8-13.1
            c0-0.1,0-0.1,0-0.2c1.8,1,3.9,1.6,6.1,1.7c-3.6-2.4-6-6.5-6-11.2c0-2.5,0.7-4.8,1.8-6.7c6.6,8.1,16.5,13.5,27.6,14
            c-0.2-1-0.3-2-0.3-3.1c0-7.4,6-13.4,13.4-13.4c3.9,0,7.3,1.6,9.8,4.2c3.1-0.6,5.9-1.7,8.5-3.3c-1,3.1-3.1,5.8-5.9,7.4
            c2.7-0.3,5.3-1,7.7-2.1C88.7,43,86.4,45.4,83.8,47.3z"></path></svg></span>
          </a>
        </div>
        <p class="u-align-center-lg u-align-center-md u-align-center-xl u-text u-text-1">Almita sígame en twitter</p>
      </div></footer>
    <section class="u-backlink u-clearfix u-grey-80">
      <a class="u-link" href="https://nicepage.com/website-templates" target="_blank">
        <span>Website Templates</span>
      </a>
      <p class="u-text">
        <span>created with</span>
      </p>
      <a class="u-link" href="" target="_blank">
        <span>Website Builder Software</span>
      </a>. 
    </section>
  
</body></html>`)
  })
})


app.get('/mandarAUpdate', (req, res) => {
  let id_producto = req.query.id_producto
  con.query('select * from imprimir where id_producto=' +id_producto+'', (err, respuesta, field) => {
    if (err) return console.log('ERROR:', err)


    var userHTML = ``
    var i = 0
    console.log(respuesta)
    respuesta.forEach(respuesta => {
      i++
      userHTML += `
      <div class="u-form-group u-form-name">
      <label for="name-6596" class="u-label">Nombre</label>
      <input type="text" placeholder="Introduzca el nombre" id="name-6596" name="nombre"
        class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" required="" maxlength="30" value=${respuesta.nombre_producto}>
    </div>
    <div class="u-form-group">
      <label for="email-6596" class="u-label">Año Publicación</label>
      <input placeholder="Introduzca el año de publicación" id="email-6596" name="ano"
        class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" required="required" type="text"
        maxlength="4" value=${respuesta.ano_producto}>
    </div>
    <div class="u-form-group">
      <label for="message-6596" class="u-label">Calificación</label>
      <input placeholder="Introduzca la calificación" rows="4" cols="50" id="message-6596" name="calificacion"
        class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white" required="required" type="text"
        maxlength="3" value=${respuesta.calificacion}>
    </div>
    <div class="u-form-group u-form-select u-form-group-4">
      <label for="select-65b2" class="u-label">Clasificación</label>
      <div class="u-form-select-wrapper">
        <select id="select-65b2" name="producto_tipo"
          class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white">
          <option value="${respuesta.id_cproducto}">${respuesta.tipo_producto}</option>
          <option value="1">Película</option>
          <option value="5">Serie</option>
          <option value="2">Música</option>
          <option value="3">Libro</option>
          <option value="6">Cómic</option>
        </select>
        <svg class="u-caret u-caret-new" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px"
          viewBox="0 0 16 16" style="fill:currentColor;" xml:space="preserve">
          <polygon class="st0" points="8,12 2,4 14,4 "></polygon>
        </svg>
      </div>
    </div>
    <div class="u-form-group u-form-select u-form-group-5">
      <label for="select-9292" class="u-label">Estado </label>
      <div class="u-form-select-wrapper">
        <select id="select-9292" name="producto_estado"
          class="u-border-1 u-border-grey-30 u-input u-input-rectangle u-white">
          <option value="${respuesta.id_cedoproducto}">${respuesta.edo_producto}</option>
          <option value="1">Visto</option>
          <option value="2">Viendo</option>
          <option value="3">Ver más tarde</option>
        </select>
        <td><input type="hidden" name="producto_id" value="${respuesta.id_producto}"></td>
        <svg class="u-caret u-caret-new" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="16px" height="16px"
          viewBox="0 0 16 16" style="fill:currentColor;" xml:space="preserve">
          <polygon class="st0" points="8,12 2,4 14,4 "></polygon>
        </svg>
      </div>
    </div>
    <div class="u-align-center u-form-group u-form-submit">
      <button type="submit" class="u-btn u-btn-submit u-button-style">Enviar</button>
    </div>
    <div class="u-form-send-message u-form-send-success"> Gracias! Tu mensaje ha sido enviado. </div>
    <div class="u-form-send-error u-form-send-message"> No se puede enviar su mensaje. Por favor, corrija los
      errores y vuelva a intentarlo. </div>
    <input type="hidden" value="" name="recaptchaResponse">
    <input type="hidden" name="formServices" value="">
  </form>
</div>
</div>
</section>
            `
    })

    return res.send(`
      <!DOCTYPE html>
<html style="font-size: 16px;" lang="es">

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta charset="utf-8">
  <meta name="keywords" content="Agregar Nuevo...">
  <meta name="description" content="">
  <title>Registro</title>
  <link rel="stylesheet" href="nicepage.css" media="screen">
  <link rel="stylesheet" href="Registro.css" media="screen">
  <meta name="generator" content="Nicepage 4.19.3, nicepage.com">
  <link id="u-theme-google-font" rel="stylesheet"
    href="https://fonts.googleapis.com/css?family=Roboto:100,100i,300,300i,400,400i,500,500i,700,700i,900,900i|Open+Sans:300,300i,400,400i,500,500i,600,600i,700,700i,800,800i">


  <script type="application/ld+json">{
		"@context": "http://schema.org",
		"@type": "Organization",
		"name": "",
		"logo": "images/default-logo.png",
		"sameAs": []
}</script>
  <meta name="theme-color" content="#478ac9">
  <meta property="og:title" content="Registro">
  <meta property="og:type" content="website">
</head>

<body class="u-body u-overlap u-xl-mode" data-lang="es">
  <header class="u-clearfix u-header u-palette-1-light-1 u-header" id="sec-7c60">
    <div class="u-clearfix u-sheet u-valign-middle u-sheet-1">
      <a href="https://nicepage.com" class="u-image u-logo u-image-1" data-image-width="80" data-image-height="40">
        <img src="images/default-logo.png" class="u-logo-image u-logo-image-1">
      </a>
      <nav class="u-menu u-menu-one-level u-offcanvas u-menu-1">
        <div class="menu-collapse" style="font-size: 1rem; letter-spacing: 0px;">
          <a class="u-button-style u-custom-active-color u-custom-color u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-text-active-color u-custom-text-color u-custom-top-bottom-menu-spacing u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
            href="#">
            <svg class="u-svg-link" viewBox="0 0 24 24">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#menu-hamburger"></use>
            </svg>
            <svg class="u-svg-content" version="1.1" id="menu-hamburger" viewBox="0 0 16 16" x="0px" y="0px"
              xmlns:xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
              <g>
                <rect y="1" width="16" height="2"></rect>
                <rect y="7" width="16" height="2"></rect>
                <rect y="13" width="16" height="2"></rect>
              </g>
            </svg>
          </a>
        </div>
        <div class="u-custom-menu u-nav-container">
          <ul class="u-nav u-unstyled u-nav-1">
            <li class="u-nav-item"><a
                class="u-active-palette-2-light-1 u-button-style u-nav-link u-text-grey-90 u-text-hover-palette-2-base"
                href="Nuevo..." style="padding: 10px 20px;">Nuevo...</a>
            </li>
            <li class="u-nav-item"><a
                class="u-active-palette-2-light-1 u-button-style u-nav-link u-text-grey-90 u-text-hover-palette-2-base"
                href="Que mierda" style="padding: 10px 20px;">Lista de espera</a>
            </li>
            <li class="u-nav-item"><a
                class="u-active-palette-2-light-1 u-button-style u-nav-link u-text-grey-90 u-text-hover-palette-2-base"
                href="#" style="padding: 10px 20px;">Mis favoritos</a>
            </li>
            <li class="u-nav-item"><a
                class="u-active-palette-2-light-1 u-button-style u-nav-link u-text-grey-90 u-text-hover-palette-2-base"
                href="#" style="padding: 10px 20px;">Acerca de</a>
            </li>
          </ul>
        </div>
        <div class="u-custom-menu u-nav-container-collapse">
          <div class="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
            <div class="u-inner-container-layout u-sidenav-overflow">
              <div class="u-menu-close"></div>
              <ul class="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2">
                <li class="u-nav-item"><a class="u-button-style u-nav-link" href="">Nuevo...</a>
                </li>
                <li class="u-nav-item"><a class="u-button-style u-nav-link" href="">Lista de espera</a>
                </li>
                <li class="u-nav-item"><a class="u-button-style u-nav-link" href="#">Mis favoritos</a>
                </li>
                <li class="u-nav-item"><a class="u-button-style u-nav-link" href="#">Acerca de</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="u-black u-menu-overlay u-opacity u-opacity-70"></div>
        </div>
      </nav>
    </div>
  </header>
  <section class="u-align-left u-clearfix u-image u-shading u-section-1" src="" data-image-width="960"
    data-image-height="540" id="sec-f5ed">
    <div class="u-clearfix u-sheet u-sheet-1">
      <h1 class="u-text u-text-default u-text-1">Agregar Nuevo...</h1>
      <a href="/readProductos"
        class="u-btn u-button-style u-hover-palette-1-dark-1 u-palette-1-base u-btn-1">Consultar</a>
      <div class="u-form u-form-1">
        <form action="/updateProducto" method="post"
          class="u-clearfix u-form-spacing-10 u-form-vertical u-inner-form" source="email" name="form"
          style="padding: 10px;">
          ${userHTML}
          <footer class="u-align-center-md u-align-center-sm u-align-center-xs u-clearfix u-footer u-grey-80" id="sec-4e1e">
    <div class="u-clearfix u-sheet u-sheet-1">
      <div class="u-align-left u-social-icons u-spacing-10 u-social-icons-1">
        <a class="u-social-url" title="twitter" target="_blank" href=""><span
            class="u-icon u-social-icon u-social-twitter u-icon-1"><svg class="u-svg-link"
              preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112" style="">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#svg-454a"></use>
            </svg><svg class="u-svg-content" viewBox="0 0 112 112" x="0" y="0" id="svg-454a">
              <circle fill="currentColor" class="st0" cx="56.1" cy="56.1" r="55"></circle>
              <path fill="#FFFFFF" d="M83.8,47.3c0,0.6,0,1.2,0,1.7c0,17.7-13.5,38.2-38.2,38.2C38,87.2,31,85,25,81.2c1,0.1,2.1,0.2,3.2,0.2
            c6.3,0,12.1-2.1,16.7-5.7c-5.9-0.1-10.8-4-12.5-9.3c0.8,0.2,1.7,0.2,2.5,0.2c1.2,0,2.4-0.2,3.5-0.5c-6.1-1.2-10.8-6.7-10.8-13.1
            c0-0.1,0-0.1,0-0.2c1.8,1,3.9,1.6,6.1,1.7c-3.6-2.4-6-6.5-6-11.2c0-2.5,0.7-4.8,1.8-6.7c6.6,8.1,16.5,13.5,27.6,14
            c-0.2-1-0.3-2-0.3-3.1c0-7.4,6-13.4,13.4-13.4c3.9,0,7.3,1.6,9.8,4.2c3.1-0.6,5.9-1.7,8.5-3.3c-1,3.1-3.1,5.8-5.9,7.4
            c2.7-0.3,5.3-1,7.7-2.1C88.7,43,86.4,45.4,83.8,47.3z"></path>
            </svg></span>
        </a>
      </div>
      <p class="u-align-center-lg u-align-center-md u-align-center-xl u-text u-text-1">Almita sígame en twitter</p>
    </div>
  </footer>
  <section class="u-backlink u-clearfix u-grey-80">
    <a class="u-link" href="https://nicepage.com/website-templates" target="_blank">
      <span>Website Templates</span>
    </a>
    <p class="u-text">
      <span>created with</span>
    </p>
    <a class="u-link" href="" target="_blank">
      <span>Website Builder Software</span>
    </a>.
  </section>

</body>

</html>
          `)
  })
})


app.post('/updateProducto', (req, res) => {
  let nombre = req.body.nombre
  let ano = parseInt(req.body.ano)
  let calificacion = parseFloat(req.body.calificacion)
  let id_edoproducto = req.body.producto_tipo
  let id_cproducto = req.body.producto_estado
  let id_producto =  req.body.producto_id



  con.query('UPDATE mproducto SET nombre_producto = "' + nombre + '", ano_producto = '+ano+', id_edoproducto = '+id_edoproducto+', id_cproducto = '+id_cproducto+', calificacion = '+calificacion+' WHERE id_producto = '+id_producto+'', (err, respuesta, field) => {
    if (err) return console.log("Error", err)

    return res.redirect("/readProductos")
  })
})


app.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto " + PORT)
})