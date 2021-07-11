# Appetitev3

# Resumen ejecutivo

## Descripción

Los locales de comida en México están teniendo problemas para mantener sus servicios, pues la pandemia afectó la manera en la que solíamos salir a comer, pasear y conocer. Muchos de estos lugares no son conocidos por la población del área, pues no son conocidos por la gente de la colonia o de la ciudad o simplemente porque no están registrados en el servicio de mapas de google. Lo cual es un problema pues al no tener concurrencia de clientes, no pueden pagar sus facturas como la renta, salario y materia prima, por lo que poco a poco los locales van cerrando sus puertas al público. Y esto es un problema para el país puesto que la economía no se reactiva y provoca crisis económicas. 

## objetivo 

El objetivo será ayudar a reducir los cierres de locales de comida en todo el país a lo largo de la pandemia, esto mejorará la economía de los dueños de los locales y también ayudará a la economía de país, pues comenzará a fluir el dinero nuevamente 

## Solución

Se desarrolló una aplicación movil que se pueda usar en Dispositivos Android  y con posibilidad de compilarse para IOS, además de lanzar una aplicación web. 

##Arquitectura 

La aplicación se desarrolló con tecnología web usando el framewor de javascript Angular y Ionic para poder complilar en dispositivos nativos. 

como base de datos se utiizó Firebase ya que tenía modulos como la autenticación y almacenamiento de archivos. además de que el ambiente de desarrollo es compatible 100% con firebase. 

# Requerimientos

## Servidores

Debido a que la aplicación aun no se libera para producción, se puede usar un servidor local como nodejs

## Base de datos
La base de datos en no relacional y está montada en firebase

## paquetes adicionales

los paquetes necesarios son dependecias de npm, en caso de clonar el proyecto se deberá poner el comando
```bash
npm install
```

## version

Angular: 12.0.0
Node: 14.17.0 
npm: 6.14.13 
ionic: 6.15.0 

# Instalación 

## Ambiente de desarrollo

Se debe instalar CLI de Angular
```bash
npm install -g @angular/cli
```
Se debe instalar NODE JS

Se debe instalar CLI de ionic
``` bash
npm install -g @ionic/cli
```

# Configuración 

## archivos de configuración 
Entrar al fichero enviorement.ts y a enviorement.prod.ts
y configurar firebase

```javascript

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  }
};

```


## instalacipin de dependencias 
```bash
npm install
```

# Uso

## correr proyecto 
Despues de instalar las dependencias dentro de la carpeta correr

```bash
ionic serve
```

## Contributing
Las solicitudes pull son bienvenidas. Para cambios importantes, primero abra un problema para discutir lo que le gustaría cambiar.

Asegúrese de actualizar las pruebas según corresponda. 

#RoadMap

## Requerimientos a futuro

-Se podrá solicitar ruta más corta al local
-Se podrán visualizar unicamente los locales cercanos al usuario
-Se podrá interactuar con el mápa
-Estará disponible en toda el Área metropolitana de Guadalajara
-compliar para dispositivos ios y android
-Salir a producción  

# Video demostración

https://youtu.be/bDxFtbuuOfk





