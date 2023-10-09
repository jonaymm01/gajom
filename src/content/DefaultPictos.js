const body_parts = [
  {
    'name': 'Cabeza',
    'img': require('../../assets/pictos/estado/dolor/cabeza.png'),
    'content': [
      {
        'name': 'Boca',
        'img': require('../../assets/pictos/estado/dolor/cabeza/boca.png'),
        'content': []
      },
      {
        'name': 'Frente',
        'img': require('../../assets/pictos/estado/dolor/cabeza/frente.png'),
        'content': []
      },
      {
        'name': 'Nariz',
        'img': require('../../assets/pictos/estado/dolor/cabeza/nariz.png'),
        'content': []
      },
    ]
  },
  {
    'name': 'Cuello',
    'img': require('../../assets/pictos/estado/dolor/cuello.png'),
    'content': []
  },
  {
    'name': 'Pierna',
    'img': require('../../assets/pictos/estado/dolor/pierna.png'),
    'content': [
      {
        'name': 'Derecha',
        'img': require('../../assets/pictos/derecha.png'),
        'content': []
      },
      {
        'name': 'Izquierda',
        'img': require('../../assets/pictos/izquierda.png'),
        'content': []
      },
      {
        'name': 'Ambas',
        'img': require('../../assets/pictos/ambos.png'),
        'content': []
      },
      {
        'name': 'Rodilla',
        'img': require('../../assets/pictos/estado/dolor/pierna/rodilla.png'),
        'content': [
          {
            'name': 'Derecha',
            'img': require('../../assets/pictos/derecha.png'),
            'content': []
          },
          {
            'name': 'Izquierda',
            'img': require('../../assets/pictos/izquierda.png'),
            'content': []
          },
          {
            'name': 'Ambas',
            'img': require('../../assets/pictos/ambos.png'),
            'content': []
          },
        ]
      },
      {
        'name': 'Pie',
        'img': require('../../assets/pictos/estado/dolor/pierna/pie.png'),
        'content': [
          {
            'name': 'Derecho',
            'img': require('../../assets/pictos/derecha.png'),
            'content': []
          },
          {
            'name': 'Izquierdo',
            'img': require('../../assets/pictos/izquierda.png'),
            'content': []
          },
          {
            'name': 'Ambos',
            'img': require('../../assets/pictos/ambos.png'),
            'content': []
          },
        ]
      },
    ]
  },
  {
    'name': 'Brazo',
    'img': require('../../assets/pictos/estado/dolor/brazo.png'),
    'content': [
      {
        'name': 'Derecho',
        'img': require('../../assets/pictos/derecha.png'),
        'content': []
      },
      {
        'name': 'Izquierdo',
        'img': require('../../assets/pictos/izquierda.png'),
        'content': []
      },
      {
        'name': 'Ambos',
        'img': require('../../assets/pictos/ambos.png'),
        'content': []
      },
      {
        'name': 'Mano',
        'img': require('../../assets/pictos/estado/dolor/brazo/mano.png'),
        'content': [
          {
            'name': 'Izquierda',
            'img': require('../../assets/pictos/izquierda.png'),
            'content': []
          },
          {
            'name': 'Derecha',
            'img': require('../../assets/pictos/derecha.png'),
            'content': []
          },
          {
            'name': 'Ambas',
            'img': require('../../assets/pictos/ambos.png'),
            'content': []
          },
        ]
      },
      {
        'name': 'Codo',
        'img': require('../../assets/pictos/estado/dolor/brazo/codo.png'),
        'content': []
      },
      {
        'name': 'Hombro',
        'img': require('../../assets/pictos/estado/dolor/brazo/hombro.png'),
        'content': []
      },
    ]
  },
  {
    'name': 'Torso',
    'img': require('../../assets/pictos/estado/dolor/torso.png'),
    'content': [
      {
        'name': 'Barriga',
        'img': require('../../assets/pictos/estado/dolor/torso/barriga.png'),
        'content': []
      },
      {
        'name': 'Nalgas',
        'img': require('../../assets/pictos/estado/dolor/torso/nalgas.png'),
        'content': []
      },
      {
        'name': 'Pecho',
        'img': require('../../assets/pictos/estado/dolor/torso/pecho.png'),
        'content': []
      },
      {
        'name': 'Espalda',
        'img': require('../../assets/pictos/estado/dolor/torso/espalda.png'),
        'content': []
      },
    ]
  },
]


