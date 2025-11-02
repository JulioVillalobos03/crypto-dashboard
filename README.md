# Crypto Dashboard - Prueba Tecnica Front-End Engineer

**Crypto Dashboard** es un panel interactivo desarrollado con **React + Vite** que consume datos de la API de **CoinGecko**.
Permite visualizar informacion de las principales criptomonedas, aplicar filtros dinámicos, cambiar entre idiomas, alternar tema claro/oscuro y analizar métricas mediante gráficos interactivos.



## Descripción General

El dashboard obtiene datos de la API de **CoinGecko**, los procesa y los representa mediante **gráficos interactivos y tablas accesibles**.  
Se buscó un balance entre rendimiento, accesibilidad, diseño limpio y estructura modular.

### Objetivos principales:
- Mostrar datos actualizados de criptomonedas.  
- Implementar gráficos dinámicos con Recharts.  
- Incluir filtros, ordenamiento y búsqueda en tiempo real.  
- Garantizar accesibilidad (lectores de pantalla, teclado).  
- Mantener un diseño responsivo y moderno.  
- Incluir pruebas unitarias para asegurar la estabilidad del código.


---
## Tecnologías

Este proyecto utiliza una pila moderna de desarrollo web enfocada en el rendimiento y la mantenibilidad.

| Categoría | Herramienta | Descripción |
| :--- | :--- | :--- |
| **Framework principal** | **React 19 + Vite** | Biblioteca de UI y *bundler* de desarrollo rápido. |
| **Lenguaje** | **JavaScript (ES2023)** | Lenguaje de programación con características modernas. |
| **Estilos** | **Tailwind CSS** | Framework *utility-first* para estilos rápidos y responsivos. |
| **Gráficos** | **Recharts** | Biblioteca de componentes de gráficos construida con React. |
| **Datos** | **API pública de CoinGecko** | Fuente de datos para información de criptomonedas. |
| **Internacionalización** | **react-i18next** | Gestión de múltiples idiomas en la aplicación. |
| **Testing** | **Jest + React Testing Library** | Entorno para pruebas unitarias y de integración de componentes. |
| **Linting** | **ESLint moderno** | Herramienta para asegurar la calidad y consistencia del código. |
| **Accesibilidad** | **Roles ARIA + etiquetas `sr-only`** | Implementación de estándares para mejorar la accesibilidad a lectores de pantalla. |




---

## Instrucciones de Configuracion y Ejecucion

### Clonar el repositorio
```
git clone https://github.com/JulioVillalobos03/crypto-dashboard.git
```

### Instalar dependencias
```
npm install
```

### Ejecutar el proyecto
```
npm run dev
```

### Ejecutar pruebas unitarias
```
npm run test
```

---

## Funcionalidades principales

- Vizualizacion de datos
  - Consumo de APi de CoinGecko
  - Muestra informacion de las principales criptomonedas, entre ellas el precio, volumen, market cap, cambio porcentual 24h.
  - Actualizacion automatica de los datos al aplicar filtros. 
- Gaficos Implementados
  - LineChart – evolución de precio y market cap.
  - PieChart – evolución de cambio porcentual.
  - BarChart – evolución de volumen de comercio.
- Filtros e Interactividad
  - Moneda: USD, EUR, MXN.
  - Orden: por capitalización o volumen.
  - Top: mostrar las primeras 10, 20 o 30 monedas.
  - Tendencia: todas, positivas o negativas.
  - Rango de precios: dinámico según la moneda.
  - Buscador y botón “Reiniciar filtros”.
- Accesibilidad
  - Roles semánticos ARIA (banner, main, table, region, contentinfo).
  - Descripciones ocultas (sr-only) para gráficos y tablas.
  -  Soporte para lectores de pantalla.
  - Navegacion mediante teclado.
- Diseño responsivo
  - Adaptable a moviles, tabletas y escritorios.
  - Uso de Flexbox y Grid con Tailwind CSS.
  - Diseño modular y limpio.
- Modo Oscuro / claro
  - Tema oscuro y claro.
  - Botón para alternar entre el modo oscuro y claro.
  - Configuración de tema en localStorage.
  - Soporte para lectores de pantalla.
- Internacionalización
  - Soporte para inglés y español.
  - Configuración de idioma en localStorage.
  - Botón para cambiar idioma.
  - Soporte para lectores de pantalla.
  - Traducción automática de mensajes de error.
  - Traducción automática de etiquetas de mensajes de error.

