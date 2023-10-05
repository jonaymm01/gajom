const sintomas = [
  {
    'name': 'Náuseas',
    'img': require('../../assets/pictos/identidad.png'),
    'content': []
  },
  {
    'name': 'Infección',
    'img': require('../../assets/pictos/identidad.png'),
    'content': [
      {
        'name': 'Herida',
        'img': require('../../assets/pictos/identidad.png'),
        'content': []
      },
      {
        'name': 'Urinaria',
        'img': require('../../assets/pictos/identidad.png'),
        'content': []
      },
      {
        'name': 'Oído',
        'img': require('../../assets/pictos/identidad.png'),
        'content': []
      },
      {
        'name': 'Conjuntivitis',
        'img': require('../../assets/pictos/identidad.png'),
        'content': []
      },
    ]
  },
  {
    'name': 'Diarrea',
    'img': require('../../assets/pictos/identidad.png'),
    'content': []
  },
  {
    'name': 'Reacción alérgica',
    'img': require('../../assets/pictos/identidad.png'),
    'content': []
  },
  {
    'name': 'Tos',
    'img': require('../../assets/pictos/identidad.png'),
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
    'img': require('../../assets/pictos/identidad.png'),
    'content': []
  },
  {
    'name': 'Picazón',
    'img': require('../../assets/pictos/identidad.png'),
    'content': []
  },
  {
    'name': 'Fatiga',
    'img': require('../../assets/pictos/identidad.png'),
    'content': []
  },
  {
    'name': 'Deshidratación',
    'img': require('../../assets/pictos/identidad.png'),
    'content': []
  },
  {
    'name': 'Respiratorios',
    'img': require('../../assets/pictos/identidad.png'),
    'content': []
  },
  {
    'name': 'Estreñimiento',
    'img': require('../../assets/pictos/identidad.png'),
    'content': []
  },
  {
    'name': 'Mareo',
    'img': require('../../assets/pictos/identidad.png'),
    'content': []
  },
  {
    'name': 'Desmayo',
    'img': require('../../assets/pictos/identidad.png'),
    'content': []
  },
]

const alergias_nutri = [
      {
        'name': 'Huevo',
        'img': require('../../assets/pictos/identidad.png'),
        'content': []
      },
      {
        'name': 'Pescado',
        'img': require('../../assets/pictos/identidad.png'),
        'content': []
      },
      {
        'name': 'Leche',
        'img': require('../../assets/pictos/identidad.png'),
        'content': [
          {
            'name': 'Lactosa',
            'img': require('../../assets/pictos/identidad.png'),
            'content': []
          },
          {
            'name': 'Proteína',
            'img': require('../../assets/pictos/identidad.png'),
            'content': []
          },
        ]
      },
      {
        'name': 'Gluten',
        'img': require('../../assets/pictos/identidad.png'),
        'content': []
      },
      {
        'name': 'Maníes',
        'img': require('../../assets/pictos/identidad.png'),
        'content': []
      },
      {
        'name': 'Marisco',
        'img': require('../../assets/pictos/identidad.png'),
        'content': []
      },
      {
        'name': 'Soja',
        'img': require('../../assets/pictos/identidad.png'),
        'content': []
      },
      {
        'name': 'Nueces',
        'img': require('../../assets/pictos/identidad.png'),
        'content': []
      },
      {
        'name': 'Soy alérgico',
        'img': require('../../assets/pictos/identidad.png'),
        'content': []
      },
    ]

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