const sintomas = [
  {
    'name': 'Náuseas',
    'img': require('../../assets/pictos/sintomas/nauseas.png'),
    'content': []
  },
  {
    'name': 'Escalofríos',
    'img': require('../../assets/pictos/sintomas/escalofrios.png'),
    'content': []
  },
  {
    'name': 'Infección',
    'img': require('../../assets/pictos/sintomas/infeccion.png'),
    'content': body_parts
  },
  {
    'name': 'Diarrea',
    'img': require('../../assets/pictos/sintomas/diarrea.png'),
    'content': []
  },
  {
    'name': 'Reacción alérgica',
    'img': require('../../assets/pictos/sintomas/alergia.png'),
    'content': []
  },
  {
    'name': 'Tos',
    'img': require('../../assets/pictos/sintomas/tos.png'),
    'content': [
      {
        'name': 'Seca',
        'content': []
      },
      {
        'name': 'Productiva',
        'content': []
      },
    ]
  },
  {
    'name': 'Fiebre',
    'img': require('../../assets/pictos/sintomas/fiebre.png'),
    'content': []
  },
  {
    'name': 'Picor',
    'img': require('../../assets/pictos/sintomas/picor.png'),
    'content': body_parts,
  },
  {
    'name': 'Fatiga',
    'img': require('../../assets/pictos/sintomas/fatiga.png'),
    'content': []
  },
  {
    'name': 'Deshidratación',
    'img': require('../../assets/pictos/sintomas/deshidratacion.png'),
    'content': []
  },
  {
    'name': 'Respiratorios',
    'img': require('../../assets/pictos/estado/respirar.png'),
    'content': []
  },
  {
    'name': 'Estreñimiento',
    'img': require('../../assets/pictos/sintomas/estreñimiento.png'),
    'content': []
  },
  {
    'name': 'Mareo',
    'img': require('../../assets/pictos/sintomas/mareo.png'),
    'content': []
  },
  {
    'name': 'Desmayo',
    'img': require('../../assets/pictos/sintomas/desmayo.png'),
    'content': []
  },
]

const alergias_nutri = [
      {
        'name': 'Huevo',
        'img': require('../../assets/pictos/estado/nutricion/alergias/huevo.png'),
        'content': []
      },
      {
        'name': 'Pescado',
        'img': require('../../assets/pictos/estado/nutricion/alergias/pescado.png'),
        'content': []
      },
      {
        'name': 'Leche',
        'img': require('../../assets/pictos/estado/nutricion/alergias/leche.png'),
        'content': [
          {
            'name': 'Lactosa',
            'content': []
          },
          {
            'name': 'Proteína',
            'content': []
          },
        ]
      },
      {
        'name': 'Gluten',
        'img': require('../../assets/pictos/estado/nutricion/gluten.png'),
        'content': []
      },
      {
        'name': 'Frutos secos',
        'img': require('../../assets/pictos/estado/nutricion/alergias/frutos_secos.png'),
        'content': [
          {
            'name': 'Maníes',
            'img': require('../../assets/pictos/estado/nutricion/alergias/frutos_secos/manies.png'),
            'content': []
          },
          {
            'name': 'Nueces',
            'img': require('../../assets/pictos/estado/nutricion/alergias/frutos_secos/nuez.png'),
            'content': []
          },
          {
            'name': '[Otros]',
            'content': []
          },
        ]
      },
      {
        'name': 'Marisco',
        'img': require('../../assets/pictos/estado/nutricion/alergias/marisco.png'),
        'content': []
      },
      {
        'name': 'Soja',
        'img': require('../../assets/pictos/estado/nutricion/alergias/soja.png'),
        'content': []
      },
      {
        'name': 'Soy alérgico a eso',
        'content': []
      },
    ]

