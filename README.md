# Aplicación de Podcasts

Se ha realizado una SPA utilizando la librería React. Para la estructura inicial del proyecto, he utilizado Vite en lugar del clásico create-react-app. He elegido Vite porque, aunque no se menciona directamente en la documentación oficial de React, ya he utilizado Vite en proyectos anteriores y he encontrado que es una herramienta muy rápida tanto en el entorno de desarrollo como en la generación de los archivos de producción.

## Instalación

Para poder visualizar la aplicación, sigue estos pasos:

1. Clona el repositorio:

   ```
   git clone https://github.com/pdelbarrio/podcasts.git
   ```

2. Accede a la carpeta del proyecto e instala las dependencias:

   ```
   npm install
   ```

## Modo de Desarrollo

Para ejecutar la aplicación en modo de desarrollo, utiliza el siguiente comando:

```
npm run dev
```

Accede a la dirección que aparece en la consola:

```
http://localhost:5174/
```

## Modo de Producción

Para generar la versión de producción de la aplicación, ejecuta el siguiente comando:

```
npm run build
```

Esto creará una carpeta `dist/` con los archivos resultantes de la compilación y empaquetado. En la carpeta `dist/` encontrarás el archivo de entrada `index.html` y la carpeta `assets` que contiene los archivos JavaScript y CSS minimizados.

## Configuración Importante

Antes de utilizar la aplicación, es importante tener en cuenta lo siguiente:

- Según se indica en este issue [aquí](https://github.com/Rob--W/cors-anywhere/issues/301), desde enero de 2021 la herramienta CORS Anywhere ya no está disponible para uso abierto. Por lo tanto, es necesario proporcionar acceso temporal al navegador antes de utilizar la aplicación. Para ello, accede a [https://cors-anywhere.herokuapp.com/corsdemo](https://cors-anywhere.herokuapp.com/corsdemo) y haz clic en el botón para solicitar acceso temporal a la demo.

## Uso de la Aplicación

Al cargar la aplicación, se mostrará la vista principal con un listado de 100 podcasts obtenidos de la URL indicada en el enunciado. Estos datos se almacenan en el localStorage y la aplicación los utilizará hasta que pasen 24 horas, momento en el cual se realizará una nueva petición a la URL para obtener los datos actualizados.

La vista principal cuenta con un buscador que filtra los podcasts por título y autor. Al hacer clic en un podcast, se navegará a la vista de detalle del mismo. Durante la navegación, un pequeño indicador de carga en la cabecera avisará puntualmente que se está iniciando la carga.

En la vista de detalle de un podcast, se realiza una petición a la URL indicada en el enunciado utilizando el servicio [https://allorigins.win](https://allorigins.win) para obtener los datos específicos de ese podcast. Estos datos se almacenan en el localStorage siguiendo la misma mecánica anterior. Si un podcast ha sido visitado en un período de 24 horas, se obtendrá la información desde el localStorage. Si el podcast no se ha almacenado previamente o han pasado 24 horas, se realizará una nueva petición.

La vista de detalle de un podcast muestra una barra lateral en la izquierda y una sección principal con el número de episodios y una lista de los mismos. Al hacer clic en cada episodio, se navegará a la vista de detalle del episodio correspondiente. La información de cada episodio se obtiene manipulando el XML obtenido al hacer una petición a la URL que se encuentra en la propiedad `feedUrl` del JSON obtenido en la petición anterior. En la vista de detalle de cada episodio, se puede ver la descripción (la cual si contiene HTML, estará interpretado/parseado) y un reproductor de audio nativo para reproducir el episodio.