---

## Estructura del proyecto

```
src/
├── __tests__/                   # Pruebas unitarias (Jest + React Testing Library)
│
├── api/
│   └── coingecko.js             # Conexión con la API pública de CoinGecko
│
├── assets/                      # Recursos estáticos (imágenes del README y UI)
│
├── components/
│   ├── ChartBar.jsx             # Gráfico de barras (volumen de comercio)
│   ├── ChartLine.jsx            # Gráfico de líneas (precio y capitalización)
│   ├── ChartPie.jsx             # Gráfico de pastel (variación porcentual 24h)
│   ├── Filters.jsx              # Filtros dinámicos e interactivos
│   ├── Header.jsx               # Encabezado con título, cambio de idioma y tema
│   ├── Footer.jsx               # Pie de página accesible con información de créditos
│   ├── LangSwitcher.jsx         # Selector de idioma (ES / EN)
│   ├── Layout.jsx               # Estructura principal que envuelve el contenido
│   ├── Table.jsx                # Tabla principal con paginación accesible
│   └── ThemeSwitcher.jsx        # Alternador de modo claro/oscuro con persistencia
│
├── hooks/
│   ├── useCoins.js              # Hook para obtener y filtrar datos de criptomonedas
│   ├── usePagination.js         # Controla paginación y navegación entre páginas
│   └── useTheme.js              # Manejo de tema con sincronización en localStorage
│
├── i18n/
│   ├── index.js                 # Configuración global de i18next
│   ├── es/translation.json      # Traducciones en español
│   └── en/translation.json      # Traducciones en inglés
│
├── pages/
│   └── dashboard.jsx            # Página principal del dashboard
│
├── utils/
│   └── format.js                # Funciones de formato (monedas, números, etc.)
│
├── App.jsx                      # Contenedor principal de la app
├── main.jsx                     # Punto de entrada al DOM
├── setupTests.js                # Configuración global para Jest
│
├── App.css                      # Estilos base
├── index.css                    # Estilos globales (Tailwind)
└── ...

```

## Estructura Lógica y Flujo de Datos del Proyecto

Este documento describe la organización del código base y el flujo de datos principal, siguiendo buenas prácticas de React para garantizar modularidad, claridad y un bajo acoplamiento.



### 1. Estructura Lógica y Modularización

El código se organiza en **módulos funcionales** dentro del directorio `src/`, agrupando componentes, hooks, servicios, utilidades y vistas.

Cada módulo sigue un propósito definido:

