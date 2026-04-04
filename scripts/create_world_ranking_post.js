import { createClient } from '@sanity/client';
import fs from 'fs';

const SANITY_TOKEN = process.env.SANITY_TOKEN;

if (!SANITY_TOKEN) {
  console.error('❌ ERROR: Set SANITY_TOKEN env var');
  process.exit(1);
}

const client = createClient({
  projectId: 't01yxrzf',
  dataset: 'production',
  useCdn: false,
  token: SANITY_TOKEN,
  apiVersion: '2024-02-28',
});

const authorId = '209ed4e4-537b-4e8a-927c-f5f602933218';
const slug = 'nuevo-sistema-world-ranking-aguas-abiertas';
const title = 'Nuevo World Ranking de aguas abiertas: qué es, cómo se calcula y por qué será importante';
const excerpt =
  'World Aquatics ha estrenado un nuevo sistema de ranking mundial para las aguas abiertas. Te explico de forma clara qué pruebas cuentan, cómo se suman los puntos y por qué este ranking puede influir en selecciones y clasificaciones futuras.';

const makeBlock = (style, text, marks = []) => ({
  _type: 'block',
  style,
  markDefs: [],
  children: [
    {
      _type: 'span',
      _key: `${Math.random().toString(36).slice(2, 10)}`,
      text,
      marks,
    },
  ],
});

const makeParagraph = (children, markDefs = []) => ({
  _type: 'block',
  style: 'normal',
  markDefs,
  children: children.map((child) => ({
    _type: 'span',
    _key: `${Math.random().toString(36).slice(2, 10)}`,
    ...child,
  })),
});

const makeBullet = (text) => ({
  _type: 'block',
  style: 'normal',
  listItem: 'bullet',
  level: 1,
  markDefs: [],
  children: [
    {
      _type: 'span',
      _key: `${Math.random().toString(36).slice(2, 10)}`,
      text,
      marks: [],
    },
  ],
});