export const DefaultPictos = {
  data: {
    categories:
      [
        {
          'name': 'Favores',
          'img': require('../../assets/pictos/identidad.png'),
          'content': [
            {
              'name': 'No te duermas',
              'img': require('../../assets/pictos/identidad.png'),
              'content': []
            },
            {
              'name': 'Vete',
              'img': require('../../assets/pictos/identidad.png'),
              'content': []
            },
            {
              'name': 'Avisa',
              'img': require('../../assets/pictos/identidad.png'),
              'content': []
            },
          ]
        },
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
              'name': 'Síntomas',
              'img': require('../../assets/pictos/estado/sintomas.png'),
              'content': sintomas,
            },
            {
              'name': 'Ánimo',
              'img': require('../../assets/pictos/estado/animo.png'),
              'content': [
                {
                  'name': 'Contento',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Triste',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Asustado',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Confundido',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Nervioso',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Enfadado',
                  'img': require('../../assets/pictos/identidad.png'),
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
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [
                    {
                      'name': 'Quiero dormir',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': []
                    },
                    {
                      'name': 'No puedo dormir',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [
                        {
                          'name': 'Dolor',
                          'img': require('../../assets/pictos/identidad.png'),
                          'content': body_parts.concat(
                            {
                              'name': 'Herida',
                              'img': require('../../assets/pictos/identidad.png'),
                              'content': []
                            },
                          ),
                        },
                        {
                          'name': 'Ruido',
                          'img': require('../../assets/pictos/identidad.png'),
                          'content': []
                        },
                        {
                          'name': 'Estrés',
                          'img': require('../../assets/pictos/identidad.png'),
                          'content': []
                        },
                        {
                          'name': 'Miedo',
                          'img': require('../../assets/pictos/identidad.png'),
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
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Bañar',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Vestir',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Lavar los dientes',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Afeitar',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Pelo',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [
                    {
                      'name': 'Lavar el pelo',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': []
                    },
                    {
                      'name': 'Cortar el pelo',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': []
                    },
                  ]
                },
                {
                  'name': 'Cortar las uñas',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Maquillaje',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Prótesis y accesorios',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [
                    {
                      'name': 'Gafas',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': []
                    },
                    {
                      'name': 'Dentadura',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': []
                    },
                    {
                      'name': 'Audífono',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': []
                    },
                  ]
                },
              ]
            },
            {
              'name': 'Nutrición',
              'img': require('../../assets/pictos/estado/nutricion.png'),
              'content': [
                {
                  'name': 'Alergias',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': alergias_nutri
                },
                {
                  'name': 'Valores',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [
                    {
                      'name': 'Vegano',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': []
                    },
                    {
                      'name': 'Vegetariano',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': []
                    },
                    {
                      'name': 'Ovovegetariano',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': []
                    },
                    {
                      'name': 'Religión',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [
                        {
                          'name': 'Judaísmo',
                          'img': require('../../assets/pictos/identidad.png'),
                          'content': []
                        },
                        {
                          'name': 'Catolicismo',
                          'img': require('../../assets/pictos/identidad.png'),
                          'content': []
                        },
                        {
                          'name': 'Islam',
                          'img': require('../../assets/pictos/identidad.png'),
                          'content': []
                        },
                      ]
                    },
                  ]
                },
                
              ]
            },
            {
              'name': 'Temperatura',
              'img': require('../../assets/pictos/estado/nutricion.png'),
              'content': [
                {
                  'name': 'Tengo fiebre',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Tengo calor',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Tengo frío',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Tengo escalofríos',
                  'img': require('../../assets/pictos/identidad.png'),
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
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Pañuelos',
                  'img': require('../../assets/pictos/identidad.png'),
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
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Hacer pis',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Pañal',
                  'img': require('../../assets/pictos/identidad.png'),
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
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Sentarme',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Acostarme',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Caminar',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Silla de ruedas',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Puedo mover',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': body_parts
                },
                {
                  'name': 'No puedo mover',
                  'img': require('../../assets/pictos/identidad.png'),
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
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [
                    {
                      'name': 'Serie',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': []
                    },
                    {
                      'name': 'Película',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': []
                    },
                    {
                      'name': 'Noticias',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': []
                    },
                    {
                      'name': 'Deportes',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [
                        {
                          'name': 'Fútbol',
                          'img': require('../../assets/pictos/identidad.png'),
                          'content': []
                        },
                        {
                          'name': 'Baloncesto',
                          'img': require('../../assets/pictos/identidad.png'),
                          'content': []
                        },
                        {
                          'name': 'Tenis',
                          'img': require('../../assets/pictos/identidad.png'),
                          'content': []
                        },
                      ]
                    },
                    {
                      'name': 'Zapping',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': []
                    },
                  ]
                },
                {
                  'name': 'Leer',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [
                    {
                      'name': 'Libro',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': []
                    },
                    {
                      'name': 'Periódico',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': []
                    },
                    {
                      'name': 'Revista',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': []
                    },
                  ]
                },
                {
                  'name': 'Escribir',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Jugar',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Radio',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
              ]
            },
          ]
        },
        {
          'name': 'Háblame de...',
          'img': require('../../assets/pictos/hablame_de.png'),
          'content': [
            {
              'name': 'Familiares',
              'img': require('../../assets/pictos/identidad.png'),
              'content': [
                {
                  'name': 'Hijos',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Padres',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Hermanos',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Pareja',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Todos',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
              ]
            },
            {
              'name': 'Amigos',
              'img': require('../../assets/pictos/identidad.png'),
              'content': []
            },
            {
              'name': 'Novedades',
              'img': require('../../assets/pictos/identidad.png'),
              'content': [
                {
                  'name': 'Deporte',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Política',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Economía',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Trabajo',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
              ]
            },
          ]
        },
        {
          'name': 'Identidad',
          'img': require('../../assets/pictos/identidad.png'),
          'content': [
            {
              'name': 'Procedencia',
              'img': require('../../assets/pictos/identidad.png'),
              'content': [
                {
                  'name': 'Extranjero',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Residente',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
              ]
            },
            {
              'name': 'Religión',
              'img': require('../../assets/pictos/identidad.png'),
              'content': [
                {
                  'name': 'Cristianismo',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Judaísmo',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Islam',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Hinduismo',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Budismo',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': '[Otra]',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
              ]
            },
            {
              'name': 'Grupo sanguíneo',
              'img': require('../../assets/pictos/identidad.png'),
              'content': [
                {
                  'name': 'A +',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'A -',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'B +',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'B -',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'AB +',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'AB -',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': '0 +',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': '0 -',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
              ]
            },
            {
              'name': 'Identidad sexual',
              'img': require('../../assets/pictos/identidad.png'),
              'content': [
                {
                  'name': 'Hombre',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Mujer',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Trans',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': '[Otra]',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
              ]
            },
          ]
        },
        {
          'name': 'Salud',
          'img': require('../../assets/pictos/identidad.png'),
          'content': [
            {
              'name': 'Alergias',
              'img': require('../../assets/pictos/identidad.png'),
              'content': [
                {
                  'name': '[Otra]',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [],
                },
                {
                  'name': 'Alimentarias',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': alergias_nutri,
                },
                {
                  'name': 'Respiratoria',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [
                    {
                      'name': 'Polen',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                    {
                      'name': 'Polvo',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                    {
                      'name': 'Animales',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [
                        {
                          'name': 'Gato',
                          'img': require('../../assets/pictos/identidad.png'),
                          'content': [],
                        },
                        {
                          'name': 'Perro',
                          'img': require('../../assets/pictos/identidad.png'),
                          'content': [],
                        },
                        {
                          'name': '[Otros]',
                          'img': require('../../assets/pictos/identidad.png'),
                          'content': [],
                        },
                      ],
                    },
                  ],
                },
                {
                  'name': 'Acaros',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [],
                },
                {
                  'name': 'Humedad',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [],
                },
                {
                  'name': 'Cosméticos',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [],
                },
                {
                  'name': 'Medicamentos',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [
                    {
                      'name': 'Antibióticos',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                    {
                      'name': 'Antiinflamatorios',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                    {
                      'name': 'Sulfamidas',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                    {
                      'name': 'Yodados',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                    {
                      'name': 'Anticonvulsivos',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                    {
                      'name': '[Otro]',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                  ],
                },
              ]
            },
            {
              'name': 'Enfermedades',
              'img': require('../../assets/pictos/identidad.png'),
              'content': [
                {
                  'name': 'Intoxicación',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': []
                },
                {
                  'name': 'Tensión',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [
                    {
                      'name': 'Alta',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                    {
                      'name': 'Baja',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                  ],
                },
                {
                  'name': 'Colesterol alto',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [],
                },
                {
                  'name': 'Artritis',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [],
                },
                {
                  'name': 'Cardiopatía',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [],
                },
                {
                  'name': 'Diabetes',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [],
                },
                {
                  'name': '[Otra]',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [],
                },
                {
                  'name': 'Anemia',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [],
                },
                {
                  'name': 'EPOC',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [],
                },
                {
                  'name': 'Cáncer',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [
                    {
                      'name': '[Otro]',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                    {
                      'name': 'Próstata',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                    {
                      'name': 'Pulmonar',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                    {
                      'name': 'Hígado',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                    {
                      'name': 'Piel',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                    {
                      'name': 'Mama',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                    {
                      'name': 'EPOC',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                  ],
                },
                {
                  'name': 'ETS',
                  'img': require('../../assets/pictos/identidad.png'),
                  'content': [
                    {
                      'name': 'VIH',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                    {
                      'name': 'Hepatitis',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [
                        {
                          'name': 'B',
                          'img': require('../../assets/pictos/identidad.png'),
                          'content': [],
                        },
                        {
                          'name': 'C',
                          'img': require('../../assets/pictos/identidad.png'),
                          'content': [],
                        },
                      ],
                    },
                    {
                      'name': 'Sífilis',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                    {
                      'name': 'Gonorrea',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                    {
                      'name': 'Clamidia',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                    {
                      'name': 'HPV',
                      'img': require('../../assets/pictos/identidad.png'),
                      'content': [],
                    },
                  ],
                },
              ]
            },
            {
              'name': 'Síntomas',
              'img': require('../../assets/pictos/identidad.png'),
              'content': sintomas
            }
          ]
        },
      ]
    }
  }