export const DefaultPictos = {
  data: {
    categories:
      [
        {
          'name': 'Estado',
          'img': require('../../assets/pictos/estado.png'),
          'content': [
            {
              'name': 'Dolor',
              'img': require('../../assets/pictos/estado/dolor.png'),
              'content': body_parts,
            },
            {
              'name': 'Ánimo',
              'img': require('../../assets/pictos/estado/animo.png'),
              'content': [
                {
                  'name': 'Contento',
                  'img': require('../../assets/pictos/moods/contento.png'),
                  'content': []
                },
                {
                  'name': 'Triste',
                  'img': require('../../assets/pictos/moods/triste.png'),
                  'content': []
                },
                {
                  'name': 'Asustado',
                  'img': require('../../assets/pictos/moods/asustado.png'),
                  'content': []
                },
                {
                  'name': 'Confundido',
                  'img': require('../../assets/pictos/moods/confundido.png'),
                  'content': []
                },
                {
                  'name': 'Nervioso',
                  'img': require('../../assets/pictos/moods/nervioso.png'),
                  'content': []
                },
                {
                  'name': 'Enfadado',
                  'img': require('../../assets/pictos/moods/enfadado.png'),
                  'content': []
                },
              ]
            },
            {
              'name': 'Descanso',
              'img': require('../../assets/pictos/estado/descanso.png'),
              'content': [
                {
                  'name': 'Posicion',
                  'img': require('../../assets/pictos/estado/descanso/posicion.png'),
                  'content': [
                    {
                      'name': 'Subir piernas',
                      'img': require('../../assets/pictos/estado/descanso/posicion/subir_piernas.png'),
                      'content': []
                    },
                    {
                      'name': 'Bajar piernas',
                      'img': require('../../assets/pictos/estado/descanso/posicion/bajar_piernas.png'),
                      'content': []
                    },
                    {
                      'name': 'Subir cabeza',
                      'img': require('../../assets/pictos/estado/descanso/posicion/subir_cabeza.png'),
                      'content': []
                    },
                    {
                      'name': 'Bajar cabeza',
                      'img': require('../../assets/pictos/estado/descanso/posicion/bajar_cabeza.png'),
                      'content': []
                    },
                    {
                      'name': 'De lado',
                      'img': require('../../assets/pictos/estado/descanso/posicion/de_lado.png'),
                      'content': []
                    },
                  ]
                },
                {
                  'name': 'Dormir',
                  'img': require('../../assets/pictos/estado/descanso.png'),
                  'content': [
                    {
                      'name': 'Quiero dormir',
                      'img': require('../../assets/pictos/estado/descanso/dormir/quiero_dormir.png'),
                      'content': []
                    },
                    {
                      'name': 'No quiero dormir',
                      'img': require('../../assets/pictos/estado/descanso/dormir/no_quiero_dormir.png'),
                      'content': []
                    },
                    {
                      'name': 'No puedo dormir',
                      'img': require('../../assets/pictos/estado/descanso/dormir/no_puedo_dormir.png'),
                      'content': [
                        {
                          'name': 'Dolor',
                          'img': require('../../assets/pictos/estado/dolor.png'),
                          'content': body_parts.concat(
                            {
                              'name': 'Herida',
                              'img': require('../../assets/pictos/estado/dolor/herida.png'),
                              'content': []
                            },
                          ),
                        },
                        {
                          'name': 'Ruido',
                          'img': require('../../assets/pictos/estado/descanso/dormir/no_puedo_dormir/ruido.png'),
                          'content': []
                        },
                        {
                          'name': 'Nervioso',
                          'img': require('../../assets/pictos/moods/nervioso.png'),
                          'content': []
                        },
                        {
                          'name': 'Miedo',
                          'img': require('../../assets/pictos/moods/asustado.png'),
                          'content': []
                        },
                      ]
                    },
                  ]
                },
              ]
            },
            {
              'name': 'Aseo',
              'img': require('../../assets/pictos/estado/aseo.png'),
              'content': [
                {
                  'name': 'Hacer la cama',
                  'img': require('../../assets/pictos/estado/aseo/hacer_cama.png'),
                  'content': []
                },
                {
                  'name': 'Bañar',
                  'img': require('../../assets/pictos/estado/aseo/bañar.png'),
                  'content': []
                },
                {
                  'name': 'Vestir',
                  'img': require('../../assets/pictos/estado/aseo/vestir.png'),
                  'content': []
                },
                {
                  'name': 'Lavar los dientes',
                  'img': require('../../assets/pictos/estado/aseo/lavar_dientes.png'),
                  'content': []
                },
                {
                  'name': 'Afeitar',
                  'img': require('../../assets/pictos/estado/aseo/afeitar.png'),
                  'content': []
                },
                {
                  'name': 'Pelo',
                  'img': require('../../assets/pictos/estado/aseo/pelo.png'),
                  'content': [
                    {
                      'name': 'Lavar el pelo',
                      'img': require('../../assets/pictos/estado/aseo/pelo/lavar_pelo.png'),
                      'content': []
                    },
                    {
                      'name': 'Cortar el pelo',
                      'img': require('../../assets/pictos/estado/aseo/pelo/cortar_pelo.png'),
                      'content': []
                    },
                  ]
                },
                {
                  'name': 'Cortar las uñas',
                  'img': require('../../assets/pictos/estado/aseo/cortar_uñas.png'),
                  'content': []
                },
                {
                  'name': 'Maquillaje',
                  'img': require('../../assets/pictos/estado/aseo/maquillaje.png'),
                  'content': []
                },
                {
                  'name': 'Prótesis y accesorios',
                  'img': require('../../assets/pictos/estado/aseo/gafas.png'),
                  'content': [
                    {
                      'name': 'Gafas',
                      'img': require('../../assets/pictos/estado/aseo/gafas.png'),
                      'content': []
                    },
                    {
                      'name': 'Dentadura',
                      'img': require('../../assets/pictos/estado/aseo/protesis_accesorios/dentadura.png'),
                      'content': []
                    },
                    {
                      'name': 'Audífono',
                      'img': require('../../assets/pictos/estado/aseo/protesis_accesorios/audifono.png'),
                      'content': []
                    },
                  ]
                },
              ]
            },
            {
              'name': 'Temperatura',
              'img': require('../../assets/pictos/estado/temperatura.png'),
              'content': [
                {
                  'name': 'Tengo calor',
                  'img': require('../../assets/pictos/sintomas/deshidratacion.png'),
                  'content': []
                },
                {
                  'name': 'Tengo frío',
                  'img': require('../../assets/pictos/estado/temperatura/frio.png'),
                  'content': []
                },
              ]
            },
            {
              'name': 'Comer y beber',
              'img': require('../../assets/pictos/estado/nutricion.png'),
              'content': [
                {
                  'name': 'Comer',
                  'img': require('../../assets/pictos/estado/nutricion.png'),
                  'content': [
                    {
                      'name': 'No me gusta',
                      'content': []
                    },
                    {
                      'name': 'No quiero más',
                      'content': []
                    },
                    {
                      'name': 'Descansar',
                      'content': []
                    },
                    {
                      'name': 'Seguir',
                      'content': []
                    },
                    {
                      'name': 'Está rico',
                      'content': []
                    },
                    {
                      'name': 'Quiero más',
                      'content': []
                    },
                  ]
                },
                {
                  'name': 'Beber',
                  'img': require('../../assets/pictos/estado/nutricion/beber.png'),
                  'content': []
                },
              ]
            },
            {
              'name': 'Respiración',
              'img': require('../../assets/pictos/estado/respirar.png'),
              'content': [
                {
                  'name': 'No puedo',
                  'img': require('../../assets/pictos/no.png'),
                  'content': []
                },
                {
                  'name': 'Pañuelos',
                  'content': []
                },
                {
                  'name': 'Inhalador',
                  'img': require('../../assets/pictos/estado/respirar/inhalador.png'),
                  'content': []
                },
                {
                  'name': 'Aerosol',
                  'img': require('../../assets/pictos/estado/respirar/aerosol.png'),
                  'content': []
                },
              ]
            },
            {
              'name': 'Heces y orina',
              'img': require('../../assets/pictos/estado/heces_orina.png'),
              'content': [
                {
                  'name': 'Hacer caca',
                  'img': require('../../assets/pictos/estado/heces_orina/heces.png'),
                  'content': []
                },
                {
                  'name': 'Hacer pis',
                  'img': require('../../assets/pictos/estado/heces_orina/orina.png'),
                  'content': []
                },
                {
                  'name': 'Pañal',
                  'img': require('../../assets/pictos/estado/heces_orina/pañal.png'),
                  'content': []
                },
              ]
            },
            {
              'name': 'Moverme',
              'img': require('../../assets/pictos/estado/moverme.png'),
              'content': [
                {
                  'name': 'Levantarme',
                  'img': require('../../assets/pictos/estado/moverme/levantarme.png'),
                  'content': []
                },
                {
                  'name': 'Sentarme',
                  'img': require('../../assets/pictos/estado/moverme/sentarme.png'),
                  'content': []
                },
                {
                  'name': 'Acostarme',
                  'img': require('../../assets/pictos/estado/moverme/acostarme.png'),
                  'content': []
                },
                {
                  'name': 'Caminar',
                  'img': require('../../assets/pictos/estado/moverme/caminar.png'),
                  'content': []
                },
                {
                  'name': 'Silla de ruedas',
                  'img': require('../../assets/pictos/estado/moverme/silla_ruedas.png'),
                  'content': [
                    {
                      'name': 'Avanzar',
                      'img': require('../../assets/pictos/arriba.png'),
                      'content': []
                    },
                    {
                      'name': 'Atrás',
                      'img': require('../../assets/pictos/abajo.png'),
                      'content': []
                    },
                    {
                      'name': 'Derecha',
                      'img': require('../../assets/pictos/derecha.png'),
                      'content': []
                    },
                    {
                      'name': 'Izquierda',
                      'img': require('../../assets/pictos/izquierda.png'),
                      'content': []
                    },
                    {
                      'name': 'Parar',
                      'img': require('../../assets/pictos/parar.png'),
                      'content': []
                    },
                  ]
                },
                {
                  'name': 'Puedo mover',
                  'img': require('../../assets/pictos/si.png'),
                  'content': body_parts
                },
                {
                  'name': 'No puedo mover',
                  'img': require('../../assets/pictos/no.png'),
                  'content': body_parts
                },        
              ]
            },
            {
              'name': 'Ocio',
              'img': require('../../assets/pictos/estado/ocio.png'),
              'content': [
                {
                  'name': 'Ver TV',
                  'img': require('../../assets/pictos/estado/ocio/tv.png'),
                  'content': [
                    {
                      'name': 'Serie',
                      'content': []
                    },
                    {
                      'name': 'Película',
                      'content': []
                    },
                    {
                      'name': 'Noticias',
                      'content': []
                    },
                    {
                      'name': 'Deportes',
                      'img': require('../../assets/pictos/estado/ocio/tv/deportes.png'),
                      'content': [
                        {
                          'name': 'Fútbol',
                          'img': require('../../assets/pictos/estado/ocio/tv/deportes/futbol.png'),
                          'content': []
                        },
                        {
                          'name': 'Baloncesto',
                          'img': require('../../assets/pictos/estado/ocio/tv/deportes/baloncesto.png'),
                          'content': []
                        },
                        {
                          'name': 'Tenis',
                          'img': require('../../assets/pictos/estado/ocio/tv/deportes/tenis.png'),
                          'content': []
                        },
                      ]
                    },
                    {
                      'name': 'Zapping',
                      'img': require('../../assets/pictos/estado/ocio/tv/zapping.png'),
                      'content': []
                    },
                  ]
                },
                {
                  'name': 'Leer',
                  'img': require('../../assets/pictos/estado/ocio/leer.png'),
                  'content': [
                    {
                      'name': 'Libro',
                      'img': require('../../assets/pictos/estado/ocio/leer.png'),
                      'content': []
                    },
                    {
                      'name': 'Periódico',
                      'img': require('../../assets/pictos/estado/ocio/leer/periodico.png'),
                      'content': []
                    },
                    {
                      'name': 'Revista',
                      'img': require('../../assets/pictos/estado/ocio/leer/revista.png'),
                      'content': []
                    },
                  ]
                },
                {
                  'name': 'Escribir',
                  'img': require('../../assets/pictos/estado/ocio/escribir.png'),
                  'content': []
                },
                {
                  'name': 'Jugar',
                  'img': require('../../assets/pictos/estado/ocio/jugar.png'),
                  'content': []
                },
                {
                  'name': 'Escuchar',
                  'img': require('../../assets/pictos/estado/ocio/escuchar.png'),
                  'content': [
                    {
                      'name': 'Radio',
                      'img': require('../../assets/pictos/estado/ocio/escuchar/radio.png'),
                      'content': []
                    },
                    {
                      'name': 'Música',
                      'img': require('../../assets/pictos/estado/ocio/escuchar/musica.png'),
                      'content': []
                    },
                  ]
                },
              ]
            },
          ]
        },
        {
          'name': 'Salud',
          'img': require('../../assets/pictos/salud.png'),
          'content': [
            {
              'name': 'Alergias',
              'img': require('../../assets/pictos/sintomas/alergia.png'),
              'content': [
                {
                  'name': '[Otra]',
                  'content': [],
                },
                {
                  'name': 'Alimentarias',
                  'img': require('../../assets/pictos/estado/nutricion.png'),
                  'content': alergias_nutri,
                },
                {
                  'name': 'Respiratoria',
                  'img': require('../../assets/pictos/estado/respirar.png'),
                  'content': [
                    {
                      'name': 'Polen',
                      'content': [],
                    },
                    {
                      'name': 'Polvo',
                      'content': [],
                    },
                    {
                      'name': 'Animales',
                      'content': [
                        {
                          'name': 'Gato',
                          'content': [],
                        },
                        {
                          'name': 'Perro',
                          'content': [],
                        },
                        {
                          'name': '[Otros]',
                          'content': [],
                        },
                      ],
                    },
                  ],
                },
                {
                  'name': 'Acaros',
                  'content': [],
                },
                {
                  'name': 'Humedad',
                  'content': [],
                },
                {
                  'name': 'Cosméticos',
                  'content': [],
                },
                {
                  'name': 'Medicamento',
                  'img': require('../../assets/pictos/salud/medicamentos.png'),
                  'content': [],
                },
              ]
            },
            {
              'name': 'Enfermedad',
              'img': require('../../assets/pictos/sintomas/infeccion.png'),
              'content': [
                {
                  'name': 'Intoxicación',
                  'content': []
                },
                {
                  'name': 'Tensión',
                  'content': [
                    {
                      'name': 'Alta',
                      'content': [],
                    },
                    {
                      'name': 'Baja',
                      'content': [],
                    },
                  ],
                },
                {
                  'name': 'Colesterol alto',
                  'content': [],
                },
                {
                  'name': 'Artritis',
                  'content': [],
                },
                {
                  'name': 'Cardiopatía',
                  'content': [],
                },
                {
                  'name': 'Diabetes',
                  'content': [],
                },
                {
                  'name': '[Otra]',
                  'content': [],
                },
                {
                  'name': 'Anemia',
                  'content': [],
                },
                {
                  'name': 'EPOC',
                  'content': [],
                },
                {
                  'name': 'Cáncer',
                  'content': [
                    {
                      'name': '[Otro]',
                      'content': [],
                    },
                    {
                      'name': 'Próstata',
                      'content': [],
                    },
                    {
                      'name': 'Pulmonar',
                      'content': [],
                    },
                    {
                      'name': 'Hígado',
                      'content': [],
                    },
                    {
                      'name': 'Piel',
                      'content': [],
                    },
                    {
                      'name': 'Mama',
                      'content': [],
                    },
                    {
                      'name': 'EPOC',
                      'content': [],
                    },
                  ],
                },
                {
                  'name': 'ETS',
                  'content': [
                    {
                      'name': 'VIH',
                      'content': [],
                    },
                    {
                      'name': 'Hepatitis',
                      'content': [
                        {
                          'name': 'B',
                          'content': [],
                        },
                        {
                          'name': 'C',
                          'content': [],
                        },
                      ],
                    },
                    {
                      'name': 'Sífilis',
                      'content': [],
                    },
                    {
                      'name': 'Gonorrea',
                      'content': [],
                    },
                    {
                      'name': 'Clamidia',
                      'content': [],
                    },
                    {
                      'name': 'HPV',
                      'content': [],
                    },
                  ],
                },
              ]
            },
            {
              'name': 'Síntomas',
              'img': require('../../assets/pictos/estado/sintomas.png'),
              'content': sintomas
            }
          ]
        },
        {
          'name': 'Háblame de...',
          'img': require('../../assets/pictos/hablame_de.png'),
          'content': [
            {
              'name': 'Familiares',
              'content': [
                {
                  'name': 'Hijos',
                  'content': []
                },
                {
                  'name': 'Padres',
                  'content': []
                },
                {
                  'name': 'Hermanos',
                  'content': []
                },
                {
                  'name': 'Pareja',
                  'content': []
                },
                {
                  'name': 'Otro',
                  'content': []
                },
                {
                  'name': 'Todos',
                  'content': []
                },
              ]
            },
            {
              'name': 'Amigos',
              'content': []
            },
            {
              'name': 'Novedades',
              'content': [
                {
                  'name': 'Noticias',
                  'content': []
                },
                {
                  'name': 'Deporte',
                  'content': []
                },
                {
                  'name': 'Política',
                  'content': []
                },
                {
                  'name': 'Economía',
                  'content': []
                },
                {
                  'name': 'Trabajo',
                  'content': []
                },
              ]
            },
          ]
        },
        {
          'name': 'Favores',
          'img': require('../../assets/pictos/favores.png'),
          'content': [
            {
              'name': 'No te duermas',
              'content': []
            },
            {
              'name': 'Vete',
              'content': []
            },
            {
              'name': 'Silencio',
              'content': []
            },
          ]
        },
        {
          'name': 'Identidad',
          'img': require('../../assets/pictos/identidad.png'),
          'content': [
            {
              'name': 'Nutrición',
              'img': require('../../assets/pictos/estado/nutricion.png'),
              'content': [
                {
                  'name': 'Alergias',
                  'img': require('../../assets/pictos/estado/nutricion/gluten.png'),
                  'content': alergias_nutri
                },
                {
                  'name': 'Valores',
                  'img': require('../../assets/pictos/estado/nutricion/valores.png'),
                  'content': [
                    {
                      'name': 'Vegano',
                      'content': []
                    },
                    {
                      'name': 'Vegetariano',
                      'content': []
                    },
                    {
                      'name': 'Religión',
                      'img': require('../../assets/pictos/estado/nutricion/valores/religion.png'),
                      'content': [
                        {
                          'name': 'Judaísmo',
                          'img': require('../../assets/pictos/religiones/judaismo.png'),
                          'content': []
                        },
                        {
                          'name': 'Cristianismo',
                          'img': require('../../assets/pictos/religiones/cristianismo.png'),
                          'content': []
                        },
                        {
                          'name': 'Islam',
                          'img': require('../../assets/pictos/religiones/islam.png'),
                          'content': []
                        },
                      ]
                    },
                  ]
                },
                
              ]
            },
            {
              'name': 'Procedencia',
              'img': require('../../assets/pictos/identidad/procedencia.png'),
              'content': [
                {
                  'name': 'Extranjero',
                  'content': []
                },
                {
                  'name': 'Residente',
                  'content': []
                },
              ]
            },
            {
              'name': 'Religión',
              'img': require('../../assets/pictos/estado/nutricion/valores/religion.png'),
              'content': [
                {
                  'name': 'Cristianismo',
                  'img': require('../../assets/pictos/religiones/cristianismo.png'),
                  'content': []
                },
                {
                  'name': 'Judaísmo',
                  'img': require('../../assets/pictos/religiones/judaismo.png'),
                  'content': []
                },
                {
                  'name': 'Islam',
                  'img': require('../../assets/pictos/religiones/islam.png'),
                  'content': []
                },
                {
                  'name': 'Hinduismo',
                  'img': require('../../assets/pictos/religiones/hinduismo.png'),
                  'content': []
                },
                {
                  'name': 'Budismo',
                  'img': require('../../assets/pictos/religiones/budismo.png'),
                  'content': []
                },
                {
                  'name': '[Otra]',
                  'content': []
                },
              ]
            },
            {
              'name': 'Grupo sanguíneo',
              'img': require('../../assets/pictos/identidad/grupo_sangre.png'),
              'content': [
                {
                  'name': 'A +',
                  'content': []
                },
                {
                  'name': 'A -',
                  'content': []
                },
                {
                  'name': 'B +',
                  'content': []
                },
                {
                  'name': 'B -',
                  'content': []
                },
                {
                  'name': 'AB +',
                  'content': []
                },
                {
                  'name': 'AB -',
                  'content': []
                },
                {
                  'name': '0 +',
                  'content': []
                },
                {
                  'name': '0 -',
                  'content': []
                },
              ]
            },
            {
              'name': 'Género',
              'img': require('../../assets/pictos/identidad/genero.png'),
              'content': [
                {
                  'name': 'Hombre',
                  'img': require('../../assets/pictos/identidad/genero/hombre.png'),
                  'content': []
                },
                {
                  'name': 'Mujer',
                  'img': require('../../assets/pictos/identidad/genero/mujer.png'),
                  'content': []
                },
                {
                  'name': 'Trans',
                  'img': require('../../assets/pictos/identidad/genero/trans.png'),
                  'content': []
                },
                {
                  'name': '[Otro]',
                  'content': []
                },
              ]
            },
          ]
        },
      ]
    }
  }
