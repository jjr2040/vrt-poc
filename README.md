# Taller 6 - Visual Regression Testing 

Taller donde con una prueba de concepto de Visual Regression Testing utilizando Cypress para tomar screenshots, ResembleJS para comparar dichos screenshots y Jenkins para desplegar un pipeline de pruebas con el reporte. 

## Integrantes

Juan Sebastián Méndez
Juan José Villegas

## Random palette App
A continuación los links con el código y el despliegue de la aplicación de paletas de colores aleatorias.

Code: https://glitch.com/edit/#!/random-color-palette

Life Preview: https://random-color-palette.glitch.me

## Cypress Screenshots

Por simplicidad sólo se muestran a continuación los outputs de ResembleJS. Para ver todas las imágenes, puede referirse a este link: https://github.com/jjr2040/vrt-poc/tree/master/assets/taller2-screenshots

### Login Correcto

![Login](https://github.com/jjr2040/vrt-poc/raw/master/assets/taller2-screenshots/1-login_correcto_spec.js/output.png)

### Detalle profesor

![Detalle profesor](https://github.com/jjr2040/vrt-poc/raw/master/assets/taller2-screenshots/3-profesor_spec.js/output.png)

### Buscar profesor

![Busqueda profesor](https://github.com/jjr2040/vrt-poc/raw/master/assets/taller2-screenshots/4-search_teacher.js/output.png)

**Ve usted algún problema con los screenshots tomados por Cypress al intentar hacer Visual Regression Testing?**

Sí, es muy dificil y consume mucho tiempo comparar la imágenes tan sólo viéndolas. Algunos cambios son muy sutiles y fáciles de omitir. Aparte son muchas imágenes que si al hacerlo a mano, tomaría mucho tiempo en hacer una regresión completa.

## Questions

**¿Qué información puedo obtener de una imagen al usar resembleJS y que significado tiene cada uno de los componentes de la respuesta?.**

La respuesta al usar resemble es un objecto con los siguientes atributos: 

```javascript
{
  red: 100, // Cantidad de rojo en la imagen
  green: 100, // Cantidad de verde en la imagen
  blue: 100, // Cantidad de azul en la imagen
  brightness: 100, // Brillo de la imagen
  alpha: 100, // Alpha de la imagen
  white: 100, // Cantidad de blanco de la imagen
  black: 100 // Cantidad de negro en la imagen
}
```

**¿Qué información puedo obtener al comparar dos imagenes?**

Al comparar las 2 imágenes, a parte de una nueva imagen resaltando las diferencias entre las 2, puede obtener el % de diferencia, si tienen las mismas dimensiones o no, qué tan diferentes son las dimensiones y la url de la imagen. 

```javascript
{
  misMatchPercentage : 100, // %
  isSameDimensions: true, // or false
  dimensionDifference: { width: 0, height: -1 }, // defined if dimensions are not the same
  getImageDataUrl: function(){}
}
```

**¿Qué opciones se pueden seleccionar al realizar la comparación?**

Se pueden seleccionar las siguientes opciones:

```javascript
output: {
    errorColor: { // En qué color mostrar el error
        red: 255,
        green: 0,
        blue: 255
    },
    errorType: "movement", // Cómo mostrar el error: "movement" , "flat", "flatDifferenceIntensity" y "diffOnly"
    transparency: 0.3,  // La transparencia a aplicar entre las imágenes
    largeImageThreshold: 1200, // Evita comparar imágenes más de x pixeles
    useCrossOrigin: false, // Puede ser true o false
    outputDiff: true // Marcar o no la diferencias
},
scaleToSameSize: true, // Si queremos tener las 2 imagenes del mismo tamaño antes de comprarlas
ignore: "antialiasing" // Puede ser "nothing", "less", "antialiasing", "colors" o "alpha"
```

## Herramienta de automatización VRT con Jenkins

Para automatizar VRT se construyó un pipeline de jenkins con 4 pasos: 

1) Se descarga del repo la última versión de la herramienta
2) Se instalan las dependencias con yarn
3) Se corre el script que toma los screenshot con cypress 
4) Se corre un script que compara las imágenes con ResembleJS y guarda su output. Después copia el resultado del paso anterior en un folder dentro del workspace donde va a estar el reporte. Por último, se renderiza el reporte utilizando EJS por medio de un template. 
5) Se publica el reporte como artefacto para ser consultado

Este es el gif con la interacción: 

![Gif](https://github.com/jjr2040/vrt-poc/raw/master/assets/vrt-jenkins/vrt-jenkins.gif)

A continuación los pantallasos de los pasos para verlos más claramente:

### Builds

![Builds](https://github.com/jjr2040/vrt-poc/raw/master/assets/vrt-jenkins/screenshots/builds.png)

### Correr el pipeline
![Run Pipeline](https://github.com/jjr2040/vrt-poc/raw/master/assets/vrt-jenkins/screenshots/run-task.png)

### Pipeline corriendo
![Pipeline running](https://github.com/jjr2040/vrt-poc/raw/master/assets/vrt-jenkins/screenshots/task-running.png)

### Pipeline termina
![task finished](https://github.com/jjr2040/vrt-poc/raw/master/assets/vrt-jenkins/screenshots/finished-running.png)

### Se muestran los artefactos
![Artefacts](https://github.com/jjr2040/vrt-poc/raw/master/assets/vrt-jenkins/screenshots/artifacts.png)

### Se despliega el reporte
![Report](https://github.com/jjr2040/vrt-poc/raw/master/assets/vrt-jenkins/screenshots/report.png)