const body = [
  makeParagraph([
    {
      text: 'World Aquatics ha estrenado un nuevo sistema oficial para ordenar el rendimiento internacional en aguas abiertas. El objetivo no es solo publicar una lista: este ',
      marks: [],
    },
    {
      text: 'World Ranking',
      marks: ['strong'],
    },
    {
      text: ' quiere medir el nivel competitivo y la regularidad de cada nadador durante los últimos 24 meses.',
      marks: [],
    },
  ]),
  makeParagraph([
    {
      text: 'En este artículo te lo explico de forma sencilla: qué competiciones cuentan, cómo se calculan los puntos y por qué este ranking puede acabar teniendo mucho peso en el futuro de nuestro deporte.',
      marks: [],
    },
  ]),
  makeBlock('h2', '¿Qué persigue este nuevo ranking?'),
  makeParagraph([
    {
      text: 'Según el reglamento oficial, el ranking nace para crear un sistema más justo, objetivo y basado en méritos. World Aquatics quiere que sirva para conectar el calendario internacional con un criterio común, facilitar la lectura del rendimiento global y dar más visibilidad a los deportistas.',
      marks: [],
    },
  ]),
  makeParagraph([
    {
      text: 'Además, el documento deja abierta una idea importante: en el futuro podría utilizarse como herramienta de ',
      marks: [],
    },
    {
      text: 'clasificación o de siembra',
      marks: ['strong'],
    },
    {
      text: ' en grandes competiciones.',
      marks: [],
    },
  ]),
  makeBlock('h2', '¿Quién puede entrar en el ranking?'),
  makeParagraph([
    {
      text: 'No aparece cualquiera que nade una prueba internacional. Para formar parte del ranking hay que haber competido, al menos una vez en los últimos 24 meses, en una prueba ',
      marks: [],
    },
    {
      text: 'Tier 1 o Tier 2',
      marks: ['strong'],
    },
    {
      text: '. En cuanto un deportista logra un resultado válido en una de esas competiciones, entra en el ranking.',
      marks: [],
    },
  ]),
  makeBlock('h2', 'La idea clave: cuenta la regularidad, no una sola carrera'),
  makeParagraph([
    {
      text: 'El sistema trabaja con una ventana móvil de ',
      marks: [],
    },
    {
      text: '24 meses',
      marks: ['strong'],
    },
    {
      text: ' y toma las ',
      marks: [],
    },
    {
      text: '8 mejores actuaciones',
      marks: ['strong'],
    },
    {
      text: ' de cada nadador dentro de ese periodo. Eso significa que una carrera brillante ayuda, pero lo que realmente premia el sistema es rendir bien varias veces a lo largo del tiempo.',
      marks: [],
    },
  ]),
  makeBlock('h2', 'Los 4 factores que deciden la puntuación'),
  makeParagraph([
    {
      text: 'La puntuación final de cada prueba no depende solo del puesto. World Aquatics combina cuatro ideas:',
      marks: [],
    },
  ]),
  makeBullet('el nivel de la competición'),
  makeBullet('la distancia disputada'),
  makeBullet('la calidad del nivel de participación'),
  makeBullet('la antigüedad del resultado'),
  {
    _type: 'htmlBlock',
    html: `
      <table>
        <thead>
          <tr>
            <th>Tier</th>
            <th>Tipo de competición</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Tier 1</td>
            <td>Juegos Olímpicos y Campeonatos del Mundo</td>
            <td>100.00</td>
          </tr>
          <tr>
            <td>Tier 2</td>
            <td>Copas del Mundo de aguas abiertas</td>
            <td>72.25</td>
          </tr>
          <tr>
            <td>Tier 3</td>
            <td>Competiciones continentales y regionales</td>
            <td>49.00</td>
          </tr>
          <tr>
            <td>Tier 4</td>
            <td>Competiciones internacionales organizadas por federaciones</td>
            <td>30.25</td>
          </tr>
          <tr>
            <td>Tier 5</td>
            <td>Otras competiciones internacionales definidas por World Aquatics</td>
            <td>16.00</td>
          </tr>
        </tbody>
      </table>
    `,
  },
  makeParagraph([
    {
      text: 'Aquí ya aparece una primera lectura clara: no vale lo mismo hacerlo bien en unos Juegos o en un Mundial que en una prueba de menor rango. Además, los Juegos Olímpicos reciben un bonus adicional de 75 puntos.',
      marks: [],
    },
  ]),
  {
    _type: 'htmlBlock',
    html: `
      <table>
        <thead>
          <tr>
            <th>Distancia</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10 km</td>
            <td>100</td>
          </tr>
          <tr>
            <td>5 km</td>
            <td>85</td>
          </tr>
          <tr>
            <td>3 km</td>
            <td>70</td>
          </tr>
        </tbody>
      </table>
    `,
  },
  makeParagraph([
    {
      text: 'El ',
      marks: [],
    },
    {
      text: '10 km',
      marks: ['strong'],
    },
    {
      text: ' sigue siendo la distancia de referencia. Los relevos no se incluyen en el ranking.',
      marks: [],
    },
  ]),
  {
    _type: 'htmlBlock',
    html: `
      <table>
        <thead>
          <tr>
            <th>Tier / distancia</th>
            <th>10 km</th>
            <th>5 km</th>
            <th>3 km</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>Tier 1</td><td>100.00</td><td>85.00</td><td>—</td></tr>
          <tr><td>Tier 2</td><td>72.25</td><td>61.41</td><td>50.58</td></tr>
          <tr><td>Tier 3</td><td>49.00</td><td>41.65</td><td>34.30</td></tr>
          <tr><td>Tier 4</td><td>30.25</td><td>25.71</td><td>21.18</td></tr>
          <tr><td>Tier 5</td><td>16.00</td><td>13.60</td><td>11.20</td></tr>
        </tbody>
      </table>
    `,
  },
  makeBlock('h2', 'La calidad de los rivales también modifica el valor de la carrera'),
  makeParagraph([
    {
      text: 'Este es uno de los puntos más interesantes del sistema. World Aquatics aplica un ',
      marks: [],
    },
    {
      text: 'Quality of Field Factor',
      marks: ['strong'],
    },
    {
      text: ', que ajusta el valor de cada prueba según el nivel real de los deportistas inscritos.',
      marks: [],
    },
  ]),
  makeParagraph([
    {
      text: 'Traducido a lenguaje práctico: si en una carrera compiten muchos nadadores bien posicionados, ese resultado vale más. Por tanto, no solo importa dónde nadas, sino también contra quién nadas.',
      marks: [],
    },
  ]),
  makeBlock('h2', 'Las pruebas recientes puntúan más'),
  makeParagraph([
    {
      text: 'El ranking también penaliza el paso del tiempo. Los resultados más antiguos pierden valor progresivamente, con una deducción de hasta el 50%. Así se evita vivir de una gran actuación aislada de hace casi dos años y se premia el estado competitivo actual.',
      marks: [],
    },
  ]),
  makeBlock('h2', '¿Cómo se asignan los puntos en cada prueba?'),
  makeParagraph([
    {
      text: 'Una vez ajustado el valor de la competición, cada nadador recibe puntos en función de su puesto final. En términos simples, cuanto mejor sea la posición y mejor sea el nivel de la carrera, más puntos se suman.',
      marks: [],
    },
  ]),
  makeParagraph([
    {
      text: 'También influye el número de participantes con resultado válido. Por eso no es lo mismo quedar arriba en una prueba muy pequeña que hacerlo en una carrera grande y con densidad competitiva.',
      marks: [],
    },
  ]),
  makeBlock('h2', 'Qué resultados no cuentan'),
  makeParagraph([
    {
      text: 'Para que una competición entre en el ranking, hay que terminarla. No computan los resultados de un nadador si aparece como DSQ, DQB, DNF, DNS u OTL.',
      marks: [],
    },
  ]),
  makeBlock('h2', 'Qué nos dice este ranking desde una perspectiva práctica'),
  makeParagraph([
    {
      text: 'Desde el punto de vista del entrenador y del deportista, el mensaje es claro: este nuevo sistema premia la ',
      marks: [],
    },
    {
      text: 'consistencia competitiva',
      marks: ['strong'],
    },
    {
      text: '. No basta con una carrera brillante. Hay que competir bien, hacerlo con cierta regularidad, moverse en pruebas relevantes y sostener el rendimiento con el paso del tiempo.',
      marks: [],
    },
  ]),
  makeBullet('el 10 km seguirá siendo la distancia clave'),
  makeBullet('competir en Tier 1 y Tier 2 será decisivo para tener peso real'),
  makeBullet('el nivel de los rivales importa mucho más de lo que parece'),
  makeBullet('la continuidad en el rendimiento será una ventaja enorme'),
  makeBullet('el ranking puede acabar siendo importante en selecciones y clasificaciones futuras'),
  makeBlock('h2', 'Conclusión'),
  makeParagraph([
    {
      text: 'El nuevo World Ranking de aguas abiertas es un intento serio de ordenar el rendimiento internacional con una lógica bastante sólida. Mezcla nivel de competición, distancia, calidad del campo, posición final y actualidad del resultado. No es perfecto, pero sí parece una base bastante más útil para entender quién está rindiendo mejor de forma sostenida en el panorama mundial.',
      marks: [],
    },
  ]),
  makeBlock('h2', 'Fuente'),
  makeParagraph(
    [
      {
        text: 'Este artículo se ha elaborado a partir del documento oficial ',
        marks: [],
      },
      {
        text: 'Open Water Swimming World Ranking, in force as from 6 February 2025',
        marks: ['source-link'],
      },
      {
        text: ' de World Aquatics.',
        marks: [],
      },
    ],
    [
      {
        _key: 'source-link',
        _type: 'link',
        href: 'https://www.worldaquatics.com/',
      },
    ],
  ),
];

const existing = await client.fetch(
  `*[_type == "post" && slug.current == $slug][0]{_id}`,
  { slug }
);

if (existing?._id) {
  console.error(`❌ Ya existe un post con ese slug: ${existing._id}`);
  process.exit(1);
}

const imagePath = './drafts/assets/ows-world-ranking-cover.png';
let mainImage;

if (fs.existsSync(imagePath)) {
  const imageAsset = await client.assets.upload('image', fs.createReadStream(imagePath), {
    filename: 'ows-world-ranking-cover.png',
  });

  mainImage = {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: imageAsset._id,
    },
  };
}

const doc = {
  _type: 'post',
  title,
  slug: {
    _type: 'slug',
    current: slug,
  },
  author: {
    _type: 'reference',
    _ref: authorId,
  },
  publishedAt: new Date().toISOString(),
  excerpt,
  body,
  ...(mainImage ? { mainImage } : {}),
};

const result = await client.create(doc);

console.log(
  JSON.stringify(
    {
      ok: true,
      id: result._id,
      slug,
      title,
    },
    null,
    2
  )
);