| Módulo | Descripción |
| :--- | :--- |
| **api/** | Contiene los servicios de comunicación con fuentes externas. En este caso, el módulo `coingecko.js` maneja todas las llamadas HTTP a la API pública de CoinGecko, garantizando separación entre lógica de datos y de interfaz. |
| **components/** | Define los bloques visuales reutilizables del sistema: gráficos, tabla, filtros, layout, header, footer, alternadores de idioma y tema. Cada componente está desacoplado y pensado para ser testeable de forma independiente. |
| **hooks/** | Contiene la lógica reutilizable no visual: manejo del tema, obtención y filtrado de datos, y control de paginación. Todos implementan convenciones de React (`useEffect`, `useState`, `useMemo`) para optimizar el renderizado. |
| **i18n/** | Configura la internacionalización con `react-i18next`, centralizando las traducciones en JSONs (`es/` y `en/`). Esto facilita escalar el proyecto a nuevos idiomas sin tocar el código base. |
| **pages/** | Contiene las vistas principales. En este caso, `dashboard.jsx` actúa como **punto orquestador**, integrando filtros, gráficos y tabla dentro de una interfaz cohesiva. |
| **utils/** | Agrupa funciones auxiliares puras como `format.js`, encargadas de formatear precios, porcentajes o valores numéricos según la divisa y configuración regional. |

---

### 2. Flujo de Datos y Comunicación entre Módulos


### Obtención y Transformación de Datos

* **Obtención de datos:** El hook `useCoins.js` realiza la solicitud a la API de CoinGecko mediante `api/coingecko.js`. La respuesta se **normaliza** (nombre, símbolo, precio, market cap, volumen, etc.) antes de almacenarse en estado.
* **Filtrado y transformación:** `Filters.jsx` envía las opciones seleccionadas (moneda, top N, tendencia, orden). Estas opciones se propagan hacia `useCoins`, que **filtra y recalcula los datos** mostrados en tiempo real.
    * Se utiliza `useMemo` para evitar *renders* innecesarios cuando los filtros no cambian.

### Presentación Visual

* **Gráficos:** Los componentes `ChartBar`, `ChartLine` y `ChartPie` usan **Recharts**, actualizando las visualizaciones dinámicamente con animaciones fluidas.
* **Tabla:** La tabla (`Table.jsx`) muestra los datos tabulados y paginados con `usePagination.js`, incorporando etiquetas **ARIA** y **navegación por teclado** (`Tab`, `Enter`, `ArrowKeys`).

### Gestión de Estado y Servicios

* **Gestión de estado global mínimo:** Los estados se gestionan a nivel de *hooks* y componentes padres, garantizando claridad y bajo acoplamiento.
* **Internacionalización e Idioma:** `LangSwitcher.jsx` cambia el idioma usando `react-i18next`, actualizando automáticamente textos, *labels* y *tooltips* en tiempo real. La preferencia de idioma se guarda en `localStorage` y se recupera en cada carga.

### Temas y Accesibilidad (A11Y)

* **Temas y Accesibilidad Visual:** `useTheme.js` alterna entre modo **claro/oscuro** mediante `classList` en `document.documentElement`. La elección del usuario se guarda en `localStorage`. Los colores cumplen el **contraste AA** según WCAG 2.1.
* **Accesibilidad Dinámica:** `Layout.jsx` incluye una región `aria-live="assertive"` que anuncia cambios (como cambio de idioma o tema) a lectores de pantalla. Las tablas, encabezados y gráficos usan **roles semánticos** (`table`, `banner`, `region`, `contentinfo`) y etiquetas `aria-label` detalladas.

### Testing

Los tests dentro de `__tests__/` validan:

* La **renderización** de componentes clave (`LangSwitcher`, `Table`, `Filters`).
* Que los *hooks* (`usePagination`, `useTheme`) mantengan el **comportamiento esperado**.
* Que la **internacionalización** reaccione correctamente al cambio de idioma.

El entorno de pruebas está inicializado en `setupTests.js` con **Jest** y **React Testing Library**.

---

## Enfoque Adaptado

El enfoque del proyecto se basa en una arquitectura modular, centrada en la claridad, accesibilidad y rendimiento.
Se priorizó un diseño mobile-first, componentes reutilizables, y una experiencia accesible compatible con lectores de pantalla.
Se implementaron hooks personalizados, internacionalización y pruebas unitarias para asegurar un flujo estable y predecible.

## Suposiciones y Problemas Conocidos
- Suposiciones:
  - Se tiene una conexión a Internet estable y rápida.
  - Los datos se obtienen mediante peticiones HTTP directas.
  - Se usa una clave pública de CoinGecko
  - La API de CoinGecko proporciona datos actualizados.
  - EL dashboard esta optimizado.
  - Los filtros se restablecen al recargar la aplicacion.
- Problemas conocidos:
  - La API puede devolver error 429 (Too Many Requests) si se supera el límite de peticiones.
  - CoinGecko no garantiza datos de sparkline o ath_change_percentage en todas las monedas.
  - CoinGecko no proporciona datos de precio de mercado para todas las monedas.

## Capturas de pantalla

- Vista General
![Vista general](./src/assets/vista-general.png)
- Uso de Modo Claro
![Modo claro](./src/assets/modo-claro.png)
- Vista de Graficas de datos
![Gráficos](./src/assets/graficos.png)
- Tabla de datos
![Tabla de datos](./src/assets/tabla-de-datos.png)
- Filtro de busqueda
![Filtro de búsqueda](./src/assets/filtro-de-busqueda.png)
- Uso de filtros
![Uso de filtros](./src/assets/uso-de-filtros.png)
- Cambio de idioma
![Cambio de idioma](./src/assets/uso-de-cambio-de-idioma.png)

## 🚀 Despliegue en Producción

🔗 **Demo en Vivo:**  
👉 [Crypto Dashboard](https://crypto-dashboard-gray-three.vercel.app/)



## 🧑‍💻 Autor

**Julio Villalobos**  
Desarrollador Front-End / Fullstack  

📧 **Email:** [julioalbertoocampovillalobos2@gmail.com](mailto:julioalbertoocampovillalobos2@gmail.com)  
🔗 **GitHub:** [@JulioVillalobos03](https://github.com/JulioVillalobos03)  